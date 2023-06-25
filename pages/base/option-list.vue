<template>
  <view class="d-flex flex-col">
    <v-header :left-arrow="false" :title="$t('option.a0')"></v-header>
    <view class="layout-main">
      <van-tabs
        :active="active"
        :border="false"
        v-if="list.length"
        animated
        class="nav-tab"
        lazy-render
      >
        <van-tab
          v-for="parentItem in list"
          :title="parentItem.guessTimeName"
          :key="parentItem.guessTimeName"
        >
          <view class="chart-box">
            <v-curve
              class="chart bg-form-panel-3 m-b-md"
              :list="parentItem.first.prices"
            ></v-curve>
            <view class="top p-md">
              <view class="d-flex justify-between align-center">
                <view class="coin d-flex align-center">
                  <img
                    class="w-20 h-20"
                    :src="parentItem.first.coin_icon"
                    alt
                  />
                  <text class="fn-18 m-r-sm m-l-xs color-light">{{
                    parentItem.first.pair_name
                  }}</text>
                  <text
                    :class="
                      parentItem.first.increase * 1 >= 0
                        ? 'color-buy'
                        : 'color-sell'
                    "
                    >{{ parentItem.first.increaseStr }}</text
                  >
                </view>
                <view class=" d-flex align-center fn-sm">
                  {{ $t("option.a1") }}
                  <van-count-down
                    :time="parentItem.first.seconds * 1000"
                    class="color-sell m-l-xs"
                  >
                  </van-count-down>
                </view>
              </view>
              <view class="vs-box">
                <view
                  class="d-flex justify-between align-center m-t-lg m-x-lg p-t-lg p-x-lg"
                >
                  <view class="item color-buy">{{ $t("option.a2") }}</view>
                  <view class="item fn-22 color-light">
                    <!-- <van-icon name="fire-o" /> -->
                  </view>
                  <view class="item color-sell">{{ $t("option.a3") }}</view>
                </view>
                <view
                  class="d-flex justify-between align-center m-t-sm m-x-lg p-x-lg"
                >
                  <view class="item w-50 color-light fn-lg">{{
                    parentItem.first.upodds
                  }}</view>
                  <view class="item color-buy h-2 w-20 bg-buy"></view>
                  <view class="item">{{ $t("option.a4") }}</view>
                  <view class="item color-buy h-2 w-20 bg-sell"></view>
                  <view class="item w-50 color-light fn-lg fn-right">{{
                    parentItem.first.downodds
                  }}</view>
                </view>
              </view>
              <view class="m-x-md m-t-lg">
                <view
                  class="h-14 bg-form-panel-4 rounded-lg overflow-hidden d-flex justify-between fn-10 color-gray-1 "
                >
                  <view
                    class="h-max bg-buy rounded-lg p-l-xs transition-default d-flex align-center"
                    :style="{ width: parentItem.first.trend_up * 100 + '%' }"
                    >&emsp;{{
                      multiple(parentItem.first.trend_up, 100, 2)
                    }}%</view
                  >
                  <view class="p-r-xs d-flex align-center"
                    >{{ multiple(parentItem.first.trend_down, 100, 2) }}%</view
                  >
                </view>
              </view>
              <view class="fn-center m-t-md">
                <view class="w-100 d-inline-block">
                  <v-button
                    block
                    type="green"
                    class="rounded-lg"
                    :to="{
                      path: '/pages/option/index',
                      query: {
                        pair_time_name: parentItem.first.pair_time_name,
                        pair_id: parentItem.first.pair_id,
                        time_id: parentItem.first.time_id,
                      },
                    }"
                    >{{ $t("option.a5") }}</v-button
                  >
                </view>
              </view>
            </view>
          </view>
          <view class="list">
            <v-link
              :to="{
                path: '/pages/option/index',
                query: {
                  pair_time_name: item.pair_time_name,
                  pair_id: item.pair_id,
                  time_id: item.time_id,
                },
              }"
              class="item p-md bg-panel-3 m-b-md rounded-sm m-x-md d-block box-shadow"
              v-for="item in parentItem.scenePairList"
              :key="item.pair_time_name"
            >
              <view class="d-flex justify-between align-center">
                <view class="coin d-flex align-center">
                  <img
                    class="w-20 h-20"
                    :src="item.coin_icon"
                    alt
                  />
                  <span class="fn-18 m-r-sm m-l-xs color-light">{{
                    item.pair_name
                  }}</span>
                  <span
                    :class="
                     item.increase * 1 >= 0
                        ? 'color-buy'
                        : 'color-sell'
                    "
                    >{{ item.increaseStr }}</span
                  >
                </view>
                <view class=" d-flex align-center fn-sm">
                  {{ $t("option.a1") }}
                  <van-count-down
                    :time="item.seconds * 1000"
                    @finish="getList"
                    class="m-l-xs"
                  >
                  </van-count-down>
                </view>
              </view>
              <view class="d-flex m-t-sm trend">
                <view
                  class="p-x-sm flex-fill btn up p-y-xs d-flex justify-between align-center bg-form-panel-4"
                >
                  <span class="color-buy fn-lg fn-bold">{{
                    $t("option.a6")
                  }}</span>
                  <span>{{ item.upodds }}</span>
                </view>
                <view class="w-20"></view>
                <view
                  class="p-x-sm flex-fill btn down p-y-xs d-flex justify-between align-center bg-form-panel-4"
                >
                  <span class="color-sell fn-lg fn-bold">{{
                    $t("option.a7")
                  }}</span>
                  <span>{{ item.downodds }}</span>
                </view>
              </view>
            </v-link>
          </view>
        </van-tab>
      </van-tabs>
    </view>
  </view>
