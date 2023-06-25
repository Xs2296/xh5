<template>
  <v-page>
    <v-header class="nav-head" :border="false" :title="$t('invite.a6')"></v-header>

    <view class="layout-main">
      <view class="top color-plain">
        <view :style="{height:taskHeight+'px'}"></view>

        <view class="leveup m-md p-md bg-light rounded-lg">

          <view class="fn-center" style="padding: 20px">
            <v-qr :text="detail.invite_url" class="search-code"></v-qr>
          </view>

          <view class="fn-22 color-theme-1 d-flex justify-center m-y-lg">
            {{ detail.invite_code }}
            <i class="iconfont" @click="$copy(detail.invite_code)">&#xe706;</i>
          </view>

          <view class="group d-flex m-t-xs">
            <button
                type="blue"
                class="btn flex-fill color-plain rounded-sm h-34 btn-1 m-r-md fn-md bg-gradient-blue"
                @click="downImg"
            >{{ $t('invite.a7') }}
            </button>

            <button
                type="green"
                class="btn flex-fill rounded-sm color-plain h-34 btn-2 fn-md bg-gradient-green"
                @click="$copy(detail.invite_url)"
            >{{ $t('invite.a8') }}
            </button>
          </view>
        </view>
      </view>

      <!-- 推广 -->
      <view class="d-flex justify-between m-b-lg m-x-lg fn-18">
        <span>{{ $t('invite.b0') }}（{{ detail.invite_nums }} {{ $t('invite.b1') }}） </span>
      </view>

      <!-- 记录 -->
      <view class="bill p-x-md">
        <view class="d-flex justify-between p-x-md p-y-xs color-light bg-panel-3 rounded-sm m-y-md"
              v-for="item in detail.users" :key="item.account">
          <view>
            {{ item.account || item.username }}
          </view>
          <view>{{ item.times }}</view>
        </view>
      </view>
    </view>
  </v-page>
</template>
<script>
import Profile from "@/api/profile";
import app from "@/app";
import VQr from "../../layout/vQr.vue";

export default {
  components: {VQr},
  data() {
    return {
      active: 0,
      detail: {},
      imgBase64: undefined,
      app,
      taskHeight: 0
    };
  },
  computed: {},
  methods: {
    // 获取推广记录
    generalizeInfo() {
      Profile.generalizeInfo().then((res) => {
        this.detail = res.data;
      });
    },
    downImg() {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      var bitmap = null;
      var currentWebview = page.$getAppWebview();
      bitmap = new plus.nativeObj.Bitmap("amway_img");
      // 将webview内容绘制到Bitmap对象中
      currentWebview.draw(
          bitmap,
          function () {
            bitmap.save(
                "_doc/a.jpg",
                {},
                function (i) {
                  uni.saveImageToPhotosAlbum({
                    filePath: i.target,
                    success: function () {
                      bitmap.clear(); //销毁Bitmap图片
                      uni.showToast({
                        title: "Saved successfully",
                        mask: false,
                        duration: 1500,
                      });
                    },
                  });
                },
                function (e) {
                  console.log("Save failed：" + JSON.stringify(e));
                }
            );
          },
          function (e) {
            console.log("Save failed：" + JSON.stringify(e));
          }
      );
    },
    callback($ev) {
      this.imgBase64 = $ev;
    },
    getTaskHeight() {
      uni.getSystemInfo({
        success: (obj) => {
          this.taskHeight = obj.statusBarHeight
        }
      })
    }
  },
  onLoad() {
    this.generalizeInfo();
    this.getTaskHeight()
  },
};
</script>
<style lang="scss" scoped>
// .nav-head {
//   background: transparent;
//   ::v-deep .van-nav-bar{
// 	  background-color: inherit;
// 	  .van-nav-bar__title,.van-icon{
// 		   color:$plain;
// 	  }
//   }
//   // position: absolute;
//   left: 0;
//   width: 100%;
//   top: 0;
//   z-index: 99;

//   &::after {
//     border-bottom: none;
//   }
// }
.bg-inv {
  background: $white url("../../static/img/bgb3.png") no-repeat center top;
  background-size: 100% 100%;
}

.top {
  // background: linear-gradient(180deg, #c86b49, $theme-1);
  padding-bottom: 20px;

  .title {
    padding-top: 45px;
  }

  .leveup {
    background: $white url("../../static/img/bgshare.png") no-repeat center top;

    .search-code {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border: 4px solid $white;
    }

    background-size: 100% 100%;
    box-sizing: border-box;

    .apply-btn {
      border-radius: 50px;
      border: none;
      width: 120px;
      background: linear-gradient(180deg, #ffd01e, #ff9d2c);
      box-shadow: 1px 1px 6px 1px #c8c9cc;
    }
  }
}

.invite-code {
  margin-top: -45px;

  .group {
    .btn-1 {
      border: 0;
      // background: linear-gradient(90deg, $theme-1, #ff9d2c);
    }

    .btn-2 {
      border: 0;
      // background: linear-gradient(90deg, $blue, #6dabe8);
    }
  }
}
</style>
