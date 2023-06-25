<template>
  <v-paging :ajax="getHistoryEntrust">
      <template #box="list">
        <not-data v-if="!$list(list).length"></not-data>
        <div v-for="item in $list(list)" class="item bg-panel-4 m-md rounded-sm box-shadow" :key="item.order_no">
          <div class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
            <div class="d-flex">
              <div v-if="item.entrust_type==1" class="suatus color-buy fn-20 m-r-xs rounded">{{$t('exchange.b5')}}</div>
              <div v-if="item.entrust_type==2" class="suatus color-sell fn-20 m-r-xs rounded">{{$t('exchange.b6')}}</div>
              <div>
                <div class="color-light fn-20">{{item.symbol}}</div>
                <div class="fn-10">{{item.created_at}}</div>
              </div>
            </div>
            <div>{{item.status_text}}</div>
          </div>
          <div class="p-x-md p-y-xs">
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('exchange.b7')}}</div>
              <div class="color-light">{{item.entrust_price}}</div>
            </div>
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('exchange.b8')}}</div>
              <div class="color-light">
                <template v-if="item.type==1">{{$t('exchange.b9')}}</template>
                <template v-if="item.type==2">{{$t('exchange.c0')}}</template>
              </div>
            </div>
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('exchange.c1')}}</div>
              <div class="color-buy">{{item.traded_amount}}</div>
            </div>
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('exchange.e2')}}</div>
              <div class="color-buy">{{(item.traded_money/item.traded_amount).toFixed(4)*1||'--'}}</div>
            </div>
        
            <div class="row d-flex m-y-xs justify-between">
              <div class="label fn-sm">{{$t('exchange.c2')}}</div>
              <div class="color-light">{{item.amount}}</div>
            </div>
          </div>
        </div>
      </template>
    </v-paging>
</template>
<script>
import Order from "@/api/order";
import math from '@/utils/class/math'
export default {
    data(){
        return {
              getHistoryEntrust: Order.getHistoryEntrust,
        }
    },
    methods:{
      division:math.division
    }
}
</script>