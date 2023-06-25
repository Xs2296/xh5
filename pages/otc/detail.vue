<template>
  <v-page>
    <v-header
      :title="`${
        detail.cur_user_role == 'seller' ? $t('otc.f2') : $t('otc.f3')
      } ${$t('otc.f4')}`"
    ></v-header>
    <view class="layout-main">
      <view class="item bg-panel-3 rounded-sm p-md m-md">
        <view class="row m-t-sm d-flex align-center">
          <view class="label"> {{ $t("otc.f5") }} </view>
          <view class="flex-fill fn-right color-light">
            {{ detail.order_sn }}
          </view>
        </view>
        <view class="row m-t-sm d-flex align-center">
          <view class="label"> {{ $t("otc.c1") }} </view>
          <view class="flex-fill fn-right color-light">
            {{ detail.status_text }}
          </view>
        </view>
        <view class="row m-t-sm d-flex align-center">
          <view class="label"> {{ $t("otc.c3") }} </view>
          <view class="flex-fill fn-right color-light">
            {{ detail.money }}
          </view>
        </view>

        <view class="row m-t-sm d-flex align-center">
          <view class="label"> {{ $t("otc.b0") }} </view>
          <view class="flex-fill fn-right color-light">
            {{ detail.price }}
          </view>
        </view>
        <view class="row m-t-sm d-flex align-center">
          <view class="label"> {{ $t("otc.c4") }} </view>
          <view class="flex-fill fn-right color-light">
            {{ detail.amount }}
          </view>
        </view>
        <view class="row m-t-sm d-flex align-center">
          <view class="label"> {{ $t("otc.b1") }} </view>
          <view class="flex-fill fn-right color-light">
            <text class="text-primary">{{
              seller_payments.pay_type_text
            }}</text>
          </view>
        </view>
        <view class="row m-t-sm" v-if="seller_payments.pay_type == 'alipay'">
          <view class="m-b-sm"
            >{{ $t("otc.d9") }}：<text class="text-primary">{{
              seller_payments.pay_type_text
            }}</text></view
          >
          <view class="m-b-sm"
            >{{ $t("otc.f6") }}：{{ seller_payments.card_no }}</view
          >
          <view class="m-b-sm">
            <view
              class="upload-box d-flex justify-center align-center rounded-sm bg-panel-1 box-shadow w-7/12"
            >
              <img class="w-max" :src="seller_payments.full_code_img" alt />
            </view>
          </view>
        </view>
        <view class="row m-t-sm" v-if="seller_payments.pay_type == 'wechat'">
          <view class="m-b-sm"
            >{{ $t("otc.d9") }}：<text class="text-primary">{{
              seller_payments.pay_type_text
            }}</text></view
          >
          <view class="m-b-sm"
            >{{ $t("otc.f6") }}：{{ seller_payments.card_no }}</view
          >
          <view class="m-b-sm">
            <view
              class="upload-box d-flex justify-center align-center rounded-sm bg-panel-1 box-shadow w-7/12"
            >
              <img class="w-max" :src="seller_payments.full_code_img" alt />
            </view>
          </view>
        </view>
        <view class="row m-t-sm" v-if="seller_payments.pay_type == 'bank_card'">
          <view class="m-b-sm"
            >{{ $t("otc.d9") }}：<text class="color-primary">{{
              seller_payments.pay_type_text
            }}</text></view
          >
          <view class="m-b-sm"
            >{{ $t("otc.f6") }}：{{ seller_payments.card_no }}</view
          >
          <view class="m-b-sm"
            >{{ $t("otc.f7") }}：{{ seller_payments.bank_name }}</view
          >
          <view class="m-b-sm"
            >{{ $t("otc.e6") }}：{{ seller_payments.open_bank }}</view
          >
        </view>
        <view class="row m-t-sm d-flex align-center">
          <view class="label"> {{ $t("otc.f8") }} </view>
          <view class="flex-fill fn-right color-light">
            <text class="color-danger">{{ getTime(overed_time).m }}</text
            >{{ $t("otc.f9")
            }}<text class="color-danger">{{ getTime(overed_time).s }}</text
            >{{ $t("otc.g0") }}
          </view>
        </view>
        <view class="row m-t-sm">
          <view class="label color-warning"> {{ $t("otc.g1") }} </view>
          <view class="m-t-xs">
            <view
              class="upload-box d-flex justify-center align-center rounded-sm bg-panel-1 box-shadow"
              @click="getFile"
            >
              <van-icon
                v-if="!paid_img"
                class="color-light fn-30"
                name="photograph"
              />
              <img v-else :src="$imgUrl + '/' + paid_img" alt />
            </view>
          </view>
        </view>
      </view>
      <view class="m-md" v-if="detail.confirm_button == 'buyer'">
        <v-button
          type="green"
          class="rounded"
          block
          @click="ifConfirmPaidOrder"
          >{{ $t("otc.g2") }}</v-button
        >
        <view class="h-10"></view>
        <v-button type="red" class="rounded" block @click="ifCancelOrder">{{
          $t("otc.g3")
        }}</v-button>
      </view>
      <view class="m-md" v-if="detail.confirm_button == 'seller'">
        <v-button type="green" class="rounded" block @click="ifConfirmOrder">{{
          $t("otc.g4")
        }}</v-button>
        <view class="h-10"></view>
        <v-button type="red" class="rounded" block @click="ifNotConfirmOrder">{{
          $t("otc.g5")
        }}</v-button>
      </view>
    </view>
  </v-page>
</template>
<script>
import Otc from "@/api/otc";
import Member from "@/api/member";
export default {
  name: "detail",
  data() {
    return {
      query: {},
      detail: {},
      seller_payments: {},
      overed_time: 0,
      dTime: undefined,
      paid_img: "",
    };
  },
  onLoad(query) {
    this.query = query;
    this.orderDetail();
  },
  methods: {
    getTime(s) {
      return {
        m: Math.floor(s / 60),
        s: s % 60,
      };
    },
    orderDetail() {
      let data = {
        order_id: this.query.id,
      };
      Otc.orderDetail(data).then((res) => {
        this.detail = res.data;
        this.seller_payments = res.data.seller_payments;
        this.overed_time = res.data.overed_time;
        if (this.overed_time) {
          this.lastTime();
        }
      });
    },
    // 倒计时
    lastTime() {
      this.dTime = setInterval(() => {
        this.overed_time--;
        if (!this.overed_time) {
          clearInterval(this.dTime);
        }
      }, 1000);
    },
    // 撤销订单
    ifCancelOrder() {
      this.$dialog
        .confirm({
          title: this.$t("otc.d0"),
          message: this.$t("otc.g6") + "?",
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning",
        })
        .then(() => {
          this.cancelOrder();
        });
    },
    cancelOrder() {
      let data = {
        order_id: this.query.id,
      };
      Otc.cancelOrder(data).then((res) => {
        this.$router.back();
        this.$toast.success(this.$t("otc.g7"));
      });
    },
    // 确认付款
    ifConfirmPaidOrder() {
      this.$dialog
        .confirm({
          title: this.$t("otc.d0"),
          message: this.$t("otc.g8") + "?",
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning",
        })
        .then(() => {
          this.confirmPaidOrder();
        });
    },
    confirmPaidOrder() {
      let data = {
        order_id: this.query.id,
        paid_img: this.paid_img,
      };
      Otc.confirmPaidOrder(data).then((res) => {
        this.orderDetail();
        this.$toast.success(this.$t("otc.g9"));
      });
    },
    // 确认收款
    ifConfirmOrder() {
      this.$dialog
        .confirm({
          title: this.$t("otc.d0"),
          message: this.$t("otc.h0") + "。",
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning",
        })
        .then(() => {
          this.confirmOrder();
        });
    },
    confirmOrder() {
      let data = {
        order_id: this.query.id,
      };
      Otc.confirmOrder(data).then((res) => {
        this.orderDetail();
        this.$toast.success(this.$t("otc.g9"));
      });
    },
    // 未到账
    ifNotConfirmOrder() {
      this.$dialog
        .confirm({
           title: this.$t("otc.d0"),
          message: this.$t('otc.h1')+"。",
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning",
        })
        .then(() => {
          this.notConfirmOrder();
        });
    },
    notConfirmOrder() {
      let data = {
        order_id: this.query.id,
      };
      Otc.notConfirmOrder(data).then((res) => {
        this.orderDetail();
        this.$toast.success(this.$t("otc.g9"));
      });
    },
    // 上传图片
    getFile() {
      this.$getFile({ count: 1 }).then((res) => {
        this.upLoadImg(res);
      });
    },
    // 上传图片
    upLoadImg(chooseImageRes) {
      Member.uploadImage(chooseImageRes).then((res) => {
        this.paid_img = res.data.path;
        this.$toast.success(this.$t("auth.c1"));
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-box {
  min-width: 100%;
  min-height: 100px;
  img {
    max-width: 100%;
  }
}
</style>