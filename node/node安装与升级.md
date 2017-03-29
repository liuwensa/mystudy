
##安装 Node.js

### 编译安装
直接编译安装到最新的版本。

    apt-get install gcc g++ make -y
	wget https://nodejs.org/dist/v4.4.2/node-v4.4.2.tar.gz
	tar zxf node-v4.4.2.tar.gz 
	cd node-v4.4.2 
	./configure
	make
	make install

在`make`的时候发生错误：

    ../deps/v8/src/base/platform/mutex.h:210: error: expected ‘)’ before ‘const’
    ../deps/v8/src/base/platform/mutex.h:210: error: ‘void operator=(const LockGuard&)’ must be a nonstatic member function
    ../deps/v8/src/base/platform/mutex.h:211: error: expected declaration before ‘}’ token
    make[1]: *** [/home/tmp/environmental/node-v4.2.3/out/Release/obj.target/v8_base/deps/v8/src/accessors.o] Error 1
    make[1]: Leaving directory `/home/tmp/environmental/node-v4.2.3/out'
    make: *** [node] Error 2

我还不知道怎么解决

### 源码安装
可以直接下载并使用源码包中的编译好的文件：https://nodejs.org/dist/v7.6.0/node-v7.6.0-linux-x64.tar.gz

```
cp -rp node-v0.12.2-linux-x64 /usr/local/
unlink /usr/local/node  # 如果之前设置过链接，先移除掉
ln -s /usr/local/node-v0.12.2-linux-x64 /usr/local/node
```

做一个软链接，用` /usr/local/node` 表示要用的 `Node.js` 版本的目录，就可以忽略目录中的版本号带来的影响。这一步的目的是让环境变量的值固定，就不用每次换版本去改环境变量了。

为了让环境变量以后都生效，在 `profile` 文件中添加一行：

```
$ vim /etc/profile

export PATH="$PATH:/usr/local/node/bin"

source /etc/profile
```

以后换了版本怎么办呢？只需要再做一次`ln`，把软链接指向新版本的目录就可以了，立即生效。


## 升级node

先清除 `npm cache  npm cache clean -f`
安装`n`模块 `npm install -g n`
然后就可以开始升级了：自动安装到最新的稳定版本命令是 `n stable`，自由选择版本安装是`n 4.4.0（版本号）`
备注：升级前后可先使用`node -v `查看版本。查看所有`node`版本是`n ls`

升级`Node`后，执行`npm install`出现以下错误：

```
DLCM50893462A:user-dashboard i318043$ npm install
npm ERR! Darwin 15.6.0
npm ERR! argv "/usr/local/Cellar/node/5.6.0/bin/node" "/usr/local/bin/npm" "install"
npm ERR! node v7.4.0
npm ERR! npm  v4.0.5
npm ERR! code MODULE_NOT_FOUND

npm ERR! Cannot find module 'internal/fs'
npm ERR! 
npm ERR! If you need help, you may report this error at:
npm ERR!     <https://github.com/npm/npm/issues>

npm ERR! Please include the following file with any support request:
npm ERR!     /Users/i318043/z/react/user-dashboard/npm-debug.log
```

需要先回退`NodeJS`，然后安装`npm`，然后重新升级`NodeJS`

```
$ sudo n 6.9.1
$ sudo npm -g install npm@next
$ sudo n stable
```

下面是更新最新`Node`的方法，不需要像上面那样指定`NodeJS`的版本号。

```
npm cache clean -f
npm install -g n
n stable
```
