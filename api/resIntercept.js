import vue from "vue";
import router from '@/router'
const resIntercept = (result) => {
    let res = result.data
    let config = result.config
    return new Promise(
        function (resolve, reject) {
            // 是否提示
            if (typeof config.toast == 'boolean') {
                if (config.toast) {
                    vue.prototype.$toast(res.msg)
                }
            } else {
                if (res.code != 200 && res.code != 100) {
                    vue.prototype.$toast(res.msg)
                }
            }
            // 过滤
            if (res.code == 200) {//成功
                resolve(res)
            } else {//失败
                reject(res)
                if (res.code == 100 && !config.notLogin) {
                    router.push('/InterceptAccount')
                }
            }
        }
    )
}

export default resIntercept