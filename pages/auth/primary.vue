<template>
  <v-page>
    <v-header :title="$t('auth.a1')"></v-header>
    <main class=" m-lg  bg-panel-3 rounded-md p-x-md box-shadow">
      <view class="form-item border-b p-md m-b-md">
        <view class="label m-b-xs">{{$t('auth.a7')}}</view>
        <view class="input color-light" >
          <v-picker :value="form.country_id" @change="selectCountry" :list="countryList" range-value="id" range-label="name">
            <v-input disabled :value="activeCountry.name" :placeholder="$t('auth.a8')">
              <template #right>
                <van-icon class="color-default" name="arrow" />
              </template>
            </v-input>
          </v-picker>
        </view>
      </view>
      <view class="form-item border-b p-md m-b-md">
        <view class="label m-b-xs">{{$t('auth.a9')}}</view>
        <view class="input color-light">
          <v-input v-model="form.realname" :placeholder="$t('auth.b0')"></v-input>
        </view>
      </view>
      <view class="form-item border-b p-md m-b-md">
        <view class="label m-b-xs">{{$t('auth.b1')}}</view>
        <view class="input color-light">
          <v-input v-model="form.id_card" :placeholder="$t('auth.b2')"></v-input>
        </view>
      </view>
	  <view class="p-md ">
	    <v-button block type="blue" class="w-max rounded-md" ref="btn" @click="primaryAuth">{{$t('auth.b3')}}</v-button>
	  </view>
    </main>
	
	
    
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import Profile from "@/api/profile";
import Member from "@/api/member";
export default {
  data() {
    return {
      detail: {},
      countryList: [],
      form: {
        id_card: "",
        realname: "",
        country_id: "",
        country_code: "",
      },
    };
  },
  computed: {
    activeCountry() {
      return (
        this.countryList.find((item) => item.id == this.form.country_id) || {}
      );
    },
    activeIndex(){
       return this.countryList.findIndex((item) => item.id == this.form.country_id)
    },
  },
  methods: {
    getAuthInfo() {
      Profile.getAuthInfo().then((res) => {
        this.detail = res.data;
      });
    },
    // 获取区号
    getCountryCode() {
      Member.getCountryCode()
        .then((res) => {
          this.countryList = res.data;
          this.form.country_id = this.countryList[0].id;
        })
        .catch(() => {});
    },
    selectCountry(value) {
      this.form.country_id = value
    },
    // 认证
    primaryAuth() {
      let data = this.form;
      data.country_code = this.activeCountry.country_code;
      Profile.primaryAuth(data,{btn:this.$refs.btn}).then(() => {
        this.$toast.success(this.$t('auth.b4'));
        this.$back();
      }).catch(()=>{});
    },
  },
  created() {
    this.getAuthInfo();
    this.getCountryCode();
  },
};
</script>
<style lang="scss">
</style>