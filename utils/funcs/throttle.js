/**
 * 函数节流模块封装
 *
 * @author lautin
 * @created 2019-11-20 18:46:01
 */


/**
 * 节流方法，在指定时间内只执行一次，使用时间戳控制时间
 * @param {function} func 事件回调函数
 * @param {number} wait 限定输出的时间，建议100-300ms
 */
function throttleA(func, wait) {
    // 上次执行时间
    let previous = 0;
    return function () {
        // 本次执行时间
        let now = Date.now(),
            context = this,
            args = arguments;
        // 定时器以外执行
        if (now - previous > wait) {
            func.apply(context, args);
            // 更新上次时间
            previous = now;
        }
    }
}

/**
 * 节流方法，在指定时间内只执行一次，使用定时器控制时间
 * @param {function} func 事件回调函数
 * @param {number} wait 限定输出的时间，建议100-300ms
 */
function throttleB(func, wait) {
    // 记录上个定时器
    let timer;

    return function () {
        const context = this,
                args = arguments;
        // 如果没有定时器则执行
        if (!timer) {
            func.apply(context, args);
            // 更新定时器
            timer = setTimeout(() => {
                timer = null;
            }, wait);
        }
    }
}

/**
 * 兼容执行
 * @param {function} func 事件处理函数
 * @param {number} wait 节流时间
 * @param {mixed} flag 标识符 选择类型
 */
export default function throttle(func, wait, flag = null) {
    return flag ? throttleB(func, wait) : throttleA(func, wait);
}
