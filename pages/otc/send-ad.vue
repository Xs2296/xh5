<template>
  <v-page>
    <v-header :title="$t('otc.a0')"></v-header>
    <view class="layout-main">
      <view class="bg-panel-3 box-shadow rounded-sm m-md p-sm">
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.i3')}}</view>
          <view>
            <v-picker :list="types" v-model="form.side">
              <template #default="{ label }">
                <view
                  class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs d-flex align-center"
                >
                  <view class="flex-fill">
                    {{ label || $t('otc.i4') }}
                  </view>
                  <van-icon name="arrow-down" />
                </view>
              </template>
            </v-picker>
          </view>
        </view>
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.i5')}}</view>
          <view>
            <v-picker :list="coinList" v-model="form.virtual_coin">
              <template #default="{ label }">
                <view
                  class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs d-flex align-center"
                >
                  <view class="flex-fill"
                    >{{ label || $t('otc.i5') }}
                  </view>
                  <van-icon name="arrow-down" />
                </view>
              </template>
            </v-picker>
          </view>
        </view>
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.c4')}}</view>
          <v-input
            :placeholder="$t('otc.b5')"
            class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
            type="number"
            v-model="form.amount"
          ></v-input>
        </view>
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.i6')}}</view>
          <v-input
            :placeholder="$t('otc.i7')"
            class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
            type="number"
            v-model="form.price"
          ></v-input>
        </view>
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.j7')}}</view>
          <v-input
            :placeholder="$t('otc.j9')"
            class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
            type="number"
            v-model="form.min_num"
          ></v-input>
        </view>
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.j8')}}</view>
          <v-input
            :placeholder="$t('otc.k0')"
            class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
            type="number"
            v-model="form.max_num"
          ></v-input>
        </view>
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.b1')}}</view>
          <view class="m-t-xs d-flex flex-wrap" >
            <view class="item d-flex m-r-xs" @click="checkPay('alipay')" v-if="alipay">
              <van-icon v-if="form.pay_type.includes('alipay')" name="checked" class="color-success" />
              <van-icon v-else name="circle" />
              {{$t('otc.b7')}}
            </view>
            <view class="item d-flex m-r-xs" @click="checkPay('wechat')" v-if="wechat">
              <van-icon v-if="form.pay_type.includes('wechat')" name="checked" class="color-success" />
              <van-icon v-else name="circle" />
              {{$t('otc.b8')}}
            </view>
            <view class="item d-flex m-r-xs" @click="checkPay('bank_card')"  v-if="bank_card">
              <van-icon v-if="form.pay_type.includes('bank_card')" name="checked" class="color-success" />
              <van-icon v-else name="circle" />
              {{$t('otc.b9')}}
            </view>
          </view>
        </view>
        <view class="form-item m-b-sm">
          <view class="label">{{$t('otc.j2')}}</view>
          <view>
            <v-input
              :placeholder="$t('otc.j3')"
              class="p-xs rounded-xs bg-panel-1 box-shadow m-t-xs"
              type="text"
              v-model="form.note"
            ></v-input>
          </view>
        </view>
        <view class="">
          <v-button type="green" ref="btn" block class="rounded-xs" @click="storeEntrust"> {{$t('otc.j4')}} </v-button>
        </view>
      </view>
    </view>
  </v-page>
</template>
<script>
import Otc from "@/api/otc";
export default {
  name: "send-ad",
  data() {
    return {
      coinList: [],
      alipay: false,
      bank_card: false,
      wechat: false,
      form: {
        virtual_coin: "",
        side: 1,
        price: "",
        amount: "",
        pay_type: [],
        note: "",
        min_num: "",
        max_num: "",
      },
    };
  },
  computed:{
    types(){
      return  [
        {
          value: 1,
          label: this.$t('otc.f3'),
        },
        {
          value: 2,
          label: this.$t('otc.f2'),
        },
      ]
    }
  },
  created() {
    this.getList();
    this.otcTicker();
  },
  methods: {
    checkPay(key){
      let idx = this.form.pay_type.findIndex(item=>item===key);
      if(idx==-1){
         this.form.pay_type.push(key)
      }else{
         this.form.pay_type.splice(idx,1)
      }
    },
    getList() {
      Otc.userPayment().then((res) => {
        this.alipay = !!res.data.alipay;
        this.bank_card = !!res.data.bank_card;
        this.wechat = !!res.data.wechat;
        if (this.alipay) {
          this.form.pay_type.push("alipay");
        } else if (this.wechat) {
          this.form.pay_type.push("wechat");
        } else if (this.bank_card) {
          this.form.pay_type.push("bank_card");
        }
      });
    },
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
    storeEntrust() {
      let data = {
        ...this.form,
      };
      data.pay_type = JSON.stringify(data.pay_type);
      Otc.storeEntrust(data,{btn:this.$refs.btn}).then((res) => {
        this.$toast(this.$t('otc.j5'));
        this.form.price = "";
        this.form.amount = "";
        this.form.note = "";
        this.form.min_num = "";
        this.form.max_num = "";
      });
    },
  },
};
</script>