/**
 * Created by wm.liu on 2017/12/17.
 */
import _ from 'lodash';

export function square(x) {
    _.set(window,'x',x);
    return x * x;
}

export function cube(x) {
    return x * x * x;
}