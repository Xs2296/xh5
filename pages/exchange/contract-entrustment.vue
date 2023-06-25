<template>
  <v-paging :ajax="getCurrentEntrust" class="h-max" ref="vPag">
    <template #box="list">
      <van-empty v-if="!Object.values(list).length" description="" />
      <div
        class="item bg-panel-4 m-md rounded-sm box-shadow"
        v-for="item in $list(list)"
        :key="item.id"
      >
        <div
          class="head d-flex align-center border-b p-x-md p-y-xs justify-between"
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
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.a6')}}</div>
            <div class="color-light">{{cals(item.side,item.order_type)}}</div>
          </div>
     
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.a7')}}/{{$t('contract.a8')}}</div>
            <div class="color-light">{{item.traded_amount}}/{{item.amount}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.a9')}}/{{$t('contract.b0')}}</div>
            <div class="color-light">--/{{item.entrust_price||'--'}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.b1')}}</div>
            <div class="color-light">{{item.margin*1}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.b2')}}</div>
            <div class="color-light">{{item.fee*1}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.b3')}}</div>
            <div class="color-light">{{ status(item.status) }}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('contract.b4')}}</div>
            <div class="color-light">
              <v-button type="green-plain" class="rounded-xs" size="mini" @click="ifCancelEntrust(item)">{{$t('contract.b5')}}</v-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </v-paging>
</template>
<script>
import Contract from "@/api/contract";
export default {
  name: "contract-entrustment",
  data() {
    return {};
  },
  methods: {
    getCurrentEntrust: Contract.getCurrentEntrust,
    status(status) {
      switch (status) {
        case 0:
          return this.$t('contract.b6');
        case 1:
          return this.$t('contract.b7');
        case 2:
          return this.$t('contract.b8');
        case 3:
          return this.$t('contract.b9');
      }
    },
    cals(side, order_type) {
      // order_type - side
      let map = {
        "1-1": this.$t('contract.c0'),
        "1-2": this.$t('contract.c1'),
        "2-1": this.$t('contract.c2'),
        "2-2": this.$t('contract.c3'),
      };
      return map[`${side}-${order_type}`];
    },
    // 撤单
    ifCancelEntrust(item){
      this.$dialog.confirm({
        title:this.$t('contract.c4'),
        message:this.$t('contract.c5')+'？',
		cancelButtonText: this.$t('common.cancelButtonText'),
		confirmButtonText:this.$t('common.confirmButtonText')
      }).then(()=>{
      this.cancelEntrust(item)    
      })
    },
    cancelEntrust(item){
      let data = {
        symbol:item.symbol,
        entrust_id:item.id
      }
      Contract.cancelEntrust(data).then(()=>{
        this.$refs.vPag.resetData()
        this.$toast(this.$t('contract.c6'))
      })
    }
  },
};
</script>
