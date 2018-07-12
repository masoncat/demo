/**
 * Created by wm.liu on 2018/2/14.
 */
'use strict';

var exports;

var require = function (path) {
    var exactPath = require.resolve(path);
    try {
        return require.export(exactPath)
    } catch (e) {
        console.error(e);
    }
};
window.require = require;

/**
 * 匹配出准确的路径,基于当前commonJS的路径
 * @param path
 * @return {string}
 */
require.prototype.resolve = function (path) {
    var exactPath = 'name.js';
    return exactPath;
};

/**
 * 输出已经注册的模块
 * @param exactPath
 * @return {*}
 */
require.prototype.export = function (exactPath) {
    var exportModule = module.get(module[exactPath]);
    if (exportModule) {
        return exportModule;
    } else {
        throw new Error('not find module');
    }
};

var module = {
    set exports(a) {
        console.log(a)
        return a;
    }
};

module.prototype.exports = function () {

}

module.prototype.get = function (exactPath) {
    return module[exactPath];
};

window.module = module;