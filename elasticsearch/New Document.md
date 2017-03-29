1.下载jdk-8u121-linux-x64.tar.gz elasticsearch-5.2.1.tar.gz

2.
	解压jdk mv jdk_dir /usr/local
	
	写入/etc/profile，然后重启
	export JAVA_HOME=/usr/local/jdk1.8.0_121
	export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
	export PATH=$JAVA_HOME/bin:$PATH

3.
	解压elasticsearch mv elasticsearch_dir /usr/local
	chown -R duoyi /sur/local/elasticsearch	#elasticsearch不能以root运行


4、max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
修改/etc/sysctl.conf配置文件，
cat /etc/sysctl.conf | grep vm.max_map_count
vm.max_map_count=262144
如果不存在则添加
echo "vm.max_map_count=262144" >>/etc/sysctl.conf

5.elasticseaerch-head https://github.com/mobz/elasticsearch-head 启动时要设置elasticsearch允许跨域
在elasticsearch.yml中增加
http.cors.enabled: true
http.cors.allow-origin: "*"

安装grunt
然后进入目录运行grunt server

6.logstash-5.2.1开箱即用，不用安装logstash-input-jdbc插件，默认已安装（不要走弯路）


