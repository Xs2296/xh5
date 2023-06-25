<template>
  <view class="d-flex flex-col page-otc" @click="menu = false">
    <v-header :left-arrow="false" title="OTC" :left-click="leftClick">
      <template #left>
        <v-link to="/pages/otc/send-ad">{{$t('otc.a0')}}</v-link>
      </template>
      <template #right>
        <view @click.stop="menu = !menu">{{$t('otc.a1')}}</view>
      </template>
    </v-header>
    <view class="d-flex border">
      <view class="w-6/12 border-r p-x-md p-y-xs box-size color-light">
        <v-picker :list="coinList" v-model="virtual_coin" @input="changeCoin">
          {{$t('otc.a2')}}：{{ activeCoin.label }}
          <van-icon name="arrow-down" />
        </v-picker>
      </view>
    </view>
    <!-- menu -->
    <view
      class="menu rounded-xs bg-panel-4 box-shadow"
      v-show="menu"
      @click.stop
    >
      <view @click="_router.push('/pages/otc/order')" class="p-xs border-b">
        {{$t('otc.a3')}}
      </view>
      <view @click="_router.push('/pages/otc/ad')" class="p-xs">
        {{$t('otc.a4')}}
      </view>
    </view>
    <van-tabs
      :ellipsis="false"
      :border="false"
      class="border-b"
      :active="tab"
      @change="tabChange($event.detail.name)"
    >
      <van-tab :title="$t('otc.a5')" :name="2"></van-tab>
      <van-tab :title="$t('otc.a6')" :name="1"></van-tab>
    </van-tabs>
    <v-paging
      :ajax="tradingEntrusts"
      :data="{ side: tab, virtual_coin, pay_type: 'all' }"
      ref="scroll"
      class="layout-main"
    >
      <template #box="list">
        <view class="list">
          <view
            class="item bg-panel-3 box-shadow rounded-sm p-md m-md"
            v-for="item in $list(list)"
            :key="item.id"
          >
            <view class="row d-flex align-center">
              <view
                class="w-50 h-50 border rounded-max border-light bg-primary color-plain d-flex justify-center align-center fn-30"
              >
                {{ userName(item.user.username) }}
              </view>
              <view class="flex-fill fn-right"> {{ item.user.username }} </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.a7')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.amount }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.a8')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.cur_amount }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.a9')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.min_num * 1 }} - {{ item.max_num * 1 || "∞" }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b0')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.price * 1 }} CNY
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b1')}} </view>
              <view class="flex-fill fn-right color-light">
                <template v-for="minItem in item.pay_type">
                  {{ payTypeMap[minItem] }}，
                </template>
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b2')}} </view>
              <view class="flex-fill fn-right color-light">
                <v-button
                  type="green"
                  size="mini"
                  class="rounded-xs"
                  @click="clickItem(item)"
                >
                  {{ item.side == 2 ? $t('otc.a5') : $t('otc.a6') }}
                </v-button>
              </view>
            </view>
          </view>
        </view>
      </template>
    </v-paging>
    <van-popup
      :show="buyShow"
      @close="buyShow = false"
      closeable
      close-on-popstate
      position="center"
      custom-style="height:70%;width:70%;border-radius:8px;"
    >
      <view class="p-md">
        <view class="fn-center color-light">  {{ activeItem.side == 2 ? $t('otc.a5') : $t('otc.a6') }} </view>
        <view
          class="m-x-auto m-t-sm w-50 h-50 border rounded-max border-light bg-primary color-plain d-flex justify-center align-center fn-30"
        >
          {{userName(activeItem.user&&activeItem.user.username||'')}}
        </view>
        <view class="fn-center"> {{activeItem.user.username}} </view>
        <view class="row d-flex m-t-sm">
          <view class="label">{{$t('otc.b3')}}</view>
          <view class="color-light flex-fill fn-right">{{ activeItem.amount }}</view>
        </view>
        <view class="row d-flex m-t-sm">
          <view class="label">{{$t('otc.a8')}}</view>
          <view class="color-light flex-fill fn-right">{{ activeItem.cur_amount }}</view>
        </view>
        <view class="row d-flex m-t-sm">
          <view class="label">{{$t('otc.a9')}}</view>
          <view class="color-light flex-fill fn-right">{{ activeItem.min_num * 1 }} - {{
                      activeItem.max_num * 1||'∞'
                  }}</view>
        </view>
        <view class="row d-flex m-t-sm">
          <view class="label">{{$t('otc.b0')}}</view>
          <view class="color-light flex-fill fn-right">{{ activeItem.price * 1 }}CNY</view>
        </view>
        <view>
          <v-picker :list="paysList" v-model="form.pay_type">
            <template #default="{label}">
              <view class="p-xs rounded-xs bg-panel-1 m-t-sm d-flex align-center box-shadow"> 
                <view class="flex-fill">
                  {{label||$t('otc.b4')}} 
                </view>
                <van-icon name="arrow-down" />
              </view>
            </template>
          </v-picker>
        </view>
        <view>
          <v-input
            :placeholder="$t('otc.b5')"
            class="p-xs rounded-xs bg-panel-1 m-t-sm box-shadow"
            type="number"
            v-model="form.amount"
          ></v-input>
        </view>
        <view class="m-t-sm">
          <v-button
            type="green"
            block
            size="small"
            class="rounded-xs"
            @click="storeOrder"
            >{{$t('otc.b6')}}</v-button>
        </view>
      </view>
    </van-popup>
  </view>
