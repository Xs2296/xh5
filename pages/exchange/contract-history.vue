<template>
  <v-paging :ajax="getHistoryEntrust" class="h-max" ref="vPag">
    <template #box="list">
       <van-empty v-if="!$list(list).length" description="" />
      <div
        class="item bg-panel-4 m-md rounded-sm box-shadow"
        v-for="item in $list(list)"
        :key="item.id"
        @click="showDetail(item)"
      >
        <div
          class="head d-flex align-center border-b  p-x-md p-y-xs justify-between"
        >
          <div class="d-flex">
            <div>
              <div class="color-light fn-20">{{ item.symbol }}/USDT</div>
              <div class="fn-10">{{ item.created_at }}</div>
            </div>
          </div>
          <div class="d-flex">
            <span>{{ item.lever_rate }}X</span>
          </div>
        </div>
        <div class="p-x-md p-y-xs">
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.a6')}}</div>
            <div class="color-light">{{cals(item.side,item.order_type)}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.a7')}}/{{$t('contract.a8')}}</div>
            <div class="color-light">{{item.traded_amount}}/{{item.amount}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.a9')}}/{{$t('contract.b0')}}</div>
            <div class="color-light">{{item.avg_price||'--'}}/{{item.entrust_price||'--'}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.b1')}}</div>
            <div class="color-light">{{item.margin*1}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.b2')}}</div>
            <div class="color-light">{{item.fee*1}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.c7')}}</div>
            <div class="color-light">{{item.profit*1||'--'}}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between">
            <div class="label fn-sm">{{$t('contract.b3')}}</div>
            <div class="color-light">{{ status(item.status) }}</div>
          </div>
          <div class="row d-flex m-y-mini justify-between" v-if="item.order_type==2">
            <div class="label fn-sm">{{$t('contract.b4')}}</div>
            <div class="color-light">
                <v-button type="green-plain" class="m-l-xs rounded-xs" size="mini" plain
                :to="{path:'/pages/income/index',query:{
                  symbol:item.symbol,
                  side:item.side,
                  profitRate:item.profit/item.margin*100+'',
                  lever_rate:item.lever_rate,
                  avg_price:item.avg_price,
                  pair_name:item.symbol+'/USDT',
                  entrust_id:item.id,
                  label:cals(item.side,item.order_type)
                }}"
                >{{$t('contract.c8')}}</v-button>
            </div>
          </div>
        </div>
      </div>
    <van-popup
      v-model="show"
      closeable
      close-on-popstate
      position="bottom"
      :style="{ height: '80%', width: '100%' }"
    >
      <div class="bg-panel-1 h-max" @touchstart.stop @touchmove.stop>
        <div class="fn-center title-box p-md bg-panel-4 fn-lg">
          {{$t('contract.c9')}}
        </div>
        <van-empty v-if="!order_details.length" :description="$t('contract.d0')" />
        <div class="item bg-panel-4 m-md rounded-sm p-md" v-for="item in order_details" :key="item.id">
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.d1')}}</div>
            <div class="color-light">{{item.unit_price}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.d2')}}</div>
            <div class="color-light">{{item.trade_amount}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.b2')}}</div>
            <div class="color-light">{{item.trade_buy_fee}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.d3')}}</div>
            <div class="color-light">{{item.created_at}}</div>
          </div>
        </div>
      </div>
    </van-popup>
    </template>
  </v-paging>
</template>
<script>
import Contract from "@/api/contract";
export default {
  name: "contract-entrustment",
  data() {
    return {
      show:false,
      activeItem:{},
      order_details:[]
    };
  },
  methods: {
    getHistoryEntrust: Contract.getHistoryEntrust,
    status(status) {
      switch (status) {
        case 0:
          return this.$t('contract.b6');
        case 1:
          return this.$t('contract.b7');
        case 2:
          return this.$t('contract.b9');
        case 3:
          return this.$t('contract.b9');
      }
    },
    cals(side, order_type) {
      // side - order_type
      let map = {
        "1-1": this.$t('contract.c0'),
        "1-2": this.$t('contract.c1'),
        "2-1": this.$t('contract.c2'),
        "2-2": this.$t('contract.c3'),
      };
      return map[`${side}-${order_type}`];
    },
    showDetail(item){
      Contract.getEntrustDealList({
        entrust_id:item.id,
        symbol:item.symbol
      },{loading:true}).then(res=>{
        this.order_details= res.data
        this.show = true
      })
    }
   
  },
};
</script>
<style lang="scss" scoped>
  .m-y-mini{
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
