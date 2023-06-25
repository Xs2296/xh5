<template>
  <div class="p-l-xs d-flex flex-col dep-list">
    <!-- 卖 -->
    <div class="d-flex justify-between fn-xs m-b-xs">
      <span>{{$t('exchange.d2')}}</span>
      <span>{{$t('exchange.c5')}}</span>
    </div>
   <div v-if="symbol!=='ABK/USDT'" class="flex-fill overflow-scroll rotatebox">
          <div class="rotateZ">
            <div
              class="d-flex justify-between h-24 align-center row"
              v-for="(item,idx) in showSellList"
              :key="idx"
              @click="$emit('price',omitTo(item.price,2))"
            >
              <span class="color-sell">{{omitTo(item.price,2)}}</span>
              <span class="p-r-xs">{{omitTo(item.amount,2)}}</span>
              <div
                class="proagess h-max bg-sell-transparent"
                :style="{width:getValue(item.amount)+'%'}"
              ></div>
            </div>
          </div>
        </div>
    <div class="border-t border-b p-y-xs">
        <slot/>
    </div>
    <div class="flex-fill overflow-scroll">
      <div
        class="d-flex justify-between h-24 align-center row"
        v-for="(item,idx) in showBuyList"
        :key="idx"
        @click="$emit('price',omitTo(item.price,2))"
      >
        <span class="color-buy">{{omitTo(item.price,2)}}</span>
        <span class="p-r-xs">{{omitTo(item.amount,2)}}</span>
        <div class="proagess h-max bg-buy-transparent" :style="{width:getValue(item.amount)+'%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import date from "@/utils/class/date";
import math from "@/utils/class/math";
export default {
  name: "buy-and-sell",
  props: {
    buyList: {
      default:()=> [],
      required: true,
      type: Array,
    },
    sellList: {
      default: ()=>[],
      required: true,
      type: Array,
    },
    max:{
      default:undefined,
      type:Number,
      required:false
    },
	symbol:{
		default:undefined,
		type:String,
		required:false
	}
  },
  components: {},
  computed: {
    showBuyList(){
      if(this.max){
        return this.buyList.splice(0,this.max)
      }
      return this.buyList
    },
    showSellList(){
      if(this.max){
        return this.sellList.splice(0,this.max)
      }
      return this.sellList
    }
  },
  methods: {
    parseTime: date.parseTime,
    omitTo: math.omitTo,
     // 计算深度
    getValue(amount) {
      const arr = this.showBuyList.concat(this.showSellList).map((item) => item.amount);
      let max = Math.max(...arr);
      return math.division(amount, max, 2) * 100;
    },
  },
};
</script>
<style lang="scss" scoped>
.dep-list {
  max-height: 456px;
  .row {
    position: relative;
    .proagess {
      position: absolute;
      right: 0;
      top: 0;
      transition: width 0.3s;
    }
  }
}
.rotatebox {
  transform: rotateZ(-180deg);
  .rotateZ {
    transform: rotateZ(180deg);
  }
}
</style>