<template>
  <v-page class="income-page color-plain">
    <v-header class="nav-tab border-b-0 color-plain" :title="''"></v-header>
    <swiper class="h-max w-max" :indicator-dots="true" indicator-color="white">
      <swiper-item
        class="swipe-item color-plain overflow-scroll"
        :style="`background-image:url(${item.bg_img})`"
        v-for="item in imgList"
        :key="item.peri_img"
      >
        <view
          class="padding-nav"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <view class="fn-right p-t-md p-x-25 h-20"></view>
          <view class="p-x-25 fn-30 fn-bold top-tips">
            <img class="w-max" :src="item.text_img" alt="" />
          </view>
          <view class="p-x-25" style="position: relative; z-index: 12">
            <view class="p-t-lg fn-20 d-flex ">
              <view>
                {{ $t("contract.h0") }}
              </view>
              <view class="w-100"></view>
              <view class="d-inline-block fn-13 lever m-l-lg">
                <view class="lever-content">
                  {{query.label|| (query.side == 1 ? $t("contract.g0") : $t("contract.g1"))
                  }}{{ query.lever_rate }}X
                </view>
              </view>
            </view>
            <view class="price-box">
              <span class="price">{{ numMap.type }}{{ numMap.num }}{{ numMap.dec }}</span>
              <span class="unit fn-26">%</span>
            </view>
            <view class="data-item m-y-sm p-t-md">
              <view class="label fn-12">{{ $t("exchange.a2") }}</view>
              <view class="num fn-22 blue">{{ query.pair_name }}</view>
            </view>
            <view class="data-item m-y-sm p-t-md">
              <view class="label fn-12">{{ $t("contract.k0") }}</view>
              <view class="num fn-22 blue">{{ data.price1 * 1 }}</view>
            </view>
            <view class="data-item m-y-sm p-t-md" v-if="query.newPrice">
              <view class="label fn-12">{{ $t("contract.k1") }}</view>
              <view class="num fn-22 blue">{{ data.price2 * 1 }}</view>
            </view>
            <view class="data-item m-y-sm p-t-md" v-else>
              <view class="label fn-12">{{ $t("contract.j7") }}</view>
              <view class="num fn-22 blue">{{ data.price2 }}</view>
            </view>
            <view class="code-body d-inline-block">
              <view class="code-box">
                <v-qr
                  :text="detail.invite_url"
                  class="share-code w-78 h-78"
                ></v-qr>
              </view>
              <view class="blue fn-12 fn-center m-t-xs">
                {{ $t("contract.k2") }}
              </view>
            </view>
            <view class="fn-center">{{ $t("contract.k6") }}</view>
          </view>
          <img class="bg-img" :src="item.peri_img" alt="" />
        </view>
      </swiper-item>
    </swiper>
  </v-page>
</template>

<script>
import Profile from "@/api/profile";
import Contract from "@/api/contract";
import { mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      detail: {},
      query: {},
      data: {},
      dTime: null,
      imgList: [],
    };
  },
  created() {
    this.generalizeInfo();
    if (this.query.entrust_id) {
      this.entrustShare();
    } else if (this.query.position_side) {
      this.positionShare();
    }
  },
  computed: {
    ...mapState({
      logoMap: "logoMap",
    }),
    // 收益率
    numMap() {
      let strs = this.query.profitRate.replace("%", "").split(".");
      return {
        type: strs[0] >= 0 ? "+" : "",
        num: strs[0],
        dec: strs[1] ? `.${strs[1].substring(0, 3)}` : "",
      };
    },
  },
  onLoad(query) {
    this.query = query;
  },
  methods: {
    generalizeInfo() {
      Profile.generalizeInfo().then((res) => {
        this.detail = res.data;
      });
    },
    entrustShare() {
      Contract.entrustShare({
        symbol: this.query.symbol,
        entrust_id: this.query.entrust_id,
      }).then((res) => {
        this.data = res.data;
        this.imgList = res.data.share_imgs;
      });
    },
    positionShare() {
      Contract.positionShare({
        symbol: this.query.symbol,
        position_side: this.query.position_side,
      }).then((res) => {
        this.data = res.data;
        this.imgList = res.data.share_imgs;
      });
    },
    // -----长按事件----
    touchstart() {
      clearTimeout(this.dTime);
      this.dTime = setTimeout(() => {
        this.bitmap();
      }, 600);
    },
    touchmove() {
      clearTimeout(this.dTime);
    },
    touchend() {
      clearTimeout(this.dTime);
    },
    bitmap() {
      /* eslint-disable */
      let self = this;
      if (!plus) return;
      let pages = getCurrentPages();
      let page = pages[pages.length - 1];
      let ws = page.$getAppWebview();
      // 截图
      let bitmap1 = new plus.nativeObj.Bitmap();
      // 将webview内容绘制到Bitmap对象中
      ws.draw(
        bitmap1,
        function (e) {
          console.log("bitmap1绘制图片成功");
          bitmap1.save("_doc/share.png", {}, function (i) {
            plus.gallery.save(
              i.target,
              function (d) {
                //销毁Bitmap图片
                bitmap1.clear();
                self.$toast(self.$t("contract.k4"));
              },
              function (e) {
                //销毁Bitmap图片
                self.$toast(self.$t("contract.k5"));
                bitmap1.clear();
              }
            );
          });
        },
        function (e) {
          self.$toast(self.$t("contract.k4"));
        }
      );
      /* eslint-disable */
    },
  },
};
</script>

<style scoped lang="scss">
.color-plain {
  color: $white !important;
}
.nav-tab {
  position: absolute;
  width: 100%;
  background: transparent;
  /deep/ {
    .van-hairline--bottom:after {
      border-bottom-width: 0px;
    }
    .van-nav-bar {
      background-color: transparent;
    }
  }
}
::v-deep .van-nav-bar__title {
  color: $white;
}
::v-deep .van-nav-bar .van-icon {
  color: $white;
}
.p-x-25 {
  padding-left: 25px;
  padding-right: 25px;
}
.blue {
  color: #00daff;
}
.income-page {
  background: #170043 center/100% 100%;
  position: relative;
  .top-tips {
    word-spacing: 20px;
    color: transparent;
  }
  .lever {
    background: linear-gradient(to right, #00daff, #9e61ff);
    padding: 1px;
    border-radius: 4px;
    .lever-content {
      padding: 4px 6px;
      border-radius: 4px;
      background: #170043;
    }
  }
  .swipe-item {
    background-position: top center;
    background-size: cover;
  }
  .price-box {
    .price {
      font-size: 56px;
      color: transparent;
      background: linear-gradient(to right, #00daff, #9e61ff);
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
  .data-item {
    position: relative;
    &::before {
      display: block;
      position: absolute;
      content: "";
      width: 25px;
      height: 3px;
      background: $white;
      top: 0;
    }
  }
  .code-body {
    .code-box {
      display: inline-block;
      padding: 4px;
      background: $white;
    }
  }
  .bg-img {
    max-height: 400px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>