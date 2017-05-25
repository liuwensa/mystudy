# 设置git记住帐号密码

使用github的公共仓库，但每次提交都要求填写帐号密码，有点麻烦，下面的方法可以让Git“记住密码”

进入git bash终端， 输入如下命令：
```
git config --global credential.helper store
```
执行完后`.gitconfig`文件，会多了一项：
```
[credential] 
	helper = store
```
重新开启git bash会发现git push时不用再输入用户名和密码


或者手动加： 
在用户目录下.gitconfig文件 或 "项目/.git/config"文件 里增加两行：
```
[credential]    
    helper = store 
```
设置完毕！