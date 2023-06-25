<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="`${query.coin_name}${$t('assets.a7')}`"></v-header>

    <div class="bg-panel-4 d-flex justify-between p-md fn-center">
      <div class="item">
        <div class="label m-b-xs fn-sm">{{$t('assets.a8')}}（{{query.coin_name}}）</div>
        <div class="num color-light fn-lg">{{detail.total_assets}}</div>
      </div>
      <div class="item">
        <div class="label m-b-xs fn-sm">{{$t('assets.a9')}}（{{query.coin_name}}）</div>
        <div class="num color-light fn-lg">{{detail.usable_balance}}</div>
      </div>
      <div class="item">
        <div class="label m-b-xs fn-sm">{{$t('assets.b0')}}（{{query.coin_name}}）</div>
        <div class="num color-light fn-lg">{{detail.freeze_balance}}</div>
      </div>
    </div>
    <!-- 币币 -->
    <v-paging class="layout-main" :ajax="getWalletLogs" :data="query">
      <template #box="list">
        <div v-for="item in $list(list)" class="item bg-panel-4 m-x-md m-y-xs rounded-sm box-shadow" :key="item.datetime">
          <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <div class="d-flex justify-between">
              <div>
                <div class="color-light fn-lg">{{query.coin_name}}</div>
                <div class="fn-10">{{item.created_at}}</div>
              </div>
            </div>
            <div
              class="fn-md"
              :class="item.amount*1<0?'color-sell':'color-buy'"
            >{{item.amount*1>=0?'+':''}}{{item.amount*1}}</div>
          </div>
          <div class="p-x-md p-y-xs color-light">{{item.log_type_text}}</div>
        </div>
      </template>
    </v-paging>
  </div>
</template>
<script>
import Wallet from "@/api/wallet";
import date from "@/utils/class/date.js";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      active: 1,
      detail: {},
      appDepositHistory: Wallet.appDepositHistory,
      appWithdrawalRecord: Wallet.appWithdrawalRecord,
      appTransferRecord: Wallet.appTransferRecord,
      getWalletLogs: Wallet.getWalletLogs,
      query:{}
    };
  },
  computed: {
    accountMap() {
      return {
        UserWallet: this.$t('assets.b1'),
        ContractAccount: this.$t('assets.b2'),
        FinancialAccount: this.$t('assets.b4'),
      };
    },
    activeObj() {
      return this.billList.find((item) => item.type == this.active);
    },
    ...mapGetters(['themeStyle'])
  },
  methods: {
    parseTime: date.parseTime,
    appTokenAssets() {
      let data = {
        coin_name: this.query.coin_name,
      };

      Wallet.appTokenAssets(data).then((res) => {
        this.detail = res.data;
      });
    },
  },
  onLoad(query) {
    this.query=query
    this.appTokenAssets();
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-tabs__wrap {
  background-color: $panel-4;
}
</style>