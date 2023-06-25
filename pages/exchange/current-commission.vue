<template>
  <v-paging :ajax="getCurrentEntrust" ref="list" tag="div">
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
          <div class="d-flex">
            <span>{{item.status_text}}</span>
          </div>
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
            <div class="label fn-sm">{{$t('exchange.c2')}}</div>
            <div class="color-light">{{item.amount}}</div>
          </div>
          <div class="row d-flex m-y-xs justify-between">
            <div class="label fn-sm">{{$t('exchange.g3')}}</div>
            <div class="color-light">
              <v-button type="red" class="rounded-xs" size="mini" @click="ifCancel(item)">{{$t('exchange.g4')}}</v-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </v-paging>
</template>
<script>
import Order from "@/api/order";
export default {
  data() {
    return {
      getCurrentEntrust: Order.getCurrentEntrust,
    };
  },
  methods: {
    ifCancel(item) {
		uni.showModal({
			title:this.$t('common.tips'),
			content:this.$t('exchange.g5')+'?',
			cancelText:this.$t('common.cancelButtonText'),
			confirmText:this.$t('common.confirmButtonText'),
			success: (res) => {
				if (res.confirm){
					this.cancelEntrust(item);
				}
			}
		})
    //   this.$dialog
    //     .confirm({
    //       title: this.$t('common.tips'),
    //       message: this.$t('exchange.g5')+'?',
		  // cancelButtonText: this.$t('common.cancelButtonText'),
		  // confirmButtonText:this.$t('common.confirmButtonText')
    //     })
    //     .then(() => {
    //       this.cancelEntrust(item);
    //     })
    //     .catch(() => {});
    },
    // 撤销委托
    cancelEntrust(item) {
      let data = {
        entrust_id: item.id,
        entrust_type: item.entrust_type,
        symbol: item.symbol,
      };
      Order.cancelEntrust(data).then(() => {
        this.$toast.success(this.$t('exchange.g6'));
        this.$refs.list.list.forEach((ele, idx) => {
          if (item.id == ele.id) {
            this.$refs.list.list.splice(idx, 1);
          }
        });
      });
    },
  },
};
</script>