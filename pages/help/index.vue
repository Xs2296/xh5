<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('expand.关于我们')"></v-header>

    <main class="layout-main">
      <template v-for="item  in list">
        <div class="m-x-md m-b-md p-md bg-panel-4 rounded box-shadow">
          <v-link
              tag="div"
              :to="{path:'/pages/help/detail',query:{id:item.id}}"
              class="item p-y-xs border-b d-flex justify-between"
          >
            <div class="eps-1 color-light">{{ item.title }}</div>
            <van-icon name="arrow"/>
          </v-link>
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
      College.getServiceIndex().then((res) => {
        this.list = res.data;
      });
    },
  },
  created() {
    this.college();
  },
};
</script>
