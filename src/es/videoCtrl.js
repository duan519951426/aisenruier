/*** 首页播放器 ***/
const compatible = require("./function/compatibleFunction.js"); // 兼容函数
const documentReady = require("./function/documentReady.js");   // domready

const videoCtrl = ()=>{
    const video = document.getElementById("video");
    const [cPlay, cPause] = [document.getElementById("video-ctrl-play"), document.getElementById("video-ctrl-pause")];
    // display
    const display = (a, b)=>{
        cPlay.style.display = a;
        cPause.style.display = b;
    };
    // 播放完成
    const videoEnd = ()=>{
        display("block", "none");
    };
    // 点击事件
    function videoPlay(event){
        display("none", "block");
        video.play();
    }
    function videoPause(event){
        display("block", "none");
        video.pause();
    }
    // init
    const autoPlayInit = ()=>{
        if(video.autoplay === true){
            display("none", "block");
        }else{
            display("block", "none");
        }
    };
    const videoInit = ()=>{
        compatible.on(video, "ended", videoEnd, false);
        compatible.on(cPlay, "click", videoPlay, false);
        compatible.on(cPause, "click", videoPause, false);
    };
    const init = ()=>{
        autoPlayInit();
        videoInit();
    };
    init();
};

module.exports = ()=>{
    documentReady(videoCtrl);
};