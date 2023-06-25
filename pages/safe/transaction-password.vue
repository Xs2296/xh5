<template>
  <v-page>
    <v-header :title="`${user.is_set_payword?$t('safe.c9'):$t('safe.d0')}${$t('safe.d1')}`"></v-header>
    <main class="layout-main bg-panel-4 m-t-md">
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">{{$t('safe.b3')}}</view>
        <view class="input color-light">
          <v-input type="password" v-model="form.payword" :placeholder="$t('safe.b4')"></v-input>
        </view>
      </view>
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">{{$t('safe.b5')}}</view>
        <view class="input color-light">
          <v-input type="password" v-model="form.payword_confirmation" :placeholder="$t('safe.b6')"></v-input>
        </view>
      </view>
      <view class="form-item border-b p-md" v-if="user.phone_status==1">
        <view class="label m-b-xs">SMS{{$t('safe.a7')}}</view>
        <view class="input color-light">
          <v-input v-model="form.sms_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/security/sendCode" method="post" :data="{type:1}" />
            </template>
          </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md" v-if="user.email_status==1">
        <view class="label m-b-xs">{{$t('safe.a5')}}</view>
        <view class="input color-light">
          <v-input v-model="form.email_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/security/sendCode" method="post" :data="{type:2}" />
            </template>
          </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md" v-if="user.google_status==1">
        <view class="label m-b-xs">google{{$t('safe.a7')}}</view>
        <view class="input color-light">
          <v-input v-model="form.google_code" :placeholder="$t('safe.a6')"></v-input>
        </view>
      </view>
    </main>
    <view class="p-md bg-panel-4">
      <v-button class="w-max" block type="theme" ref="btn" @click="setPassword">{{$t('safe.e3')}}</v-button>
    </view>
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import Setting from "@/api/setting";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        payword: "",
        payword_confirmation: "",
        sms_code: "",
        email_code: "",
        google_code: "",
      },
    };
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  methods: {
    ...mapActions({
      setUserInfo: "setUserInfo",
    }),
    setPassword() {
      Setting.setOrResetPaypwd(this.form, { btn: this.$refs.btn }).then(() => {
        this.$toast.success(this.$t('safe.e4'));
        this.$back();
        this.setUserInfo();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>