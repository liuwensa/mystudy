## 部署过程

### 获取代码

```
git clone git://github.com/fengmk2/cnpmjs.org.git /home/cnpmjs.org
cd $HOME/cnpmjs.org
```

### 创建MySQL表

```
mysql -u yourname -p
mysql> use cnpmjs;
mysql> source docs/db.sql
```

### 然后编写配置文件config/config.js：

```
module.exports = {
    debug: false,
    enableCluster: true, // enable cluster mode
    mysqlServers: [
      {
        host: 'localhost',
        port: 3306,
        user: 'cnpmjs',
        password: 'cnpmjs123',
      }
    ],
    mysqlDatabase: 'cnpmjstest',
    redis: {
      host: 'localhost',
      port: 6379,
    },
    nfs: null, //use your own CND here
    enablePrivate: true, // enable private mode, only admin can publish, other use just can sync package from source npm
    admins: {
      admin: 'admin@cnpmjs.org',
    },
    syncModel: 'exist'
  };
```

### 部署

安装依赖`npm install`
启动`npm run start`
好了，部署完成！

## 客户端设置

服务跑起来之后，在自己的电脑上配置下客户端。

首先安装cnpm客户端：`npm install -g cnpm`

在自己的脚本的启动文件（例如.zshrc或.bashrc)中添加别名:

    linux：
    echo "alias mynpm='npm --registry=http://npm.2980.com:7001'" >> ~/.bashrc
    source ~/.bashrc