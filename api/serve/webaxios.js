import axios from 'axios'
import app from '@/app'
import qs from 'qs';

// 初始化配置
let setting = {
    baseURL: app.baseUrl + '/api/app',
    timeout: 10000,
    withCredentials: true,
    crossDomain: true,
    responseType: 'json',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
}
const server = axios.create(setting)

// 请求拦截
server.interceptors.request.use(function (config) {
    if (config.method === 'post') {
        if (!config.file) {
            config.data = qs.stringify(config.data)
        }
    }
    config.headers = Object.assign(config.headers, {
        'X-Requested-With': 'XMLHttpRequest',

    })
    return config;
}, function (error) {
    return Promise.reject(error);
})
// 响应拦截
server.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
})
export default server;


const $get = (url, data, config) => {
    return server.get(url, {
        params: data,
        ...config
    })
}
const $post = (url, data, config) => {
    return server.post(url, data, config)
}
const $postFile = (url, data, config) => {
    let form = new FormData()
    for (let i in data) {
        form.append(i, data[i])
    }
    let postConfig = {
        file: true
    }
    return server.post(url, form, Object.assign(postConfig, config))
}
export { $get, $post, $postFile }

