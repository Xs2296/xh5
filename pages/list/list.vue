<template>
  <view class="layout-page bg-panel-4" :style="themeStyle">
    <v-header v-if="!isSearch" :title="$t('base.a3')">
      <template #right>
        <van-icon @click="isSearch=true" name="search" size="20" color="rgba(129,151,164,1)" />
      </template>
    </v-header>
    <view style="height: var(--status-bar-height)"></view>
    <van-search
      background="transparent"
      class="bg-panel-1"
      v-if="isSearch"
      :value="searchText"
      show-action
      @cancel="searchText='';$back(1);"
      @change="searchText=$event.detail"
      :placeholder="$t('base.d3')"
    />
    <view class="layout-main">
      <!-- 科创板 -->
      <view class="head_info m-y-xs">
        <van-tabs
          v-if="marketList.length"
          :active="infoActive"
          background="transparent"
          color="rgba(232,92,68,1)"
          title-active-color="rgba(232,92,68,1)"
          :line-width="0"
          :border="false"
          animated
          class="tabs-border border-b"
        >
          <van-tab
            v-for="(parentItem,key) in marketList"
            :key="parentItem.coin_name"
            :title="parentItem.coin_name"
          >
            <view class="layout-main">
              <table class="w-12/12">
                <thead>
                  <tr class="color-gray-6">
                    <th></th>
                    <th class="fn-left p-y-xs fn-xs color-theme-6">{{$t('base.a8')}}</th>
                    <th class="fn-left p-y-xs fn-xs color-theme-6">{{$t('base.a9')}}</th>
                    <th class="fn-right p-y-xs p-r-md fn-xs color-theme-6">24H{{$t('base.b0')}}</th>
                  </tr>
                </thead>
                <tbody class="fn-center">
                  <tr
                    @click="_router.push({path:'/pages/exchange/index',query:{'code':item.pair_name}})"
                    tag="tr"
                    class="border-t-original link-active"
                    v-for="item in (parentItem.collect?collect:parentItem.marketInfoList)"
                    :key="item.pair_name"
                    v-show="isShow(item.pair_name)"
                  >
                    <td class="p-x-xs fn-18" @click.stop="option(item)">
                      <van-icon v-if="isCoolect(item)" class="color-theme-1" name="star" />
                      <van-icon v-else name="star-o" />
                    </td>
                    <td class="color-light fn-left p-y-xs">
                      <view class="d-flex align-end">{{item.pair_name}}</view>
                    </td>
                    <td class="p-y-xs fn-left align-end">
                      <view class="d-flex align-end">{{item.close}}</view>
                    </td>
                    <td class="fn-right p-y-xs p-r-md">
                      <span :class="item.increase*1<0?'color-sell':'color-buy'">{{item.increaseStr}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </view>
          </van-tab>
        </van-tabs>
      </view>
    </view>
  </view>
</template>
<script>
import Home from "@/api/home";
import { mapState,mapGetters } from "vuex";
export default {
  name: "list",
  data() {
    return {
      page: 0,
      list: [],
      searchText: "",
      isSearch: false,
      sendSearch: "",
      tab: "shares",
      gridActive: 0, // 头部选中
      query: {},
      infoActive: 0, // 详情选中,
      marketList: [],
      collect: [],
    };
  },
  computed: {
    gridList() {
      return [
        {
          name: this.$t("base.d4"),
        },
        {
          name: this.$t("base.d5"),
        },
      ];
    },
    ...mapState({
      ws: "ws",
    }),
    ...mapGetters(['themeStyle']),
    isLogin() {
      return Boolean(uni.getStorageSync("token"));
    },
  },
  methods: {
    isShow(str) {
      return (
        str.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase()) !=
        -1
      );
    },
    indexData() {
      let data = {
        p: this.page,
        code_type: this.tab,
      };
      Home.indexList(data).then((res) => {
        this.home = res.data.bannerList;
        this.notice = res.data.articleList;
        this.indexList = res.data.brokenLine;
        this.marketList = res.data.marketList;
        this.infoActive = 1;
        this.dunshift();
        this.getCollect();
        this.indexMarketList();
      });
    },
    dunshift() {
      if (this.marketList.filter((item) => item.collect).length) return;
      this.marketList.unshift({
        coin_name: this.$t("base.c7"),
        collect: true,
        marketInfoList: [],
      });
    },
    // 获取自选交易列表
    getCollect(call) {
      if (!this.isLogin) return;
      Home.getCollect()
        .then((res) => {
          this.collect = res.data || [];
          call && call();
        })
        .catch(() => {});
    },
    // 是否为自选
    isCoolect(i) {
      return this.collect.map((item) => item.pair_name).includes(i.pair_name);
    },
    // 替换自选数据
    replaceOptional() {
      let collect = this.collect.map((item) => item.pair_name);
      this.marketList.forEach((parentItem) => {
        parentItem.marketInfoList.forEach((item) => {
          let idx = collect.indexOf(item.pair_name);
          if (idx != -1) {
            this.collect.splice(idx, 1, item);
          }
        });
      });
    },
    // 添加自选
    option(item) {
      let data = {
        pair_name: item.pair_name,
      };
      Home.option(data)
        .then((res) => {
          this.getCollect();
          if (res.data) {
            this.$toast(this.$t("base.c8"));
          } else {
            this.$toast(this.$t("base.c9"));
          }
        })
        .catch(() => {});
    },
    // 链接socket
    indexMarketList() {
      // this.ws.send({
      //   cmd: "sub",
      //   msg: "indexMarketList",
      // });
      this.ws.on("message", (res) => {
        let { data, sub } = res;
        if (sub == "indexMarketList") {
          this.marketList = data;

          this.dunshift();
          this.replaceOptional();
        }
      });
    },
  },
  onLoad(query) {
    this.query = query;
    this.indexData();
    this.isSearch = !!query.isSearch;
  
  },
  destroyed() {
    // this.ws.send({
    //   cmd: "unsub",
    //   msg: "indexMarketList",
    // });
  },
};
</script>

<style lang="scss" scoped>
.head {
  padding: 16px 16px 0;
  ::v-deep.van-grid-item__content {
    padding: 6px 0;
    background-color: transparent;
  }
  ::v-deep.van-hairline--top::after {
    border-left-width: 1px;
  }
  ::v-deep.van-grid-item__text {
    color: rgba(123, 145, 159, 1);
  }
  .active {
    background: rgba(232, 92, 68, 1);
    ::v-deep.van-grid-item__text {
      color: #ffffff;
    }
  }
}
.l-n-px {
  line-height: 35px;
}
</style>