</template>
<script>
import Option from "@/api/option";
import math from "@/utils/class/math";
import { mapState } from "vuex";
export default {
  props: ["isShow"],
  data() {
    return {
      active: 0,
      time: 3000 * 50,
      list: [],
      chartMap: {},
      msg: "sceneListNewPrice",
      isAjax: false,
    };
  },
  watch: {
    isShow(n) {
      if (n) {
        this.ws.send({
          cmd: "sub",
          msg: this.msg,
        });
      } else {
        this.ws.send({
          cmd: "unsub",
          msg: this.msg,
        });
      }
    },
  },
  computed: {
    ...mapState({
      ws: "ws",
    }),
  },
  methods: {
    multiple: math.multiple,
    getList() {
      if (this.isAjax) return;
      this.isAjax = true;
      Option.sceneListByTimes()
        .then((res) => {
          this.isAjax = false;
          res.data.forEach((item) => {
            item.scenePairList.forEach((minItem) => {
              minItem.seconds = minItem.seconds + Math.random();
            });
            item.first = item.scenePairList.shift();
          });

          this.list = res.data;
          this.getSocketData();
          this.ws.send({
            cmd: "sub",
            msg: this.msg,
          });
        })
        .catch(() => {
          this.isAjax = false;
        });
    },
    getSocketData() {
      this.ws.on("message", (res) => {
        let { data, sub } = res;
        if (sub == this.msg) {
          this.list.forEach((parentItem) => {
            if (parentItem.first.pair_time_name == data.pair_time_name) {
              parentItem.first = Object.assign(parentItem.first, data);
              return;
            }
            parentItem.scenePairList.forEach((item, idx) => {
              if (item.pair_time_name == data.pair_time_name) {
                parentItem.scenePairList[idx] = Object.assign(item, data);
              }
            });
          });
        }
      });
    },
  },
  mounted() {
    this.getList();
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.nav-tab {
  .chart-box {
    position: relative;
    .chart {
      height: 300px;
    }
    .top {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
}
/deep/ .van-count-down{
  font-size: 12px;
  color: $text-color;
}
.trend {
  .btn {
    border-radius: 20px;
  }
}
</style>
