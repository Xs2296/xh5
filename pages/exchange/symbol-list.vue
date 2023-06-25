<template>
  <view class="symbol-list">
    <view class="title fn-18 p-md color-light">{{ title||$t("exchange.f5") }}</view>
    <van-search
          background="transparent"
          :value="filterText"
          @change="filterText = $event.detail"
          :placeholder="$t('exchange.f6')"
        />
    <van-tabs :active="active">
      <van-tab
        :title="parentItem.coin_name"
        v-for="(parentItem,pkey) in showMarketList"
        :key="parentItem.coin_name"
		v-if="pkey == 1"
      >
        
        <view class="p-x-xs">
          <table class="w-max a">
            <thead>
              <tr class="fn-sm">
                <th class="p-l-md p-y-xs fn-left">{{ $t("exchange.f7") }}</th>
                <th class="fn-left">{{ $t("exchange.f8") }}</th>
                <th class="p-r-md p-y-xs fn-right">{{ $t("exchange.f9") }}</th>
              </tr>
            </thead>
            <tbody class="table-list">
              <tr
                class="link-active"
                v-for="(item,key) in parentItem.marketInfoList"
                :key="item.symbol"
                v-show="isShow(item.pair_name)"
                @click="$emit('check-symbol', item)"
              >
                <td class="p-l-md p-y-xs rounded-tl-xs rounded-bl-xs">
                  <template v-if="parentItem.isCollect">
                    <span class="color-light">{{ item.pair_name }}</span>
                  </template>
                  <template v-else>
                    <span class="color-light">{{ item.coin_name||item.symbol }}</span>
                    <span class="fn-sm">/{{ parentItem.coin_name }}</span>
                  </template>
                </td>
                <td :class="item.increase < 0 ? 'color-sell' : 'color-buy'">
                  {{ item.price }}
                </td>
                <td
                  :class="item.increase < 0 ? 'color-sell' : 'color-buy'"
                  class="p-r-md p-y-xs fn-right rounded-tr-xs rounded-br-xs"
                >
                  {{ item.increaseStr }}
                </td>
              </tr>
            </tbody>
          </table>
        </view>
      </van-tab>
    </van-tabs>
  </view>
</template>
<script>
export default {
  props: {
    marketList: {
      default() {
        return [];
      },
      type: Array,
      required: false,
    },
    collect: {
      default() {
        return [];
      },
      type: Array,
      required: false,
    },
      title:{
      default:''
    }
  },
  computed: {
    showMarketList() {
      let collect = this.collect.map((item) => item.pair_name);
      let collects = [];
      this.marketList.forEach((parentItem) => {
        parentItem.marketInfoList.forEach((item) => {
          if (collect.includes(item.pair_name)) {
            collects.push(item);
          }
        });
      });
      let arr = [
        {
          coin_name: this.$t("exchange.g0"),
          isCollect: true,
          marketInfoList: collects,
        },
        ...this.marketList,
      ];
      return arr;
    },
  },
  data() {
    return {
      active: 0,
      filterText: "",
    };
  },
  methods: {
    isShow(str) {
      return (
        str.toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase()) !=
        -1
      );
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
	.a{
		margin-bottom: 120rpx;
	}
.table-list {
  tr:nth-of-type(2n-1) {
    td {
      background: $panel-3;
    }
  }
}
</style>