<template>
  <v-page>
    <v-header :title="$t('safe.b0')"></v-header>
    <main class="layout-main m-t-md">
      <view class="m-md bg-panel-3 rounded-sm overflow-hidden">
        <view class="form-item border-b p-md">
          <view class="label m-b-xs">{{ $t('safe.b1') }}</view>
          <view class="input color-light">
            <v-input v-model="form.account" :placeholder="`${$t('safe.b2')}/${$t('safe.a3')}`"
                     @blur="checkAccount"></v-input>
          </view>
        </view>
        <view class="form-item border-b p-md" v-if="show">
          <view class="label m-b-xs">{{ $t('safe.b3') }}</view>
          <view class="input color-light">
            <v-input type="password" v-model="form.password" :placeholder="$t('safe.b4')"></v-input>
          </view>
        </view>
        <view class="form-item border-b p-md" v-if="checkData.auth_type==1 && show">
          <view class="label m-b-xs">SMS{{ $t('safe.a7') }}</view>
          <view class="input color-light">
            <v-input v-model="form.code" :placeholder="$t('safe.a6')">
              <template #right>
                <v-code
                    url="/register/sendsms"
                    :data="{type:2,phone:form.account}"
                ></v-code>
              </template>
            </v-input>
          </view>
        </view>
        <view class="form-item border-b p-md" v-if="checkData.auth_type==2 && show">
          <view class="label m-b-xs">{{ $t('safe.a5') }}</view>
          <view class="input color-light">
            <v-input v-model="form.code" :placeholder="$t('safe.a6')">
              <template #right>
                <v-code url="/register/sendemail" :data="{email:form.account,type:2}"></v-code>
              </template>
            </v-input>
          </view>
        </view>
      </view>
    </main>
    <view class="p-md">
      <v-button class="w-max rounded-lg" block ref="btn" type="green" @click="submit" v-if="show">{{
          $t('safe.b7')
        }}
      </v-button>
    </view>
    <van-toast id="van-toast"/>
  </v-page>
</template>
<script>
import Setting from "@/api/setting";

export default {
  data() {
    return {
      show: false,
      country_id: 1,
      form: {
        account: "",
        code: "",
        password: "",
        user_id: "",
        type: "",
      },
      checkData: {},
    };
  },
  computed: {},
  methods: {
    checkAccount() {
      Setting.forgetPasswordAttempt({account: this.form.account})
          .then((res) => {
            this.checkData = res.data;
            this.form.user_id = res.data.user_id;
            this.form.type = res.data.auth_type
            this.show = true
          })
          .catch((res) => {
            this.$toast(this.$t(res));
          });
    },
    submit() {
      if (!this.form.password) {
        this.$toast(this.$t('reg.a9'));
        return false;
      }
      if (!this.form.code) {
        this.$toast(this.$t('reg.a7'));
        return false;
      }
      Setting.forgetPassword(this.form, {btn: this.$refs.btn})
          .then(() => {
            this.$back();
          })
          .catch(() => {
          });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
