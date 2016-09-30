/*** 轮播banner ***/
const animate = require("./function/animate.js");               // 动画函数
const compatible = require("./function/compatibleFunction.js"); // 兼容函数
const documentReady = require("./function/documentReady.js");   // domready

const banner = ()=>{
    const bannerConfig = window._BANNER_;
    const [imageBox, clickBox] = [
        document.getElementById("banner-imageBox"),
        document.getElementById("banner-clickBox")
    ];
    const [classname, speed, unit] = ["thisIndex", 5, "%"];
    const maxIndex = bannerConfig.length - 1,
        maxPosition = -100 * (maxIndex + 1);
    let index = 0,
        animated = false,
        clickLi,
        timer;
    /* 动画主函数 */
    const finish = ()=>{
        timer = setTimeout(main, 4000);
        animated = false;
    };
    const main = ()=>{
        animated = true;
        clickLi[index].className = "";
        if(index == maxIndex){
            index = 0;
            clickLi[index].className = classname;
            animate(imageBox, "left", maxPosition, speed, unit, ()=>{
                imageBox.style["left"] = `0${unit}`;
                finish();
            });
        }else{
            index++;
            clickLi[index].className = classname;
            animate(imageBox, "left", -100 * index, speed, unit, finish);
        }
    };
    /* 点击事件 */
    function liClick(event){
        const e = event.target || event.srcElement;
        if(e.tagName == "LI" && animated == false){
            const cIndex = e.getAttribute("data-index");
            if(cIndex != index){
                animated = true;
                clearTimeout(timer);
                clickLi[index].className = "";
                let cha = Math.abs(cIndex - index);
                index = cIndex;
                clickLi[index].className = classname;
                animate(imageBox, "left", -100 * index, speed * cha, unit, finish);
            }
        }
    }
    /* 初始化 */
    // 初始化图片节点
    const imageDomInit = ()=>{
        const w = maxIndex + 2,
            d = 100 / w;
        imageBox.style.cssText = `width: ${w}00${unit};left: 0;`;
        let text = `<a href="${bannerConfig[0].href}" style="width: ${d}${unit};background-image: url('${bannerConfig[0].image}');"></a>`;
        for(let j = maxIndex; j >= 0; j--){
            text = `<a href="${bannerConfig[j].href}" style="width: ${d}${unit};background-image: url('${bannerConfig[j].image}');"></a>${text}`;
        }
        imageBox.innerHTML = text;
    };
    // 初始化点击节点
    const clickDomInit = ()=>{
        let text = "";
        for(let j = maxIndex; j >= 0; j--){
            text = `<li class="${j === 0 ? classname : ""}" data-index="${j}"></li>${text}`;
        }
        clickBox.innerHTML = text;
        clickLi = clickBox.getElementsByTagName("li");
        compatible.on(clickBox, "click", liClick);
    };
    const init = ()=>{
        imageDomInit();
        clickDomInit();
        timer = setTimeout(main, 4000);
    };
    init();
};

module.exports = ()=>{
    documentReady(banner);
};
