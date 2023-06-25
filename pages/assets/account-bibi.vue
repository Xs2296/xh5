<template>
  <v-page class="layout-page">
    <v-header :title="$t('expand.币币账户')"></v-header>
    <!-- 币币 -->
    <v-paging class="layout-main" :ajax="accountFlow" :data="query">
      <template #box="list">
        <view
          class="item bg-panel-4 m-x-md m-y-xs rounded-sm box-shadow"
          v-for="item in $list(list)"
          :key="item.created_at + item.id"
        >
          <view
            class="head d-flex align-center border-b p-x-md p-y-xs justify-between"
          >
            <view class="d-flex justify-between">
              <view>
                <view class="color-light fn-lg">{{ query.symbol }}</view>
                <view class="fn-10">{{ item.created_at }}</view>
              </view>
            </view>
            <view
              class="fn-md"
              :class="item.amount * 1 < 0 ? 'color-sell' : 'color-buy'"
            >
              {{ item.amount * 1 >= 0 ? "+" : "" }}{{ item.amount * 1 }}
            </view>
          </view>
          <view class="p-x-md p-y-xs color-light">{{ item.log_type_text }}</view>
        </view>
      </template>
    </v-paging>
  </v-page>
</template>
<script>
import Hangqing from "@/api/hangqing";
import date from "@/utils/class/date.js";
export default {
  data() {
    return {
      active: 1,
      detail: {},
      accountFlow: Hangqing.getBiBiLiushui,
      query: {},
    };
  },
  computed: {
    accountMap() {
      return {
        UserWallet: this.$t("assets.b1"),
        ContractAccount: this.$t("assets.b2"),
        FinancialAccount: this.$t("assets.b4"),
      };
    },
  },
  onLoad(query) {
    this.query = query;
  },
  methods: {
    parseTime: date.parseTime,
    appTokenAssets() {
      let data = {
        coin_name: this.query.coin_name,
      };

     Hangqing.getBiBiLiushui(data).then((res) => {
        this.detail = res.data;
      });
    },
  },
  created() {
    this.appTokenAssets();
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-tabs__wrap {
  background-color: $panel-4;
}
</style>