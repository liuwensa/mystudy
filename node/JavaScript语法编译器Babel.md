# `JavaScript`语法编译器`Babel`

## `Babel`介绍
`Babel`是一个`JavScript`语言编译器（转码器），可以将下一代标准的`JavaScript`转换为符合`ES5`标准的`JavaScript`，从而可以在现有环境中执行。

例如，`Babel`能够将新的`ES6`箭头函数语法：

```
// 转码前
const square = n => n * n;

// 转码后
const square = function square(n) {
  return n * n;
};
```

不过`Babel`的用途并不止于此，它支持语法扩展，能支持`React`的`JSX语法`和`Flux框架`，通过`Babel`的`babel-preset-react`插件，可以实现对`React`相关语法的转换。

`Babel`使用插件机制，你可以使用现有的插件或自己编写插件来构建转换管道，可扩展性强。

`Babel`提供了各种各样的使用方式，你可以使用它的`CLI`命令行模块单独转换，也可以结合`Browserify`、`Gulp`等构建工具使用。

## 创建`.babelrc`配置文件

`Babel`的配置文件是`.babelrc`，存放在项目的根目录下，使用`Babel`的第一步，就是配置这个文件。
该文件用来配置一些转码规则和插件，格式如下。

```
{
  "presets": [],
  "plugins": []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

然后添加进`.babelr`c配置文件。

```
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

注意，以下所有`Babel`工具和模块的使用，都必须先写好`.babelrc`。

## 命令行转码`babel-cli`

`Babel`的`CLI`是一种在命令行下使用`Babel`转码。

全局安装命令如:

```
npm install --g babel-cli

```

你可以全局安装`babel-cli`，但更推荐安装在当前项目中,原因如下:
1. 不同的项目可能需要使用不同版本的`Babel`，可以有选择的使用或者更新；
2. 这样项目对环境没有隐式依赖，这让你的项目有很好的可移植性并且易于安装。

```
npm install --save-dev babel-cli

```

安装完成后`package.json`文件：

```
{
  "name": "my-project",
  "version": "1.0.0",
  "devDependencies": {
    "babel-cli": "^6.0.0"
  }
}

```
然后，改写`package.json`文件：

```
{
  "name": "my-project",
  "version": "1.0.0",
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}

```

转码的时候，就执行下面的命令。

```
npm run build
```

基本用法

```
// 转码结果输出到标准输出
babel example.js

// 转码结果写入一个文件，--out-file 或 -o 参数指定输出文件
babel example.js --out-file compiled.js
//或者
babel example.js -o compiled.js

// 整个目录转码， --out-dir 或 -d 参数指定输出目录
babel src --out-dir lib
// 或者
babel src -d lib

// -s 参数生成source map文件
babel src -d lib -s
```

上面代码是在全局环境下，进行`Babel`转码。

## `babel-register`

`babel-register`方法只需要引入文件就可以运行`Babel`。这个模块改写`requir`e命令，为它加上一个钩子。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用`Babel`进行转码。

但请注意这种方法并不适合正式产品环境使用，正式服在部署之前预先编译会更好。原因是， `babel-register`只会对`require`命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。 不过用在构建脚本或是其他本地运行的脚本中是非常合适的。

安装`babel-register`

```
npm install --save-dev babel-register
```

使用时，必须首先加载`babel-register`。
在项目中创建`register.js`文件并添加如下代码

```
require('babel-register');
require('./index.js');
```

现在我们可以使用`register.js`来代替`node index.js`来运行了。

```
node register.js
```

然后，就不需要手动对`index.js`转码了。

## `babel-node`

`babel-cli`工具自带一个`babel-node`命令，它不用单独安装，而是随`babel-cli`一起安装，所以首先确保`babel-cli`已经安装，`npm install --save-dev babel-cli`，它提供一个支持ES6的m命令行运行环境。它支持`Node`的命令命令行运行环境的所有功能，而且可以直接运行`ES6`代码。

用`babel-node`来代替`node`进入命令行环境运行代码。

如果用`npm scripts`的话只需要这样做：

```
  {
    "scripts": {
	  "script-name": "babel-node script.js"
    }
  }
```

要不然的话你需要写全`babel-node`的路径。

```
./node_modules/.bin/babel-node script.js
```

## `babel-core`

如果你需要以编程的方式来使用`Babel`，可以使用`babel-core`这个包。

首先安装`babel-core`。

```
npm install babel-core
```
然后，在项目中就可以调用`babel-core`。

```
var babel = require('babel-core');

// 字符串转码
babel.transform("code();", options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile("filename.js", options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync("filename.js", options);
// => { code, map, ast }

// Babel AST（抽象语法树）转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }

```

配置对象`options`，可以参看官方文档http://babeljs.io/docs/usage/options/

## `babel-polyfill`

`Babel`几乎可以编译所有的新的`JavaScript`句法，但是它并不能转换新的`APIs`，比如`Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）。

比方说，下列含有箭头函数的需要编译的代码：

```
function addAll() {
  return Array.from(arguments).reduce((a, b) => a + b);
}

// 转码之后会变成这样：
function addAll() {
  return Array.from(arguments).reduce(function(a, b) {
    return a + b;
  });
}
```

然而，它依然无法随处可用因为不是所有的`JavaScript`环境都支持`Array.from`。

```
Uncaught TypeError: Array.from is not a function
```

为了解决这个问题，我们使用一种叫做`Polyfill`的技术。 简单地说，`polyfill`即是在当前运行环境中用来复制（意指模拟性的复制，而不是拷贝）尚不存在的原生`api`的代码。 能让你提前使用还不可用的`APIs`，`Array.from`就是一个例子。

要使用`babel-polyfill`，首先安装它：

```
npm install --save babel-polyfill
```

然后，在脚本头部，加入如下一行代码。

```
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

`Babel`默认不转码的`API`非常多，详细清单可以查看`babel-plugin-transform-runtime`模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

## `babel-runtime`

为了实现`ECMAScript`规范的细节，`Babel`会使用“助手”方法来保持生成代码的整洁。

由于这些助手方法可能会特别长并且会被添加到每一个文件的顶部，因此你可以把它们统一移动到一个单一的“运行时（`runtime`）”中去。

通过安装`babel-plugin-transform-runtime`和`babel-runtime`来开始。

```
npm install --save-dev babel-plugin-transform-runtime
npm install --save babel-runtime
```

然后更新`.babelrc`：

```
  {
    "plugins": [    
	  "transform-runtime",
      "transform-es2015-classes"
    ]
  }
```

现在，`Babel`会把这样的代码：

```
class Foo {
  method() {}
}
```

编译成：

```
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

let Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: "method",
    value: function method() {}
  }]);

  return Foo;
}();
```

这样就不需要把`_classCallCheck`和`_createClass`这两个助手方法放进每一个需要的文件里去了。

## 在`Gulp`中使用`Babel`

`Babel`提供了`gulp-babel`插件，这个插件是一个`Gulp`中间件，可以像其它`Gulp`插件使用。

在当前项目中安装`gulp-babel`命令如下：

```
npm install --save-dev gulp-babel
```

安装后，我们在可以`Gulp`的配置脚本`gulpfile.js`文件中配置如下：

```
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src('src/')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
```

当使用[gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps)时，配置如下：

```
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});
```

注意：在`Gulp`中使用`Babel`时，同样需要创建`.babelrc`配置文件。