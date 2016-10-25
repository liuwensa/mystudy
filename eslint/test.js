/**
 * Created by liuwensa on 2016/10/24.
 * */

'use strict';

// npm install node-xlsx
// 兼容office 2003的xls 和 2007的xlsx
const xlsx = require('node-xlsx');
const fs   = require('fs');
const arr  = xlsx.parse('./test.xlsx');

// console.dir(arr, {depth: null});

// 生成excel
// 首先按照上面arr的格式组成数组
const buffer = xlsx.build(arr);

// 后面两种可能，
// 1.生成文件

fs.appendFile('./new.xlsx', buffer, function (err) {
    console.log(err);
});

// //2下载文件
// res.type('application/vnd.openxmlformats').set('Content-Disposition', 'attachment; filename=yourname.xlsx');
// res.end(buffer, 'binary');
