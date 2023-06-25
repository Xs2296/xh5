<template>
  <v-page>
    <v-header :title="$t('otc.a4')">
      <template #right>
        <v-picker :list="list" v-model="status" @input="changeStatus">
          <template #default="{ label }">
            <view class="color-light">
              {{ label || $t('otc.c1') }}
              <van-icon name="arrow-down" />
            </view>
          </template>
        </v-picker>
      </template>
    </v-header>
    <van-tabs
      :ellipsis="false"
      :border="false"
      class="border-b"
      :active="tab"
      @change="tabChange($event.detail.name)"
    >
      <van-tab :title="$t('otc.a5')" :name="1"></van-tab>
      <van-tab :title="$t('otc.a6')" :name="2"></van-tab>
    </van-tabs>
    <v-paging
      :ajax="myEntrusts"
      :data="{ side: tab, status }"
      ref="scroll"
      class="layout-main"
    >
      <template #box="list">
        <view class="list">
          <view
            class="item bg-panel-3 box-shadow rounded-sm p-md m-md"
            v-for="item in $list(list)"
            :key="item.id"
          >
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c2')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.order_sn }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c1')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.status_text }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c3')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.money }}
              </view>
            </view>

            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b0')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.price }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c4')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.amount }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.a8')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.cur_amount }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b1')}} </view>
              <view class="flex-fill fn-right color-light">
                <template v-for="minItem in item.pay_type">
                  {{ payTypeMap[minItem] }}，
                </template>
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.c5')}} </view>
              <view class="flex-fill fn-right color-light">
                {{ item.created_at }}
              </view>
            </view>
            <view class="row m-t-sm d-flex align-center">
              <view class="label"> {{$t('otc.b2')}} </view>
              <view class="flex-fill fn-right color-light">
                <v-button
                  type="red"
                  size="mini"
                  class="rounded-xs"
                  v-if="item.status == 1"
                  @click="ifCancelEntrust(item)"
                >
                  {{$t('otc.c6')}}
                </v-button>
              </view>
            </view>
          </view>
        </view>
      </template>
    </v-paging>
  </v-page>
</template>
<script>
import Otc from "@/api/otc";
import vPaging from "../../layout/vPaging.vue";
export default {
  components: { vPaging },
  name: "order",
  data() {
    return {
      tab: 1,
      status: 1,
    };
  },
  computed: {
    payTypeMap() {
      return {
        alipay: this.$t('otc.b7'),
        wechat: this.$t('otc.b8'),
        bank_card: this.$t('otc.b9'),
      };
    },
    list(){
      return  [
        {
          label: this.$t('otc.c7'),
          value: 0,
        },
        {
          label: this.$t('otc.c8'),
          value: 1,
        },
        {
          label: this.$t('otc.c9'),
          value: 2,
        },
      ]
    }
  },
  methods: {
    myEntrusts: Otc.myEntrusts,
    tabChange(idx) {
      this.tab = idx;
      this.$nextTick(() => {
        this.$refs.scroll.ref();
      });
    },
    changeStatus() {
      this.$nextTick(() => {
        this.$refs.scroll.ref();
      });
    },
    // 下架
    ifCancelEntrust(item) {
      this.$dialog
        .confirm({
          title: this.$t('otc.d0'),
          message: this.$t('otc.d1')+"？",
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel')
        })
        .then(() => {
          this.cancelEntrust(item);
        });
    },
    cancelEntrust(item) {
      let data = {
        entrust_id: item.id,
      };
      Otc.cancelEntrust(data).then((res) => {
        this.$toast.success(this.$t('otc.d4'));
        this.$nextTick(() => {
          this.$refs.scroll.ref();
        });
      });
    },
  },
};
</script>