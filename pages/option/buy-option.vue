<template>
  <view>
    <view class="time-box">
      <table class="w-max color-light fn-sm">
        <tr>
          <td class="p-l-md p-y-xs">{{$t('option.a8')}}：{{current_scene.begin_time_text}}</td>
          <td>{{current_scene.status_text}}</td>
          <td class="p-r-md">
            <view class="d-flex justify-end align-center">
              <van-icon name="clock-o m-r-xs" />
              <van-count-down
                v-if="!loading"
                @finish="$emit('change-venue')"
                :time="current_scene.lottery_time*1000"
              />
              <van-loading size="12px" v-else />
            </view>
          </td>
        </tr>
        <tr class="bg-panel-3">
          <td class="p-l-md p-y-xs">{{$t('option.a9')}}：{{next_scene.begin_time_text}}</td>
          <td>
            <van-tag plain type="success">{{next_scene.status_text}}</van-tag>
          </td>
          <td class="p-r-md">
            <view class="d-flex justify-end align-center">
              <van-icon name="clock-o m-r-xs" />
              <van-count-down v-if="!loading" @finish="$emit('change-venue')" :time="next_scene.lottery_time*1000" />
              <van-loading size="12px" v-else />
            </view>
          </td>
        </tr>
      </table>
    </view>
    <view class="bg-panel-3 p-b-lg">
      <view class="porgress">
        <view class="m-x-md p-y-xs">
          <view
                  class="h-14 bg-panel-4 rounded-lg overflow-hidden d-flex justify-between fn-10 color-gray-1"
                >
                  <view class="h-max bg-buy rounded-lg p-l-xs transition-default d-flex align-center" :style="{width:socketData.trend_up*100+'%'}">&emsp;{{multiple(socketData.trend_up,100,2)}}%</view>
                  <view class="p-r-xs d-flex align-center">{{multiple(socketData.trend_down,100,2)}}%</view>
                </view>
        </view>
      </view>
      <view class="btn-group d-flex p-x-md p-y-xs">
        <v-button type="green" block class="flex-fill rounded-xs btn" @click="$emit('buy-show',1)">{{$t('option.a2')}}</v-button>
        <div style="width:10px"></div>
        <!-- <button class="m-x-md flat btn border-original-0" @click="$emit('buy-show',2)">{{$t('option.b0')}}</button> plain -->
        <v-button type="red" block class="flex-fill rounded-xs btn" @click="$emit('buy-show',3)">{{$t('option.a3')}}</v-button>
      </view>
    </view>
  </view>
</template>
<script>
import math from "@/utils/class/math";
import { mapState } from "vuex";
export default {
  props: ["currentAndNext","query", "loading"],
  data() {
    return {
      detail: {},
      isAjax: false,
      socketData: {},
    };
  },
  computed: {
    current_scene() {
      return this.currentAndNext.current_scene || {};
    },
    next_scene() {
      return this.currentAndNext.next_scene || {};
    },
    ...mapState({
      ws: "ws",
    }),
  },
  methods: {
    multiple: math.multiple,
  },
  created() {
    this.ws.on("message", (res) => {
      let { data, sub } = res;
      if (sub == "sceneListNewPrice") {
        if (data.pair_time_name == this.query.pair_time_name) {
          this.socketData = data;
        }
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.flat {
  border-radius: 50%;
  background: rgba($blue, 0.1);
  color: $blue;
  width: 45px;
  height: 45px;
}
</style>