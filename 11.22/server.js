/**
 * Created by wm.liu on 2017/11/22.
 */
'use strict';

var http = require('http');
var URL = require('url');
var Tool = require('./tool');
http.createServer(function (request, response) {
    if (/jsonp/.test(request.url)) {
        response.writeHead(200, {contentType: "application/json;charset=utf-8"});
        var urlObj = URL.parse(request.url);
        var queryObj = Tool.getQueryObj(urlObj.query); // 获取callback对应的参数名
        var data = {
            a: 1
        };
        data = JSON.stringify(data);
        var callback = queryObj["callback"] + '(' + data + ')';
        response.end(callback);
    } else {
        response.writeHead(200, {
            contentType: 'application:json;charset=utf8',
            'Access-control-Allow-Origin': 'http://local.b.qunar.com:3001',
            'Access-control-Allow-Methods': 'POST',
            'Access-control-Allow-Headers': 'x-requested-with,content-type'
        });
        var res = {status: 0, data: null, message: '发送成功'};
        response.end(JSON.stringify(res));
    }
}).listen(8081);

console.log('server start');