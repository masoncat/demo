/**
 * Created by wm.liu on 2018/2/27.
 */
window.addEventListener('abort', function (e) {
    console.log(e);
})
window.addEventListener('load', function (e) {
    console.log(e);
})
window.addEventListener('unload', function (e) {
    console.log(e)
    alert(e.type);
})

window.onbeforeunload = function (e) {
    console.log(e);
    alert(e.type);
}

window.addEventListener('unload', function(event) {
    let data = {arguments:1}
    navigator.sendBeacon('/collector', data);
});