<template>
  <v-page>
    <v-header :title="detail.title"></v-header>
    <main class="layout-main p-md">
      <view class="top p-b-sm border-b">
        <view class="time fn-sm" style="text-align: center">{{ detail.created_at }}</view>
      </view>
      <view class="edit-content m-t-md" v-html="detail.content"></view>
    </main>
  </v-page>
</template>
<script>
import Member from "@/api/member";

export default {
  data() {
    return {
      detail: {},
      query: {},
    };
  },
  computed: {},
  methods: {
    articleDetail() {
      Member.articleDetail({
        id: this.query.id,
      }).then((res) => {
        this.detail = res.data;
      });
    },
  },
  onLoad($ev) {
    this.query = $ev;
    this.articleDetail();
  },
};
</script>
<style lang="scss">
</style>
