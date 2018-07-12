/**
 * Created by wm.liu on 2017/12/21.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res, next) {
    res.send('hello world');
})

express.listen(9999, function () {
    console.log('Example app listening on port 3000!');
});


(function () {
    var siteId = siteId,
    url = '//webresource.c-ctrip.com/resaresonline/risk/ubtrms/latest/default/chlorofp.js?siteId=' + siteId, timeout = 10;
    var now = new Date();
    setTimeout(function () {
        var f = document.createElement('script');
        f.type = 'text/javascript';
        f.id = 'cfp__script';
        f.async = true;
        f.src = ('https:' == document.location.protocol ? 'https:': 'http:') + url + "&v=" + now.getYear() + "-" + now.getMonth() + "-" + now.getDate();
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(f, s);
    }, timeout);
    window.cfp__startScriptLoad = 1 * new Date();

    window.addEventListener('load', function () {
        var timeout = 200;
        setTimeout(function () {

            var chloroToken;
            window.__cfpi = window.__cfpi || [];
            window.__cfpi.push(['_getChloroToken', function (result) {
                chloroToken = result
            }]);
            console.log(chloroToken);
            var params = {chloroToken};
            $.get('/queryChloroFp', params, function (result) {
                console.log(result);
            });
        }, timeout);

    });
})();