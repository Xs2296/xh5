<template>
  <view class="p-md">
    <view class="color-light fn-16">{{$t('exchange.d3')}}</view>
    <table class="w-max ">
      <thead class="fn-xs">
        <tr>
          <td class="p-y-xs p-l-md">{{$t('exchange.d4')}}</td>
          <td class="p-y-xs ">{{$t('exchange.d5')}}</td>
          <td class="p-y-xs fn-right">{{$t('exchange.d2')}}</td>
          <td class="p-y-xs fn-right p-r-md">{{$t('exchange.c5')}}</td>
        </tr>
      </thead>
      <tbody class="color-light trade-list">
        <!-- ||item.tradeId -->
        <tr v-for="(item,idx) in tradeList" :key="idx">
          <td class="p-y-xs p-l-md rounded-bl-xs rounded-tl-xs">{{parseTime(item.ts,false,'{h}:{i}:{s}')}}</td>
          <td :class="`color-${item.direction}`">
            <template v-if="item.direction=='buy'">{{$t('exchange.b5')}}</template>
            <template v-else-if="'sell'">{{$t('exchange.b6')}}</template>
          </td>
          <td class="fn-right">{{item.price}}</td>
          <td class="p-y-xs p-r-md fn-right rounded-br-xs rounded-tr-xs">{{omitTo(item.amount,8)*1}}</td>
        </tr>
      </tbody>
    </table>
  </view>
</template>
<script>
import date from "@/utils/class/date";
import math from "@/utils/class/math";
export default {
  name: "trade-list",
  props:{
      tradeList:{
          type:Array,
          default:()=>[],
          required:true
      }
  },
  data() {
    return {};
  },
  methods: {
    parseTime: date.parseTime,
    omitTo: math.omitTo,
  },
};
</script>
<style lang="scss" scoped>
.trade-list{
  tr:nth-of-type(2n-1){
    box-shadow: $shadow;
    border-radius: $border-radius-xs;
    td{
      background: $panel-3;
    }
  }
}
</style>