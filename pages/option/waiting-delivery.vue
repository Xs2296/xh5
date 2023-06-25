<template>
  <div class="p-x-md fn-sm">
    <table class="w-max">
      <thead>
        <tr class="fn-10">
          <th class="fn-left p-l-md p-y-xs">{{$t('option.a0')}}</th>
          <th class="fn-left">{{$t('option.e3')}}</th>
          <th class="fn-right p-r-md">{{$t('option.b3')}}</th>
        </tr>
      </thead>
      <tbody class="color-light trade-list">
        <tr v-for="item in list" :key="item.order_no">
          <td class="fn-left p-l-md p-y-xs rounded-bl-xs rounded-tl-xs">
            <div>{{item.pair_name}}·{{item.time_name}}</div>
            <div class="fn-sm color-default">{{item.created_at}}</div>
          </td>
          <td class="fn-left" :class="getColor(item.up_down)">
            {{getStatusText(item.up_down)}}
            <!-- {{item.up_down==3?'±':'≥'}} -->
            <!-- {{item.range}}% -->
          </td>
          <td class="fn-right p-r-md rounded-br-xs rounded-tr-xs">{{item.bet_amount}}({{item.bet_coin_name}})</td>
        </tr>
        <tr>
          <td
            class="fn-center color-default bg-panel-2 p-y-md link-active"
            @click="more"
            colspan="3"
            v-if="loadMore"
          >{{$t('option.d3')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Option from "@/api/option";
export default {
  props: ["query"],
  data() {
    return {
      list: [],
      page: 1,
      loadMore: true,
    };
  },
  watch: {
    query() {
      this.reset();
    },
  },
  methods: {
    getColor(status) {
      if (status == 1) return "color-buy";
      if (status == 2) return "color-sell";
      if (status == 3) return "";
    },
    getStatusText(status) {
      if (status == 1) return this.$t('option.b8');
      if (status == 2) return this.$t('option.c0');
      if (status == 3) return this.$t('option.b9');
    },
    reset() {
      this.page = 1;
      this.loadMore = true;
      this.getOptionHistoryOrders();
    },
    more() {
      this.page++;
      this.getOptionHistoryOrders();
    },
    getOptionHistoryOrders() {
      let data = {
        status: 1,
        page: this.page,
        pair_id: this.query.pair_id,
        time_id: this.query.time_id,
      };
      Option.getOptionHistoryOrders(data).then((res) => {
        if (res.data.current_page == 1) this.list = [];
        this.list = [...this.list, ...res.data.data];
        if (res.data.data.length < res.data.per_page) {
          this.loadMore = false;
        }
      });
    },
  },
  created() {
    this.getOptionHistoryOrders();
  },
};
</script>
<style lang="scss" scoped>
.trade-list{
  tr:nth-of-type(2n-1){
    td{
      background: $panel-3;
    }
  }
}
</style>