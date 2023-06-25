<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('exchange.a1')" :leftClick="() => _router.replace('/pages/base/index')"></v-header>
    <view class="layout-main">
      <!-- 申购数据和申购周期 -->
      <view class="m-md bg-form-panel-4 rounded p-md fn-center d-flex">
        <view class="w-6/12 d-flex align-center">
          <van-circle size="130" class="w-max" stroke-width="6" :value="detail.info.status*25"
                      :color="{ '0%': '#27CAE0', '100%': '#4653EF' }">
            <view class="color-light fn-center fn-10">
              <view class="label m-b-xs color-default">{{ $t("purchase.a0") }}</view>
              <view class="fn-11">1 USDT≈</view>
              <view class="fn-11">
                <text class="fn-16">{{ detail.danjia }}</text>
              </view>
              <view class="fn-center fn-15 color-success">
                {{ detail.info.coin_name }}
              </view>
            </view>
          </van-circle>
        </view>
        <view>
          <view class="m-b-xs">
            <view class="label fn-10">{{ $t("purchase.a1") }}</view>
            <view class="color-light">{{ detail.info.subscribe_currency }}</view>
          </view>
          <view class="m-b-xs">
            <view class="label fn-10">{{ $t("purchase.a3") }}</view>
            <view class="color-light">{{ detail.info.start_subscription_time }}</view>
          </view>
          <view class="m-b-xs">
            <view class="label fn-10">{{ $t("purchase.a4") }}</view>
            <view class="color-light">{{ detail.info.end_subscription_time }}</view>
          </view>
        </view>
      </view>
      <!-- 申购 -->
      <view class="m-md bg-panel-4 rounded p-md box-shadow">
        <view class="title p-b-xs border-b">{{ $t("purchase.a5") }}</view>
        <view class="m-y-md">
          <view class="label">{{ $t("purchase.a1") }}</view>
          <v-picker :list="coinList" v-model="coin" range-label="coin_name" range-value="coin_name"
                    class="border-b p-y-xs color-light">
            <v-input disabled :value="activeCoin.coin_name" :placeholder="$t('purchase.a6')">
              <template #right>
                <i class="iconfont">&#xe6e9;</i>
              </template>
            </v-input>
          </v-picker>
          <view class="tips m-t-xs fn-sm d-flex justify-between color-sell">
            <view>{{ $t('base.e1') }} {{ detail.money }}</view>
          </view>
        </view>
        <view class="m-y-md">
          <view class="label">{{ $t("purchase.a7") }}</view>
          <view class="border-b p-y-xs color-light">
            <v-input type="number" v-model="num" :placeholder="$t('purchase.a8')">
              <template #right>
                <view class="color-success" @click="doAll()">
                  {{ $t("purchase.a9") }}
                </view>
              </template>
            </v-input>
          </view>
        </view>
        <v-button block class="w-max rounded-lg" type="green" ref="btn" @click="ifSubscribeNow">
          {{ $t("purchase.b0") }}
        </v-button>
      </view>
      <!-- 项目详情 -->
      <view class="m-md bg-panel-4 rounded p-md box-shadow">
        <view class="title p-b-xs border-b">{{ $t("purchase.b6") }}</view>
        <view class="m-t-md edit-content" style="overflow:auto;max-height:400upx;margin-bottom:70upx;"
              v-html="detail.info.project_details"></view>
      </view>

      <view class="m-md bg-panel-4 rounded p-md box-shadow">
        <view class="title d-flex justify-between  p-y-xs align-center color-light">
          <span class="fn-lg">{{ $t('pledge.record') }}</span>
        </view>
        <view class="" style="margin-top: 20px">
          <table class="w-max">
            <thead class="p-x-md">
            <tr class="fn-sm p-x-md">
              <th class="p-b-md" style="width: 20%;">{{ $t('purchase.a1') }}</th>
              <th class="p-b-md" style="width: 20%;">{{ $t('purchase.a7') }}</th>
              <th class="p-b-md" style="width: 20%;">{{ $t('common.money') }}</th>
              <th class="p-b-md" style="width: 40%;">{{ $t('assets.c9') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="color-light trChange p-x-md" v-for="(item) in list" :key="item.id">
              <td style="text-align: center">
                {{ item.coin }}
              </td>
              <td style="text-align: center">
                <view>{{ item.amount }}</view>
              </td>
              <td style="text-align: center">
                {{ item.money }}<span class="color-default">({{ item.wallet }})</span>
              </td>
              <td style="text-align: center">
                {{ item.times }}
              </td>
            </tr>
            </tbody>
          </table>
        </view>
      </view>
      <van-dialog id="van-dialog"></van-dialog>
    </view>
  </div>
</template>
<script>
import Subscride from "@/api/subscride";
import date from "@/utils/class/date";
import math from "@/utils/class/math";
import {
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      coinList: [{
        coin_name: "USDT",
        qtyDecimals: 2,
        priceDecimals: 4,
        proportion_amount: 0,
        subscribe_coin_name: '',
        usable_balance: 0
      }],
      detail: {
        info: {
          coin_name: ''
        }
      },
      num: "",
      coin: "USDT",
      loadMore: false,
      list: []
    };
  },
  computed: {
    ...mapGetters(['themeStyle']),
    activeCoin() {
      if (!this.coin) return {};
      return this.coinList.find((item) => item.coin_name == this.coin);
    },
  },
  methods: {
    doAll() {
      this.num = this.detail.money
    },
    omitTo(num, idx) {
      if (!num) return 0;
      return math.omitTo(num, idx);
    },
    parseTime(num) {
      if (!num) return;
      return date.parseTime(num);
    },
    getInfo() {
      Subscride.subscribe().then((res) => {
        this.detail = res.data;
        this.coinList[0].proportion_amount = res.data.info.danjia
        this.coinList[0].subscribe_coin_name = res.data.info.coin_name
      });
    },
    // 选择币种
    selectCoin() {
      let arr = this.coinList.map((item) => {
        return {
          label: item.coin_name,
          value: item.coin_name,
        };
      });

      this.$picker(arr, {
        value: this.coin
      }).then((res) => {
        this.coin = res;
      });
    },
    // 提交询问
    ifSubscribeNow() {
      this.$dialog
          .confirm({
            title: this.$t("common.tips"),
            message: `${this.$t("purchase.b7")} ${this.activeCoin.coin_name} ${this.$t("purchase.b8")}？`,
            cancelButtonText: this.$t('common.cancelButtonText'),
            confirmButtonText: this.$t('common.confirmButtonText')
          })
          .then(() => {
            this.subscribeNow();
          })
          .catch(() => {
          });
    },
    // 申购
    subscribeNow() {
      let data = {
        money: this.num,
        coin_name: this.activeCoin.coin_name,
        id: this.detail.info.id
      };
      Subscride.subscribeNow(data, {
        btn: this.$refs.btn
      }).then((res) => {
        if (res) {
          this.$toast.success(this.$t("purchase.b9"));
          this.num = "";
        }
      })
    },
    depositHistory() {
      Subscride.subscribeTokenList().then((res) => {
        this.list = res.data;
      });
    },
  },
  created() {
    this.getInfo();
    this.depositHistory();
  },
};
</script>
<style lang="scss" scoped>
::v-deep uni-canvas {
  width: 130px;
  height: 130px;
}

::v-deep .van-step--finish {
  color: $light;
}

::v-deep .van-step--vertical:first-child::before {
  background: transparent;
}

::v-deep .van-step--vertical {
  .van-step__circle-container {
    background-color: transparent;

    .van-icon-checked {
      width: 14px;
      height: 14px;
      background: rgba($green, 0.7);
      font-size: 0;
      display: block;
      border-radius: 20px;

      &::after {
        content: '';
        display: block;
        font-size: 0;
        width: 8px;
        height: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: $green;
        border-radius: 20px;
      }
    }
  }
}
</style>
