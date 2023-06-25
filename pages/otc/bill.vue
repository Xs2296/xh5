<template>
  <v-page class="layout-page">
    <v-header :title="$t('otc.d5')"></v-header>
    <!-- 币币 -->
    <view class="layout-main" :ajax="accountFlow" :data="query">
      <view
        class="item bg-panel-4 m-x-md m-y-xs rounded-sm box-shadow"
        v-for="item in $list(list)"
        :key="item.created_at + item.id"
      >
        <view
          class="head d-flex align-center border-b p-x-md p-y-xs justify-between"
        >
          <view class="d-flex justify-between">
            <view>
              <view class="color-light fn-lg">{{ item.coin_name }}</view>
            
            </view>
          </view>

          <view class="fn-md color-buy">
            {{ item.usable_balance }}
          </view>
         
        </view>
             <view class="d-flex justify-between p-x-md">
            <view>{{$t('otc.d6')}}</view>
            <view class="color-sell">{{ item.freeze_balance }}</view>
          </view>
        <view class="p-x-md p-y-xs color-light d-flex justify-between">
           <view>
                {{ item.created_at  }}
           </view>
           <v-button
                  type="green"
                  size="mini"
                  class="rounded-xs"
                  @click="getCoin(item)"
                >
                  {{$t('otc.a5')}}
                </v-button>
        </view>
      </view>
    </view>
  </v-page>
</template>
<script>
import Otc from "@/api/otc";
import date from "@/utils/class/date.js";
export default {
  data() {
    return {
      active: 1,
      detail: {},
      accountFlow: Otc.otcAccount,
      query: {},
      list: [],
    };
  },
  computed: {},
  onLoad(query) {
    this.query = query;
    this.otcAccount();
  },
  methods: {
    parseTime: date.parseTime,
    otcAccount() {
      Otc.otcAccount().then((res) => {
        this.list = res.data;
      });
    },
    getCoin(item){
        this._router.push({path:'/pages/base/index',query:{tel:'otc'}})
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-tabs__wrap {
  background-color: $panel-4;
}
</style>