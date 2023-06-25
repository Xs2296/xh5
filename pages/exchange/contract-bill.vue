<template>
  <v-paging :ajax="accountFlow" :data="{symbol:symbolLeft}" class="h-max" ref="vPag">
    <template #box="list">
      <view
       v-for="item in $list(list)"
        class="item bg-panel-4 m-x-md m-y-xs rounded-sm box-shadow"
        :key="item.created_at + item.id"
      >
        <view
          class="head d-flex align-center border-b p-x-md p-y-xs justify-between"
        >
          <view class="d-flex justify-between">
            <view>
              <!-- <view class="color-light fn-lg">{{ $route.query.symbol }}</view> -->
              <view class="fn-10">{{ item.created_at }}</view>
            </view>
          </view>
          <view
            class="fn-md"
            :class="item.amount * 1 < 0 ? 'color-sell' : 'color-buy'"
          >
            {{ item.amount * 1 >= 0 ? "+" : "" }}{{ item.amount * 1 }}
          </view>
        </view>
        <view class="p-x-md p-y-xs color-light">{{ item.log_type_text }}</view>
      </view>
    </template>
  </v-paging>
</template>
<script>
import Wallet from "@/api/wallet";
export default {
  name: "contract-bill",
  props:['symbolLeft'],
  data() {
    return {};
  },
  methods: {
    accountFlow: Wallet.accountFlow,
  },
};
</script>