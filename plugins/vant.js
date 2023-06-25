import Vue from 'vue';
// import Toast from '../wxcomponents/vant/toast/toast';
import Dialog from '../wxcomponents/vant/dialog/dialog';
// Vue.prototype.$toast = Toast
Vue.prototype.$toast = (msg) => {
    uni.showToast({
        title: msg,
        icon: "none"
    });
}
Vue.prototype.$toast.success=(msg)=>{
    uni.showToast({
        title: msg,
        icon: "success"
    });
}
Vue.prototype.$dialog = Dialog