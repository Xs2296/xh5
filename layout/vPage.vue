<template>
  <view class="layout-page" :style="themeStyle">
    <slot />
    
    <!-- toast -->
    <van-toast id="van-toast" />
    <!-- dialog -->
    <van-dialog id="van-dialog" />
  </view>
</template>
<script>
import { mapGetters,mapActions,mapState} from "vuex";
export default {
  data(){
    return {
      // 页面下标
      pageIdx:undefined
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(["themeStyle"]),
    ...mapState({
        storeIdx:'pageIdx'
      })
  },
  methods: {
    ...mapActions({
      setPageIdx:'setPageIdx'
    })
  },
  created() {
    this.pageIdx = this.storeIdx
    this.setPageIdx()
  },
};
</script>