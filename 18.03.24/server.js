/**
 * Created by wm.liu on 2018/3/24.
 */
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length; // 获取CPU的个数
var workers = {};
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        worker.on('fork', function (worker) {
            logger('fork  111111');
            logger(worker.process.pid);
        });
    }
    cluster.on('disconnect', (worker) => {
        logger(`The worker #${worker.id} has disconnected`);
    });
    cluster.on('listening', (worker, address) => {
        logger(`A worker is now connected to ${address.address}:${address.port}`);
    });
    cluster.on('exit', (worker, code, signal) => {
        delete workers[worker.process.pid];
        if (signal) {
            logger(`worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            logger(`worker exited with error code: ${code}`);
        } else {
            logger('worker success!');
        }
        // 重启
        var newworker = cluster.fork();
        workers[worker.process.pid] = newworker;
    });

    process.on('exit', (code) => {
        logger(`即将退出，退出码：${code}`);
    });
    process.on('error', function (error, a, b) {
        logger('------------');
        logger(error);
        logger(a);
        logger(b);
        logger('------------');
    });

    process.on('uncaughtException', (err) => {
        // console.error(err)
        logger(`Caught exception: ${err}`);
    });
    setTimeout(function () {
        try{
            JSON.parse([]);
        }catch (e){
            console.log(e)
        }

    }, 2000)

} else {
    // var d = require('domain').create();
    // d.on('error', function (err) {
    //     console.log(err);
    // })
    // d.run(function () {
    //
    //
    // })
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end("hello world\n");
        JSON.parse([]);
    }).listen(8000);
}


function logger() {
    var now = new Date();
    var logArr = [];
    logArr.push(now);
    logArr.push(arguments[0]);
    console.error(logArr.join(':::'));
}