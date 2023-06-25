<template>
  <view>
    <view class="title color-light fn-22 p-y-sm p-x-md">
      {{$t('option.a5')}}（{{query.pair_time_name}}）{{$t('option.a0')}} &nbsp;
      <text :class="typeObj.color">{{typeObj.typeText}}</text>
    </view>
    <view class="d-flex justify-between align-center p-x-md border-t border-b p-y-xs">
      <view>
        {{current_scene.begin_time_text}}
        <van-tag plain v-if="type==1" type="success">{{current_scene.status_text}}</van-tag>
        <van-tag plain v-else-if="type==2" type>{{current_scene.status_text}}</van-tag>
        <van-tag plain v-else-if="type==3" type="danger">{{current_scene.status_text}}</van-tag>
      </view>
      <view>
        <van-count-down class="color-default" :time="current_scene.lottery_time*1000" />
      </view>
    </view>
    <view class="form-item p-x-md m-y-md">
      <view class="label fn-lg color-light m-b-xs">{{$t('option.b1')}}</view>
      <v-picker class="form-input p-y-xs bg-panel-4 p-x-xs rounded-xs" :list="rangeList" v-model="rangeUuid">
        <view class="d-flex justify-between align-center">
          <view class="fn-lg color-light">
            <text
              :class="typeObj.color"
            >{{typeObj.direction}} | {{type==2?'±':'≥'}}{{activeRange.range}}%</text>
            ({{$t('option.b2')}}：
            <text class="color-warning-dark">{{expected(num,activeRange.odds)}}</text>)
          </view>
          <view>
            <van-icon name="arrow-down" />
          </view>
        </view>
      </v-picker>
    </view>
    <view class="form-item p-x-md m-t-md">
      <view class="label fn-lg color-light m-b-xs">{{$t('option.b3')}}</view>
      <view class="d-flex bg-panel-4 p-x-xs rounded-xs">
        <v-picker
          :list="coinList"
          range-value="id"
          range-label="coin_name"
          v-model="activeCoinId"
          class="form-input p-y-xs w-80 m-r-xs "
        >
          <view class="d-flex align-center justify-between">
            {{activeCoin.coin_name}}
         
          <van-icon name="arrow-down" />
           </view>
        </v-picker>
        <view class="border-b flex-fill">
          <v-input
            :placeholder="$t('option.b4')"
            v-model="num"
            type="number"
            class="color-light form-input w-max p-y-xs d-flex"
          />
        </view>
      </view>
    </view>
    <view class="p-x-xs">
      <van-steps :active="moneyStep" :steps="[
        {
          text:'0%'
        },
        {
          text:''
        },
        {
          text:''
        },
        {
          text:''
        },
        {
          text:'100%'
        },
      ]">
        <!-- <van-step>0%</van-step>
        <van-step></van-step>
        <van-step></van-step>
        <van-step></van-step>
        <van-step>100%</van-step> -->
      </van-steps>
    </view>
    <view class="fn-sm d-flex justify-between p-x-md p-y-xs">
      <view>{{$t('option.b5')}}：{{activeCoin.balance}}</view>
      <view>{{$t('option.b6')}}：{{expected(num,activeRange.odds)}}{{activeCoin.coin_name}}</view>
    </view>

    <view class="p-md">
      <v-button block :type="typeObj.btn" class="w-max rounded-lg" @click="buy" ref="btn">{{$t('option.b7')}}</v-button>
    </view>
  </view>
