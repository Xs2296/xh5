<template>
  <v-page>
    <v-header :title="$t('auth.a1')"></v-header>
    <main class=" m-lg  bg-panel-3 rounded-md p-x-md box-shadow">
      <view class="form-item border-b p-md m-b-md">
        <view class="label m-b-xs">{{ $t('auth.a9') }}</view>
        <view class="input color-light">
          <v-input v-model="form.realname" :placeholder="$t('auth.b0')"></v-input>
        </view>
      </view>
      <view class="form-item border-b p-md m-b-md">
        <view class="label m-b-xs">{{ $t('auth.b1') }}</view>
        <view class="input color-light">
          <v-input v-model="form.id_card" :placeholder="$t('auth.b2')"></v-input>
        </view>
      </view>
      <view class="p-md" v-if="primary_status==0">
        <v-button block type="blue" class="w-max rounded-md" ref="btn" @click="primaryAuth">
          {{ $t('auth.b3') }}
        </v-button>
      </view>
    </main>


    <van-toast id="van-toast"/>
  </v-page>
</template>
<script>
import Profile from "@/api/profile";
import Member from "@/api/member";

export default {
  data() {
    return {
      form: {
        id_card: "",
        realname: "",
      },
      primary_status: 0
    };
  },
  methods: {
    getAuthInfo() {
      Profile.getAuthInfo().then((res) => {
        this.form.realname = res.data.realname
        this.form.id_card = res.data.id_card
        this.primary_status = res.data.primary_status
      });
    },
    selectCountry(value) {
      this.form.country_id = value
    },
    // 认证
    primaryAuth() {
      if (!this.form.realname) {
        this.$toast(this.$t('auth.b0'));
        return false;
      }
      if (!this.form.id_card) {
        this.$toast(this.$t('auth.b2'));
        return false;
      }
      Profile.primaryAuth(this.form, {btn: this.$refs.btn}).then(() => {
        this.$toast.success(this.$t('auth.b4'));
        this.$back();
      }).catch(() => {
      });
    },
  },
  created() {
    this.getAuthInfo();
  },
};
</script>
<style lang="scss">
</style>
