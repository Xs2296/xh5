<template>
  <v-page >
    <v-header :title="`${form.id?$t('assets.d6'):$t('assets.d7')}${$t('assets.d8')}`"></v-header>
    <view class="layout-main">
      <view class="coin p-md d-flex justify-between bg-panel-4 m-md rounded box-shadow" @click="coinListShow=true">
        <view class="fn-lg color-light">{{form.coin_name}}</view>
        <view>
          <van-icon name="arrow" />
        </view>
      </view>
      <view class="bg-panel-4 m-md rounded box-shadow">
        <view class="form-item border-b p-md">
          <view class="label m-b-xs">{{$t('assets.d8')}}</view>
          <view class="input color-light">
            <v-input v-model="form.address" :placeholder="$t('assets.d9')"></v-input>
          </view>
        </view>
        <view class="form-item border-b p-md">
          <view class="label m-b-xs">{{$t('assets.e0')}}</view>
          <view class="input color-light">
            <v-input v-model="form.address_note" :placeholder="$t('assets.e3')"></v-input>
          </view>
        </view>
      </view>
    </view>
    <view class="p-md">
      <v-button class="w-max rounded-lg" block type="blue" ref="btn" @click="submit">{{$t('common.confirm')}}</v-button>
    </view>
    <coin-list
      ref="coinList"
      v-model="form.coin_name"
      @close="coinListShow=false"
      v-show="coinListShow"
    />
  </v-page>
</template>
<script>
import coinList from "./coin-list";
import Wallet from "@/api/wallet";
export default {
  components: {
    coinList,
  },
  data() {
    return {
      coinListShow: false,
      form: {
        address: "",
        address_note: "",
        coin_name: "",
        id: "",
      },
    };
  },
  computed:{
  },
  methods: {
    submit() {
      if (!this.form.address) {
        this.$toast(this.$t('assets.e2'));
        return;
      }
      if (!this.form.address_note) {
        this.$toast(this.$t('assets.e1'));
        return;
      }
      let por;
      if (this.form.id) {
        //编辑
        por = Wallet.withdrawalAddressModify(this.form, {
          btn: this.$refs.btn,
        });
      } else {
        //添加
        por = Wallet.addWithdrawAddress(this.form, { btn: this.$refs.btn });
      }
      por.then(() => {
        this.$back();
        this.$toast.success(this.$t('assets.e4'));
      });
    },
    // 删除地址
    
  },
  onLoad(query) {
    if (query.coin_name) {
      this.form.coin_name = query.coin_name;
      this.form.address = query.address;
      this.form.address_note = query.address_note;
      this.form.id = query.id;
    }
  },
};
</script>