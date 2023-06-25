<template>
  <v-page class="pos-login">
    <v-header :title="$t('safe.c8')"></v-header>
    <main class="layout-main bg-panel-4 m-t-md">
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">{{ $t('safe.b3') }}</view>
        <view class="input color-light">
          <v-input type="password" v-model="form.password" :placeholder="$t('safe.b4')"></v-input>
        </view>
      </view>
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">{{ $t('safe.b5') }}</view>
        <view class="input color-light">
          <v-input type="password" v-model="form.password_confirmation" :placeholder="$t('safe.b6')"></v-input>
        </view>
      </view>
      <view class="form-item border-b p-md" v-if="user.auth_type==1">
        <view class="label m-b-xs">SMS{{ $t('safe.a7') }}</view>
        <view class="input color-light">
          <v-input v-model="form.sms_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/security/sendCode" method="post" :data="{type:1}"/>
            </template>
          </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md" v-if="user.auth_type==2">
        <view class="label m-b-xs">{{ $t('safe.a5') }}</view>
        <view class="input color-light">
          <v-input v-model="form.email_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/security/sendCode" method="post" :data="{type:2}"/>
            </template>
          </v-input>
        </view>
      </view>
    </main>
    <view class="p-md bg-panel-4">
      <v-button block type="blue" class="w-max rounded-md" ref="btn" @click="setPassword">{{ $t('safe.b7') }}</v-button>
    </view>
    <van-toast id="van-toast"/>
  </v-page>
</template>
<script>
import {mapState} from "vuex";
import Setting from "@/api/setting";

export default {
  data() {
    return {
      form: {
        password: "",
        password_confirmation: "",
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
    setPassword() {
      if (!this.form.password) {
        this.$toast(this.$t('safe.b4'));
        return false;
      }
      if (!this.form.password_confirmation) {
        this.$toast(this.$t('safe.b6'));
        return false;
      }
      if (this.user.auth_type == 1) {
        if (!this.form.sms_code) {
          this.$toast(this.$t('reg.a7'));
          return false;
        }
      } else if (this.user.auth_type == 2) {
        if (!this.form.email_code) {
          this.$toast(this.$t('reg.a7'));
          return false;
        }
      }
      let data = this.form;
      Setting.updatePassword(data, {btn: this.$refs.btn})
          .then(() => {
            this.$back();
            this.$toast.success(this.$t('safe.d3'));
          })
          .catch(() => {
          });
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
