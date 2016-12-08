# git学习笔记

使用github的公共仓库，但每次提交都要求填写帐号密码，有点麻烦，下面的方法可以让Git“记住密码”

在用户目录下.gitconfig文件 或 "项目/.git/config"文件 里增加两行：
```
[credential]    
    helper = store 
```
设置完毕！

#工作流
你的本地仓库由 git 维护的三棵“树”组成。第一个是你的 工作目录，它持有实际文件；第二个是 暂存区（Index），它像个缓存区域，临时保存你的改动；最后是 HEAD，它指向你最后一次提交的结果。

![](http://i.imgur.com/voKgCLd.png)

#添加和提交
你可以提出更改（把它们添加到暂存区），使用如下命令：

	git add <filename>   
	git add *
这是 git 基本工作流程的第一步；使用如下命令以实际提交改动：

	git commit -m "代码提交信息"

现在，你的改动已经提交到了`HEAD`，但是还没到你的远端仓库。

#推送改动
你的改动现在已经在本地仓库的`HEAD`中了。执行如下命令以将这些改动提交到远端仓库：

    git push origin master

可以把`master`换成你想要推送的任何分支。 

如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：

    git remote add origin <server>

如此你就能够将你的改动推送到所添加的服务器上去了。

#分支
分支是用来将特性开发绝缘开来的。在你创建仓库的时候，`master`是“默认的”分支。在其他分支上进行开发，完成后再将它们合并到主分支上。
![](http://i.imgur.com/qrmtgid.png)

创建一个叫做“feature_x”的分支，并切换过去：

    git checkout -b feature_x

切换回主分支：

    git checkout master

再把新建的分支删掉：

    git branch -d feature_x

除非你将分支推送到远端仓库，不然该分支就是 不为他人所见的：

    git push origin <branch>

#更新与合并
要更新你的本地仓库至最新改动，执行：

    git pull

以在你的工作目录中 获取（`fetch`） 并 合并（`merge`） 远端的改动。
要合并其他分支到你的当前分支（例如 `master`），执行：

    git merge <branch>

在这两种情况下，git 都会尝试去自动合并改动。遗憾的是，这可能并非每次都成功，并可能出现冲突（conflicts）。 这时候就需要你修改这些文件来手动合并这些冲突（conflicts）。改完之后，你需要执行如下命令以将它们标记为合并成功：

    git add <filename>

在合并改动之前，你可以使用如下命令预览差异：

    git diff <source_branch> <target_branch>


#Git基本常用命令如下：

   mkdir：         XX (创建一个空目录 XX指目录名)

   pwd：          显示当前目录的路径。

   git init          把当前的目录变成可以管理的git仓库，生成隐藏.git文件。

   git add XX       把xx文件添加到暂存区去。

   git commit –m “XX”  提交文件 –m 后面的是注释。

   git status        查看仓库状态

   git diff  XX      查看XX文件修改了那些内容

   git log          查看历史记录

   git reset  --hard HEAD^ 或者 git reset  --hard HEAD~ 回退到上一个版本(如果想回退到100个版本，使用git reset –hard HEAD~100 )

   cat XX         查看XX文件内容

   git reflog       查看历史记录的版本号id

   git checkout -- XX  把XX文件在工作区的修改全部撤销。

   git rm XX          删除XX文件

   git remote add origin https://github.com/tugenhua0707/testgit 关联一个远程库

   git push –u(第一次要用-u 以后不需要) origin master 把当前master分支推送到远程库

   git clone https://github.com/tugenhua0707/testgit  从远程库中克隆

   git checkout –b dev  创建dev分支 并切换到dev分支上

   git branch  查看当前所有的分支

   git checkout master 切换回master分支

   git merge dev    在当前的分支上合并dev分支

   git branch –d dev 删除dev分支

   git branch name  创建分支

   git stash 把当前的工作隐藏起来 等以后恢复现场后继续工作

   git stash list 查看所有被隐藏的文件列表

   git stash apply 恢复被隐藏的文件，但是内容不删除

   git stash drop 删除文件

   git stash pop 恢复文件的同时 也删除文件

   git remote 查看远程库的信息

   git remote –v 查看远程库的详细信息

   git push origin master  Git会把master分支推送到远程库对应的远程分支上


如果输入$ git remote add origin git@github.com:djqiang（github帐号名）/gitdemo（项目名）.git 
    提示出错信息：fatal: remote origin already exists.
    解决办法如下：
    1、先输入$ git remote rm origin
    2、再输入$ git remote add origin git@github.com:djqiang/gitdemo.git 就不会报错了！
    3、如果输入$ git remote rm origin 还是报错的话，error: Could not remove config section 'remote.origin'. 我们需要修改gitconfig文件的内容
    4、找到你的github的安装路径，我的是C:\Users\ASUS\AppData\Local\GitHub\PortableGit_ca477551eeb4aea0e4ae9fcd3358bd96720bb5c8\etc
    5、找到一个名为gitconfig的文件，打开它把里面的[remote "origin"]那一行删掉就好了！