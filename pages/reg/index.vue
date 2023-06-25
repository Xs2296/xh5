<template>
  <v-page>
    <v-header class="nav-tab" :title="$t('reg.b9')"></v-header>
    <view class="layout-main">
      <view class="form m-lg bg-panel-3 p-lg rounded-md">
        <view class="d-flex justify-center">
          <view v-if="true" class="item transition-3 p-y-sp-r-sm p-x-xs fn-20 " :class="{
                'color-light ':form.type==1
              }" @click="form.type=1">{{$t('reg.a0')}}
            <view class="w-5 h-5 rounded-max bg-light justify-center mauto m-y-sm" :class="{
		      'disnone':form.type==2
		    }">
            </view>
          </view>

          <view class="item transition-3 p-y-sp-r-sm p-x-xs fn-20" :class="{
                'color-light':form.type==2
              }" @click="form.type=2">{{$t('reg.a1')}}
            <view class="w-5 h-5 rounded-max bg-light justify-center mauto m-y-sm" :class="{
		      'disnone':form.type==1
		    }">

            </view>
          </view>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <template v-if="form.type==1">
            <view key="1">
              <view class="label m-b-xs">{{$t('reg.a2')}}</view>
              <v-input v-model="form.account" class="color-light" :placeholder="$t('reg.a3')">
                <template #left>
                  <v-country ref="country" @country_code="country_code=$event" class="m-r-xs"
                             v-model="form.country_id" />
                </template>
              </v-input>
            </view>
            <view key="11" style="margin-top: 15px;">
              <view class="label m-b-xs">{{$t('reg.a6')}}</view>
              <v-input v-model="form.code" class="color-light" :placeholder="$t('reg.a7')">
                <template #right>
                  <view class="color-sell" @click="getSms()">{{smstxt}}</view>
                </template>
              </v-input>
            </view>
          </template>
          <template v-else-if="form.type==2">
            <view key="2">
              <view class="label m-b-xs">{{$t('reg.a4')}}</view>
              <v-input v-model="form.account" class="color-light" :placeholder="$t('reg.a5')"></v-input>
            </view>
            <view key="21" style="margin-top: 15px;">
              <view class="label m-b-xs">{{$t('reg.a6')}}</view>
              <v-input v-model="form.code" class="color-light" :placeholder="$t('reg.a7')">
                <template #right>
                  <view class="color-sell" @click="getEmail()">{{emailtxt}}</view>
                </template>
              </v-input>
            </view>
          </template>
        </view>
        <view class="form-item border-b m-b-md p-b-xs" v-if="0">
          <view class="label m-b-xs">{{$t('reg.a6')}}</view>
          <v-input class="color-light" v-model="form.code" :placeholder="$t('reg.a7')">
            <template #right>
              <!-- 手机 -->
              <v-code v-show="form.type==1" url="/register/sendsms" :data="{
                phone:form.account,
                country_code:country_code,
                type:1
              }"></v-code>
              <!-- 邮箱 -->
              <v-code url="/register/sendemail" :data="{
                email:form.account,
                type:1
              }" v-show="form.type==2"></v-code>
            </template>
          </v-input>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <view class="label m-b-xs">{{$t('reg.a8')}}</view>
          <v-input class="color-light" v-model="form.password" type="password" :placeholder="$t('reg.a9')">
          </v-input>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <view class="label m-b-xs">{{$t('reg.b0')}}</view>
          <v-input class="color-light" v-model="form.password_confirmation" type="password"
                   :placeholder="$t('reg.b1')"></v-input>
        </view>
        <view class="form-item border-b m-b-md p-b-xs">
          <view class="label m-b-xs">{{$t('reg.b2')}}</view>
          <v-input class="color-light" v-model="form.invite_code" :placeholder="`${$t('reg.b3')}`"></v-input>
        </view>
        <!-- <view class="tips d-flex m-b-md fn-sm">
          <van-checkbox :value="check" @change="check=!check" class="flex-shrink" icon-size="15px"
            checked-color="#f05319"></van-checkbox>
          <view class="m-l-xs">
            {{$t('reg.b5')}}
            <v-link class="color-sell" v-if="agreement.agreement"
              :to="{path:'/pages/notice/detail',query:{id:agreement.agreement.id}}">
              《{{agreement.agreement.title}}》</v-link>{{$t('reg.b7')}}
            <v-link class="color-sell" v-if="agreement.clause"
              :to="{path:'/pages/notice/detail',query:{id:agreement.clause.id}}">
              《{{agreement.clause.title}}》</v-link>
          </view>
        </view> -->
        <v-button type="blue" block class="w-max m-b-md rounded-md" @click="register">{{$t('reg.b9')}}
        </v-button>
      </view>
    </view>
    <view class="m-x-lg p-x-lg">
      <view class="p-y-md border-t fn-center">
        {{$t('reg.b9')}}，
        <v-link class="color-sell" to="/pages/login/index">{{$t('reg.c1')}}</v-link>
      </view>
    </view>
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import Member from "@/api/member";
import app from "app.js";
import func from "../../utils/class/func";
import rules from "../../utils/rules";
export default {
  data() {
    return {
      form: {
        type: 2,
        country_code: "",
        country_id: 0,
        account: "",
        code: "",
        password: "",
        password_confirmation: "",
        invite_code: "",
      },
      check: false,
      agreement: {},
      country_code: '',
      smstxt: '',
      emailtxt: '',
      times: 60,
      isSend: false
    };
  },
  computed: {},
  methods: {
    emailCheck:func.emailCheck,

    getEmail() {
      if (!this.form.account) {
        this.$toast(this.$t('reg.a5'));
        return;
      }
      if(!this.emailCheck(this.form.account)){
        this.$toast(this.$t('safe.b8'));
        return;
      }
      if (this.isSend) {
        return;
      }
      Member.sendEmailCode({
        email: this.form.account,
        type: 1
      }, {
        loading: true
      });
      this.isSend = true
      let timer = null
      timer = setInterval(() => {
        this.times--
        this.emailtxt = this.times + "s"
        if (this.times == 0) {
          clearInterval(timer)
          this.times = 60
          this.isSend = false
          this.emailtxt = this.$t('common.getCode')
        }
      }, 1000)
    },
    getSms() {
      if (!this.form.account) {
        this.$toast(this.$t('reg.c3'));
        return;
      }
      if(this.emailCheck(this.form.account)){
        this.$toast(this.$t('reg.c3'));
        return;
      }
      if (this.isSend) {
        return;
      }
      Member.sendSmsCode({
        country_code: this.country_code,
        phone: this.form.account,
        type: 1
      }, {
        loading: true
      });
      this.isSend = true
      let timer = null
      timer = setInterval(() => {
        this.times--
        this.smstxt = this.times + "s"
        if (this.times == 0) {
          clearInterval(timer)
          this.times = 60
          this.isSend = false
          this.smstxt = this.$t('common.getCode')
        }
      }, 1000)
    },
    register() {
      if (!this.form.invite_code) {
        this.$toast(this.$t('reg.b3'));
        return;
      }
      if (!this.form.account) {
        if (this.form.type == 1) {
          this.$toast(this.$t('reg.c3'));
        } else if (this.form.type == 2) {
          this.$toast(this.$t('reg.c4'));
        }
        return;
      }
      this.form.type = this.form.type
      this.form.country_code = this.country_code;
      Member.register(this.form).then(() => {
        // #ifdef H5
        this.$dialog.confirm({
          title: this.$t("common.tips"),
          message: this.$t('common.toDwon'),
          cancel: true,
          cancelButtonText: this.$t('common.cancelButtonText'),
          confirmButtonText: this.$t('common.confirmButtonText')
        })
            .then(() => {
              // window.open(app.baseUrl + "/down", "_blank ");
              // womdpw.open('https://sudu.tyyanshi88.com/')
            }).catch(() => {
          if (this.query.from) {
            this.$back();
          } else {
            this._router.replace("/pages/login/index");
          }
        });
        // #endif
        // #ifdef APP-PLUS
        if (this.query.from) {
          this.$back();
        } else {
          this._router.replace("/pages/login/index");
        }
        // #endif
        this.$toast(this.$t('reg.c5'));
      });
    },
    // 获取协议
    clause() {
      Member.clause().then((res) => {
        this.agreement = res.data;
      });
    },
  },
  mounted() {},
  onLoad(query) {
    this.query = query
    this.form.invite_code = this.query.invite_code || this.form.invite_code
  },
  created() {
    // this.clause();
    this.smstxt = this.$t('common.getCode')
    this.emailtxt = this.$t('common.getCode')
  },
};
</script>
<style lang="scss" scoped>
.nav-tab {
  background: transparent;

  &::after {
    border: none;
  }
}

.transition-3 {
  transition: all 0.2s;
}

.mauto {
  margin: auto;
}

.disnone {
  display: none;
}
</style>
