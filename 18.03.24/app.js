/**
 * Created by wm.liu on 2018/3/24.
 */
var http = require('http');
var app = require('express')();
// 启动
app.set('port', process.env.PORT || '3002');
app.get('/index',function(){
    console.log('get');
})
http.createServer(app).listen(app.get('port'), function(){
    console.log(new Date());
    console.log('Express server listening on port ' + app.get('port'));
});

var domain = require('domain');
var reqd = domain.create();
    domain.active = reqd;
    reqd.on('error', function (err) {
        console.log(err.stack);
        // req.next(err);
    });

// var b = a;
reqd.run(function(){
    try {
        var b = a;
    }catch (e){
        console.log(e);
    }

});
