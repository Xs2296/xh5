<template>
  <v-page >
    <v-header :title="$t('exchange.g1')">
      <template #right>
        <v-link to="/pages/commission/revoke">
          <van-icon class="fn-22 m-t-xs" name="todo-list-o" />
        </v-link>
      </template>
    </v-header>
    <view class="bg-panel-4 p-x-md p-y-xs">
      <van-tabs type="card" :active="active" @change="changeActive">
        <van-tab :title="$t('exchange.a4')"></van-tab>
        <van-tab :title="$t('exchange.a5')"></van-tab>
      </van-tabs>
    </view>
    <!-- 当前委托 -->
    <v-paging :ajax="getCurrentEntrust" key="0" class="layout-main" v-if="active==0">
      <template #box="list">
        <view v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm" :key="item.order_no">
          <view class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <view class="d-flex">
              <view
                v-if="item.entrust_type==1"
                class="suatus color-buy fn-20 m-r-xs rounded"
              >{{$t('exchange.b5')}}</view>
              <view
                v-if="item.entrust_type==2"
                class="suatus color-sell fn-20 m-r-xs rounded"
              >{{$t('exchange.b6')}}</view>
              <view>
                <view class="color-light fn-20">{{item.symbol}}</view>
                <view class="fn-10">{{item.created_at}}</view>
              </view>
            </view>
            <view>{{item.status_text}}</view>
          </view>
          <view class="p-x-md p-y-xs">
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.b7')}}</view>
              <view class="color-light">{{item.entrust_price}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.b8')}}</view>
              <view class="color-light">
                <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
              </view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.c1')}}</view>
              <view class="color-buy">{{item.traded_amount}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.c2')}}</view>
              <view class="color-light">{{item.amount}}</view>
            </view>
          </view>
        </view>
      </template>
    </v-paging>
    <!-- 历史委托 -->
    <v-paging :ajax="getHistoryEntrust"  key="1"  class="layout-main"   v-if="active==1">
    
      <template #box="list">
        <view v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm" :key="item.order_no">
          <view class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <view class="d-flex">
              <view
                v-if="item.entrust_type==1"
                class="suatus color-buy fn-20 m-r-xs rounded"
              >{{$t('exchange.b5')}}</view>
              <view
                v-if="item.entrust_type==2"
                class="suatus color-sell fn-20 m-r-xs rounded"
              >{{$t('exchange.b6')}}</view>
              <view>
                <view class="color-light fn-20">{{item.symbol}}</view>
                <view class="fn-10">{{item.created_at}}</view>
              </view>
            </view>
            <view>{{item.status_text}}</view>
          </view>
          <view class="p-x-md p-y-xs">
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.b7')}}</view>
              <view class="color-light">{{item.entrust_price}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.b8')}}</view>
              <view class="color-light">
                <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
              </view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.c1')}}</view>
              <view class="color-buy">{{item.traded_amount}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.e2')}}</view>
              <view class="color-buy">{{division(item.traded_money,item.traded_amount)}}</view>
            </view>

            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.c2')}}</view>
              <view class="color-light">{{item.amount}}</view>
            </view>
          </view>
        </view>
      </template>
    </v-paging>
  </v-page>
</template>
<script>
import Order from "@/api/order";
import math from "@/utils/class/math";
export default {
  data() {
    return {
      active: 0,
      getCurrentEntrust: Order.getCurrentEntrust,
      getHistoryEntrust: Order.getHistoryEntrust,
    };
  },
  computed: {
  },
  methods: {
    division: math.division,
    changeActive($ev) {
      this.active = $ev.detail.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  .suatus {
    &.color-sell {
      background: rgba($sell, 0.1);
    }
    &.color-buy {
      background: rgba($buy, 0.1);
    }
    padding: 5px 10px;
  }
}
</style>