# 使用node.js cheerio抓取网页数据

node.js在网页抓取方面的现成的Cheerio库， 它可以把html片断构建成DOM结构，然后提供像jquery一样的css选择器查询。然后知道常用的css选择器就可以分析网页，获取自己想要的信息了！

首先用npm来安装Cheerio这个库。 运行以下这条命令。

	npm install cheerio

一旦Cheerio安装完成， 我们就可以开始工作了。 首先让我们来看一段javascript代码 这段代码可以下载任意一个网页的内容。
 
	var http       = require('http');
	var iconv      = require('iconv-lite');
	var request    = require('request');
	var pool       = new http.Agent();
	
	//模拟各种头部参数
	var headers = {
	  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36'
	};
	
	//utf-8编码格式，带压缩
	function download(url, callback) {
	  request.get({
		url: url, 
		pool: pool, 
		headers: headers, 
		gzip: true
	}, function (err, res, data) {
	   if (err || !data || res.statusCode !== 200) {
	     callback(err, null);
	   } else {
		data = cheerio.load(data, {
            normalizeWhitespace: false,
            xmlMode            : false,
            decodeEntities     : false
        });
	     callback(null, data);
	   }
	 });
	}

	//需要主要网页是不是开启压缩，gzip参数控制，是否是utf8，不是许需要转码 data = iconv.decode(data, 'GBK');


上述代码即可获取网页的内容，接下来就可以根据css选择器有选择的获取我们自己想要的数据了。


# CSS的选择器

[参考地址](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
 
 


