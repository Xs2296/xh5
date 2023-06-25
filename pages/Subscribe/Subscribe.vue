<template>
  <view class="d-flex flex-col">
    <view style="height: var(--status-bar-height)"></view>
    <view class="d-flex justify-center p-t-md">
      <view class="d-flex bg-form-panel-4 rounded-lg overflow-scroll">
        <view
          :class="{ 'bg-gradient-blue color-plain rounded-lg': tab == 0 }"
          @click="tab = 0"
          class="p-y-xs p-x-lg min-w-60 fn-center"
          >{{$t('exchange.a0')}}</view
        >
        <view
          :class="{ 'bg-gradient-blue color-plain rounded-lg': tab == 1 }"
          @click="tab = 1"
          class="p-y-xs p-x-lg min-w-60 fn-center"
          v-if="true"
          >{{$t('exchange.a1')}}</view
        >
      </view>
    </view>
    <!-- 币币 -->
    <template v-if="tab == 0">
      <!-- 币币交易 -->
      <view
        class="coin-exchange-box flex-fill d-flex flex-col overflow-hidden border-b"
      >
        <van-tabs
          :ellipsis="false"
          :border="false"
          :active="tab1"
          @change="tab1 = $event.detail.name"
        >
          <van-tab class="height-max" :title="$t('exchange.a3')"></van-tab>
          <van-tab class="height-max" :title="$t('exchange.a4')"></van-tab>
          <van-tab class="height-max" :title="$t('exchange.a5')"></van-tab>
        </van-tabs>
        <!-- 交易表单 -->
        <exchange-transaction
          @symbol="symbolListShow = true"
          :marketList="marketList"
          :collect="collect"
          :query="query"
          @option="option"
          :isShow="isShow"
          class="layout-main"
          v-if="tab1 == 0 && query.symbol"
        />
        <!-- 当前委托 -->
        <current-commission class="layout-main" v-if="tab1 == 1" />
        <!-- 历史委托 -->
        <history-commisson class="layout-main" v-if="tab1 == 2" />
      </view>
    </template>
    <!-- 申购 -->
    <template v-if="tab == 1">
      <purchase />
    </template>
    <!-- 左侧的弹窗 -->
    <van-popup
      :show="symbolListShow"
      @close="symbolListShow = false"
      close-on-popstate
      position="left"
      custom-style="height:100%;width:70%"
    >
      <symbol-list
        :collect="collect"
        :marketList="marketList"
        @check-symbol="checkSymbol"
      />
    </van-popup>
    <van-toast id="van-toast" />
  </view>
</template>
<script>
import exchangeTransaction from "@/pages/exchange/exchange-transaction";
import currentCommission from "@/pages/exchange/current-commission";
import historyCommisson from "@/pages/exchange/history-commisson";
import symbolList from "@/pages/exchange/symbol-list";
import purchase from "@/pages/purchase/index";
import Market from "@/api/market";
import Home from "@/api/home";
import { mapState } from "vuex";
export default {
  name: "exchange-operation",
  props: ["isShow"],
  components: {
    exchangeTransaction,
    currentCommission,
    historyCommisson,
    symbolList,
    purchase,
  },
  data() {
    return {
      tab: 1,
      tab1: 0,
      symbolListShow: false,
      marketList: [],
      collect: [],
      query: {},
      msg: "exchangeMarketList",
    };
  },
  watch: {
    isShow(n) {
      if (n) {
        setTimeout(() => {
          this.ws.send({
            cmd: "sub",
            msg: this.msg,
          });
        }, 200);
      } else {
        this.ws.send({
          cmd: "unsub",
          msg: this.msg,
        });
      }
    },
  },
  computed: {
    ...mapState({
      ws: "ws",
    }),
    isLogin() {
      return Boolean(uni.getStorageSync("token"));
    },
  },
  methods: {
    // 获取市场行情
    getMarketList() {
      Market.getMarketList().then((res) => {
        this.marketList = res.data;
        this.$nextTick(() => {
          this.linkSocket();
        });
        if (!this.query.symbol) {
          let parentItem = this.marketList[0].marketInfoList[0];
          this.checkSymbol(parentItem);
        }
      });
    },
    // 获取自选列表
    getCollect() {
      if (!this.isLogin) return;
      Home.getCollect()
        .then((res) => {
          this.collect = res.data || [];
        })
        .catch(() => {});
    },
    //
    checkSymbol(obj) {
      this.symbolListShow = false;
      if (obj.pair_name == this.query.symbol) return;
      this.query = { symbol: obj.pair_name };
      // this._router.replace({ query: { symbol: obj.pair_name } });
    },
    // 添加自选
    option() {
      let data = {
        pair_name: this.query.symbol,
      };
      Home.option(data)
        .then((res) => {
          this.getCollect();
          if (res.data) {
            this.$toast(this.$t("exchange.a6"));
          } else {
            this.$toast(this.$t("exchange.a7"));
          }
        })
        .catch(() => {});
    },
    // 链接socket
    linkSocket() {
      let msg = this.msg;
      this.ws.send({
        cmd: "sub",
        msg,
      });
      this.ws.on("message", (res) => {
        let { data, sub } = res;
        if (sub == msg) {
          this.marketList = data;
        }
      });
    },
    // 获取参数
    getQuery() {
      let curPage = getCurPage();
      let curParam = curPage.options || curPage.$route.query;
      function getCurPage() {
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        return curPage;
      }
      return curParam;
    },
  },
  created() {
    this.query = this.getQuery();
    if (this.query.symbol) {
      this.query.symbol = decodeURIComponent(this.query.symbol);
    }
    this.getMarketList();
    this.getCollect();
  },
  destroyed() {
    // this.ws.send({
    //     cmd: "unsub",
    //     msg: 'exchangeMarketList',
    //   })
  },
};
</script>
<style lang="scss" scoped>
</style>