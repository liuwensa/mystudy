'use strict';

const request = require('request');
const retry = require('retry');

// options配置

// retries:最大重试次数，默认10
// factor:指数因子使用，默认2
// minTimeout: 第一次重试前等待时间，默认1000ms
// maxTimeout: 间隔两次重试的等待时间，默认Infinity
// randomize: 随机化超时时间，默认false


// 超时计算公式

// Math.min(random * minTimeout * Math.pow(factor, attempt), maxTimeout);


// retry.operation([options]): 创建一个RetryOperation对象
// retry.timeouts([options]): 返回一个超时列表，所有时间都是毫秒
// new RetryOperation(timeouts): 创建RetryOperation对象
// retryOperation.errors(): 返回被retryOperation.retry()处理的，所有错误列表
// retryOperation.mainError(): 返回一个越多发生的错误对象
// retryOperation.attempt(fn, timeoutOps): 封装一个功能函数到retry，当出错后，会重试功能函数
// retryOperation.retry(error): 判断是否需要重试。error=true，要重试，error=false，不要重试
// retryOperation.attempts(): 返回已重试次数

function get(url, cb) {
  const options = {
    url: url,
    method: 'GET'
  };
  
   request(options, (err, res, content) => {
     if (err || res.statusCode !== 200) {
       console.log('err', err);
       return cb(err);
      } else {
        console.log('-------------');
        return cb(null, content);
      }
    });
}

function retryGet(url, cb) {
    const operation = retry.operation();
    operation.attempt(function (currentAttempt) {
        console.log(`Connect Times:${currentAttempt}:${url}`);
        get(url, function (err) {
            if (operation.retry(err)) {
                return;
            }
            cb(err ? operation.mainError() : null);
        });
    });
}

const baidu = 'http://www.baidu.com';
retryGet(baidu, (err, result) => {
  console.log(err, result);
});
