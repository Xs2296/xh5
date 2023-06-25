<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="detail.title"></v-header>
    <div class="layout-main">
      <div class="p-md border-b">
        <div class="fn-sm" style="text-align: center">{{ detail.created_at }}</div>
      </div>
      <div class="edit-content p-md" v-html="detail.content"></div>
    </div>
  </div>
</template>
<script>
import College from "@/api/college";
import {mapGetters} from "vuex";

export default {
  name: "collegeDetail",
  data() {
    return {
      detail: {},
      query: {}
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    getArticleDetail() {
      let data = {
        id: this.query.id,
      };
      College.getArticleDetail(data).then((res) => {
        this.detail = res.data;
      });
    },
  },
  onLoad(query) {
    this.query = query
    this.getArticleDetail();
  },
};
</script>
