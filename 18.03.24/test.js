/**
 * Created by wm.liu on 2018/3/26.
 */
/**
 * Created by wm.liu on 2018/3/24.
 */
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length; // 获取CPU的个数

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        worker.on('fork', function (worker) {
            console.log('fork  111111');
            logger(worker.process.pid);
        })
        worker.on('error', function (error, a, b) {
            console.log('------------');
            console.log(error);
            console.log(a);
            console.log(b);
            console.log('------------');
        })

        worker.on('exit', (code, signal) => {
            if (signal) {
                console.log(`worker was killed by signal: ${signal}`);
            } else if (code !== 0) {
                console.log(`worker exited with error code: ${code}`);
            } else {
                console.log('worker success!');
            }
        });
    }
    // cluster.on('fork', function (worker) {
    //     logger('pid:' + worker.process.pid + ',workId:' + worker.id + ',isMaster:' + cluster.isMaster);
    // });
    cluster.on('disconnect', (worker) => {
        logger(`The worker #${worker.id} has disconnected`);
    });
    cluster.on('listening', (worker, address) => {
        logger(`A worker is now connected to ${address.address}:${address.port}`);
    });
    cluster.on('exit', (worker, code, signal) => {
        if (signal) {
            console.log(`111worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`11worker exited with error code: ${code}`);
        } else {
            console.log('worker success!');
        }
    });
    cluster.on('error', function (error, a, b) {
        console.log('------------');
        console.log(error);
        console.log(a);
        console.log(b);
        console.log('------------');
    })
    process.on('exit', (code) => {
        console.log(`即将退出，退出码：${code}`);
    });
    var d = require('domain').create();
    d.on('error', function (err) {
        console.log(err);
    })

    process.on('uncaughtException', (err) => {
        // console.error(err)
        logger(`Caught exception: ${err}`);
    });
    setTimeout(function () {
        JSON.parse([]);
    }, 2000)

} else {
    d.run(function () {

        http.createServer(function (req, res) {
            res.writeHead(200);
            res.end("hello world\n");
            JSON.parse([]);
        }).listen(8000);
    })

}


function logger() {
    var now = new Date();
    var logArr = [];
    logArr.push(now);
    logArr.push(arguments[0]);
    console.error(logArr.join(':::'));
}