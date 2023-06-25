<template>
    <view>
        <view class="icon fn-center m-t-md">
            <img src="static/img/Turn.png" @click="$emit('close')" class="w-30" alt="">
        </view>
        <view class="title fn-15 p-y-sm p-x-md fn-center">
            {{$t('option.a5')}}（{{query.pair_time_name}}）{{$t('option.a0')}} &nbsp;
            <text :class="typeObj.color">{{typeObj.typeText}}</text>
        </view>
        <view class="d-flex justify-between align-center bg-panel-4 p-x-md border-t border-b p-y-xs">
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
        <view class="form-item  m-y-md">
            <view class="label p-l-md fn-13 color-light m-b-xs">{{$t('option.b1')}}</view>
            <view class="box  income-box p-l-md">
                <view class="item  fn-center d-inline-block rounded-xs bg-panel-4 w-80 m-r-md" :class="{active:rangeUuid==item.uuid}" v-for="item in (typeObj.rangeList||[])" :key="item.uuid" @click="rangeUuid=item.uuid">
                    <view class="label p-y-xs color-light fn-11">{{typeObj.direction}}</view>
                    <!-- <view class="color-danger fn-16"> {{type==2?'±':'≥'}}{{item.range}}%</view> -->
                    <view class="income fn-10 color-light bg-panel-1">{{$t('option.b2')}}{{item.odds*100}}%</view>
                    <img class="tips w-22" src="static/img/active_tips.png"/>
                </view>
            </view>
        </view>
        <view class="form-item p-x-md m-t-md">
            <view class="label fn-13 color-light m-b-xs">{{$t('option.b3')}}</view>
            <view class="d-flex p-x-xs rounded-xs">
                <v-picker :list="coinList" range-value="id" range-label="coin_name" v-model="activeCoinId" class="form-input p-y-xs w-80 m-r-xs ">
                    <view class="d-flex align-center justify-between">
                        {{activeCoin.coin_name}}
                        <van-icon name="arrow-down" />
                    </view>
                </v-picker>
                <view class="border-b flex-fill">
                    <v-input :placeholder="$t('option.b4')" v-model="num" type="number" class="color-light form-input w-max p-y-xs d-flex" />
                </view>
            </view>
        </view>
        <view class="p-x-xs d-flex justify-between p-md border-b select-amount">
            <view class="item bg-panel-4 color-light fn-13  fn-center rounded-xs min-w-72" @click="num=item" v-for="item in selectAmount" :key="item">
                {{item}}
            </view>
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
                    typeObj.btn = "blue";
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
            limitCharge: 0,
            selectAmount:[
              100,200,300,1000
            ]
        };
    },
    methods: {
        getLimitCharge() {
        Option.limit_charge().then(res => {
            console.log(res, res.data)
            this.limitCharge = res.data
        })
        },
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
                .catch(() => { });
        },
        // 获取期权交易币种
        getBetCoinList() {
            Option.getBetCoinList()
                .then((res) => {
                    this.coinList = res.data;
                    this.activeCoinId = this.coinList[0].id;
                    this.checkCoin(this.coinList[0]);
                })
                .catch(() => { });
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
                .catch(() => { });
        },
        // 购买
        buy() {
            if(this.num < this.limitCharge) {
                return this.$toast(`Bet amount must be >${this.limitCharge} USDT`);
            }
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
        this.getLimitCharge();
    },
};
</script>
<style lang="scss" scoped>
::v-deep .van-step--horizontal .van-step__circle-container {
    background: transparent;
}
.income-box {
    width: 100%;
    white-space: nowrap;
    overflow: auto;
    box-sizing: border-box;
    .item{
       overflow: hidden;
       position: relative;
       box-sizing: border-box;
      .income{
        padding: 2px 0;
      }
      .tips{
        position: absolute;
        top: 0;
        right: 0;
        display: none;
      }
      &.active{
        border: 1px solid $red;
        .tips{
          display: block;
        }
      }
    }
}
.select-amount{
  .item{
    padding: 5px 0;
  }
}
</style>