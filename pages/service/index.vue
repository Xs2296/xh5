<template>
  <v-page>
    <view class="app-nav"></view>
    <view class="flex-fill boxs">
     <web-view
        :webview-styles="webviewStyle"
        class="iframe"
        :src="`${mobileBase}static/service.html`"
        frameborder="0"
      ></web-view>
    </view>
      <view class="back" @click.stop="$back(2)"></view>
  </v-page>
</template>
<script>
import app from "app.js";
export default {
  name: "service",
  data() {
    return {
      webviewStyle: {
        height: "300px",
      },
    };
  },
  mounted() {
    // #ifdef APP-PLUS
    var currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
    var wv = currentWebview.children()[0];
    wv.setStyle({
      top: uni.getSystemInfoSync().statusBarHeight, //此处是距离顶部的高度，应该是你页面的头部
      zindex: 1,
      scalable: false, //webview的页面是否可以缩放，双指放大缩小
    });
    // #endif
  },
  computed: {
      mobileBase() {
      // #ifdef APP-PLUS
        return app.mobile+'/';
      // #endif
      // #ifdef H5
		    return '/';
      // #endif
    },
  },
  methods: {
   
  },
};
</script>
<style lang="scss" scoped>

.iframe {
  width: 100%;
}
</style>
