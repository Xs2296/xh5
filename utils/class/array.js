/**
 * 数组模块方法的扩展
 *
 * @author lautin
 * @created 2019-11-22 15:32:05
 */

/**
 * 计算数组差值，非变异方法
 * @param {array} a
 * @param {array} b
 */
function differ(a, b) {
    // 拷贝原数组，避免变异
    const _a = a.slice();
    for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < _a.length; j++) {
            if (_a[j] === b[i]) {
                _a.splice(j, 1)
                j = j - 1
            }
        }
    }
    return _a;
}


// 利用set集合的特性实现数组去重
function unique(arr) {
    return [...new Set(arr)]
}


Array.prototype.differ = function (arr) {
    return differ(this, arr);
}

Array.prototype.unique = function () {
    return unique(this);
}

// 他们都是在webpack初始时加载 默认使用node模块系统，不加default
export default {
    differ,
    unique,
}
