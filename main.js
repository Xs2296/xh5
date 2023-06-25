import Vue from 'vue'
import App from './App.vue'
import '@/plugins'
import i18n from "./i18n";
import store from './store'
// import { Toast } from 'vant'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype._i18n = i18n;

import messages from './locale/index'

let i18nConfig = {
  locale: uni.getLocale(),
  messages
}

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n_uni = new VueI18n(i18nConfig)


Vue.config.productionTip = false
// Vue.use(Toast);
App.mpType = 'app'

const app = new Vue({
	...App,
	i18n,
	i18n_uni,
	store
})
app.$mount()

