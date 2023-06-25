<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('option.c2')"></v-header>
    <div class="layout-main bg-panel-4 m-t-md p-t-md">
      <div class="fn-center color-theme-1 fn-22 p-y-md">{{detail.pair_name}}·{{detail.time_name}}</div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.c3')}}</div>
        <div class="color-light">{{detail.order_no}}</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.c4')}}</div>
        <div class="color-light">{{detail.scene&&detail.scene.begin_price}}</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.c5')}}</div>
        <div class="color-light">{{detail.scene&&detail.scene.end_price}}</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.c6')}}</div>
        <div class="color-light">{{detail.created_at}}</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.c7')}}</div>
        <div class="color-light">{{detail.bet_amount}} ({{detail.bet_coin_name}})</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.c8')}}</div>
        <div :class="getColor(detail.up_down)">
          {{getStatusText(detail.up_down)}}
          <!-- {{detail.up_down==3?'±':'≥'}} -->
          <!-- {{detail.range}}% -->
        </div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.b2')}}</div>
        <div class="color-light">{{detail.odds}}</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.c9')}}</div>
        <div class="color-light">{{detail.status_text}}</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs" v-if="detail.scene">
        <div class="flex-shrink">{{$t('option.d0')}}</div>
        <div
          :class="getColor(detail.scene.delivery_up_down)"
        >{{detail.scene.delivery_range}}% ({{getStatusText(detail.scene.delivery_up_down)}})</div>
      </div>
      <div class="d-flex justify-between p-x-md p-y-xs">
        <div class="flex-shrink">{{$t('option.d1')}}</div>
        <div class="color-light">{{detail.delivery_amount}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Option from "@/api/option";
import {mapGetters} from 'vuex'
export default {
  name: "delivery-defail",
  data() {
    return {
      detail: {},
      query:{}
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
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
    getOptionOrderDetail() {
      let data = {
        order_id: this.query.order_id,
      };
      Option.getOptionOrderDetail(data).then((res) => {
        this.detail = res.data;
      });
    },
  },
  onLoad(query) {
    this.query = query
    this.getOptionOrderDetail();
  },
};
</script>