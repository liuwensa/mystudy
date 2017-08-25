# Elasticsearch安装配置
## `java`环境
1. 下载jdk-8u121-linux-x64.tar.gz
2. 解压jdk，然后`mv jdk_dir /usr/local`
3. 写入/etc/profile，然后重启
    ```
	export JAVA_HOME=/usr/local/jdk1.8.0_121
	export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
    ```

## 安装

- 下载[https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)
- 解压文件`tar zxvf elasticsearch-5.5.2.tar.gz`
- 进入`elasticsearch-5.5.2`文件夹下执行`./bin/elasticsearch`启动，或者加参数d是以守护进程运行`./bin/elasticsearch -d`
- 如果以`root`用户启动，正常情况下这里会报错，需要一个非`root`权限的用户
- 创建普通用户组以及用户，命令如下：`groupadd liuwensa`， `useradd  liuwensa(用户名) -g liuwensa(组名) -p 123456(密码)`
- 更改`elasticsearch-5.5.2`文件夹以及内部文件的所属用户以及组为`liuwensa`，`chown -R liuwensa:liuwensa elasticsearch-5.5.2`
- 切换到`liuwensa`用户下，再次执行启动命令
- 测试`curl http://localhost:9200/?pretty` 

结束`elasticsearch`，如果在前台，直接`ctrl+c`结束，如果在后台，可以通过`ps aux|grep elasticsearch`查询进程id，然后`kill 进程id`

## `elasticsearch`启用外部IP访问的启动异常

安装`elasticsearch`完成之后，如果我们不修改配置，那么默认只有本机可以访问`elasticsearch`的`api`接口，如果需要给外部机器访问，那么就需要修改`elasticsearch`的配置了。

### 修改绑定的IP地址
在默认情况下，`elasticsearch`只允许本地访问`api`接口，如果我们希望在另外一台机器上访问`elasticsearch`的接口的话，需要配置主机地址：`vim config/elasticsearch.yml `，找到`# network.host: 192.168.1.1`，去掉`network.host`的注释，改成`0.0.0.0`，保存退出，重新启动。
![](http://i.imgur.com/sD0ZAlL.png)

这里我们看到启动报错了，这个错误并不是因为我们改了主机地址造成的，实际上一直都存在的错误，但是在只允许本地连接的情况下，`elasticsearch`没有做检查，所以没有报错，可以正常运行，但是当我们配置了运行外部地址访问的时候，`elasticsearch`就会强制检查，所以就报错了。

### 解决启动错误
这里一共两个错误：

第一个错误：
`max file descriptors [4096] for elasticsearch process likely too low, increase to at least [65536]`，这个是`linux`下常见的错误，主要是因为`linux`会限制进程的最大打开文件数，只需要简单配置一下即可解决，在`elasticsearch`的官方文档中提供了两种解决方案，这里我们只看系统基本的配置这种方式。
- 打开`/etc/security/limits.conf`
- 添加如下配置 
 ![](http://i.imgur.com/T914Qp3.png)

保存即可。这里的`liuwensa`是用户名，表明这个配置只对`liuwensa`用户生效，如果你用来启动`elasticsearch`的用户名不是这个，那么你需要按你实际的用户名修改。

第二个问题：
`max virtual memory areas vm.max_map_count [65530] likely too low, increase to at least [262144]`，这个是`elasticsearch`使用的虚拟内存，修改/etc/sysctl.conf配置文件，调大虚拟内存即可：`sysctl -w vm.max_map_count=262144`，或者`echo "vm.max_map_count=262144" >>/etc/sysctl.conf`。

重新启动，就可以正常访问了，现在我们可以在任何机器上访问`elasticsearch`了。

## 插件介绍及安装

### `Head`

`Head`是一个用来监控`elasticsearch`状态的客户端插件，是集群管理、数据可视化、增删改查、查询语句可视化工具。

命令安装：`./bin/plugin install mobz/elasticsearch-head`

包安装: 下载并解压包，在`elasticsearch`的安装的`plugin`下创建目录`head`，将解压后文件夹下的所有文件拷贝到`head`目录下

安装后再浏览器中输入： `http://ip:9200/_plugin/head/`

启动时要设置elasticsearch允许跨域，在elasticsearch.yml中增加：
```
http.cors.enabled: true
http.cors.allow-origin: "*"
```

该插件可以对数据进行任何增删改查，所以不建议在正式环境中使用它，如果使用，也必须限制规定的IP能够使用。

安装grunt
然后进入目录运行grunt server

### logstash-5.2.1开箱即用，不用安装logstash-input-jdbc插件，默认已安装（不要走弯路）