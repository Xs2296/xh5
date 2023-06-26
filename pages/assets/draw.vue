<template>
  <v-page>
    <v-header>
      <template #title>
        <view>{{ $t("assets.b6") }}</view>
      </template>
    </v-header>

    <view class="layout-main p-x-lg">
      <view class="coin p-md d-flex justify-between  rounded-md m-y-md " @click="coinListShow = true">
        <view class="fn-lg color-light">{{ coin }}</view>
        <view>
          <van-icon name="arrow"/>
        </view>
      </view>

      <view class="form  rounded-md p-x-md ">
        <view class="d-flex justify-between p-y-xs flex-wrap column">
          <view class="color-light d-block  m-y-ms color-light fn-15">{{ $t("assets.b8") }}
            <view>
              <v-link tag="span" :to="{path:'/pages/assets/address-list',query:{from:'draw'}}"
                      class="color-light fn-22">
                <van-icon class="m-r-xs color-theme-1" name="orders-o"/>
              </v-link>
            </view>
          </view>
          <!-- 提币地址 -->
          <picker @change="bindPickerChange" :range-key="'address'" :value="addressIndex" :range="addressList"
                  class="d-flex align-center bg-form-panel-3 p-sm color-light  fn-13 rounded-xs">
            <view class="uni-input">{{ address }}</view>
          </picker>
        </view>
      </view>

      <view class="form bg-panel-3 rounded-md p-x-md m-y-md ">
        <view class="d-flex align-center p-y-xs justify-between ">
          <span class="color-light ">{{ $t("assets.c0") }}</span>
          <span>{{ $t("assets.c1") }}：{{ money }}
						{{ coin }}</span>
        </view>

        <view class="d-flex align-end p-y-xs justify-between bg-form-panel-3 rounded-xs p-sm p-x-ms">
          <v-input type="text" v-model="form.money" class="fn-13 w-8/12 color-light"
                   :placeholder="$t('assets.c2')"></v-input>
          <view class="d-flex align-end">
            <span class="unit fn-20 flex-shrink">{{ coin }}</span>
            <view class="all color-theme-1 m-l-md flex-shrink"
                  @click="doAll()">{{ $t("assets.c3") }}
            </view>
          </view>
        </view>

        <view class="d-flex  p-y-xs justify-between column">
          <span>{{ $t("assets.c4") }}：</span>
          <view class="color-light d-flex align-end p-y-xs justify-between bg-form-panel-3 rounded-xs p-y-sm p-x-ms">
            <text>{{ fee }}</text>
            <text>{{ coin }}</text>
          </view>
        </view>

        <view class="d-flex  p-y-xs justify-between column">
          <span>{{ $t("safe.d1") }}：</span>
          <view class="color-light d-flex align-end p-y-xs justify-between bg-form-panel-3 rounded-xs p-y-sm p-x-ms">
            <v-input type="text" v-model="form.paypwd" class="fn-13 w-8/12 color-light"
                     :placeholder="$t('safe.d1')"></v-input>
          </view>
        </view>
      </view>

      <view class="form rounded-md p-x-md p-y-md m-y-md">
        <ul class="bg-panel-1 p-xs fn-md rounded-md m-y-xs line-height-2">
          <li>·{{ $t("assets.c5") }}。</li>
          <li>·{{ $t("assets.c6") }}。</li>
          <li>·{{ $t("assets.c7") }}。</li>
        </ul>
        <v-button class=" m-y-md rounded-md" block type="yellow" @click="toDraw" ref="btn">{{ $t("assets.b6") }}
        </v-button>
      </view>

      <view class="rounded-md m-b-lg">
        <view class="title d-flex justify-between p-x-md p-y-xs align-center color-light">
          <span class="fn-lg">{{ $t("assets.c8") }}</span>
        </view>
        <view class="p-x-md">
          <table class="w-max">
            <thead class="p-x-md">
            <tr class="fn-sm p-x-md">
              <th class="p-b-md fn-left p-l-md">{{ $t("assets.c9") }}</th>
              <th class="p-b-md fn-left">{{ $t("assets.d0") }}</th>
              <th class="p-b-md fn-right p-r-md">{{ $t("assets.c0") }}</th>
              <th class="p-b-md fn-right p-r-md">{{ $t('exchange.g3') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="color-light trChange p-x-md rounded-md" v-for="item in list" :key="item.id">
              <td class="p-y-xs p-l-md rounded-tl-sm rounded-bl-sm fn-sm">
                {{ item.times }}
              </td>
              <td>
                <view>{{ item.txt }}</view>
              </td>
              <td>
                {{ item.amount }}
                <span class="color-default">({{ item.coin_name }})</span>
              </td>
              <td class="fn-right p-r-md rounded-tr-sm rounded-br-sm">
                <v-button size="mini" v-if="item.status==0" type="danger"
                          @click="cancelWithdraw(item)">{{ $t('exchange.g4') }}
                </v-button>
              </td>
            </tr>
            <tr v-if="loadMore">
              <td colspan="3" class="fn-center p-xs link-active" @click="more">
                {{ $t("assets.d4") }}
              </td>
            </tr>
            </tbody>
          </table>
        </view>
      </view>
    </view>
    <coin-list ref="coinList" v-model="coin" @close="closeCoin()" v-show="coinListShow"/>

    <van-toast id="van-toast"/>
  </v-page>
</template>
<script>
import coinList from "./coin-list";
import Wallet from "@/api/wallet";
import formData from "@/utils/class/date";

export default {
  components: {
    coinList,
  },
  data() {
    return {
      coinListShow: false,
      coin: "",
      rechargeType: 2,
      NewAddress: '',
      form: {
        coin_id: "",
        txid: 0,
        money: 0,
        paypwd: ''
      },
      withdrawFee: {},
      list: [],
      page: 1,
      loadMore: true,
      secondaryShow: false,
      addressList: [],
      addressIndex: '',
      address: '',
      fee: 0,
      money: 0,
    };
  },
  computed: {
    activeCoin() {
      if (!this.coin) return {};
      return this.$refs.coinList.coinList.find(
          (item) => item.coin_name == this.coin
      );
    },
  },
  watch: {
    coin(n) {
      if (n) {
        this.addressList = []
        this.addressIndex = 0
        this.address = ''
        this.fee = 0
        this.money = 0
        this.form.coin_id = ''
        this.form.txid = ''
        this.form.money = ''
        this.form.paypwd = ''
        this.getAddress()
      }
    },
  },
  filters: {
    parseTime(val) {
      return formData.parseTime(val);
    },
  },
  mounted() {
    // uni.$on('selectAddress', (e) => {
    //   Wallet.withdrawalBalance({id: e.id, coin_id: e.coin_id}).then((res) => {
    //     this.fee = res.data.fee
    //     this.balance = res.data.money
    //   })
    //   this.form.address = e.address
    //   this.coin = e.coin_name
    // })
  },
  methods: {
    getAddress() {
      Wallet.getWithdrawAdress({coin_id: this.activeCoin.coin_id}).then((res) => {
        this.addressList = res.data
        if (res.data.length > 0) {
          this.address = res.data[0].address
          this.fee = res.data[0].fee
          this.money = res.data[0].money
          this.form.coin_id = this.activeCoin.coin_id
          this.form.txid = res.data[0].id
          this.addressIndex = 0
        }
      });
    },
    bindPickerChange: function (e) {
      this.addressIndex = e.detail.value;
      this.address = this.addressList[e.detail.value].address
      this.fee = this.addressList[e.detail.value].fee
      this.money = this.addressList[e.detail.value].money
      this.form.txid = this.addressList[e.detail.value].id
    },
    doAll() {
      this.form.money = this.money
    },
    closeCoin() {
      this.coinListShow = false
    },
    // 发起提币
    toDraw() {
      if (!this.form.txid) {
        return this.$toast(this.$t("assets.b9"));
      }
      if (!this.form.money) {
        return this.$toast(this.$t("assets.placePerfect"));
      }
      if (!this.form.paypwd) {
        return this.$toast(this.$t("expand.请输入资金密码"));
      }
      Wallet.withdraw(this.form, {
        btn: this.$refs.btn
      }).then(() => {
        this.$toast.success(this.$t("assets.d5") + "！");
        this.$back();
      })
    },
    reset() {
      this.loadMore = true;
      this.page = 1;
      this.getWithdrawRecords();
    },
    more() {
      this.page++;
      this.getWithdrawRecords();
    },
    // 获取提币记录
    getWithdrawRecords() {
      let data = {
        page: this.page,
      };
      Wallet.withdrawalRecord(data).then((res) => {
        if (this.page == 1) this.list = [];
        this.list = [...this.list, ...res.data.list];
        if (this.page >= res.data.page) this.loadMore = false;
      });
    },
    // 撤销订单
    cancelWithdraw(item) {
      Wallet.cancelWithdraw({
        withdraw_id: item.id
      }).then(() => {
        this.$toast(this.$t('exchange.g6'))
        this.reset();
        this.$back();
      })
    },
    changeTab(ev) {
      this.form.code_type = ev.detail.name
    },
  },
  created() {
    this.getAddress();
    this.getWithdrawRecords();
    this.NewAddress = uni.getStorageSync('address')
  },
};
</script>
<style lang="scss" scoped>
.layout-page {
  // background:#fff;
}

.trChange:nth-child(2n-1) {
  box-shadow: $shadow;
  border-radius: $border-radius-xs;

  td {
    background: $panel-3;
    padding-top: $padding-sm;
    padding-bottom: $padding-sm;
  }
}

.fn-15 {
  // border:1px solid red;
  display: flex;
  justify-content: space-between;
}
</style>
