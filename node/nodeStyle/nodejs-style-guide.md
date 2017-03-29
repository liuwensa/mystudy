# Node.js-Style-Guide

## Table of Contents

  1. [注释风格](#)
  1. [命名风格规范](#)

## 注释风格

* [lines-around-comment](http://eslint.org/docs/rules/lines-around-comment)行注释和文档注释：前面必须有一行空行，与被注释的内容间不能有空行。

* 不要写无意义注释，代码既注释
* 单行注释，必须独占一行，注释符`//` `/*` `/**`后必须跟一个空格
* 多行注释, 使用多个单行注释
* 文档注释，采用[JSDoc](http://usejsdoc.org/)规范
  * 为了便于代码阅读和自文档化，以下内容必须包含以 `/**...*/` 形式的块注释中
  * 文档注释前必须空一行
  * 自文档化的文档说明 what，而不是how
  * 类型首字母大写，如：{String}, {Number}, {Boolean}
* 细节注释
  * 细节注释遵循单行注释的格式
  * 对于内部实现、不容易理解的逻辑说明、摘要信息等，需要编写细节注释
  * 使用一些特殊标记进行说明，特殊标记必须使用单行注释的形式。下面列举了一些常用标记：
    * TODO: 有功能待实现。此时需要对将要实现的功能进行简单说明。
    * FIXME: 该处代码运行没问题，但可能由于时间赶或者其他原因，需要修正。此时需要对如何修正进行简单说明。
    * HACK: 为修正某些问题而写的不太好或者使用了某些诡异手段的代码。此时需要对思路或诡异手段进行描述。
    * BUG: 该处存在陷阱。此时需要对陷阱进行描述。
    * XXX: 该处存在陷阱。此时需要对陷阱进行描述。
* 文件注释，描述该文件的内容。

* 函数注释采用文档注释，类型与构造函数名称一致，首字母大写。
* 单行注释，在注释对象上面另起一行使用单行注释，注释前空一行。

## 命名风格规范

效果和目标：使用良好的命名方式取代多余的注释!!!

* 常量、枚举的属性：`SYMBOLIC_CONSTANTS_LIKE_THIS`
* 变量（实例属性）、函数（实例方法）：`variableNamesLikeThis`、`functionNamesLikeThis`
* 类名和枚举类型：`ClassNamesLikeThis`, `EnumNamesLikeThis`

* 禁止使用保留字命名属性
* 标识符最段两个字符

### Camel命名法 [camelcase](http://eslint.org/docs/rules/camelcase)

* 变量、函数、函数参数、方法/属性、命名空间

```js
const loadingModules = {};

function getStyle(element) {
}

function TextNode(value, engine) {
  this.value = value;
  this.engine = engine;
}

TextNode.prototype.clone = function () {
  return this;
};

// 命名空间
equipments = {};
equipments.heavyWeapons = {};
```

### Pascal命名法

* 构造函数名、枚举变量

```js
function TextNode(options) {
}

const TargetState = {
  READING : 1,
  READED  : 2,
  APPLIED : 3,
  READY   : 4
};
```

### 常量

全部字母大写，单词间下划线分隔

```js
const HTML_ENTITY = {};
```

### 不希望外部使用的，私有的属性/方法

使用一个下划线的前缀。不使用下划线后缀或者双下划线的方式

```js
Constractor.prototype._setValue = function () {}
```

### 目录/文件命名

* 项目内目录文件，全部使用小写字母命名

* 单词之间使用 `_` 分割，如果不想暴露某个文件给用户，用 `_` 来开头

```
child_process.js
string_decoder.js
_linklist.js
```

### 其他

* 由多个单词组成的缩写词，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致。

```js
function XMLParser() {
}

function insertHTML(element, html) {
}

const httpRequest = new HTTPRequest();
```

* Promise对象 用 动宾短语的进行时 表达，与 then 连起来更好理解

```js
const loadingData = ajax.get('url');
loadingData.then(callback);
```

* Boolean 类型的变量使用 is 或 has 开头

```js
const isReady = false;
const hasMoreCommands = false;
```

* 创建 `get()` 和 `set()` 函数是可以的，但是要成对使用

```js
function Jedi() {
}

Jedi.prototype.set = function set(key, val) {
  this[key] = val;
};

Jedi.prototype.get = function get(key) {
  return this[key];
};
```

* 如果你需要访问器函数时使用 `getVal()` 和 `setVal('hello')`

```js
// bad
dragon.age();
dragon.age(25);

// good
dragon.getAge();
dragon.setAge(25);
```

### 取个好名字

* 使用有意义的命名，能明确表示对象、变量含义的名称

* 写代码的过程中，一旦发现更好的命名，就立刻换掉，数据字段酌情处理

* 避免使用误导性名称

程序员应当避免留下掩藏代码本意的错误线索。避免使用与本意相悖的词，如hp、aix、sco都不应该做变量名，因为他们都是Unix平太专有名词。
别用`accountList`来表示一组账号，除非它真的式`List`类型，`List`对程序员有特殊含义。所以用`accountGroup`或`bunchOfAccounts`，甚至直接使用`accounts`都会好一些。

堤防使用差异不明显的名称，如：想区分 `XYZControllerForEfficientHandlingOfStrings` 和 `XYZControllerForEfficientStorageOfStrings`需要多长时间呢？

以同样的方式拼写出同样的概念才是更好的方式，前后拼写不一致就会误导。

* 做有意义的区分

如果程序员只是为了满足编译器或解释器的需要写代码，就会制造麻烦。

```js
// 程序员怎么能知道该使用哪个函数呢？别告诉我去看注释或看代码。
// 这种区分就是无意义的
getActiveAccount();
getActiveAccounts();
getActiveAccountInfo();
```

如果没有明确的约定，`memoryAccount` 和　`memory`　看不出什么区别，`customerInfo` 与　`customer`　没什么区别。`accountData`、`accountInfo`、`account` 没什么区别，`message`、`theMessage`没什么区别。
所以在代码设计之初，就要明确约定变量名称表示什么，并对表达同一内容的实例使用相同的名称，对同一类对象的不同实例使用不同的但意思明确的前缀加以区分。

* 使用读的出来的名称，不要随意自造词

```js
// ymdhms -> year-month-day-hour-minute-second
genymdhms
modymdhms

generationTimestamp
modificationTimestamp
```

* 使用容易搜索的词，错误的拼写、自造词等不容易记忆，不容易搜索

单字母名称和数字常量，很难在一段文本中找出来

长名称胜于段名称，完整单词胜于缩短的单词，如`modify`好于`mod`，`modify`语义更直观，`mod`也容易被理解成为其他词。

短名称仅用于本地变量。

* 每个概念对应一个词
* 不使用双关语
* 使用解决方案内的名称
* 使用领域内的名称

* 添加有意义的语境，也不要添加没用的语境，通过创建有意义的对象，或前缀表达语境

`addrFirstName、addrLastName、addrState，addr`前缀提供了语境
`addr.FirstName、addr.lastName、addr.state，Address`类实例提供语境
`addr.addrFirstName、addr.addrLastName、addr.addrState`，addr前缀是没用的语境


```js
// 消逝的时间
let d;

// d 什么也没有说明
let elapsedTimeInDays;
let daysSinceCreation;
let daysSinceModification;
let fileAgeInDays;
```

* 好名称的效果

```c++
// 下面的代码目的何在？
public List<int[]> getItem () {
  List<int[]> list1 = new ArrayList<int []>();
  for (int[] x: theList) {
    if (x[0] === 4) {
      list1.add(x);
    }
  }
}

// 代码并不复杂，没有复杂的表达式，函数也不长，但是为什么难以说明他在做什么？

// 问题的原因不在于代码的简洁程度，而是代码的模糊程度：即上下文在代码中未被明确体现程度。

// 1. theList中的类型是什么？
// 2. theLIst 0下标条目的意义是什么？
// 3. 值 4 的意义是什么？
// 4. 怎么使用返回列表

// 改进1

public List<int []> getFlaggedCells() {
  List<int []> flaggedCells = new ArrayList<int []>();
  for (int[] cell : gameBoard) {
    if (cell[STATUS_VALUE] === FLAGGED) {
      flaggedCells.add(cell);
    }
  }
  return flaggedCells;
}

// 改进2

public List<Cell> getFlaggedCells() {
  List<Cell> flaggedCells = new ArrayList<Cell>();
  for (Cell cell : gameBoard) {
    if (cell.isFlagged()) {
      flaggedCells.add(cell);
    }
  }
  return flaggedCells;
}

// 以上只要简单的改一下名称，就能轻易的知道发生了什么。这就是选用好的名称的力量。
```

## 模块

### 模块导出

* 构造函数必须作为`exports`属性导出

events.js
```js
class EventEmitter {
}
exports.EventEmitter = EventEmitter;
```

### 模块导入

index.js
```js
const EventEmitter = require('./events').EventEmitter;
```

* 按照内建模块、第三方模块、项目内模块的顺序引入
* 同一类模块按照目录层次深度排列

```js
const util = require('util');
const http = require('http');
const path = require('path');

const config     = require('config');
const express    = require('express');
const bodyParser = require('body-parser');

const enums  = require('./enums');
const routes = require('../routes');
const logger = require('../lib/tools/logger');
```

## 排版风格规范

### 基础风格

* 【缩进】使用`2 space`，tab要转换成 `2 space`[indent](http://eslint.org/docs/rules/indent)
* 【分号】语句和表达式末尾必须有分号[semi-spacing](http://eslint.org/docs/rules/semi-spacing)
* 【分号】不允许有多余的分号[no-extra-semi](http://eslint.org/docs/rules/no-extra-semi)
* 【换行】每个独立语句结束后必须换行
* 【空行】函数之间必有空行
* 【空行】逻辑上分隔的部分要有空行
* 【空行】在文件结尾处要有空行
* `,` 和 `;` 不能出现在行首，且前面不允许有空格
* 每行不得超过 `80` 个字符，超长的不可分割的代码允许例外，如：复杂的正则表达式
* 文件最末尾保留一行空行[eol-last](http://eslint.org/docs/rules/eol-last)

### 变量声明

* 一个`let/const`只声明一个变量
* 即用即声明，在使用前离使用位置较近的位置声明
* 上下紧邻的生命，在垂直方向上对齐等号`=`，如下方模块引用。

### 一元运算符

* 操作符与操作数之间 无 空格

```js
num++;
num--;
++num;
--num;
+num;
-num;
~num;
!num;
```

* 操作符与操作数之间 有 空格

```js
delete {}.__proto__;
void 0;
typeof {};
```

### 二元操作符 `+ - * / += -= *= /=`

* 二元运算符与操作对象之间允许有空格

```js
const str = 'Foo' + 'Bar';
```

### 三元运算符 `? :`

* 三元运算符由3部分组成，因此其换行应当根据每个部分的长度不同，形成不同的情况。

```js
const result = condition ? resultA : resultB;

const result = thisIsAVeryVeryLongCondition
  ? resultA : resultB;

const result = condition
  ? thisIsAVeryVeryLongResult
  : resultB;
```

### 逗号

所有逗号都遵循相同的规则，逗号左侧无空格，逗号右侧除了行尾都有空格，逗号不出现在行首

description|eslint rules
-----------|-------------
逗号整体约束风格|[comma-style](http://eslint.org/docs/rules/comma-style)
变量声明中的逗号|[comma-spacing](http://eslint.org/docs/rules/comma-spacing)
对象属性间的括号|[comma-dangle](http://eslint.org/docs/rules/comma-dangle)悬挂的括号


### 括号 圆括号`()` 方括号`[]` 花括号`{}`

* 紧贴`()`部分不允许有空格
* 紧贴`[]`部分不允许有空格
* 计算属性 两侧不允许出项空格 [computed-property-spacing](http://eslint.org/docs/rules/computed-property-spacing)

### 代码块 `{}`

* `ReservedWord () {}` 或 `function name() {}`

ReservedWord：`if / else / for / while / function / switch / do / try / catch / finally ...`

description|eslint rules
-----------|-------------
[]|`ReservedWord (` 之间必须有空格
[]|`) {` 必须在同一行，必须有空格
[]|`}` 之后必须有空行
[]|单行语句时 `{}` 不能省略

[brace-style](http://eslint.org/docs/rules/brace-style)|始终使用代码块，且代码块的左括号 { 不出现在行首
[block-spacing](http://eslint.org/docs/rules/block-spacing)|紧贴`{}`部分必须有空格
[brace-style](http://eslint.org/docs/rules/brace-style)|果通过`if-else`使用多行代码块，把`else`放在`if`代码块关闭括号的同一行

### 函数 `function name() {}`

* `IIFE` 必须在函数表达式外添加 `(`。**IIFE = Immediately-Invoked Function Expression**

* 一个函数的长度控制在 **80行** 以内，最好是一屏（50行）以内。

* 一个函数的参数控制在 `6` 个以内。
* 必选参数必须占用一个参数位，通过 `options` 参数传递非数据输入型参数。
* 可选参数统一使用 `options` 命名。
* 回掉函数统一使用 `callback` 或 `done` 命名。

* 多级回掉，由内而外，每层增加一个 `c` 或 `cb`.

```js
cb(ccb(cccb(ccccb())));
//或
cb(ccbb(cccbbb(ccccbbbb())));
```

* 定义一个空函数的常量，供多处使用共享, 如使用 `_.noop`

```js
const EMPTY_FUNCTION = function () {};

function MyClass() {
}

MyClass.prototype.abstractMethod = EMPTY_FUNCTION;
MyClass.prototype.hooks.before = EMPTY_FUNCTION;
MyClass.prototype.hooks.after = EMPTY_FUNCTION;
```

* 链式调用 [newline-per-chained-call](http://eslint.org/docs/rules/newline-per-chained-call)

### 字符串

* 全部使用单引号，除了JSON字符串
* 字符串是其他语言语句时，如SQL、HTML，按照其他语言语法缩进，及采用合适的大小写规范。
* 多行字符串使用+号连接，也可以使用数组join，不采用 续行符 `\\` 连接。

```js
// 使用数组拼接字符串
// 推荐换行开始并缩进开始第一个字符串, 对齐代码, 方便阅读.
const str1 = [
  '<ul>',
  '  <li>第一项</li>',
  '  <li>第二项</li>',
  '</ul>'
].join('');

// 使用 + 拼接字符串
// 建议第一个为空字符串, 第二个换行开始并缩进开始, 对齐代码, 方便阅读
const str2 = ''
  + '<ul>',
  + '  <li>第一项</li>',
  + '  <li>第二项</li>',
  + '</ul>';

// 使用模板字符串
const str3 = `
  <ul>
    <li>${item1}</li>
    <li>${item2}</li>
  </ul>
`

// 不建议使用以下方式
// 使用 + 拼接字符串
const str4 =
   '<ul>\
    <li>第一项</li>\
    <li>第二项</li>\
   </ul>';
```

### 对象

description|eslint rules
-----------|-------------
对象属性中的 “:” 之后必须有空格，“:” 之前不允许有空格|
如果对象的所有 `属性` 都不需要引号，则所有 `属性` 禁止添加引号|
如果对象的某个 `属性` 需要添加引号，则所有 `属性` 必须添加引号|
优先使用 `.`访问属性|
使用`[]`访问属性时，无空格|[computed-property-spacing](http://eslint.org/docs/rules/computed-property-spacing)
成员方法固定使用self引用this|[consistent-this](http://eslint.org/docs/rules/consistent-this)

* 垂直方向对齐增强可读性

```js
const opts = {
  resave            : true,
  secret            : false,
  saveUninitialized : false
}
```

### 数组

* 数组内，侧紧贴括号的位置不允许添加空格 [array-bracket-spacing](http://eslint.org/docs/rules/array-bracket-spacing)

### 过长行拆分方式，超过80字符

* 字符串过长时，拆分时尽量按语义进行，不要在一个完整的名词中间断开，有语法结构的字符串，保持语法缩进

* 参数过多时，可将每个参数独立写在一行上，并将结束的右括号 ) 独立一行

```js
// 当参数过多时，将每个参数独立写在一行上，并将结束的右括号 ) 独立一行。
// 所有参数必须增加一个缩进。

foo(
  aVeryVeryLongArgument,
  anotherVeryLongArgument,
  callback
);

// 也可以按逻辑对参数进行组合
baidu.format(
  dateFormatTemplate,
  year, month, date, hour, minute, second
);
```

* 较复杂的逻辑条件组合，将每个条件独立一行，运算符处换行时，运算符必须在新行的行首，将 `) {` 放在独立一行，容易视觉辨识。

```js
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);
```


## 语言规范

Node.js优先使用ES6更佳简介的新语法，但不是全部。

### 严格模式

* 必须使用'use strict'

### 变量声明

* 使用 const/let 声明变量，使用 const 声明常量

```js
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```

块作用域：

```js
// const and let only exist in the blocks they are defined in.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```


* 使用 const/let 声明每一个变量。这样做的好处是增加新变量将变的更加容易，而且你永远不用再担心调换错 ; 跟 ,。

```js
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// （跟上面的代码比较一下，看看哪里错了）
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

* 最后再声明未赋值的变量。当你需要引用前面的变量赋值时这将变的很有用。

```js
// bad
const i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
const i;
const items = getItems();
const dragonball;
const goSportsTeam = true;
const len;

// good
const items = getItems();
const goSportsTeam = true;
const dragonball;
const length;
const i;
```

* 尽量避免修改外部传入的对象

```js
// Right
const obj = {};

// Wrong
const obj = new Object();
```

* 不允许修改和扩展任何原生对象和宿主对象及其原型

```js
// 以下行为绝对禁止
String.prototype.trim = function trim() {
};
```

* 使用数组字面量 `[]` 创建新数组，除非想要创建的是指定长度的数组

```js
// Right
const arr = [];

// Wrong
const arr = new Array();
```

* 遍历数组不使用 `for in`。

```js
const arr = ['a', 'b', 'c'];
arr.other = 'other things'; // 这里仅作演示, 实际中应使用Object类型

// 正确的遍历方式
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(i);
}

// 错误的遍历方式
for (i in arr) {
  console.log(i);
}
```

### 对象 {}

* 使用对象字面量 `{}` 创建新 `Object`

```
// bad
const item = new Object();

// good
const item = {};
```

* 不要使用保留字作为键名
* 使用同义词替换需要使用的保留字

```js
// bad
const superman = {
  default: { clark: 'kent' },
  private: true
};

// good
const superman = {
  defaults: { clark: 'kent' },
  hidden: true
};
```

```js
// bad
const superman = {
  class: 'alien'
};

// bad
const superman = {
  klass: 'alien'
};

// good
const superman = {
  type: 'alien'
};
```

* 使用简短方式定义对象方法

```js
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

* 使用简短方式命名对象属性

```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```


* 不直接调用 `Object.prototype` 上面的方法，如 `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`.

```js
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
/* or */
const has = require('has');
// …
console.log(has.call(object, key));
```


### 数组 []

* 使用直接量创建数组。

```js
// bad
const items = new Array();

// good
const items = [];
```

* 向数组增加元素时使用 Array#push 来替代直接赋值

```js
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

* 当你需要拷贝数组时，使用 Array#slice。[jsPerf](https://jsperf.com/converting-arguments-to-an-array/7)

```js
const len = items.length;
const itemsCopy = [];
const i;

// bad
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
itemsCopy = items.slice();

// good
itemsCopy = [...items];
```

* 使用 Array#from 将类数组对象转换成数组

```js
// bad
function trigger() {
  const args = Array.prototype.slice.call(arguments);
  // ...
}

// good
function trigger() {
  const args = Array.from(arguments);
  // ...
}

const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

* 在所有数组方法的回掉函数中使用return

```js
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => x + 1);

// bad
const flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  flat[index] = flatten;
});

// good
const flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  flat[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```

### 字符串

```js
// bad
const name = "Bob Parr";

// good
const name = 'Bob Parr';

// bad
const fullName = "Bob " + this.lastName;

// good
const fullName = 'Bob ' + this.lastName;
```

* 超过 80 个字符的字符串应该使用连接符写成多行。
* 注：若过度使用，通过连接符连接的长字符串可能会影响性能。jsPerf & 讨论.

```js
// bad
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// good
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
```

* 程序化生成的字符串使用 Array#join 连接而不是使用连接符

```js
const items;
const messages;
const length;
const i;

messages = [{
  state: 'success',
  message: 'This one worked.'
}, {
  state: 'success',
  message: 'This one worked as well.'
}, {
  state: 'error',
  message: 'This one did not work.'
}];

length = messages.length;

// bad
function inbox(messages) {
  items = '<ul>';

  for (i = 0; i < length; i++) {
    items += '<li>' + messages[i].message + '</li>';
  }

  return items + '</ul>';
}

// good
function inbox(messages) {
  items = [];

  for (i = 0; i < length; i++) {
    // use direct assignment in this case because we're micro-optimizing.
    items[i] = '<li>' + messages[i].message + '</li>';
  }

  return '<ul>' + items.join('') + '</ul>';
}
```

* 使用模板字符串代替拼接字符串，增强可读性

```js
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```


### 条件判断

* 优先使用 **===** 和 **!==** 而不是 **==** 和 **!=**.

* 复杂条件判断独立出语义清晰的函数，如：isNull、isNaN、isUndefined、isAdmin等

```js
// null 或 undefined
if (isNull(null)) {
  // ......
}

// Wrong
if (noValue == null) {
  // ......
}

if (noValue === null || typeof noValue === 'undefined') {
  // ......
}
```

* 使用简洁的表达式

```js
// 布尔不成立
// Right
if (!notTrue) {
  // ......
}

// Wrong
if (notTrue === false) {
  // ......
}

// bad
if (name !== '') {
  // ...stuff...
}

// good
if (name) {
  // ...stuff...
}

// bad
if (collection.length > 0) {
  // ...stuff...
}

// good
if (collection.length) {
  // ...stuff...
}
```

* 相同变量或表达式的多值条件，用 `switch` 代替 `if`，且按执行频率排列 `switch-case` 分支的顺序

```js
// Right
switch (typeof variable) {
  case 'object':
    // ......
    break;
  case 'number':
  case 'boolean':
  case 'string':
    // ......
    break;
}

// Wrong
const type = typeof variable;
if (type === 'object') {
  // ......
}
else if (type === 'number' || type === 'boolean' || type === 'string') {
  // ......
}
```

* 如果函数或全局中的 `else` 块后没有任何语句，删除 `else`。

```js
// Right
function getName() {
  if (name) {
    return name;
  }
  return 'unnamed';
}

// Wrong
function getName() {
  if (name) {
    return name;
  }
  else {
    return 'unnamed';
  }
}
```

### 循环

* 不要在循环体中包含函数表达式，事先将函数提取到循环体外
* 对循环内多次使用的不变值，在循环外用变量缓存

```js
// Right
function clicker() {}
const width = wrap.offsetWidth + 'px';
for (let i = 0, len = elements.length; i < len; i++) {
  const element = elements[i];
  element.style.width = width;
  addListener(element, 'click', clicker);
}

// Wrong
for (let i = 0, len = elements.length; i < len; i++) {
  const element = elements[i];
  element.style.width = wrap.offsetWidth + 'px';
  addListener(element, 'click', function () {});
}
```

* 对有序集合进行遍历时，使用`for-of`。

```js
// ES6+
for (let ele of elements) {
  // ...
}
// or Cache length
for (let i = 0, len = elements.length; i < len; i++) {
  const element = elements[i];
  // ......
}
```

### 函数

* 不要保存 this 的引用。使用 Function#bind。

```js
// bad
function () {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function () {
  const that = this;
  return function () {
    console.log(that);
  };
}

// bad
function () {
  const _this = this;
  return function () {
    console.log(_this);
  };
}

// good
function () {
  return function () {
    console.log(this);
  }.bind(this);
}
```

* 使用命名函数表达式，给函数命名，便于追踪堆栈

```js
// bad
const foo = function () {
};

// bad
function foo() {
}

// good
const foo = function bar() {
};
```

* 不在 block 内部定义函数

```js
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

* 不使用 arguments 做参数

```js
// bad
function nope(name, options, arguments) {
  // ...stuff...
}

// good
function yup(name, options, args) {
  // ...stuff...
}
```

* Never use arguments, opt to use rest syntax ... instead. eslint: prefer-rest-params。

> Why? ... is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like arguments.

```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

* 使用默认参数语法，默认参数放在最后

```js
// really bad
function handleThings(opts) {
  // No! We shouldn't mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

```js
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

* 不适用Function构造函数

```js
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

* 不修改参数 和 重新赋值，容易产生副作用

```js
// bad
function f1(obj) {
  obj.key = 1;
};

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
};
```

```js
// bad
function f1(a) {
  a = 1;
}

function f2(a) {
  if (!a) { a = 1; }
}

// good
function f3(a) {
  const b = a || 1;
}

function f4(a = 1) {
}
```

* Prefer the use of the spread operator ... to call variadic functions.

```js
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 08, 05]));

// good
new Date(...[2016, 08, 05]);
```

### 构造函数

* 禁止覆盖原型！

```js
function Jedi() {
  console.log('new jedi');
}

// bad
Jedi.prototype = {
  fight: function fight() {
    console.log('fighting');
  },

  block: function block() {
    console.log('blocking');
  }
};

// good
Jedi.prototype.fight = function fight() {
  console.log('fighting');
};

Jedi.prototype.block = function block() {
  console.log('blocking');
};
```

* 方法可以返回 this 来实现方法链式使用

* 写一个自定义的 toString() 方法是可以的，但是确保它可以正常工作且不会产生副作用。

```js
function Jedi(options) {
  options || (options = {});
  this.name = options.name || 'no name';
}

Jedi.prototype.getName = function getName() {
  return this.name;
};

Jedi.prototype.toString = function toString() {
  return 'Jedi - ' + this.getName();
};
```

### 对象解构

> Why? Destructuring saves you from creating temporary references for those properties.

* Use object destructuring when accessing and using multiple properties of an object.

```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

* 数组结构

```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

* 返回值使用对象解构

```js
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);
```

### 闭包

* 在适当的时候将闭包内大对象置为 `null`

    在 JavaScript 中，无需特别的关键词就可以使用闭包，一个函数可以任意访问在其定义的作用域外的变量。

    闭包会阻止一些变量的垃圾回收，对于较老旧的JavaScript引擎，可能导致外部所有变量均无法回收。

    如果有 **非常庞大** 的对象，且预计会在 **老旧的引擎** 中执行，则使用闭包时，注意将闭包不需要的对象置为空引用。


### 类型转换

* 转换成 `boolean` 时，使用 `!!`。
* 转换成 `string` 时，使用 `+ ''`
* 转换成 `number` 时，通常使用 `+`。 此处需注意`Number()``parseInt()`等函数的区别。
* `string` 转换成 `number`，要转换的字符串结尾包含非数字并期望忽略时，使用 `parseInt`。
* 数字去除小数点，使用 `Math.floor / Math.round / Math.ceil`，不使用 `parseInt`。

```js
// Right
num + '';
// Wrong
new String(num);
num.toString();
String(num);

// Right
+str;
// Wrong
Number(str);

const width = '200px';
parseInt(width, 10);

const num = 3.14;
!!num;

// Right
const num = 3.14;
Math.ceil(num);
// Wrong
const num = 3.14;
parseInt(num, 10);
```


### 动态特性

* 尽量避免使用 `eval` 函数，如果有动态代码执行的需求，建议使用 `new Function()`。

```js
const handler = new Function('x', 'y', 'return x + y;');
const result = handler($('#x').val(), $('#y').val());
```

* 禁止使用`with`。

* 减少 `delete` 的使用，`delete` 可能产生的异常。

```js
try {
  delete o.x;
}
catch (deleteError) {
  o.x = null;
}
```
