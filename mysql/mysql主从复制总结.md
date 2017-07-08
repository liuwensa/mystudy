# mysql的主从服务器配置实现读写分离。

以下说的是单向主从复制。主从复制是通过日志同步来实现的，主库执行语句也会在从库得到执行，原则上是从库只用来查询，这样能确保两个数据库的完全一致。但理论上主从可以建立不同的索引，从数据库可以建立新表，可以执行delete操作，但从数据库不能update和create，否则主从日志将立即被破坏,要特别注意这点。主从的数据库版本必须一致。

主从的my.cnf均做如下配置：

```

    server-id = 1                              #【必须】主机标示，服务器唯一ID，整数，可取IP最后一段
    log_bin   = /var/log/mysql/mysql-bin.log   #【必须】开启二进制日志bin-log,不同版本的mysql可能不一样
    binlog-do-db  = test1                      #需要备份数据，多个写多行
    binlog-do-db  = test2                      #需要备份数据，多个写多行
    binlog-ignore-db = mysql                   #不需要备份的数据库，多个写多行
```

重启mysql服务生效`/etc/init.d/mysql restart`

可以通过`show variables like 'log_%';` 验证二进制日志是否已经启动。

如果主从数据库都是空的那么不用完成初始同步，否则要先把主服务器的数据同步到从服务器。

## 主库操作

注意在导出数据之前先对主数据库进行READ LOCK，以保证数据的一致性：

```
    flush tables with read lock;
```

主库导出sql文件：

```
mysqldump -F sync(数据库名) --host=127.0.0.1 --port=3306 -u root -p536c9a0d2a73afdfbc97dfc9e8c02a89 > /home/sync.sql(生成文件路径)
```

得到主服务器当前二进制日志名和偏移量，这个操作的目的是为了在从数据库启动后，从这个点开始进行数据的恢复：

```
show master status \G;
```

最好在主数据库备份完毕，恢复写操作:

```
unlock tables;
```

创建用来同步的账号并授权：

```

    grant REPLICATION SLAVE on *.* to user1(用户名)@'%' identified by "123456(用户密码)"; （需要注意密码的长度，有时候过长会被截断，提示1045）
    flush privileges;
```
一般不用root帐号，“%”表示所有客户端都可能连，只要帐号，密码正确，此处可用具体客户端IP代替，如127.0.0.1，加强安全。

##从库操作

取出主库sql文件写入:
```
source /home/sync.sql
```

配置使用同步账号：
```
CHANGE MASTER TO MASTER_HOST='127.x.x.x(主库IP)',MASTER_PORT=3306(主库端口),MASTER_USER='user1'(主机账号),MASTER_PASSWORD='123456',MASTER_LOG_FILE='mysql-bin.000003(上面得到的二进制日志名)',MASTER_LOG_POS=106(上面得到的二进制偏移量);
```

开始主从复制：
```
 start slave;
```

终止主从复制：
```
 stop slave;
```

从服务器状态
```
Show slave status \G;
```
注：Slave_IO及Slave_SQL进程必须正常运行，即YES状态，否则都是错误的状态(如：其中一个NO均属错误)。