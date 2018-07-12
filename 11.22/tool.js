/**
 * Created by wm.liu on 2017/11/23.
 */
var lodash = require('lodash');
var Tool = {};
var URL = require('url');

Tool.getQuery =function (name,url) {
    var queryObj = {};
    if (typeof query !== 'string' || !query) {
        return queryObj;
    }
}

Tool.getQueryObj = function (query) {
    var queryObj = {};
    if (typeof query !== 'string' || !query) {
        return queryObj;
    }
    var queryArr = query.split('&');
    for (var i = 0, len = queryArr.length; i < len; i++) {
        var map = queryArr[i].split('=');
        lodash.set(queryObj, map[0], map[1]);
    }
    return queryObj;
};

module.exports = Tool;