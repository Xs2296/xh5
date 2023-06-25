<template>
  <v-page>
    <v-header :title="`${user.email?$t('safe.a0'):$t('safe.a1')}${$t('safe.a2')}`"></v-header>
    <main class="layout-main bg-panel-4 m-t-md">
      <view class="form-item border-b p-md" v-if="!user.email">
        <view class="label m-b-xs">{{ $t('safe.a3') }}</view>
        <view class="input color-light">
          <v-input v-model="form.email" :placeholder="$t('safe.a4')"></v-input>
        </view>
      </view>
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">{{ $t('safe.a5') }}</view>
        <view class="input color-light">
          <v-input v-model="form.email_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/security/sendCode" method="post" v-if="user.email" :data="{type:2}"/>
              <v-code url="/security/sendCode" method="post" v-else :data="{email:form.email}"/>
            </template>
          </v-input>
        </view>
      </view>
    </main>
    <view class="p-md bg-panel-4">
      <v-button block class="w-max" type="theme" ref="btn" @click="chnageEmail">
        {{ user.email ? $t('safe.a0') : $t('safe.a1') }}
      </v-button>
    </view>
    <van-toast id="van-toast"/>
  </v-page>
</template>
<script>
import Setting from "@/api/setting";
import {mapState, mapActions} from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        email_code: "",
        sms_code: "",
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
    chnageEmail() {
      if (!this.form.email_code) {
        this.$toast(this.$t('safe.a6'));
        return;
      }

      let data = this.form;
      let changeEmail = this.user.email
          ? Setting.unbindEmail(data, {btn: this.$refs.btn})
          : Setting.bindEmail(data, {btn: this.$refs.btn});
      changeEmail
          .then(() => {
            this.$toast.success(this.user.email ? this.$t('safe.a8') : this.$t('safe.a9'));
            this.$back();
            this.setUserInfo();
          })
          .catch(() => {
          });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
