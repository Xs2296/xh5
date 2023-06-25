<template>
  <v-page>
    <v-header :title="`${user.google_token?$t('safe.a0'):$t('safe.a1')}${$t('safe.b9')}`"></v-header>

    <!-- 未绑定的第一步-->
    <main v-show="step==1&&!user.google_token" class="layout-main bg-panel-4 p-t-md">
      <view
        class="p-x-md p-y-xs bg-theme-1-transparent color-theme-1 fn-sm"
      >{{$t('safe.c0')}}。</view>
      <!-- 二维码 -->
      <view class="row p-md fn-center code-box">
        <v-qr class="v-qr" :text="googleToken.qrcode_url"></v-qr>
        <view class="m-y-md color-light">{{googleToken.secret}}</view>
        <view class="color-theme-1" @click="$copy(googleToken.secret)">{{$t('safe.c1')}}</view>
      </view>
    </main>
    <view v-show="step==1&&!user.google_token" class="p-md bg-panel-4">
      <p class="d-flex m-b-xs">
        <van-checkbox v-model="checkToken" class="m-r-xs" icon-size="15px" checked-color="#f05319"></van-checkbox>{{$t('safe.c2')}}
      </p>
      <v-button class="w-max" block :disabled="!checkToken" type="primary" @click="step++">{{$t('safe.c3')}}</v-button>
    </view>
    <!-- 未绑定的第二步或者未绑定 -->
    <main
      v-show="step==2||user.google_token"
      class="layout-main bg-panel-4 m-t-md"
     
    >
      <view class="form-item border-b p-md" v-if="user.phone_status==1">
        <view class="label m-b-xs">{{$t('safe.c4')}}</view>
        <view class="input color-light">
          <v-input v-model="form.sms_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/user/getCode" :data="{type:1}" />
            </template>
          </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md" v-if="user.email_status==1">
        <view class="label m-b-xs">{{$t('safe.a5')}}</view>
        <view class="input color-light">
          <v-input v-model="form.email_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/user/getCode" :data="{type:2}" />
            </template>
          </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">{{$t('safe.b9')}}</view>
        <view class="input color-light">
          <v-input v-model="form.google_code" :placeholder="$t('safe.a6')"></v-input>
        </view>
      </view>
    </main>
    <view v-show="step==2" class="p-md bg-panel-4">
      <v-button class="w-max" block type="theme" ref="btn" @click="bindGoogle">{{$t('safe.c6')}}</v-button>
    </view>
    <!-- 解绑 -->
    <view v-show="user.google_token" class="p-md bg-panel-4">
      <v-button class="w-max" block type="theme" ref="btn1" @click="unBindGoogle">{{$t('safe.a0')}}</v-button>
    </view>
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Setting from "@/api/setting";
export default {
  data() {
    return {
      step: 1,
      checkToken: false,
      googleToken: {},
      form: {
        google_token: "",
        google_code: "",
        sms_code: "",
        email_code: "",
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
    // 获取googleToken
    getToken() {
      Setting.getGoogleToken()
        .then((res) => {
          this.googleToken = res.data;
        })
        .catch(() => {});
    },
    // 绑定谷歌
    bindGoogle() {
      this.form.google_token = this.googleToken.secret;
      Setting.bindGoogleToken(this.form, { btn: this.$refs.btn })
        .then(() => {
          // 绑定成功
          this.step =1
          this.$back(-1);
          this.setUserInfo();
          this.$toast.success(this.$t('safe.a9'));
        })
        .catch(() => {});
    },
    // 解除绑定
    unBindGoogle() {
      Setting.unbindGoogleToken(this.form, { btn: this.$refs.btn1 })
        .then(() => {
          // 绑定成功
          this.$back();
          this.setUserInfo();
          this.$toast.success(this.$t('safe.a8'));
        })
        .catch(() => {});
    },
  },
  created() {
    if (!this.user.google_token) this.getToken();
  },
  beforeRouteLeave(to, from, next) {
    if (this.step != 1) {
      this.step--;
      next(false);
    } else {
      next();
    }
  },
};
</script>
<style lang="scss" scoped>
.v-qr {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border: 4px solid $white;
  box-sizing: border-box;
}
</style>