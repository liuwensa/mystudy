# 一步设置让TortoiseGit+msysgit记住帐号密码

使用github的公共仓库，但每次提交都要求填写帐号密码，有点麻烦，下面的方法可以让Git“记住密码”

在用户目录下.gitconfig文件 或 "项目/.git/config"文件 里增加两行：
```
[credential]    
    helper = store 
```
设置完毕！