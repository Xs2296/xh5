<template>
  <v-page>
    <v-header :title="$t('exchange.g2')">
    </v-header>
    <v-paging :ajax="getCurrentEntrust" ref="list" tag="div" key="1" class="layout-main">
      <template #box="list">
        <view v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm" :key="item.order_no">
          <view class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <view class="d-flex">
              <view v-if="item.entrust_type==1" class="suatus color-buy fn-20 m-r-xs rounded">{{$t('exchange.b5')}}</view>
              <view v-if="item.entrust_type==2" class="suatus color-sell fn-20 m-r-xs rounded">{{$t('exchange.b6')}}</view>
              <view>
                <view class="color-light fn-20">{{item.symbol}}</view>
                <view class="fn-10">{{item.created_at}}</view>
              </view>
            </view>
            <view class="d-flex">
              <span>{{item.status_text}}</span>
            </view>
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
              <view class="color-buy">{{item.surplus_amount}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.c2')}}</view>
              <view class="color-light">{{item.money}}</view>
            </view>
            <view class="row d-flex m-y-xs justify-between">
              <view class="label fn-sm">{{$t('exchange.g3')}}</view>
              <view class="color-light">
                <v-button type="danger" size="mini" @click="ifCancel(item)">{{$t('exchange.g4')}}</v-button>
              </view>
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
      checked: false,
      getCurrentEntrust: Order.getCurrentEntrust
    };
  },
  computed: {
  },
  methods: {
    division: math.division,
    ifCancel(item){
      uni.showModal({
        title:this.$t('common.tips'),
        content:this.$t('exchange.g5'),
        success:()=>{
          this.cancelEntrust(item)
        }
      })
    },
    // 撤销委托
    cancelEntrust(item){
      let data = {
        entrust_id:item.id,
        entrust_type:item.entrust_type,
        symbol:item.symbol,
      }
      Order.cancelEntrust(data).then(()=>{
        this.$toast.success(this.$t('exchange.g6'));
        this.$refs.list.list.forEach((ele,idx) => {
          if(item.id==ele.id){
            this.$refs.list.list.splice(idx,1)
          }
        });
      })
    }
  },
};
</script>