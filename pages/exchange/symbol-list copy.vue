<template>
  <div>
    <div class="title fn-18 p-md color-light">{{title||$t('exchange.f5')}}</div>
    <van-tabs v-model="active">
      <van-tab
        :title="parentItem.coin_name"
        v-for="parentItem in showMarketList"
        :key="parentItem.coin_name"
      >
        <van-search v-model="filterText" :placeholder="$t('exchange.f6')" />
        <table class="w-max">
          <thead>
            <tr class="fn-sm">
              <th class="p-l-md p-y-xs fn-left">{{$t('exchange.f7')}}</th>
              <th class="fn-left">{{$t('exchange.f8')}}</th>
              <th class="p-r-md p-y-xs fn-right">{{$t('exchange.f9')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="link-active"
              v-for="item in parentItem.marketInfoList"
              :key="item.symbol"
              v-show="isShow(item.pair_name)"
              @click="$emit('check-symbol',item)"
            >
              <td class="p-l-md p-y-xs">
                <template v-if="parentItem.isCollect">
                  <span class="color-light">{{item.pair_name}}</span>
                </template>
                <template v-else>
                  <span class="color-light">{{item.coin_name}}</span>
                  <span class="fn-sm">/{{parentItem.coin_name}}</span>
                </template>
              </td>
              <td :class="item.increase<0?'color-sell':'color-buy'">{{item.price}}</td>
              <td
                :class="item.increase<0?'color-sell':'color-buy'"
                class="p-r-md p-y-xs fn-right"
              >{{item.increaseStr}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
    </van-tabs>
  </div>
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
        { coin_name: this.$t('exchange.g0'), isCollect: true, marketInfoList: collects },
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
</style>