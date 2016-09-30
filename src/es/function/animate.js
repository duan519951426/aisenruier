/*** 动画函数 ***/
const extractNumber = require("./extractNumber.js");   // 取字符串中的数字
const compatible = require("./compatibleFunction.js"); // 兼容函数

const animate = (dom, style, target, speed, unit, callback)=>{
    const start = extractNumber(dom.style[style]);
    const v = target > start ? speed : -speed;
    const ani = ()=>{
        const thisStyle = extractNumber(dom.style[style]);
        if(Math.abs(target - thisStyle) > speed){
            dom.style[style] = `${thisStyle + v}${unit}`;
            compatible.request(ani);
        }else{
            dom.style[style] = `${target}${unit}`;
            callback ? callback() : null;
        }
    };
    compatible.request(ani);
};

module.exports = animate;
