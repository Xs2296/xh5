<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('help.a0')"></v-header>
    <div class="layout-main">
      <div class="p-md border-b">
        <div class="title fn-18 color-light m-b-xs">{{detail.title}}</div>
        <div class="fn-sm">{{detail.created_at}}</div>
      </div>
      <div class="edit-content p-md" v-html="detail.body"></div>
    </div>
  </div>
</template>
<script>
import College from "@/api/college";
import { mapGetters } from "vuex";
export default {
  name: "collegeDetail",
  data() {
    return {
      detail: {},
      query:{}
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