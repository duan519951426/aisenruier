/*** 兼容函数 ***/
const compatible = (()=>{
    return {
        // 事件监听绑定
        "on": (()=>{
            if(document.addEventListener){
                return (ele, type, fun, s = false)=>{
                    ele.addEventListener(type, fun, s);
                };
            }else{
                return (ele, type, fun)=>{
                    ele.attachEvent(`on${type}`, fun);
                };
            }
        })(),
        // 动画
        "request": (()=>{
            if(window.requestAnimationFrame){
                return fun => requestAnimationFrame(fun);
            }else{
                return fun => setTimeout(fun, 10);
            }
        })()
    };
})();

module.exports = compatible;
