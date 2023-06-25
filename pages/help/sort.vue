<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="query.title||$t('help.a2')"></v-header>
    <div class="layout-mian">
      <div class="list d-flex flex-wrap justify-between p-md">
        <v-link tag="div"  :to="{path:'/pages/help/detail',query:{id:item.id}}" class="item p-xs bg-panel-4 rounded m-b-md box-shadow" v-for="item in list" :key="item.id">
          <van-image class="image" fit="cover" :src="item.full_cover"></van-image>
          <div class="eps-2 m-t-xs">{{item.title}}</div>
        </v-link>
      </div>
    </div>
  </div>
</template>
<script>
import College from "@/api/college";
import {mapGetters} from 'vuex'
export default {
  name: "sort",
  data() {
    return {
      list: [],
      query:{}
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    getArticleList() {
      let data = {
        id: this.query.id,
      };
      College.getArticleList(data).then((res) => {
        this.list = res.data;
      });
    },
  },
  onLoad(query) {
    this.query = query
    this.getArticleList();
  },
};
</script>
<style lang="scss" scoped>
.list {
  .item {
    width: (375 - $padding-md * 3)/2 ;
    box-sizing: border-box;
    .image {
      height: 120px;
      display: block;
      width: 100%;
    }
  }
}
</style>