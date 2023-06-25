<template>
  <div class="layout-page" :style="themeStyle">
    <!-- <v-header :title="$t('help.a1')"></v-header> -->
    <v-header :title="$t('base.a7')"></v-header>
	
    <main class="layout-main">
      <template v-for="parentItem  in list">
       <!-- <v-link
          tag="div"
          :to="{path:'/pages/help/sort',query:{id:parentItem.id,title:parentItem.name}}"
          class="p-md color-light fn-20 "
          :key="parentItem.id"
        >{{parentItem.title}}</v-link> -->
		<view class="p-md color-light fn-20 ">{{parentItem.title}}</view>
        <div class="m-x-md m-b-md p-md bg-panel-4 rounded box-shadow" >
			<v-link
			  tag="div"
			  :to="{path:'/pages/help/detail',query:{id:parentItem.id}}"
			  class="item p-y-xs border-b d-flex justify-between"
			>
			  <div class="eps-1 color-light">{{parentItem.excerpt}}</div>
			  <van-icon name="arrow" />
			</v-link>
          <!-- <v-link
            tag="div"
            :to="{path:'/pages/help/detail',query:{id:item.id}}"
            class="item p-y-xs border-b d-flex justify-between"
            v-for="item in parentItem.article"
            :key="item.id"
          >
            <div class="eps-1 color-light">{{parentItem.title}}</div>
            <van-icon name="arrow" />
          </v-link> -->
        </div>
      </template>
    </main>
  </div>
</template>
<script>
import College from "@/api/college";
import {mapGetters} from 'vuex'
export default {
  name: "help",
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    college() {
      College.getArticleList({type:'help_center',page:1}).then((res) => {
        this.list = res.data.data;
		console.log(res.data.data,2)
      });
    },
  },
  created() {
    this.college();
  },
};
</script>