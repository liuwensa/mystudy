# Elasticsearch安装配置

## 安装

- 下载[https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)
- 解压文件`tar zxvf elasticsearch-5.5.2.tar.gz`
- 进入`elasticsearch-5.5.2`文件夹下执行`./bin/elasticsearch`启动，或者加参数d是以守护进程运行`./bin/elasticsearch -d`
- 如果以`root`用户启动，正常情况下这里会报错，需要一个非`root`权限的用户
- 创建普通用户组以及用户，命令如下：`groupadd liuwensa`， `useradd  liuwensa(用户名) -g liuwensa(组名) -p 123456(密码)`
- 更改`elasticsearch-5.5.2`文件夹以及内部文件的所属用户以及组为`liuwensa`，`chown -R liuwensa:liuwensa elasticsearch-5.5.2`
- 切换到`liuwensa`用户下，再次执行启动命令
- 测试`curl http://localhost:9200/?pretty` 
- 安装完成后配置使用IP访问 
   1. 当安装完成之后这只能用`localhost`、`127.0.0.1`连接成功
   2. `elasticsearch-5.5.2`的`config`下`elasticsearch.yml`，修改`network.host: 0.0.0.0`
   3. 重启之后，使用`ip+9200`访问,如果连接不成功则需要考虑是不是端口的原因，配置端口，重启防火墙。

结束`elasticsearch`，如果在前台，直接`ctrl+c`结束，如果在后台，可以通过`ps aux|grep elasticsearch`查询进程id，然后`kill 进程id`

## 插件介绍及安装

### `Head`

`Head`是一个用来监控`elasticsearch`状态的客户端插件，是集群管理、数据可视化、增删改查、查询语句可视化工具。

命令安装：`./bin/plugin install mobz/elasticsearch-head`

包安装: 下载并解压包，在`elasticsearch`的安装的`plugin`下创建目录`head`，将解压后文件夹下的所有文件拷贝到`head`目录下

安装后再浏览器中输入： `http://ip:9200/_plugin/head/`

该插件可以对数据进行任何增删改查，所以不建议在正式环境中使用它，如果使用，也必须限制规定的IP能够使用。