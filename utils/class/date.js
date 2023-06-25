/**
 * 日期时间处理的工具库
 *
 * @author lautin
 * @created 2019-11-19 11:36:02
 */
function getTimeZoneOffset(time) {
    const date = new Date(time);
    // 获取时区偏移值，返回分钟数
    let offset = date.getTimezoneOffset();
    return time +  offset * 60 * 1000;
}

/**
 * 将时间戳转化成时间对象的方法
 * @param {mixed} time 传入一个时间戳或者时间对象
 */
function time2Date(time, isOffset = false) {

    let date;

    if (time.constructor == Date) { // 传入一个时间对象
        date = time;

    } else { // 传入一个时间戳
        // 检测时间戳的长度，确保为ms
        if (time.toString().length <= 10) {
            time = Number(time) * 1000;
        }
        // 是否对时差进行转化
        if (isOffset) {
            time = getTimeZoneOffset(time);
        }

        // 转化成日期时间对象
        date = new Date(time);
    }
    return date;
}


/**
 * 将指定日期格式化输出，
 * @param string|object time 输入日期，为一个Date.now()或者Date.UTC返回的时间戳
 * @param string format 输出的格式
 * @param boolean isOffset 是否考虑时区
 */
function parseTime(time, isOffset = false, cformat = null) {

    // 设置默认格式
    let format = cformat || '{y}-{m}-{d} {h}:{i}:{s}';

    const date = time2Date(time, isOffset);

    // 将日期时间值存入对象中
    const dataObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1, // 显示月份值需要+1
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };

    // 星期值需要转化为中文
    dataObj.a = '星期' + ['日', '一', '二', '三', '四', '五', '六'][dataObj.a];

    // 匹配{}中的y|m|d...部分，分别替换不同的值
    const result = format.replace(/{(y|m|d|h|i|s|a)+}/g, (segment, key) => {
        // 由索引提取值
        let value = dataObj[key];
        // 给值添加前导0
        if (segment.length > 0 && value < 10) value = '0' + value;
        return value || 0;
    });
    return result;
}


/**
 * 发布日期的特定显示方式，
 * @param {string|number} time 显示日期的时间戳
 * @param {string} option 可选参数显示日期
 */
function pubTime(time, isOffset = false, format = null) {

    const date = time2Date(time, isOffset);

    const current = isOffset ? getTimeZoneOffset(Date.now()) : Date.now();

    // 计算时间的差值，返回s为单位的值
    let diff = (current - date.valueOf()) / 1000;

    // 2天以内显示距今时间
    if (diff < 30) { // 30s-
        return '刚刚';

    } else if (diff < 3600) { // 1h-
        return Math.ceil(diff / 60) + '分钟前';

    } else if (diff < 3600 * 24) { // 1d-
        return Math.ceil(diff / 3600) + '小时前';

    } else if (diff < 3600 * 24 * 2) { // 2d-
        return '1天前';

    } else { // 超过2天显示发布日期
        if (!format) format = '{y}年{m}月{d}日 {h}:{i}';
        return parseTime(time, isOffset, format);
    }
}

// 将方法写入构造函数 便于全局使用
Object.assign(Date, {
    time2Date,
    parseTime,
    pubTime,
});

export default{
    time2Date,
    parseTime,
    pubTime
}
