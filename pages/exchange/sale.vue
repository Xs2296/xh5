<template>
  <div>
    <!-- 深度图 -->
    <!-- <div class="depth-map">
      <depth-map :serveSellList="sellList" :serveBuyList="buyList" />
    </div> -->
    <div class="d-flex fn-sm buy-and-sell" style="margin-bottom:150upx;">
      <div class="w-6/12 buy">
        <div class="d-flex justify-between p-xs">
          <div>{{$t('exchange.c5')}}</div>
          <div>{{$t('exchange.f3')}}</div>
        </div>
        <div class="d-flex item justify-between p-xs" v-for="(item,idx) in buyList" :key="idx">
          <div class="progress bg-buy-transparent transition-default" :style="{width:getValue(item.amount)+'%'}"></div>
          <div class="color-light">{{item.amount}}</div>

          <div class="color-buy">{{item.price}}</div>
        </div>
      </div>
      <div class="w-6/12 sell">
        <div class="d-flex justify-between p-xs">
          <div>{{$t('exchange.c5')}}</div>
          <div>{{$t('exchange.f4')}}</div>
        </div>
        <div class="d-flex item justify-between p-xs" v-for="(item,idx) in sellList" :key="idx">
          <div class="progress bg-sell-transparent transition-default" :style="{width:getValue(item.amount)+'%'}"></div>
          <div class="color-light">{{item.amount}}</div>

          <div class="color-buy">{{item.price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import depthMap from "./depth-map";
import math from "@/utils/class/math";
export default {
  props: {
    sellList: {
      default() {
        return [];
      },
      type: Array,
    },
    buyList: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  components: {
    depthMap,
  },
  methods: {
    // 计算深度 当前数量 / 买卖最大值
    getValue(amount) {
      const arr = this.buyList.concat(this.sellList).map((item) => item.amount);
      let max = Math.max(...arr);
      return math.division(amount, max, 2) * 100;
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.buy-and-sell {
  .item {
    position: relative;
    .progress {
      position: absolute;
      height: 100%;
      top: 0;
    }
  }
  .buy {
    .progress {
      left: 0;
    }
  }
  .sell {
    .progress {
      right: 0;
    }
  }
}
</style>