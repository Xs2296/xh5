<template>
  <v-page>
    <v-header :title="$t('safe.c7')"></v-header>
    <main class=" m-x-lg m-y-lg p-x-md bg-panel-3 rounded-md box-shadow">
      <view class="list">
        <!-- --------google------ -->
        <v-link
          tag="li"
          to="/pages/safe/google"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('safe.b9')}}</view>
            <van-switch v-if="user.google_token" @click.native.stop @input="switchVer(3)" size="28rpx" :checked="user.google_status==1" />
          </view>
          <van-icon name="arrow" />
        </v-link>
        <!-- -------login---------- -->
        <v-link
          tag="li"
          to="/pages/safe/login-password"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('safe.c8')}}</view>
          </view>
          <van-icon name="arrow" />
        </v-link>
        <!-- ----------交易密码---------- -->
        <v-link
          tag="li"
          to="/pages/safe/transaction-password"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('safe.d1')}}</view>
          </view>
          <van-icon name="arrow" />
        </v-link>
        <!-- -----------邮箱--------- -->
        <v-link
          tag="li"
          to="/pages/safe/email"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('safe.a2')}}</view>
            <van-switch v-if="user.email" @click.native.stop @input="switchVer(2)" size="28rpx" :checked="user.email_status==1" />
          </view>
          <van-icon name="arrow" />
        </v-link>
        <!-- ----------手机---------- -->
        <v-link
          tag="li"
          to="/pages/safe/phone"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('safe.d2')}}</view>
            <van-switch v-if="user.phone" @click.native.stop @input="switchVer(1)" size="28rpx" :checked="user.phone_status==1" />
          </view>
          <van-icon name="arrow" />
        </v-link>
      </view>
    </main>
    <van-popup
      :show="switchShow"
       @close="switchShow=false"
      closeable
      close-on-popstate
      position="bottom"
      custom-style="height:60%"
    >
      <switch-page v-if="switchShow" @close="switchShow=false" :type="switchType" />
    </van-popup>
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import { mapState ,mapActions} from "vuex";
import switchPage from "./switch";
export default {
  components: {
    switchPage,
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  data() {
    return {
      switchShow: false,
      switchType: 0,
    };
  },
  methods: {
     ...mapActions({
      setUserInfo: "setUserInfo",
    }),
    switchVer(idx) {
      this.switchType = idx;
      this.switchShow = true;
    },
  },
  onShow() {
     this.setUserInfo()
  },
  mounted(){
   
  }
};
</script>