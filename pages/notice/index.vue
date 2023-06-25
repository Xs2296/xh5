<template>
  <v-page>
    <v-header :title="$t('notice.a1')"></v-header>
     <view class="d-flex justify-center p-t-md">
      <view class="d-flex bg-form-panel-4 rounded-lg overflow-scroll">
        <view
          :class="{ 'bg-theme-1 color-plain rounded-lg': active == 0 }"
          @click="active = 0"
          class="p-y-xs p-x-lg min-w-60 fn-center "
          >{{$t('notice.a2')}}</view
        >
        <!-- <view
          :class="{ 'bg-theme-1 color-plain rounded-lg': active == 1 }"
          @click="active = 1"
          class="p-y-xs p-x-lg min-w-60 fn-center"
          >{{$t('notice.a3')}}</view
        > -->
      </view>
    </view>
    <!-- 公告 -->
    <v-paging class="layout-main" :key="1" :ajax="article" :data="{category_id:92}" v-if="active==0">
      <template #box="list">
        <view class="list m-t-md" key="ul1">
          <v-link tag="li" :to="{path:'/pages/notice/detail',query:{id:item.id}}" class="item d-flex p-md align-center m-x-md m-b-xs bg-panel-3 rounded box-shadow" v-for="item in $list(list)" :key="item.id">
            <view class="flex-fill">
              <view class="title color-light eps-2 m-b-xs">{{item.title}}</view>
              <view class="time fn-sm">{{item.created_at}}</view>
            </view>
            <van-icon name="arrow" />
          </v-link>
        </view>
      </template>
    </v-paging>
    <!-- 消息 -->
    <v-paging class="layout-main" :key="2" :ajax="myNotifiables" v-if="active==1">
      <template #box="list">
        <view class="list m-t-md" key="ul2">
          <v-link tag="li" :to="{path:'/pages/notice/msg-detail',query:{id:item.id}}" class="item d-flex p-md align-center m-x-md m-b-xs bg-panel-3 rounded box-shadow" v-for="item in $list(list)" :key="item.id">
            <view class="flex-fill">
              <view class="title color-light eps-2 m-b-xs">{{item.data.title}}</view>
              <view class="time fn-sm">{{item.created_at}}</view>
            </view>
            <van-icon name="arrow" />
          </v-link>
        </view>
      </template>
    </v-paging>
  </v-page>
</template>
<script>
import Member from "@/api/member";
export default {
  data() {
    return {
      active: 0,
      myNotifiables: Member.myNotifiables,
      article:Member.article
    };
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
</style>