# Linux系统维护监控工具集sysstat

## sysstat工具包介绍
sysstat是一个软件包，包含监测系统性能及效率的一组工具，这些工具对于我们收集系统性能数据，比如CPU使用率、硬盘和网络吞吐数据等数据的收集和分析，有利于我们判断系统是否正常运行，是提高系统运行效率、安全运行服务器的得力助手；

**Sysstat 软件包集成如下工具：**
- iostat 用于监控系统设备的IO负载情况；
- mpstat 用于查看可用CPU的状态信息；
- pidstat 统计正在运行的进程/任务的CPU、内存等信息；
- sar 保存和报告不同资源（CPU、内存、输入输出、网络、内核等）的详细信息；
- sadc 是系统动态数据收集工具，收集的数据被写一个二进制的文件中，它被用作sar工具的后端；
- sa1 读取和存储sadc的数据文件的二进制数据。它是通过计划任务工具cron来运行，是为sadc所设计的程序前端程序；
- sa2 和sar协作，用于总结每日报告。它是为sar所设计的前端 ，要通过cron来调用
- sadf 以不同的格式（CSV或XML）显示sar生成的数据；
- sysstat 解释sysstat的各种作用。
- nfsiostat-sysstat 统计NFS协议的网络文件系统的 I/O状态数据。
- cifsiostat 统计CIFS协议的网络文件系统的 I/O状态数据。

## 安装和运行

### apt-get install

```
    [root@localhost ~]# apt-get install sysstat
```

安装后无法使用：

```
Cannot open /var/log/sysstat/sa02: No such file or directory
Please check if data collecting is enabled in /etc/default/sysstat
```

修改配置文件：`vim /etc/default/sysstat`将`false`改为`true`

```
# Should sadc collect system activity informations? Valid values
# are "true" and "false". Please do not put other values, they
# will be overwritten by debconf!
ENABLED="true"
```

重启

```
service sysstat restart
```

### 源码编译安装
```
    [root@localhost ~]# tar zxvf sysstat-6.1.2.tar.gz
    [beinan@localhost ~]$ cd sysstat-6.1.2
    [beinan@localhost sysstat-6.1.2]#
    [beinan@localhost sysstat-6.1.2]# make config
    [beinan@localhost sysstat-6.1.2]# make
    [beinan@localhost sysstat-6.1.2]# make install
```

## Sysstat 工具集介绍
