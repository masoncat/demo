/**
 * Created by wm.liu on 2018/2/26.
 */
'use strict';

var flag = false; //默认值
var currTime, cacheFunc, closeTimer, delayTimer, counter = 0;

function throttle(func, wait) {
    if (!flag) {
        flag = true;
        currTime = new Date().getTime();
        func();
        closeTimer = setTimeout(function () {
            flag = false;
            currTime = undefined;
        }, wait);
    } else {
        // 如果有值，将函数缓存，当到了计数的时候，触发最后一个
        var delay = new Date().getTime() - currTime;
        cacheFunc = func;
        clearTimeout(closeTimer);
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            cacheFunc();
        }, delay);
    }

}

function count() {
    console.log(new Date().getTime());
    console.log(counter++);
}

function test() {

    throttle(function () {
        count();
    }, 2000);
}
