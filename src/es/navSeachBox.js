/*** 导航栏上搜索显示隐藏 ***/
const compatible = require("./function/compatibleFunction.js"); // 兼容函数
const documentReady = require("./function/documentReady.js");   // domready

const navSeachBox = ()=>{
    const open = document.getElementById("seachBox-open"),
        close = document.getElementById("seachBox-close");
    const box = document.getElementById("seachBox");
    const [speed, unit] = [5, "px"];
    // 显示
    function seachOpen(event){
        box.style.display = "block";
    }
    // 隐藏
    function seachClose(event){
        box.style.display = "none";
    }
    // 初始化
    const init = ()=>{
        compatible.on(open, "click", seachOpen);
        compatible.on(close, "click", seachClose);
    };
    init();
};

module.exports = ()=>{
    documentReady(navSeachBox);
};
