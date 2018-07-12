/**
 * Created by wm.liu on 2017/12/17.
 */
import _ from 'lodash';

console.log('The print.js module has loaded! See the network tab in dev tools...');
export default () => {
    _.set(window, 'x', 1);
    console.log('Button Clicked: Here\'s "some text"!');
}