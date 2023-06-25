<template>
  <view class="upgrade-mask d-flex align-center justify-center" v-if="show">
    <view class="upgrade-box w-8/12 bg-panel-4 p-t-md rounded">
      <!-- 进度条 -->
      <view class="progress d-flex justify-between p-x-md" :class="{isDwonload:isDwonload}">
        <view
          class="item w-5 h-20"
          v-for="item in 20"
          :class="{active:progress/20>=item}"
          :key="item"
          :style="{'animation-delay':item*.1+'s'}"
        ></view>
      </view>
      <view class="title fn-center p-y-xs color-warning-dark">V{{version}}</view>
      <view class="overflow-scroll bg-panel-1 m-x-md content" v-html="serverData.update_log">
      </view>
      <view class="d-flex fn-center btn-group" v-if="!isDwonload">
        <view class="btn flex-fill p-md" @click="show=false">取消</view>
        <view class="btn flex-fill p-md color-warning-dark" @click="downloadApp">升级</view>
      </view>
      <view class="d-flex justify-center p-y-xs" v-else>
        <van-loading />
      </view>
    </view>
  </view>
</template>
<script>
import Member from "@/api/member";
export default {
  name: "v-upgrade",
  data() {
    return {
      currentVersion: "1.0.0",
      version: "1.0.0",
      progress: 0,
      isDwonload: false,
      show: false,
      serverData: {},
    };
  },
  methods: {
    // 获取app版本
    getAppVersion() {
      plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
        this.currentVersion = widgetInfo.version;
        this.getServeVersion();
      });
    },
    // 获取服务器app版本
    getServeVersion() {
      Member.getNewestVersion().then((res) => {
        let key = "android";
        if (plus.os.name == "Android") {
          key = "android";
        } else if (plus.os.name == "iOS") {
          key = "ios";
        }
        this.serverData = res.data[key];
        this.version = this.serverData.version;
        this.upgradeType();
      });
    },
    // 判断是否下载和更新方式
    upgradeType() {
      if (this.version != this.currentVersion) {
        this.show = true;
      }
    },
    // 下载app或wgt
    downloadApp() {
      this.isDwonload = true;
      const downloadTask = uni.downloadFile({
        url: this.serverData.url, //仅为示例，并非真实的资源
        success: (downloadResult) => {
          if (downloadResult.statusCode === 200) {
            this.progress = 100;
            this.appInstall(downloadResult);
          }
        },
      });

      downloadTask.onProgressUpdate((res) => {
        if (this.progress >= 100) return;
        this.progress = res.progress;
      });
    },
    // 热更新
    wgtInstall() {},
    // 全包更新
    appInstall(downloadResult) {
      plus.runtime.install(
        downloadResult.tempFilePath,
        {
          force: false,
        },
        () => {
          console.log("install success...");
          plus.runtime.restart();
        },
        (e) => {
          console.error("install fail...");
        }
      );
    },
  },
  created() {
    // #ifdef APP-PLUS
    this.getAppVersion();
    // #endif
  },
};
</script>
<style lang="scss" scoped>
.upgrade-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  animation: pageShow 0.5s forwards;
  .progress {
    transform: skewX(-15deg);
    .item {
      background-color: transparent;
      border: 1px solid $orange-dark;
      &.active {
        background-color: $orange-dark;
      }
    }
    &.isDwonload {
      .item {
        animation: myPing 1s ease-in-out 1s infinite alternate;
      }
    }
  }
  .content {
    height: 150px;
  }
  .btn-group {
    .btn:active {
      background: rgba($gray-4, 0.1);
    }
  }
}
@keyframes myPing {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
@keyframes pageShow {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>