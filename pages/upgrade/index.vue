<template>
  <van-popup class="upgrade" :show="show" @click-overlay="back">
    <view class="upgrade-box d-flex flex-col overflow-hidden">
      <view class="overflow-scroll p-md flex-fill">
        <view>version：{{ detail.version }}</view>
        <view v-html="detail.update_log"></view>
      </view>
      
      <view class="d-flex justify-center p-y-md" v-if="load">
        <van-circle
          :value="progress"
          color="#ea3131"
          :rate="100"
          size="40"
          :text="progress + '%'"
        />
      
      </view>
      <view
        v-else-if="detail.url"
        class="fn-center p-md bg-theme-1 color-plain"
        @click="toUp"
      >
        升级
      </view>
    </view>
  </van-popup>
</template>
<script>
import upgrade from "@/plugins/upgrade.js";
export default {
  data() {
    return {
      detail: {
        is_must: 1,
      },
      progress: 0,
      load: false,
      show: false,
    };
  },
  created() {
    this.show = true;
    upgrade.isUpdate((data) => {
      this.show = true;
      if (upgrade.osName() == "Android") {
        this.detail = data.android;
      } else if (upgrade.osName() == "iOS") {
        this.detail = data.ios;
      }
    });
  },
  methods: {
    async toUp() {
      if (upgrade.osName() == "Android") {
        let path = await upgrade.downloadFile({
          url: this.detail.url,
          before: () => {
            this.load = true;
            this.progress = 0;
          },
          update: (e) => {
            this.progress = e;
          },
          after() {
            this.load = false;
          },
        });
        upgrade.install(path);
      } else if (upgrade.osName() == "iOS") {
        upgrade.install(this.detail.url);
      }
    },
    back() {
      if (this.detail.is_must != 1) {
        uni.reLaunch({
          url: "/",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ uni-canvas{
  width: 90rpx;
  height: 90rpx;
}
/deep/ .uni-cover-view{
  font-size: 24rpx;
}
.upgrade {
  /deep/ .van-popup {
    background-color: transparent !important;
  }
}
.upgrade-box {
  width: 275px;
  height: 350px;
  background: #fff url("../../assets/img/shengji.png") no-repeat center top;
  background-size: 100% auto;
  box-sizing: border-box;
  border-radius: 23px;
  padding-top: 125px;
  overflow: hidden;
}
</style>