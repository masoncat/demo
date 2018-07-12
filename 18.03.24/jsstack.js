/**
 * Created by wm.liu on 2018/3/24.
 */

//#!/usr/bin/env node
"use strict";

var debug = require('_debugger');
console.log(debug);
var c = new debug.Client();

function main() {
    console.log('requesting trace');
    c.reqBacktrace(function(err,trace) {
        if (!err) {
            console.log('=====')
            console.log(trace)
            console.log(JSON.stringify(trace))
            trace.frames.forEach(function(frame) {
                process.stderr.write(frame.text + '\n');
            });
            process.exit(0);
        } else {
            console.error(err);
            process.exit(1);
        }
    });
}

function usage() {
    var procname = process.argv[1].split('/').pop()
    console.log('Usage: ' + procname +  ' <pid of node process>');
    process.exit(1);
}

c.on('error', function() {
    console.log('[Failed]');
});

c.once('ready', function() {
    console.log('[ok]');
    c.reqVersion(function(err,version,state) {
        console.log('v8: ' + version);
        main();
    });
});

if (process.argv.length < 3)
    usage();

var pid = process.argv[2];
process.kill(pid,'SIGUSR1');

setTimeout(function() {
    process.stdout.write('connecting ... ');
    c.connect(5858);
}, 500);