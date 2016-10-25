#利用 ESLint 检查代码质量

在团队协作中，为避免低级 Bug、产出风格统一的代码，会预先制定编码规范。ESLint 是一个插件化的 javascript 代码检测工具，它可以用于检查常见的 JavaScript 代码错误，也可以进行代码风格检查，这样我们就可以根据自己的喜好指定一套 ESLint 配置，然后应用到所编写的项目上，从而实现辅助编码规范的执行，有效控制项目代码的质量。


##ESLint简介

ESLint 主要有以下特点：

- 默认规则包含所有 `JSLint`、`JSHint` 中存在的规则，易迁移；
- 规则可配置性高：可设置「警告」、「错误」两个 `error` 等级，或者直接禁用；
- 包含代码风格检测的规则（可以丢掉 `JSCS` 了）；
- 支持插件扩展、自定义规则。

##验证规则

验证规则是写在 `.eslintrc` 文件中的 `rules` 下面的，如

    "rules": {
      "indent": ["error", 2],
      "no-mixed-spaces-and-tabs": "error"
      "camelcase": "error"
    }

配置一条验证规则，这么写

    规则名: 值

值可以是以下几种

- off 或 0：表示不验证规则。
- warn 或 1：表示验证规则，当不满足时，给警告。
- error 或 2 ：表示验证规则，不满足时报错。

如

    "eqeqeq": "error",
    "camelcase": 2

如果规则有参数，则这么写

    规则名: [值, 参数1, 参数2...]

如

	"indent": ["error", 2]

###常见规则

- `indent`： 代码缩进。参数有

	- 数字: 表示缩进的空格数。如 `indent: ["error", 2]`。默认值是4。
	- `"tab"`: 表示用 `tab` 来缩进


- `no-mixed-spaces-and-tabs`： 代码缩进不能混用空格和tab。

- `camelcase`： 变量，函数名遵循驼峰命名法。参数有

	- `"always"`: 会检查属性名。是默认值。
	- `"never"`: 不检查属性名。
	

- `quotes`： 字符串的引号。我用配置是 `quotes: ["error", "single"]`。

- `curly`： 在 `if`，`else if`，`else` 或 `while` 的代码块中，即使只有一行代码，也要用写在`{}`中。

- `eqeqeq`： 比较用 `===` 或 `!==`。

- `no-cond-assign`： 不在 `if` 中使用赋值操作。

- `no-undef`： 变量和函数在使用前必须先声明。全局变量或函数除外。

- `no-unused-vars`：变量定义后会一定要被使用。

- `no-alert`： 代码不用 `alert`,`confirm` 和 `prompt`。系统的弹出框比较丑，一般都用自定义的弹出框。

- `max-params`： 函数最多有几个参数。默认是3个。

- `max-statements`： 函数最多有多少条语句。

- `max-depth`：代码块中默认嵌套深度。

