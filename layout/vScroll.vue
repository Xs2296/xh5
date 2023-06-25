<template>
  <scroll-view 
    :scroll-y="true"
    @scrolltolower="load"
    @scroll="scroll"
    @refresherrefresh="onRefresh"
    :refresher-enabled="refresherEnabled&&scrollTop<50"
    :refresher-triggered="refreshing"
    refresher-background="transparent"
    :refresher-threshold="50"
  >
    <slot></slot>
    <view v-if="loading" class="fn-center p-y-xs">
       <van-loading size="30rpx">
        {{$t('common.loadMore')}}...
       </van-loading>
    </view>
    <view v-else-if="finished" class="fn-center p-y-xs">
       {{$t('common.notMore')}}
    </view>
  </scroll-view>
</template>
<script>
export default {
  name: "vScroll",
  props: {
    offset: {
      default: 300,
      required: false
    },
    refresherEnabled:{
      default:true,
      required:false,
      type:Boolean
    }
  },
  data() {
    return {
      loading: false,
      refreshing: false,
      finished: false,
      scrollTop:0
    };
  },
  methods: {
    scroll(event){
      this.scrollTop = event.detail.scrollTop
    },
    onRefresh($ev) {
      // 触发刷新并暴露结束函数
      if(this.refreshing) return;
      this.refreshing = true;
      this.$emit("ref", callObj => {
        this.refreshing = false;
        if(!callObj) return;
        if (this.isBoolean(callObj.finished)) {
          this.finished = callObj.finished;
        }else{
          this.finished = true
        }
      });
    },
    isBoolean(ev) {
      return typeof ev == "boolean";
    },
    load() {
      // 触发加载并暴露结束函数
      if(this.loading||this.finished) return;
      this.loading = true;
      this.$emit("load", callObj => {
        this.loading = false;
        if(!callObj) return;
        if (this.isBoolean(callObj.finished)) {
          this.finished = callObj.finished;
        }else if (this.isBoolean(callObj.error)) {
          this.finished = callObj.error;
        }
      });
    }
  },
  mounted() {
    this.load()
  },
};
</script>