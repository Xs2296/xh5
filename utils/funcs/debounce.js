/**
 *  函数防抖模块封装
 * @author lautin
 * @created 2019-11-20 18:44:32
 */


/**
 * 防抖函数，在一个时段内反复触发时 更新定时器为最后一次延迟执行
 * 该操作欠缺的地方在于 延迟执行，响应比较慢 最好是先执行
 * @param {function} func 事件回调函数
 * @param {number} wait 延迟等待时间，建议100-300ms左右
 */
function debounceA(func, wait) {
    // 初始化定时器为空
    let timer = null;
    // 返回一个防抖的闭包函数，使用闭包来持久存储定时器
    return function () {
        const context = this, // this为事件源DOM
            args = arguments; // arguments包含event
        // 如果已有定时器 则取消上次的任务
        if (timer) clearTimeout(timer);
        // 更新定时器，本次（最后）任务n毫秒后触发
        timer = setTimeout(() => {
            // 还原事件回调函数触发时的环境
            func.apply(context, args);
        }, wait);
    }
}

/**
 * 防抖函数，在一个时段内反复触发时 更新定时器为最后一次延迟执行
 * 该方法 先执行 后延迟 响应灵敏更高
 * @param {function} func 事件回调函数
 * @param {number} wait 延迟等待时间，建议100-300ms左右
 */
function debounceB(func, wait) {
    let timer = null;
    return function () {
        const context = this,
            args = arguments;

        // 首先取消中间的定时器，重新开始计时
        if (timer) clearTimeout(timer);

        //先加载本次任务，
        if (!timer) func.apply(context, args);

        // 再进行定时器控制
        timer = setTimeout(() => {
            timer = null;
        }, wait);
    }
}

export default function debounce(func, wait, immediate = false) {
    return immediate ? debounceB(func, wait) : debounceA(func, wait);
}