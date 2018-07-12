/**
 * Created by wm.liu on 2017/12/15.
 */
var express = require('express');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(30001, function () {
    console.log('Example app listening on port 30001!');
});
