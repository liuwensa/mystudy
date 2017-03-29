#  `Gulp`优化`JS`、优化`CSS`、优化图片

`Gulp.js`是一个自动化构建工具，你可以用它在项目中自动执行常见任务，如：压缩优化JS、压缩CSS、压缩图片等。与`Grunt`相比，`Gulp`编写任务`tasks`更加简单，也更易于阅读和维护，插件高质而简洁。`Gulp.js`基于`Node.js`构建，利用`Node.js`的`Stream`流，使项目可以快速构建并减少 IO 操作。

## 1. 安装`Gulp`

`gulp`的任务处理机制是，将来源档案当作输入，通过`Node.js`的`Stream`操作流，并将流导向`gulp`的任务处理插件`plugins`，处理完成后将结果输出到指定输出目录。

从`gulp`的任务处理机制可以看出，`gulp`相当于一个任务管理器，而实际的业务处理是由其插件完成的。因此，`gulp`的安装也包括：安装`gulp`和安装`gulp`任务插件两部分。


### 1.1 安装`Gulp`

安装`gulp`，你可以选择全局安装或安装在项目的`dev`开发环境下。

全局安装`gulp`：

    npm install gulp -g

在项目的`dev`开发环境中安装：

    npm install gulp --save-dev

建议对`gulp`使用全局安装，这样可以在所有项目中使用。全局安装对于非`Node.js`项目尤为适用。

### 1.2 安装`Gulp`插件

