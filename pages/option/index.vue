<template>
  <v-page>
    <v-header :leftClick="()=>_router.replace('/pages/base/index')" :left-arrow="false">
      <template #left>
        <view @click="jumpBack()">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
        </view>
        <view class="fn-20 color-theme-1 m-l-xs" @click="optListShow = true">
          <i class="iconfont">&#xe655;</i>
        </view>
      </template>
      <template #title>
        <view class="head-top">{{ query.pair_time_name }}</view>
      </template>
    </v-header>
    <view class="layout-main">
      <view class="bg-panel-4 p-x-md p-t-md p-b-xs price-data" v-if="false">
        <view class="d-flex justify-between">
          <view class="coin fn-18 color-light">{{ query.pair_time_name }}</view>
          <view
            class="money fn-20"
            :class="lastData.increase >= 0 ? 'color-buy' : 'color-sell'"
          >
            {{ lastData.price }}
            <span class="zf fn-sm">{{ lastData.increaseStr }}</span>
          </view>
        </view>
      </view>
      <van-tabs :border="false" :active="activeTime" animated :ellipsis="false" @change="activeTime = $event.detail.name">
        <van-tab v-for="item in tileList" :name="item.value" :title="item.label" :key="item.label">
        </van-tab>
      </van-tabs>
      <view class="chart-box">
        <!-- 每分钟heightChart -->
        <highchart
          v-show="activeTime == '1'"
          :symbolName="symbolName"
          @newData="newData"
        />
        <!-- 其他 tradingview -->
        <!-- <tv-chart
          class="chart-tradingview"
          @changeInterval="changeInterval"
          :serveSymbolName="symbolName"
          :serveInterval="activeTime"
         
        /> -->
         <iframe  v-if="activeTime != '1'" class="chart-tradingview" :src="`${mobileBase}static/tradingview.html?${
          setQuery(iframeQuery)
        }`" frameborder="0"></iframe>
      </view>
      <view class="option-panel ">
        <van-tabs
          :active="active"
          animated
          class="nav-tab"
          swipeable
          sticky
          offset-top="1.22667rem"
          :ellipsis="false"
          :border="false"
        >
          <van-tab
            v-for="item in funList"
            :title="item.title"
            :key="item.title"
            class="border-t m-t-xs"
          >
            <component
              v-on="{ ...item.on }"
              :ref="item.is"
              v-bind="{ ...item.props }"
              :is="item.is"
              :loading="countDownLoading"
            ></component>
          </van-tab>
        </van-tabs>
      </view>
    </view>
    <!-- 左侧列表弹窗 -->
    <van-popup
      :show="optListShow"
      @close="optListShow = false"
      close-on-popstate
      position="left"
      custom-style="width:70%;height:100%"
    >
      <option-nav-list @close="optListShow = false" @check="changeCoin" />
    </van-popup>
    <!-- 购买的弹窗 -->
    <van-popup
      :show="buyOptShow"
      close-on-popstate
      position="bottom"
      custom-style="width:100%"
      class="option-form"
    >
      <buy-option-form
        @success="resetWaiting"
        @close="buyOptShow = false"
        :currentAndNext="currentAndNext"
        :query="query"
        :type="buyType"
      />
    </van-popup>
  </v-page>
</template>
<script>
import highchart from "./highchart";
import buyOption from "./buy-option";
import waitingDelivery from "./waiting-delivery";
import myDelivery from "./my-delivery";
import deliveryRecord from "./delivery-record";
import buyOptionForm from "./buy-option-form";
import optionNavList from "./option-nav-list";
import Option from "@/api/option";
import { mapState } from "vuex";
import qs from 'qs'
import app from "app.js"
export default {
  components: {
    highchart,
    buyOption,
    waitingDelivery,
    myDelivery,
    deliveryRecord,
    buyOptionForm,
    optionNavList,
  },
  computed: {
    funList() {
      return [
        {
          title: this.$t("option.d4"),
          is: "buy-option",
          on: {
            "buy-show": this.buyShow,
            "change-venue": () => {
              this.resetBill();
              setTimeout(() => {
                this.sceneDetail();
                this.resetWaiting();
              }, 2000);
            },
          },
          props: {
            currentAndNext: this.currentAndNext,
            query: this.query,
          },
        },
        {
          title: this.$t("option.d5"),
          is: "waiting-delivery",
          props: {
            query: this.query,
          },
        },
        {
          title: this.$t("option.d6"),
          is: "my-delivery",
          props: {
            query: this.query,
          },
        },
        {
          title: this.$t("option.d7"),
          is: "delivery-record",
          props: {
            query: this.query,
          },
        },
      ];
    },
    symbolName() {
      if (!this.query.pair_time_name) return "";
      let str = this.query.pair_time_name.split("-")[0];
      return str;
    },
    tileList() {
      let arr = [
        {
          label: "1" + this.$t("option.d8"),
          value: "1",
        },
        {
          label: "5" + this.$t("option.d8"),
          value: "5",
        },
        {
          label: "15" + this.$t("option.d8"),
          value: "15",
        },
        {
          label: "30" + this.$t("option.d8"),
          value: "30",
        },
        {
          label: "1" + this.$t("option.d9"),
          value: "60",
        },
        {
          label: "1" + this.$t("option.e0"),
          value: "1D",
        },
        {
          label: "1" + this.$t("option.e1"),
          value: "1W",
        },
        {
          label: "1" + this.$t("option.e2"),
          value: "1M",
        },
      ];
      return arr;
    },

    activeTimeObj() {
      return this.tileList.find((item) => item.value == this.activeTime);
    },
    ...mapState({
      ws: "ws",
    }),
    iframeQuery(){
      return {
          getLinkUrl:app.baseUrl+'/api/app/option/getKline',
          symbol:this.symbolName,
          theme:'dark',
          ws:app.socketUrl,
          interval:this.activeTime
      }
    },
     mobileBase() {
      // #ifdef APP-PLUS
      if (plus.os.name == "Android") {
        return "";
      } else {
        return this.app.mobile+'/';
      }
      // #endif
      // #ifdef H5
      return '/';
      // #endif
    },
  },
  data() {
    return {
      active: 0,
      activeTime: "1",
      buyOptShow: false,
      optListShow: false,
      timeFilter: false,
      countDownLoading: false,
      list: [],
      lastData: {},
      // 当前和下一场
      currentAndNext: {},
      buyType: 1,
      query: {},
      app
    };
  },
  watch: {
    query() {
      this.sceneDetail();
    },
  },
  methods: {
    setQuery:qs.stringify,
    
    resetWaiting() {
      let waitingDelivery =
        this.$refs["waiting-delivery"] && this.$refs["waiting-delivery"][0];
      if (waitingDelivery) {
        waitingDelivery.reset();
      }
    },
    resetBill() {
      let myDelivery =
        this.$refs["my-delivery"] && this.$refs["my-delivery"][0];
      if (myDelivery) {
        myDelivery.reset();
      }
      let deliveryRecord =
        this.$refs["delivery-record"] && this.$refs["delivery-record"][0];
      if (deliveryRecord) {
        deliveryRecord.reset();
      }
    },
    changeInterval($ev) {
      this.activeTime = $ev;
    },
    buyShow(idx) {
      this.buyType = idx;
      this.buyOptShow = true;
    },
    // 切换币种
    changeCoin(item) {
      this._router.replace({
        path: "/pages/option/index",
        query: {
          pair_time_name: item.pair_time_name,
          pair_id: item.pair_id,
          time_id: item.time_id,
        },
      });
    },
    // 获取最新价
    newData(data) {
      this.lastData = data;
    },
    // 获取当前和下一场
    sceneDetail() {
      let data = {
        pair_id: this.query.pair_id,
        time_id: this.query.time_id,
      };
      this.countDownLoading = true;
      Option.sceneDetail(data)
        .then((res) => {
          let data = res.data;
          data.current_scene.seconds =
            data.current_scene.seconds + Math.random();
          data.next_scene.seconds = data.next_scene.seconds + Math.random();
          this.currentAndNext = data;
          this.countDownLoading = false;
          this.ws.send({ cmd: "sub", msg: "sceneListNewPrice" });
        })
        .catch(() => {
          this.countDownLoading = false;
        });
    },
	jumpBack(){
		this.$router.push({path:'/pages/base/index?tel=option-list'});
		// $back(1);
	}
  },
  onUnload() {
    this.ws.send({ cmd: "unsub", msg: "sceneListNewPrice" });
  },
  onLoad(query) {
    this.query = query;
    this.sceneDetail();
    setTimeout(() => {
      this.resetBill();
    }, 3000);
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.price-data {
  position: relative;
  .filter {
    label {
      display: block;
      .button {
        border: none;
        background: none;
        &:active {
          color: $theme-1;
        }
      }
      input {
        display: none;
      }

      .filter-panel {
        position: absolute;
        top: 103%;
        left: $padding-md;
        right: $padding-md;
        overflow: hidden;
        z-index: 99;
        button {
          background: none;
          border: none;
          &.active,
          &:active {
            color: $white;
          }
        }
      }
    }
  }
}
.chart-box {
  height: 340px;
}
.chart-tradingview {
  height: 100%;
  width: 100%;
}
.option-form{
  /deep/ .van-popup{
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
</style>