<template>
  <v-page>
    <v-header :title="$t('otc.a3')">
      <template #right>
        <v-picker :list="list" v-model="status" @input="changeStatus">
          <template #default="{label}">
            <view class="color-light">
              {{label||$t('otc.c1')}}
              <van-icon name="arrow-down" />
            </view>
          </template>
        </v-picker>
      </template>
    </v-header>
    <van-tabs
      :ellipsis="false"
      :border="false"
      class="border-b"
      :active="tab"
      @change="tabChange($event.detail.name)"
    >
      <van-tab :title="$t('otc.h2')" :name="1"></van-tab>
      <van-tab :title="$t('otc.h3')" :name="2"></van-tab>
      <van-tab :title="$t('otc.h4')" :name="3"></van-tab>
      <van-tab :title="$t('otc.h5')" :name="4"></van-tab>
    </van-tabs>
    <v-paging :ajax="myOrders" ref="scroll" :data="{type:tab,status}" class="layout-main">
      <template #box="list">
        <view class="list">
          <view
            class="item bg-panel-3 box-shadow rounded-sm p-md m-md"
            v-for="item in $list(list)"
            :key="item.id"
          >
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.f5')}} </view>
              <view class="flex-fill fn-right color-light">{{ item.order_sn }}</view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c1')}} </view>
              <view class="flex-fill fn-right color-light"> {{ item.status_text }} </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c3')}} </view>
              <view class="flex-fill fn-right color-light"> {{ item.money }} </view>
            </view>
          
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b0')}} </view>
              <view class="flex-fill fn-right color-light"> {{ item.price }} CNY </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c4')}} </view>
              <view class="flex-fill fn-right color-light"> {{ item.amount }} </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b1')}} </view>
              <view class="flex-fill fn-right color-light"> {{ item.seller_payments.pay_type_text }} </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.h6')}} </view>
              <view class="flex-fill fn-right color-light"> {{ item.created_at }} </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b2')}} </view>
              <view class="flex-fill fn-right color-light">
                <v-button type="blue" @click="toDetail(item)" size="mini" class="rounded-xs">
                  {{$t('otc.h7')}}
                </v-button>
              </view>
            </view>
          </view>
        </view>
      </template>
    </v-paging>
  </v-page>
</template>
<script>
import Otc from "@/api/otc";
export default {
  name: "order",
  data() {
    return {
      tab: 1,
      status:99
    };
  },
  computed:{
    list(){
      return [
        {
          value:99,
          label:this.$t('otc.h8')
        },
        {
          value:0,
          label:this.$t('otc.h9')
        },
        {
          value:1,
          label:this.$t('otc.i0')
        },
        {
          value:2,
          label:this.$t('otc.i1')
        },
        {
          value:3,
          label:this.$t('otc.c9')
        },
        {
          value:4,
          label:this.$t('otc.i2')
        },
      ]
    }
  },
  methods: {
    myOrders:Otc.myOrders,
    tabChange(idx){
      this.tab = idx
      this.$nextTick(()=>{
        this.$refs.scroll.ref()
      })
    },
    changeStatus(){
      this.$nextTick(()=>{
        this.$refs.scroll.ref()
      })
    },
    toDetail(item){
      this._router.push({path:'/pages/otc/detail',query:{id:item.id}})
    }
  },
};
</script>