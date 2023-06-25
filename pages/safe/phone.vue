<template>
  <v-page>
    <v-header :title="`${user.phone?$t('safe.a0'):$t('safe.a1')}${$t('safe.d4')}`"></v-header>
    <main class="layout-main bg-panel-4 m-t-md">
      <view class="form-item border-b p-md" v-if="!user.phone">
        <view class="label m-b-xs">{{ $t('safe.d4') }}</view>
        <view class="input color-light">
          <v-input v-model="form.phone" :placeholder="$t('safe.d5')">
            <template #left>
              <v-country class="m-r-xs" ref="country" v-model="country_id"/>
            </template>
          </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">SMS{{ $t('safe.a7') }}</view>
        <view class="input color-light">
          <v-input v-model="form.sms_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/security/sendCode" method="post" v-if="user.phone" :data="{type:1}"/>
              <v-code
                  url="/security/sendCode" method="post"
                  v-else
                  :data="{phone:form.phone,country_code:$refs.country&&$refs.country.country_code,type:3}"
              />
            </template>
          </v-input>
        </view>
      </view>
    </main>
    <view class="p-md bg-panel-4">
      <v-button block class="w-max" type="theme" ref="btn" @click="changePhone">
        {{ user.phone ? $t('safe.a0') : $t('safe.a1') }}
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
      country_id: 1,
      form: {
        phone: "",
        country_code: "",
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
    changePhone() {
      this.form.country_code = this.$refs.country && this.$refs.country.country_code;
      if (!this.user.phone && !this.form.phone) {
        this.$toast(this.$t('safe.d5'));
        return;
      }
      if (!this.form.sms_code) {
        this.$toast(this.$t('safe.d6'));
        return;
      }
      let changePhone = this.user.phone
          ? Setting.unbindPhone(this.form, {btn: this.$refs.btn})
          : Setting.bindPhone(this.form, {btn: this.$refs.btn});
      changePhone
          .then(() => {
            this.$toast.success(this.user.phone ? this.$t('safe.a8') : this.$t('safe.a9'));
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
