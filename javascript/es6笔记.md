## Number.EPSILON

ES6在Number对象上面，新增一个极小的常量`Number.EPSILON`。

引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。
我们知道浮点数计算是不精确的。但是如果这个误差能够小于Number.EPSILON，我们就可以认为得到了正确结果。

## Math对象的扩展
ES6在Math对象上新增了17个与数学相关的方法。所有这些方法都是静态方法，只能在Math对象上调用。

### Math.trunc()
Math.trunc方法用于去除一个数的小数部分，返回整数部分。

    Math.trunc(4.1) // 4
    Math.trunc(4.9) // 4
    Math.trunc(-4.1) // -4
    Math.trunc(-4.9) // -4
    Math.trunc(-0.1234) // -0

对于非数值，Math.trunc内部使用Number方法将其先转为数值。对于空值和无法截取整数的值，返回NaN。

    Math.trunc(NaN);  // NaN
    Math.trunc('foo');// NaN
    Math.trunc(); // NaN

### Math.sign()
Math.sign方法用来判断一个数到底是正数、负数、还是零。

它会返回五种值。

- 参数为正数，返回+1；
- 参数为负数，返回-1；
- 参数为0，返回0；
- 参数为-0，返回-0;
- 其他值，返回NaN。

### Math.cbrt()
Math.cbrt方法用于计算一个数的立方根。
对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值。

## 数组的扩展

### Array.from()
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

下面是一个类似数组的对象，Array.from将它转为真正的数组。

    let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
    };
    
    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
    
    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
    

### Array.of()
Array.of方法用于将一组值，转换为数组。

    Array.of(3, 11, 8) // [3,11,8]
    Array.of(3) // [3]
    Array.of(3).length // 1

这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。

    Array() // []
    Array(3) // [, , ,]
    Array(3, 11, 8) // [3, 11, 8]

上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于2个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

    Array.of() // []
    Array.of(undefined) // [undefined]
    Array.of(1) // [1]
    Array.of(1, 2) // [1, 2]

Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。


### 数组实例的find()和findIndex()

数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。


    [1, 5, 10, 15].find(function(value, index, arr) {
      return value > 9;
    }) // 10

上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

    [1, 5, 10, 15].findIndex(function(value, index, arr) {
      return value > 9;
    }) // 2

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

另外，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。

    [NaN].indexOf(NaN)
    // -1
    
    [NaN].findIndex(y => Object.is(NaN, y))
    // 0

上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。