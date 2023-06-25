/**
 * 常用正则库，用于快速匹配
 *
 * @author lautin
 * @created 2019-11-21 02:02:39
 */

// url地址

const isUrl = /^(https?:\/\/)?([0-9a-zA-Z\.]+)\.([a-z\.]{2,6})([\/\w\.-]*)?$/

// 小写字母
const isLower = /^[a-z]+$/

// 大写字母
const isUpper = /^[A-Z]+$/


// 大小写字母
const isAlpha = /^[A-Za-z]+$/

// 邮箱
const isEmail = /^(?:[\w\-\.]+)@(?:[\w\.\-]+).(?:[a-z\.]{2,6})$/

// 手机号
const isPhone = /^\d{9,17}$/

// 32位的加密token
const isToken = /^[a-z0-9]{32}$/

// 固话 - 国内的格式
const isTel = /^0\d{2,3}\-?\d{7,8}$/

// html标签
const isTag = /<\/?\w+[\w\s='"]\/?>/g

// 一段html
const isHtml = /<([^\s]+)[\w\s='"]*>[\d\D]*?<\/\1>/g

export default {
    isAlpha,
    isEmail,
    isHtml,
    isLower,
    isPhone,
    isToken,
    isTag,
    isTel,
    isUpper,
    isUrl
}
