<template>
  <v-page>
    <v-header :title="$t('expand.公告中心')"></v-header>
    <!-- 公告 -->
    <v-paging class="layout-main" :key="1" :ajax="article" :data="{category_id:92}" v-if="active==0">
      <template #box="list">
        <view class="list m-t-md" key="ul1">
          <v-link tag="li" :to="{path:'/pages/notice/detail',query:{id:item.id}}"
                  class="item d-flex p-md align-center m-x-md m-b-xs bg-panel-3 rounded box-shadow"
                  v-for="item in $list(list)" :key="item.id">
            <view class="flex-fill">
              <view class="title color-light eps-2 m-b-xs">{{ item.title }}</view>
              <view class="time fn-sm">{{ item.created_at }}</view>
            </view>
            <van-icon name="arrow"/>
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
      article: Member.article
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
</style>
