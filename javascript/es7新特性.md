# ES7新特性

## 指数操作符

使用**操作符作为中缀来实现指数操作：

    x ** y

产生的结果等同于

    Math.pow(x, y)

例如：

    let squared = 3 ** 2; // 9
    let num = 3;
    num **= 2;
    console.log(num); // 9

## 数组方法includes

    > ['a', 'b', 'c'].includes('a');
    ture
    
    > ['a', 'b', 'c'].includes('d');
    false

includes()能否发现NaN

    > [NaN].includes(NaN)
    true

## 异步函数`async/await`

### `async`和`await`在干什么

`async`用于申明一个`function`是异步的，而`await`用于等待一个异步方法执行完成。

`await`只能出现在`async`函数中。

`await`表示在这里等待`promise`返回结果了，再继续执行。

一般来说，都认为`await`是在等待一个`async`函数完成。 `await`等待的是一个表达式，这个表达式的计算结果是`Promise`对象或者其它值。
如果它等到的不是一个`Promise`对象，那`await`表达式的运算结果就是它等到的东西。
如果它等到的是一个`Promise`对象，`await`就忙起来了，它会阻塞后面的代码，等着`Promise`对象`resolve`，然后得到`resolve`的值，作为await表达式的运算结果。

### `async`函数的用法
`async`函数返回一个`Promise`对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。
下面是一个例子。

    async function getStockPriceByName(name) {
      var symbol = await getStockSymbol(name);
      var stockPrice = await getStockPrice(symbol);
      return stockPrice;
    }
    
    getStockPriceByName('goog').then(function (result){
      console.log(result);
    });

上面代码是一个获取股票报价的函数，函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。
下面的例子，指定多少毫秒后输出一个值。

    function timeout(ms) {
      return new Promise((resolve) => {
    	setTimeout(resolve, ms);
      });
    }
    
    async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value)
    }
    
    asyncPrint('hello world', 50);
    
上面代码指定50毫秒以后，输出"hello world"。

### 注意点
`await`命令后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中。

    async function myFunction() {
      try {
		await somethingThatReturnsAPromise();
      } catch (err) {
    	console.log(err);
      }
    }
    
    // 另一种写法
    
    async function myFunction() {
      await somethingThatReturnsAPromise().catch(function (err){
    	console.log(err);
      });
    }

`await`命令只能用在`async`函数之中，如果用在普通函数，就会报错。

    async function dbFuc(db) {
      let docs = [{}, {}, {}];
    
      // 报错
      docs.forEach(function (doc) {
    	await db.post(doc);
      });
    }
    
上面代码会报错，因为 `await` 用在普通函数之中了。但是，如果将`forEach`方法的参数改成`async`函数，也有问题。

    async function dbFuc(db) {
      let docs = [{}, {}, {}];
    
      // 可能得到错误结果
      docs.forEach(async function (doc) {
    	await db.post(doc);
      });
    }
    
上面代码可能不会正常工作，原因是这时三个 db.post 操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用 for 循环。

    async function dbFuc(db) {
      let docs = [{}, {}, {}];
    
      for (let doc of docs) {
    	await db.post(doc);
      }
    }

如果确实希望多个请求并发执行，可以使用 Promise.all 方法。

    async function dbFuc(db) {
      let docs = [{}, {}, {}];
      let promises = docs.map((doc) => db.post(doc));
    
      let results = await Promise.all(promises);
      console.log(results);
    }
    
    // 或者使用下面的写法
    
    async function dbFuc(db) {
      let docs = [{}, {}, {}];
      let promises = docs.map((doc) => db.post(doc));
    
      let results = [];
      for (let promise of promises) {
    	results.push(await promise);
      }
      console.log(results);
    }
    