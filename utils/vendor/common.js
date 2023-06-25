
// commons在DOM操作完毕后插入

// 获取可视窗宽高
function getViewPortWH() {
    return {
        clientW: document.documentElement.clientWidth || document.body.clientWidth,
        clientH: document.documentElement.clientHeight || document.body.clientHeight
    }
}

function isMobile() {
    const regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
    const u = navigator.userAgent;

    if (null == u) {
        return true;
    }

    let result = regex_match.exec(u);

    return null == result ? false : true;

}

/**
 * css属性的动画设置
 * @param {object} settings 动画效果配置参数
 */
function cssAnimate(settings) {
    // 使用解构赋值 提取参数值到变量中
    let {
        ele,
        transform,
        duration,
        whendone = null
    } = settings

    if (ele.timer) return // 如果已有定时器 则点击无效

    let frames = 0,
        numFrames = duration / 100

    const beginAt = {},
        increment = {}

    /*
     * 1| 计算初始样式和动画增量
     */
    const cssProps = getComputedStyle(ele)
    for (let item in transform) {
        beginAt[item] = parseInt(cssProps[item])
        increment[item] = (transform[item] - beginAt[item]) / numFrames
    }

    /*
     * 2| 设置定时任务执行动画
     */
    ele.timer = setInterval(function () {
        frames++;
        // 判断临界条件
        if (frames > numFrames) {
            // 取消定时器
            clearInterval(ele.timer)
            delete ele.timer;
            if (whendone instanceof Function) whendone.call(ele);
            return false;
        }

        for (let item in transform) {
            ele.style[item] = (beginAt[item] + increment[item] * frames) + 'px';
        }
    }, 100);
}

function timeTD(resolve, reject, seconds = null) {
    let total = seconds || 60;
    resolve(total);
    let timer = setInterval(function () {
        if (--total < 1) {
            clearInterval(timer);
            reject();
        } else {
            resolve(total);
        }

    }, 1000);

}

function curryTimeTD(resolve, seconds = null) {
    return function (reject) {
        let total = seconds || 60;
        resolve(total);
        let timer = setInterval(function () {
            if (--total < 1) {
                clearInterval(timer);
                reject();
            } else {
                resolve(total);
            }

        }, 1000);
        return timer;
    }
}





export default {
    getViewPortWH,
    cssAnimate,
    timeTD,
    curryTimeTD,
    isMobile
}