</template>
<script>
import Otc from "@/api/otc";
export default {
  name: "otc",
  props: ["isShow"],
  watch: {
    isShow() {
      this.menu = false;
    },
  },
  data() {
    return {
      tab: 2,
      buyShow: false,
      list: [],
      menu: false,
      virtual_coin: "USDT",
      coinList: [],
      activeItem: {
        user:{}
      },
       form: {
        entrust_id: "",
        amount: "",
        pay_type: "",
      },
    };
  },
  computed: {
    payTypeMap() {
      return {
        alipay: this.$t('otc.b7'),
        wechat: this.$t('otc.b8'),
        bank_card: this.$t('otc.b9'),
      };
    },
    activeCoin() {
      return (
        this.coinList.find((item) => item.value == this.virtual_coin) || {}
      );
    },
    paysList(){
      if(this.activeItem.pay_type){
        return this.activeItem.pay_type.map(item=>({value:item,label:this.payTypeMap[item]}))
      }else{
        return []
      }
    }
  },
  created() {
    this.otcTicker();
  },
  methods: {
    otcTicker() {
      Otc.otcTicker().then((res) => {
        this.coinList = res.data.map((item) => {
          return {
            value: item.coin_name,
            label: item.coin_name,
          };
        });
      });
    },
    tradingEntrusts: Otc.tradingEntrusts,
    userName(name) {
      return name.substring(0, 1);
    },
    changeCoin() {
      this.$nextTick(() => {
        this.$refs.scroll.ref();
      });
    },
    // tab切换
    tabChange(idx) {
      this.tab = idx;
      this.$nextTick(() => {
        this.$refs.scroll.ref();
      });
    },
    clickItem(item) {
      this.activeItem = item;
      this.form.entrust_id = this.activeItem.id;
      this.form.pay_type = this.activeItem.pay_type[0];
      this.buyShow = true;
    },
    // 下单
    storeOrder() {
      let data = {
        ...this.form,
      };
      Otc.storeOrder(data).then((res) => {
        this.$toast(this.$t('otc.c0'));
        this.buyShow = false;
        this.form.amount=''
        this.$router.push({ path: "/pages/otc/detail", query: { id: res.data.id } });
      });
    },
    leftClick() {},
  },
};
</script>
<style lang="scss" scoped>
.page-otc {
  position: relative;
  .menu {
    position: absolute;
    z-index: 999;
    top: calc(44px + var(--status-bar-height));
    right: $padding-md;
  }
}
</style>