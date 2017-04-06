## jsdoc

##文档

[官网](http://usejsdoc.org/)
[中文文档](http://www.css88.com/doc/jsdoc/)

## 生成文档

- 生成html：
  1. 安装：`npm install jsdoc -g`
  2. 执行：`jsdoc test.js`
- 生成markdown：
  1. 安装：`npm install jsdoc-to-markdown -g`
  2. 执行：`jsdoc2md text.js > api.md`
 
## 块标签

### 对文件进行描述

@author —— 指定项目作者
@copyright —— 描述版权信息
@see —— 描述可以参考外部资源
@version —— 描述版本信息
@tutorial —— 插入一个指向教程的链接，作为文档的一部分
@since —— 描述该功能哪个版本哪个时间添加进来的
@summary —— 描述一个简写版本
@file —— 文件说明，在文件开头使用
@license —— 描述代码才有那种软件许可协议

### 标注js使用方法

@returns —— 描述一个函数的返回值
@param —— 描述传递给函数的参数
@description —— 描述
@example —— 举例
@throws —— 描述可能会被抛出什么样的错误

### 开发者备注

@deprecated —— 标注关联代码已经被弃用
@todo —— 描述一个将要完成的任务

### 文件详细结构

@abstract —— 标注该成员必须在子类中实现或重写
@access —— 标注该成员的访问级别
@access private > @private
@access protected > @protected
@access public > @public
@augments（@extends） —— 标注这个子类继承自哪个父类，后面需要加父类名
@class（@constructor） —— 标注该函数是一个构造函数，需要使用new来实例化 function MyClass(){}
@constant（@const） —— 标注这个对象是一个常量
@constructs —— 标注这个函数用来作为类的构造器
@default —— 标注默认值
@exports —— 标注javascript模块导出的内容
@function（@func、@method） —— 标注该对象作为一个函数
@global —— 标注为全局变量（对象）
@implements —— 标注实现一个接口
@inheritdoc —— 标注继承其父类的文档
@inner —— 标注为其父类的内部成员
@instance —— 标注为其父类的实例成员
@interface —— 标注其为可以实现的接口
@kind —— 指明标注的类型（@kind class = @class）
@lends —— 将一个字面量对象的所有成员标记为某个类（或模块）的成员
@memberof —— 标注成员属于哪个父级
@mixes —— 标注该对象混入了另一个对象的所有成员
@mixin —— 标注一个混入对象
@module —— 将当前文档标注为一个模块
@protected—— 标注为受保护的
@public —— 标注为公开的
@readonly —— 标注为只读的
@requires —— 标注这个文件需要一个javascript模块
@static —— 标注为静态的
@type —— 标注类型
@typeof —— 标注一个自定义的类型
@this —— 描述this关键字的指向
@alias —— 标注成员有一个别名
@borrow —— 将另一个标识符的描述添加到当前标识符的描述
@name —— 强制jsdoc使用这个给定的名称，而忽略代码里的实际名称
@namespace —— 标注一个命名空间对象
@override —— 标注覆盖其父类同名的方法
@private —— 标注为私有
@classdesc —— 与@class结合使用，描述类
@callback —— 描述一个回调函数
@enum —— 描述一个静态属性值的全部相同的集合，通常与@readonly结合使用
@event —— 描述事件
@member —— 描述一个成员 @member [] []
@property —— 描述一个对象的属性
@external —— 标识一个外部的类，命名空间，或模块
@files —— 标明当一个方法被调用时将触发一个指定类型的事件
@listens —— 标注监听事件
@variation —— 区分具有相同名称的不同对象