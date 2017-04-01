# 安装`mysql`及常见配置

## 安装命令

```
apt-get install mysql-server mysql-client
```

## MySQL的几个重要目录

`MySQL`安装完成后，它的数据库文件、配置文件和命令文件分别在不同的目录。

1. 数据库目录`/var/lib/mysql/`
2. 配置文件`/usr/share/mysql`（`mysql.server`命令及配置文件）
3. 相关命令`/usr/bin`(`mysqladmin` `mysqldump`等命令)
4. 启动脚本`/etc/rc.d/init.d/`（启动脚本文件`mysql`的目录）

## 启动与停止

1. 启动
  `MySQL`安装完成后启动文件`mysql`在`/etc/init.d`目录下，在需要启动时运行`/etc/init.d/mysql start`命令即可

2. 停止`/usr/bin/mysqladmin -u root -p shutdown`

3. 自动启动
　　1. 察看`mysql`是否在自动启动列表中`/sbin/chkconfig –list`，PS:系统默认是没有`chkconfig`这个命令的，需要自己安装，`debian`下有`apt`源。
　　2. 把`MySQL`添加到你系统的启动服务组里面去`/sbin/chkconfig　– add　mysql`
　　3. 把`MySQL`从启动服务组里面删除`/sbin/chkconfig　– del　mysql`

## 更改`MySQL`目录

`MySQL`默认的数据文件存储目录为`/var/lib/mysql`。假如要把目录移到`/home/data`下需要进行下面几步：

1. `home`目录下建立`data`目录
       cd /home
       mkdir data

2. 把`MySQL`服务进程停掉： 
　　`mysqladmin -u root -p shutdown`

3. 把`/var/lib/mysql`整个目录移到`/home/data`
　　`mv /var/lib/mysql　/home/data/`
　　这样就把`MySQL`的数据文件移动到了`/home/data/mysql`下

4. 找到`my.cnf`配置文件
　　如果`/etc/`目录下没有`my.cnf`配置文件，请到`/usr/share/mysql/`下找到`*.cnf`文件，拷贝其中一个到`/etc/`并改名为`my.cnf`中。命令如下：`cp /usr/share/mysql/my-medium.cnf　/etc/my.cnf`

5. 编辑`MySQL`的配置文件`/etc/my.cnf`
为保证`MySQL`能够正常工作，需要指明`mysql.sock`文件的产生位置。 修改`socket=/var/lib/mysql/mysql.sock`一行中等号右边的值为：`/home/mysql/mysql.sock` 。操作如下：

	```
    vi　 my.cnf　　　 (用vi工具编辑my.cnf文件，找到下列数据修改之)

    # The MySQL server
    [mysqld]
    port　　　= 3306
    #socket　 = /var/lib/mysql/mysql.sock（原内容，为了更稳妥用“#”注释此行）
    socket　 = /home/data/mysql/mysql.sock　　　（加上此行）
	```

6. 修改`MySQL`启动脚本`/etc/rc.d/init.d/mysql`
　　最后，需要修改`MySQ`L启动脚本`/etc/rc.d/init.d/mysql`，把其中`datadir=/var/lib/mysql`一行中，等号右边的路径改成你现在的实际存放路径：`home/data/mysql`。

	```
	vi　/etc/rc.d/init.d/mysql
	#datadir=/var/lib/mysql　　　　（注释此行）
	datadir=/home/data/mysql　　 （加上此行）
	```

7. 重新启动`MySQL`服务，`/etc/rc.d/init.d/mysql　start`


 

## 常见问题

`"Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' "`错误,解决方法：这是没启动`mysql`的守护进程，执行`service mysqld start`就行了
