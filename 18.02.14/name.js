/**
 * Created by wm.liu on 2018/2/14.
 */
'use strict';

function name(name) {
    console.log('this is my name:' + name);
    return name && name.toUpperCase();
}

module.exports = name;