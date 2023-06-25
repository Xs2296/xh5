import Member from "../api/member.js"
import vue from 'vue'
// 缓存数据避免重复请求
let localVersion, onlineVersionObj
// import router from '@/router'
/* eslint-disable */
let upgrade = {
    // 检测是否需要升级并返回升级信息
    async isUpdate(call, notCall) {
        // #ifdef H5
        notCall && notCall()
        // #endif
        // #ifdef APP-PLUS
        let currentVersion = await this.getAppVersion();
        let { data } = await this.getNewestVersion()
        // data.android.version data.ios.version
        if (plus.os.name == "Android") {
            if (this.getNum(data.android.version) > this.getNum(currentVersion)) {
                call && call(data)
            } else {
                notCall && notCall()
            }
        } else if (plus.os.name == "iOS") {
            if (this.getNum(data.ios.version) > this.getNum(currentVersion)) {
                call && call(data)
            } else {
                notCall && notCall()
            }
        }
        // #endif
    },
    // 获取本地app版本
    getAppVersion() {
        return new Promise((success, error) => {
            if (localVersion) {
                success(localVersion)
            } else {
                plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
                    success(widgetInfo.version);
                    localVersion = widgetInfo.version
                });
            }
        });
    },
    // 获取平台名称
    osName() {
        return plus.os.name
    },
    // 获取线上版本
    getNewestVersion() {
        if (onlineVersionObj) {
            return onlineVersionObj
        }
        onlineVersionObj = Member.getNewestVersion()
        return onlineVersionObj
    },
    // 获取纯数字（无小数点）
    getNum(str) {
        str += "";
        return str.replace(/[^0-9]/gi, "") * 1;
    },
    // 提示升级
    toUpgrade() {
        console.log('去升级')
    },
    // 下载文件
    downloadFile({ url, update, before, after }) {
        return new Promise((success, error) => {
            before && before()
            let downloadTask = plus.downloader.createDownload(url, {}, (res, status) => {
                if (status == 200) {
                    success(res.filename)
                }
                after && after()
            })
            let onStateChanged = (e) => {
                update && update(parseInt(e.downloadedSize / e.totalSize * 100) || 0)
            }
            downloadTask.addEventListener("statechanged", onStateChanged, false);
            downloadTask.start();
        });
    },
    // 打开文件(安装)
    install(path) {
        if (plus.os.name == 'Android') {
            plus.runtime.install(
                path,
                {
                    force: false,
                },
                () => {
                    plus.runtime.restart();
                    vue.prototype.$toast("下载成功，正在安装。。。");
                },
                (e) => {
                    vue.prototype.$toast("安装失败，请尝试重新下载");
                }
            );
        } else if (plus.os.name == "iOS") {
            plus.runtime.openURL(path)
        }
    },
    ready(call) {
        if (window.plus) {
            call();
        } else {
            document.addEventListener('plusready', call, false);
        }
    }
}
/* eslint-disable */
export default upgrade