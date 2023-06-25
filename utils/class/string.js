/**
 * 字符串方法的扩展
 *
 * @author lautin
 * @created 2019-11-22 15:24:20
 */

/**
 * 生成一组随机值的方法，用于上传文件名等场景
 * @param {number} len
 */
function random(count = null) {
    let len = count || 32,
        $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        ret = '',
        time = new Date().getTime().toString();

    if (len / 2 > time.length) {
        // 控制总长度不超出
        len = len - time.length
    } else {
        len = len / 2
    }
    for (let i = 0; i < len; i++) {
        ret += $chars.charAt(Math.floor(Math.random() * $chars.length))
        if (time[i]) {
            ret += time[time.length - i - 1]
        }
    }
    return ret;
}
/**
 * 截取字符串之前之后
 * @param {string} str 
 * @param {string} targe 
 * @param {number} index 
 */
function getCaptionLength(str, targe, index) {
    if (!index) {
        return str.substring(0, str.indexOf(targe))
    } else {
        return str.substring(str.lastIndexOf(targe) + 1)
    }

}

// 绑定为静态方法
Object.assign(String, {
    random,
    getCaptionLength
});

// fontcolor设置别名
String.prototype.color = Object.prototype.fontcolor;

export default {
    random,
    getCaptionLength
}
