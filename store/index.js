import Vue from 'vue'
import Vuex from 'vuex'
import Setting from "@/api/setting";
import i18n from "@/i18n";
import Socket from '@/api/serve/market-socket'
import themeStyle from '@/plugins/theme-style'
import app from '@/app'

let newSocket =  new Socket(app.newSocketUrl)
newSocket.on('message',(evt)=>{
  if(evt.type=='ping'){
    newSocket.send({type:'pong'})
  }
})

let socket =  new Socket(app.socketUrl)
socket.on('message',(evt)=>{
  if(evt.type=='ping'){
    socket.send({cmd:'pong'})
  }
})
let socket1 =  new Socket(app.socketUrl1)
socket1.on('message',(evt)=>{
  if(evt.cmd=='ping'){
    socket1.send({cmd:'pong'})
  }
})
Vue.use(Vuex)

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

let store = new Vuex.Store({
  state: {
    // 切换动画
    fade: '',
    // 区号列表
    countryList: [],
    token: uni.getStorageSync('token'),
    user: (() => {
      if (!uni.getStorageSync('user')) return {};
      return JSON.parse(uni.getStorageSync('user'))
    })(),
	nws: newSocket,
    ws:socket,
    ws1:socket1,
    wsState: false,
    hideMoney: uni.getStorageSync('hideMoney') == 'true',
    // logo
    logoMap: (() => {
      if (!uni.getStorageSync('logoMap')) return {};
      return JSON.parse(uni.getStorageSync('logoMap'))
    })(),
    lang: uni.getStorageSync('lang')||'en',
    langList: [
      {
        value: 'cn',
        label: '简体中文'
      },
      {
        value: 'en',
        label: 'English'
      },
      {
        value: 'tw',
        label: '繁體中文'
      },
	  {
	    value: 'abar',
	    label: 'عربي'
	  },
      {
        value: 'tr',
        label: 'Türk'
      },
      {
        value: 'kor',
        label: '한국어'
      },
      {
        value: 'jp',
        label: '日本語'
      },
      {
        value: 'de',
        label: 'Deutsch'
      },
      {
        value: 'fra',
        label: 'Français'
      },
      {
        value: 'spa',
        label: 'Español'
      },
      {
        value: 'it',
        label: 'Italiano'
      },
      {
        value: 'ukr',
        label: 'УкраїнськаName'
      },
      {
        value: 'swe',
        label: 'Svenska'
      },
      {
        value: 'fin',
        label: 'Suomi'
      },
      {
        value: 'pl',
        label: 'Polski'
      },
      {
        value: 'pt',
        label: 'Português'
      }
    ],
    // 主题
    theme:uni.getStorageSync('theme')||defaultTheme(),
    // 自定义页面下标
    pageIdx:0
  },
  getters:{
    themeStyle(state){
      return themeStyle[state.theme]
    }
  },
  mutations: {
    FADE(state, data) {
      state.fade = data
    },
    COUNTRYLIST(state, data) {
      state.countryList = data
    },
    TOKEN(state, data) {
      uni.setStorageSync('token', data)
      state.token = data
    },
    USER(state, data) {
      uni.setStorageSync('user', JSON.stringify(data))
      state.user = data
    },
    HIDEMONEY(state, data) {
      uni.setStorageSync('hideMoney', data)
      state.hideMoney = data
    },
    LOGOMAP(state, data) {
      uni.setStorageSync('logoMap', JSON.stringify(data))
      state.logoMap = data
    },
    LANG(state, data) {
      uni.setStorageSync('lang', data)
      i18n.locale = data
      state.lang = data
    },
    VANTLANG(state, data) {
      let name = 'zh-CN'
      console.log('待修改插件语言')
    },
    THEME(state,data){
      state.theme = data
      uni.setStorageSync('theme',data)
    },
    PAGEIDX(state,data){
      state.pageIdx++
    }
  },
  actions: {
    // 页面返回事件
    fadeOut({ commit }) {
      commit('FADE', 'fade-out')
      setTimeout(() => {
        commit('FADE', 'fade-in')
      }, 300);
    },
    // 设置区号
    countryList({ commit }, data) {
      commit('COUNTRYLIST', data)
    },

    token({ commit }, data) {
      commit('TOKEN', data)
    },
    // 设置用户信息  （登录处）
    user({ commit }, data) {
      commit('USER', data)
    },
    // 过滤资金显示
    hideMoney({ commit }, data) {
      commit('HIDEMONEY', data)
    },
    // 设置用户信息
    setUserInfo({ commit }) {
      Setting.getUserInfo().then(res => {
        commit('USER', res.data)
      }).catch(() => { })
    },
    // 设置logo
    logoMap({ commit }, data) {
      commit('LOGOMAP', data)
    },
    // 设置当前语言
    setLang({ commit }, data) {
      commit('LANG', data)
      commit('VANTLANG', data)
    },
    // 设置主题
    setTheme({ commit }, data){
      commit('THEME',data)
      uni.setNavigationBarColor({
        frontColor:data=='sun'?'#ffffff':'#000000',
        backgroundColor:'#666666',
      })
    },
    // 页面栈++
    setPageIdx({ commit }, data){
      commit('PAGEIDX',data)
    }
  },
  modules: {
  }
})

export default store

