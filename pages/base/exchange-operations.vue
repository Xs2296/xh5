<template>
  <view class="d-flex flex-col">
	  
	  
	  <uni-shadow-root data-v-4b02dd31="" class="vant-nav-bar-index">
		  
		  <uni-view class="van-nav-bar custom-class van-hairline--bottom" style="z-index: 1; padding-top: 0px;">
			  
			  <uni-view class="van-nav-bar__content">
			<div class="van-nav-bar__left">
				<uni-shadow-root class="vant-icon-index">
					<a class="van-nav-bar__arrow van-icon van-icon-arrow-left" style="font-size: 16px;" href="javascript:history.back(-1)">
						
					</a>
					</uni-shadow-root>
					<!----></div>
			<uni-view class="van-nav-bar__title title-class van-ellipsis">{{$t('exchange.a1')}}</uni-view>
			</uni-view>
			</uni-view>
			</uni-shadow-root>
    <!-- 币币 -->
    <template v-if="tab == 0">
  <purchase />
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
  name: "exchange-operations",
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
      tab: 0,
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