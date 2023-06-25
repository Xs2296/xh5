import vue from 'vue';
import qs from 'qs'
import app from '@/app'

// 过去本地文件
let getFile = function (config) {
    return new Promise((res, rec) => {
        uni.chooseImage({
            count: 0,
            success: (chooseImageRes) => {
                res(chooseImageRes)
            },
            fail: () => {
                rec()
            }
        });
    })
}

// 复制文本
function copy(txt) {
    uni.setClipboardData({
        data: txt,
        success: function () {
            uni.showToast({
                title: 'Copy successful',
                duration: 2000
            });
        }
    });
}

// 页面后退方法
vue.prototype.$back = (num = 1) => {
    uni.navigateBack(num)
    navFontColor()
}

// 标签过滤
function filterCode(str) {
    return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/ig, '')
}

// 解决uni-app slot 数组传递bug
vue.prototype.$list = function (obj) {
    return Object.entries(obj).filter(item => item[0] != '_i').map(item => item[1])
}

// 替换路由
vue.prototype._router = {
    push(path) {
        var url = '', query, animationType, animationDuration;
        if (typeof path == 'string') {
            url = path
        } else {
            url = path.path;
            query = qs.stringify(path.query);
            animationType = path.animationType
            animationDuration = path.animationDuration
        }
        uni.navigateTo({
            url: `${url}${url.includes('?') ? '&' : '?'}${query || ''}`,
            animationType,
            animationDuration
        });
        navFontColor()
    },
    replace(path) {
        var url = '', query, animationType, animationDuration;
        if (typeof path == 'string') {
            url = path
        } else {
            url = path.path || '';
            query = qs.stringify(path.query);
            animationType = path.animationType
            animationDuration = path.animationDuration
        }
        uni.redirectTo({
            url: `${url}${url.includes('?') ? '&' : '?'}${query || ''}`,
            animationType,
            animationDuration
        });
        navFontColor()
    }
}

function defaultTheme() {
    return `dark`
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let state = ``;
    // 判断当前时间段
    if (hours >= 19 || hours <= 7) {
        state = `dark`;
    } else {
        state = `light`;
    }
    return state;
}

function navFontColor() {
    let theme = uni.getStorageSync('theme') || defaultTheme()
    setTimeout(() => {
        uni.setNavigationBarColor({
            frontColor: theme == 'light' ? '#000000' : '#ffffff',
            backgroundColor: '#cccccc',
        })
    }, 300)
}

function localImgUrl(name) {
    let theme = uni.getStorageSync('theme') || defaultTheme()
    let str = theme == 'light' ? 'static/img/light/' : 'static/img/'
    return str + name
}

vue.prototype.$imgUrl = app.imgUrl
vue.prototype.$baseUrl = app.baseUrl
vue.prototype.$getFile = getFile
vue.prototype.$copy = copy
vue.prototype.$filterCode = filterCode
vue.prototype.$navFontColor = navFontColor
vue.prototype.$localImgUrl = localImgUrl