</template>
<script>
import Option from "@/api/option";
import math from "@/utils/class/math";
export default {
  props: ["currentAndNext", "type", "query"],
  watch: {
    type() {
      if (!this.typeObj.rangeList[0]) return;
      this.rangeUuid = this.typeObj.rangeList[0].uuid;
    },
    query() {
      this.getOddsList();
    },
    currentAndNext() {
      this.getOddsList();
    },
  },
  computed: {
    // 类型
    typeObj() {
      let typeObj = new Object();
      switch (this.type) {
        case 1:
          typeObj.typeText = this.$t("option.b8");
          typeObj.direction = this.$t("option.a2");
          typeObj.color = "color-buy";
          typeObj.btn = "green";
          typeObj.rangeList = this.detail.up_odds || [];
          break;
        case 2:
          typeObj.typeText = this.$t("option.b9");
          typeObj.direction = this.$t("option.b0");
          typeObj.btn = "info";
          typeObj.rangeList = this.detail.draw_odds || [];
          break;
        case 3:
          typeObj.typeText = this.$t("option.c0");
          typeObj.direction = this.$t("option.a3");
          typeObj.color = "color-sell";
          typeObj.btn = "red";
          typeObj.rangeList = this.detail.down_odds || [];
          break;
      }
      return typeObj;
    },
    // 选中倍率
    activeRange() {
      return (
        this.typeObj.rangeList.find((item) => item.uuid == this.rangeUuid) || {}
      );
    },
    // 当前场次
    current_scene() {
      return this.currentAndNext.current_scene || {};
    },
    // 下一场
    next_scene() {
      return this.currentAndNext.next_scene || {};
    },
    // 选中币种
    activeCoin() {
      return this.coinList.find((item) => item.id == this.activeCoinId) || {};
    },
    // 使用资产所占总资产额度
    moneyStep() {
      if (!this.activeCoin.balance || !this.activeCoin.balance * 1) return 3;
      let rate = this.num / (this.activeCoin.balance * 1);
      if (rate < 0.25) return 0;
      if (rate < 0.5) return 1;
      if (rate < 0.75) return 2;
      if (rate < 1) return 3;
      return 4;
    },
    // 涨跌幅列表
    rangeList() {
      return this.typeObj.rangeList.map((item) => {
        return {
          value: item.uuid,
          label: `${this.typeObj.typeText}≥${item.range}% ${this.$t("option.a4")} ${item.odds}`,
        };
      });
    },
  },
  data() {
    return {
      detail: {},
      rangeUuid: "",
      num: "",
      coinList: [],
      activeCoinId: "",
    };
  },
  methods: {
    // 获取预计收益
    expected(num1, num2) {
      if (!num1 || !num2) return "0";
      return math.multiple(num1, num2);
    },
    getOddsList() {
      let data = {
        pair_id: this.query.pair_id,
        time_id: this.query.time_id,
      };
      Option.getOddsList(data).then((res) => {
        this.detail = res.data;
        this.rangeUuid = this.typeObj.rangeList[0].uuid;
      });
    },
    selectCoin() {
      let arr = this.coinList.map((item) => {
        return {
          value: item.id,
          label: item.coin_name,
        };
      });
      this.$picker(arr, { value: this.activeCoinId })
        .then((res) => {
          this.activeCoinId = res;
          this.checkCoin(this.activeCoin);
        })
        .catch(() => {});
    },
    // 获取期权交易币种
    getBetCoinList() {
      Option.getBetCoinList()
        .then((res) => {
          this.coinList = res.data;
          this.activeCoinId = this.coinList[0].id;
          this.checkCoin(this.coinList[0]);
        })
        .catch(() => {});
    },
    // 选中交易币种 (需要登录)
    checkCoin(item) {
      let data = {
        coin_id: item.coin_id,
      };
      if (!localStorage.getItem("token")) return;
      Option.getUserCoinBalance(data)
        .then((res) => {
          this.$set(item, "balance", res.data.usable_balance);
        })
        .catch(() => {});
    },
    // 购买
    buy() {
      let data = {
        bet_amount: this.num,
        bet_coin_id: this.activeCoinId,
        odds_uuid: this.rangeUuid,
        scene_id: this.next_scene.scene_id,
      };
      Option.betScene(data, { btn: this.$refs.btn }).then(() => {
        this.$emit("close");
        this.$emit("success");
        this.num = "";
        this.$toast.success(this.$t("option.c1"));
        this.checkCoin(this.activeCoin);
      });
    },
  },
  created() {
    this.getOddsList();
    this.getBetCoinList();
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-step--horizontal .van-step__circle-container {
  background: transparent;
}
</style>