`gulp`插件的安装，也可以使用全局安装或安装在`dev`开发环境。`gulp`插件可以按需安装，如果你只需要处理`CSS`，那么只安装`CSS`相关处理插件即可。`gulp`的所有插件请参考：[Gulp插件](http://gulpjs.com/plugins/)。对于`CSS`文件处理、`JS`文件处理、图片处理，你可能需要以下插件：

- `gulp-ruby-sass`：基于`ruby`和`sass`的`Sass`文件编译，可将`Sass`文件为`CSS`文件
- `gulp-autoprefixer`：`Autoprefixer`，可以解析`CSS`文件，并且添加浏览器前缀到`CSS`规则里
- `gulp-minify-css`：`CSS`文件压缩工具
- `gulp-jshint`：`JSHint`，一个`JS`代码检查工具，可以检测`JavaScript`中错误和潜在问题
- `gulp-uglify`：`uglify`，`JS`代码优化工具，可用于压缩和美化（或者叫“丑化”）`JavaScript`代码
- `gulp-concat`：文件拼接工具，可用于多个`CSS`文件或多个`JS`文件的合并
- `gulp-imagemin`：`imagemin`，图片压缩工具

一般来说上面介绍的插件可以满足一般前端资源的处理，比如：`less`和`sass`文件的编译、`CSS`文件的合并压缩、JS文件的合并压缩、图片的压缩。在日常工作中，你可能还需要一些处理，像执行`gulp`任务前清理目录、服务端资源的监控、只针对变更资源的处理等，下面的一些插件可能会用到：

- `gulp-clean`：目标目录清理，在用于gulp任务执行前清空目标目录
- `gulp-cache`：资源缓存处理，可用于缓存已压缩过的资源，如：图片
- `gulp-notify`：任务通知工具，可用于某项任务执行完成的在控制台输出通知
- `gulp-livereload`：服务器资源监控，当服务端资源变化时对页面进行刷新。需要要配合浏览器插件使用或在页面这样处理，使用比较复杂，非必要时不推荐使用

在dev开发环境下安装这些插件：

```
npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-clean gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
```

## 2. 使用`Gulp`

### 2.1 `gulp`一些常用的`API`

要深入了解`gulp`，建议查看其[官方文档](http://www.gulpjs.com.cn/)。对于一般使用`gulp`，了解下面几个`API`，即可满足日常需求：

- `gulp.task()`：方法用来定义任务，内部使用的是[Orchestrator](https://github.com/robrich/orchestrator)
- `gulp.src()`：`gulp`是基于`Node.js`的流进行任务转接及处理的，`gulp.src()`用于引入流，即：读取要操作的文件。可以是下面几种：
 - `/public/js/index.js`：指定的一个文件
 - `/public/js/*.js`：某个目录下的所有文件
 - `/public/**/*.js`：目录下及其所有子目录下的所有`js`文件
 - `!/public/js/main.js`：某个目录下，除`main.js`以外的所有`js`文件
 - `*.+(js|css)` : 正则表达式匹配根目录下扩展名是`js`和`css`的所有文件
- `gulp.dest()`：在指定路径输出文件。只能对其指定路径，而不能对输出文件重命名，重命名可以使用插件`gulp-rename`
- `gulp.watch()`：监视文件的变化（如：`CSS`、`JS`、图片），当文件发生变化后，我们可以利用它来执行相应的任务

### 2.2 gulp使用示例

本示例以一个`Node.js`项目为示范，项目使用`express`Web框架，在`express`中项静态资源是放在`public`目录下的。在全局安装`gulp`及相关插件后，创建`gulpfile.js`文件，文件在项目根目录下, `gulpfile.js`文件内容如下：

```
var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

// 样式处理任务
gulp.task('styles', function() {  
  return gulp.src('public/html/css/*.css')    //引入所有CSS
    .pipe(concat('main.css'))           //合并CSS文件
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/dist/css'))      //完整版输出
    .pipe(rename({ suffix: '.min' }))   //重命名
    .pipe(minifycss())                  //CSS压缩
    .pipe(gulp.dest('public/dist/css'))      //压缩版输出
    .pipe(notify({ message: '样式文件处理完成' }));
});

// 如果需要通过scss文件编译css，就使用这段代码
// gulp.task('styles', function() {  
//   return gulp.src('public/html/css/main.scss')
//     .pipe(sass({ style: 'expanded', }))
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest('public/dist/styles'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest('public/dist/styles'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// JS处理任务
gulp.task('scripts', function() {  
  return gulp.src('public/html/js/*.js')      //引入所有需处理的JS
    .pipe(jshint.reporter('default'))         //S代码检查
    .pipe(concat('main.js'))                  //合并JS文件
    .pipe(gulp.dest('public/dist/js'))        //完整版输出
    .pipe(rename({ suffix: '.min' }))         //重命名
    .pipe(uglify())                           //压缩JS
    .pipe(gulp.dest('public/dist/js'))        //压缩版输出
    .pipe(notify({ message: 'JS文件处理完成' }));
});

// 图片处理任务
gulp.task('images', function() {  
  return gulp.src('public/html/img/*')        //引入所有需处理的JS
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))      //压缩图片
    // 如果想对变动过的文件进行压缩，则使用下面一句代码
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))) 
    .pipe(gulp.dest('public/dist/img'))
    .pipe(notify({ message: '图片处理完成' }));
});

// 目标目录清理
gulp.task('clean', function() {  
  return gulp.src(['public/dist/css', 'public/js', 'public/img'], {read: false})
    .pipe(clean());
});

// 预设任务，执行清理后，
gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts', 'images');
});

// 文档临听
gulp.task('watch', function() {

//  // 监听所有.scss文档
//   gulp.watch('src/styles/**/*.scss', ['styles']);

    // 监听所有css文档
    gulp.watch('public/html/css/*.css', ['styles']);

    // 监听所有.js档
    gulp.watch('public/html/js/*.js', ['scripts']);

    // 监听所有图片档
    gulp.watch('public/html/img/*', ['images']);

//   // 创建实时调整服务器 -- 在项目中未使用注释掉
//   var server = livereload();
//   // 监听 dist/ 目录下所有文档，有更新时强制浏览器刷新（需要浏览器插件配合或按前文介绍在页面增加JS监听代码）
//   gulp.watch(['public/dist/**']).on('change', function(file) {
//     server.changed(file.path);
//   });

});
```

执行`gulp`命令前，`public`目录结构是下面这样的：

```
|____public
| |____html
| | |____css
| | | |____ 一些CSS文件……
| | |____ js
| | | |____ 一些CJS文件……
| | |____ img
| | | |____ 一些图片……
| | |____ 一些HTML页面……
```

在项目根目录下，执行命令：

```
gulp
```

执行`gulp`命令后，`public`目录结构是下面这样的：

```
|____public
| |____dist
| | |____css
| | | |____ main.css
| | | |____ main.min.css
| | |____ js
| | | |____ main.js
| | | |____ main.min.js
| | |____ img
| | | |____ 压缩后的图片
| | |____ 一些HTML页面……
| |____html
| | |____css
| | | |____ 一些CSS文件……
| | |____ js
| | | |____ 一些CJS文件……
| | |____ img
| | | |____ 一些图片……
| | |____ 一些HTML页面……
```

`gulp`操作成功，文件被输出到了`publi/dist`目录下，`CSS`和`JS`文件都有完整版和压缩版两个，图片也经过了压缩处理。如果需要进行其它处理，可自行修改`gulpfile.js`文件代码。