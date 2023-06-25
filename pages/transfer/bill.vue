<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('transfer.a0')"></v-header>
    <v-scroll class="layout-main" @ref="ref" @load="load">
      <ul class="list">
        <div class="item bg-panel-4 m-x-md m-y-xs rounded-sm box-shadow" v-for="item in list" :key="item.id">
          <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <div class="d-flex">
              <div>
                <div class="color-light fn-lg">{{item.name}}</div>
                <div class="fn-10">{{item.times}}</div>
              </div>
            </div>
            <div class="color-buy">{{$t('transfer.a1')}}</div>
          </div>
          <div class="p-x-md p-y-xs">
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('transfer.a2')}}</div>
              <div class="color-light">{{item.amount}}</div>
            </div>
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('transfer.a3')}}</div>
              <div class="color-light">
                {{item.from}}
                <i class="iconfont">&#xe61a;</i>
                {{item.to}}
              </div>
            </div>
          </div>
        </div>
      </ul>
    </v-scroll>
  </div>
</template>
<script>
import Wallet from "@/api/wallet";
import date from "@/utils/class/date.js";
import { mapGetters } from "vuex";
export default {
  name: "bill",
  data() {
    return {
      list: [],
      page: 0,
      accountMap: {
        UserWallet: this.$t('transfer.a4'),
        ContractAccount: this.$t('transfer.a5'),
        FinancialAccount: this.$t('transfer.a7'),
      },
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    parseTime: date.parseTime,
    ref(over) {
      this.page = 1;
      this.transferRecord(over);
    },
    load(over) {
      this.page++;
      this.transferRecord(over);
    },
    transferRecord(over) {
      let data = {
        page: this.page,
      };
      Wallet.transferRecord(data).then((res) => {
        if (this.page == 1) this.list = [];
        this.list = [...this.list, ...res.data.list];
        over && over({ finished: this.page >= res.data.page });
      });
    },
  },
  created() {},
};
</script>