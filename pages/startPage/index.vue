<template>
  <view class="start-page">
    <image
      class="img"
      mode="aspectFill"
      src=""
      alt=""
    />
    <!-- 别删 预加载用 -->
    <iframe
    v-if="show"
      :src="
        app.mobile +
        '/static/chart_main/static/bundles/library.21c43e3cd2e427bd8522.js'
      "
      style="width: 0; height: 0"
      frameborder="0"
    ></iframe>
  </view>
</template>
<script>
import upgrade from "@/plugins/upgrade.js";
import app from "@/app";
export default {
  name: "startPage",
  data() {
    return {
      app,
      show:false
    };
  },
  onLoad() {
    let dtime = setTimeout(() => {
      uni.reLaunch({
        url: "/pages/base/index",
      });
      upgrade.isUpdate(() => {
        // 前往升级
        uni.reLaunch({
          url: "/pages/upgrade/index",
        });
      });
    }, 0);
    // #ifdef H5
    uni.reLaunch({
      url: "/pages/base/index",
    });
    clearTimeout(dtime);
    // #endif
    setTimeout(()=>{
      this.show = true
    },4500)
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.start-page {
  height: 100vh;
  .img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
}
</style>