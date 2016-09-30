/*** document.ready事件 ***/
const compatible = require("./compatibleFunction.js"); // 兼容函数

const documentReady = (()=>{
    if(!/(MSIE (7|8)\.0)/ig.test(window.navigator.appVersion)){
        // 正常的浏览器
        return (fun)=>{
            compatible.on(document, "DOMContentLoaded", fun, false);
        };
    }else{
        // ie7,8的兼容函数
        return (fun)=>{
            const ie78documentReady = ()=>{
                if(document.readyState == "complete"){
                    fun();
                }
            };
            compatible.on(document, "readystatechange", ie78documentReady);
        };
    }
})();

module.exports = documentReady;