更多的规则见[官网的说明](http://eslint.org/docs/rules/)。

如果觉得自己一条配置规则太麻烦，可以在 eslint 的默认推荐规则上做修改，如

    "extends": "eslint:recommended",// 启用 eslint 的默认推荐规
    "rules": {
    	// 新增的一些规则
    	"indent": ["error", 4],
    	"linebreak-style": ["error", "unix"],
    	"quotes": ["error", "double"],
    	"semi": ["error", "always"],
    
		// 覆盖一些规则的配置
    	"comma-dangle": ["error", "always"],
    	"no-cond-assign": ["error", "always"],
    
    	// 禁用一些规则
    	"no-console": "off",
    }

##配置

可以通过以下三种方式配置 ESLint:

- 使用 `.eslintrc` 文件（支持 `JSON` 和 `YAML` 两种语法）；
- 在 `package.json` 中添加 `eslintConfig` 配置块；
- 直接在代码文件中定义。

###.eslintrc 文件示例：
    {
      "env": {
		"browser": true,
      },
      "parserOptions": {
    	"ecmaVersion": 6,
    	"ecmaFeatures": {
      "jsx": true
    }
      },
      "globals": {
    	"angular": true,
      },
      "rules": {
    	"camelcase": 2,
    	"curly": 2,
    	"brace-style": [2, "1tbs"],
    	"quotes": [2, "single"],
    	"semi": [2, "always"],
    	"space-in-brackets": [2, "never"],
    	"space-infix-ops": 2,
      }
    }
`.eslintrc` 放在项目根目录，则会应用到整个项目；如果子目录中也包含 `.eslintrc` 文件，则子目录会忽略根目录的配置文件，应用该目录中的配置文件。这样可以方便地对不同环境的代码应用不同的规则。

###package.json 示例：

    {
      "name": "mypackage",
      "version": "0.0.1",
      "eslintConfig": {
    "env": {
      "browser": true,
      "node": true
    }
      }
    }

###文件内配置

代码文件内配置的规则会覆盖配置文件里的规则。

禁用 ESLint：

    /* eslint-disable */
    var obj = { key: 'value', }; // I don't care about IE8  
    /* eslint-enable */

禁用一条规则：

    /*eslint-disable no-alert */
    alert('doing awful things');  
    /* eslint-enable no-alert */

调整规则：

    /* eslint no-comma-dangle:1 */
    // Make this just a warning, not an error
    var obj = { key: 'value', } 



##NPM安装

    npm install -g eslint

新建个文件`test.js`：
    
    var xlsx = require('node-xlsx');
    var fs   = require('fs');
    
    var arr = xlsx.parse('./test.xlsx');
    
    console.dir(arr, {depth: null});
    //生成excel
    
    //首先按照上面arr的格式组成数组
    var buffer = xlsx.build(arr);
    //后面两种可能，
    //1.生成文件
    fs.appendFile("./new.xlsx", buffer, function (err) {
      console.log(err)
    });

    // ESLint 提供了多种临时禁用规则的方式，比如我们可以通过一条eslint-disable-next-line备注来使得下一行可以跳过检查
    
    // eslint-disable-next-line
    var a = 123;
    var b = 123;
    

首先新建 `ESLint` 配置文件`.eslintrc.js`：

    module.exports = {
    	// 内置的eslint:recommended配置，包含了一系列核心规则，能报告一些常见的问题。
      extends: 'eslint:recommended',
      // 指定程序的目标运行环境
      env: {
    	node: true,
      },
      rules: {
    	'no-console': 'off',
      },
    };

执行`eslint test.js`没有任何提示输出，说明通过检查。


##代码格式化

在[ESLint规则列表](http://eslint.cn/docs/rules/)页面，我们发现有些规则的旁边会带有一个橙色扳手图标，表示在执行eslint命令时指定--fix参数可以自动修复该问题。

    eslint test.js --fix

执行完毕，没有发现任何提示。
我们可以利用这个特性来自动格式化项目代码，这样就可以保证代码书写风格的统一。


##工作流集成

ESLint 可以集成到主流的编辑器和构建工具中，以便我们在编写的代码的同时进行 lint。

###编辑器集成WebStorm

- 首先安装ESLint 

    `npm install eslint -g `

- 配置一下 .eslintrc 文件 放在项目根目录
    
- 配置忽略检测的文件 .eslintignore 配置

        \#是注释  根据自己的项目需要进行忽略
    	\#如果 .eslintrc 开启了 env  nodejs 那么 默认 node_modules是自动忽略的
    	node_modules
    	/node_modules/**
    	*.sh
    	test
    	test/**
		public


- 设置WebStorm
选择File | Settings | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint 勾选 Enable .
![](http://i.imgur.com/fanVSzs.png)

- WebStorm中eslint已经可以工作了，可以自动提示指出的代码问题。

###gulp构建系统集成

- 首先安装gulp 

    `npm install -g gulp`

- 新建`gulpfile.js`

        'use strict';
    
    	const gulp = require('gulp');
    	const eslint = require('gulp-eslint');
    
    	gulp.task('lint', () => {
      	return gulp.src('**/*.js')
    		.pipe(eslint())
    		.pipe(eslint.format());
    	});

	安装依赖 `npm install gulp-eslint --save-dev `
    
- 运行gulp
	1.  `gulp lint`
	2.  WebStorm中运行

WebStorm设置使用Unix换行符"LF"
![](http://i.imgur.com/PdPuWaT.png)