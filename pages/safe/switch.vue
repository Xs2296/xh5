<template>
  <view class="h-max d-flex flex-col">
    <view class="title p-md m-t-lg fn-center color-light">{{status?$t('safe.d7'):$t('safe.d8')}}{{name}}{{$t('safe.d9')}}</view>
    <view class="flex-fill">
      <view class="form-item border-b p-md" v-if="user.phone_status==1">
        <view class="label m-b-xs">{{$t('safe.c4')}}</view>
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
        <view class="label m-b-xs">{{$t('safe.c5')}}</view>
        <view class="input color-light">
          <v-input v-model="form.google_code" :placeholder="$t('safe.a6')"></v-input>
        </view>
      </view>
    </view>
    <view class="p-md">
      <v-button class="w-max" block type="theme" @click="changeSwitch" ref="btn">{{status?$t('safe.d7'):$t('safe.d8')}}</v-button>
    </view>
    <van-toast id="van-toast" />
  </view>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Setting from "@/api/setting";
export default {
  props: ["type"],
  data() {
    return {
      form: {
        sms_code: "",
        email_code: "",
        google_code: "",
        type: "",
      },
    };
  },
  computed: {
    ...mapState({
      user: "user",
    }),
    name() {
      let name = "";
      switch (this.type) {
        case 1:
          name = this.$t('safe.e0');
          break;
        case 2:
          name = this.$t('safe.a2');
          break;
        case 3:
          name = "Google";
          break;
      }
      return name;
    },
    status() {
      let open = true;
      switch (this.type) {
        case 1:
          open = this.user.phone_status == 1;
          break;
        case 2:
          open = this.user.email_status == 1;
          break;
        case 3:
          open = this.user.google_status == 1;
          break;
      }
      return open;
    },
  },
  methods: {
    ...mapActions({
      setUserInfo: "setUserInfo",
    }),
    changeSwitch() {
      let data = this.form;
      data.type = this.type;

   //    let enable = Setting.enableSmsEmailGoogle(data, { btn: this.$refs.btn });
   //    if (this.status) {
		 //  enable = Setting.disableSmsEmailGoogle(data, { btn: this.$refs.btn });
	  // }
	  let enable
	  if (this.type == 1) {
		  if (!this.form.sms_code) {
		    this.$toast(this.$t('safe.d6'));
		    return;
		  }
	  	enable = this.status == true ? Setting.unbindPhone(this.form, { btn: this.$refs.btn }) : Setting.bindPhone(this.form, { btn: this.$refs.btn });
	  }
	  if (this.type == 2) {
		  if (!this.form.email_code) {
		    this.$toast(this.$t('safe.a6'));
		    return;
		  }
		enable = this.status == true ? Setting.unbindEmail(data, { btn: this.$refs.btn }) : Setting.bindEmail(data, { btn: this.$refs.btn });
	  }

      enable
        .then(() => {
          this.$emit("close");
          this.$toast(this.status ? this.$t('safe.e1') : this.$t('safe.e2'));
          this.setUserInfo();
        })
        .catch(() => {});
    },
  },
  mounted() {},
};
</script>