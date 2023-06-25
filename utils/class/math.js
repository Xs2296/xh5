/**
 * 数学模块，主要针对浮点型数据，在运算时的精度问题：
 * 1| 两个小数相加 0.1 + 0.2 = 0.30000000000000004
 * 2| 两个小数相乘 2.12 * 3.14 = 6.6568000000000005;
 * 3| ...
 * 4| ...
 * 5| 数值长度大于13位时 显示科学计数法
 * @author lautin
 * @created 2019-11-19 17:15:04
 */

/**
 * 检测小数点精度
 * @param {number} num 传入的数值
 */
function countDecimals(num) {
    let precision;
    try {
        precision = num.toString().split(".")[1].length;
    } catch (e) {
        precision = 0;
    }
    return precision;
}

/**
 * js在以下情景会自动将数值转换为科学计数法：
 * 小数点前的数字个数大于等于22位；
 * 小数点前边是0，小数点后十分位（包含十分位）之后连续0的个数>=6时
 * @param {number} 科学计数法显示的数值 1.2e-8
 * @return {number} 返回实际的数值 1.00000002
 */
function scientific2No(val) { //-7.50375e-8

    // 正则匹配科学计数法的数字
    if (/\d+\.?\d*e[+-]*\d+/i.test(val)) {

        let zero = '0',
            parts = String(val).toLowerCase().split('e'), // ['-7.50375', '-8']
            e = parts.pop(), // 存储指数 -8
            l = Math.abs(e), // 0的个数  8
            sign = e / l,    // 判断正负 -
            // 将系数按照小数点拆分
            coeff_array = parts[0].split('.'); // [-7, 50375] 去除中间的.
        // 如果恰好为8位 那么第二个数默认为undefined  需要重置为'' 
        if (!coeff_array[1]) coeff_array[1] = '';
        if (sign === -1) { // 小数
            // debugger;
            // 正数或者负数
            if (coeff_array[0] < 0) {
                val = '-' + zero + '.' + zero.repeat(l - 1) + coeff_array[0].slice(1) + coeff_array[1];
            } else {
                val = zero + '.' + zero.repeat(l - 1) + coeff_array.join(''); //拼接字符串，如果是小数，拼接0和小数点
            }

        } else {

            let dec = coeff_array[1];

            // 如果是整数，将整数除第一位之外的非零数字计入位数，相应的减少0的个数
            if (dec) l = l - dec.length;

            // 拼接字符串，如果是整数，不需要拼接小数点
            val = coeff_array.join('') + new Array(l + 1).join(zero);

        }
    }


    try {
        return val.toString();
    } catch (e) {
        return '';
    }
}

/**
 * 截取小数点后n位
 * @param {number} val 截取的数值
 * @param {number} scale 保留的小数点位数
 */
function omitTo(val, scale) {

    // 转化科学计数法
    val = scientific2No(val);

    let ret;
    // 检测浮点数
    if (val.toString().indexOf(".") > -1) {
        // 提取实体集和精度值
        let [entity, precisionVal] = val.toString().split(".");

        if (precisionVal.length > scale) {
            // trunc() 方法会将数字的小数部分去掉，只保留整数部分。
            let tmp = scientific2No(Math.trunc(val * Math.pow(10, scale)));
            // 处理零值
            if (tmp == 0) ret = scientific2No('0.' + '0'.repeat(scale));
            else {
                // ret = tmp / ;
                ret = division(tmp, Math.pow(10, scale));
                try { // 小数

                    let [a, b] = ret.toString().split(".");
                    a = scientific2No(a),
                        b = scientific2No(b);

                    if (b.length < scale) {
                        ret = a + '.' + b.padEnd(scale, '0');
                    }
                } catch (e) { // 整数
                    ret = ret + '.' + '0'.padEnd(scale, '0');
                }
            }

        } else if (precisionVal.length == scale) { // 精度

            ret = val;

        } else {
            // 补全小数点
            ret = entity + '.' + precisionVal.padEnd(scale, '0');
        }

        // 检测整型值
    } else ret = val + '.' + '0'.repeat(scale);

    // 去除末尾可能产生的多余的. 
    if (ret.toString().endsWith('.')) ret = ret.slice(0, -1);

    return ret;
}

/**
 * 计算两个数的和
 * @param {number} num1
 * @param {number} num2
 */
function add(num1, num2, scale = null) {

    num1 = scientific2No(num1);
    num2 = scientific2No(num2);

    let amplification, // 放大率
        precision1 = countDecimals(num1), // 精度1
        precision2 = countDecimals(num2); // 精度2
    amplification = Math.pow(10, Math.max(precision1, precision2));

    // 先放大再相加，然后除以放大率
    let val = (num1 * amplification + num2 * amplification) / amplification;

    // 转化科学计数法
    let result = scientific2No(val);

    // 控制显示长度
    if (scale) result = omitTo(result, scale);

    return result;
}


/**
 * 计算两个数的差值
 * @param {number} num1
 * @param {number} num2
 */
function subtr(num1, num2, scale = null) {
    num1 = scientific2No(num1);
    num2 = scientific2No(num2);

    let amplification, // 放大率
        precision1 = countDecimals(num1), // 精度1
        precision2 = countDecimals(num2); // 精度2

    let precision = Math.max(precision1, precision2)
    amplification = Math.pow(10, precision);

    // 动态控制精度长度
    let val = ((num1 * amplification - num2 * amplification) / amplification).toFixed(precision);

    // 转化科学计数法
    let result = scientific2No(val);

    // 控制显示长度
    if (scale) result = omitTo(result, scale);

    return result;
}

/**
 * 计算两个数的乘积
 * @param {number} num1
 * @param {number} num2
 */
function multiple(num1, num2, scale = null) {
    num1 = scientific2No(num1);
    num2 = scientific2No(num2);

    let precision = 0;
    precision += countDecimals(num1);
    precision += countDecimals(num2);

    let val = Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, precision);


    let result = scientific2No(val);

    if (scale) result = omitTo(result, scale);

    return result;
}


/**
 * 两个数相除
 * @param {number} num1
 * @param {number} num2
 * @param {optional} d
 */
function division(num1, num2, scale = null) {
    num1 = scientific2No(num1);
    num2 = scientific2No(num2);

    let precision1 = countDecimals(num1),
        precision2 = countDecimals(num2),
        m = precision1 > precision2 ? precision1 : precision2;

    // 两个整数相除 无需计算精度
    if (m <= 1) m = 1;

    let val = multiple(num1, m) / multiple(num2, m);

    let result = scientific2No(val);

    if (scale) result = omitTo(result, scale);

    return result;
}


Object.assign(Math, {
    countDecimals,
    add,
    subtr,
    multiple,
    division,
    scientific2No,
    omitTo
})

export default {
    countDecimals,
    add,
    subtr,
    multiple,
    division,
    scientific2No,
    omitTo
}