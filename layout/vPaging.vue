<template>
  <v-scroll @load="load" :refresher-enabled="refresherEnabled" @ref="ref" ref="scroll">
    <slot name="box" v-bind="list">
    </slot>
  </v-scroll>
</template>
<script>
export default {
  name:'paging',
  props: {
    data: {
      default() {
        return {};
      },
      type: Object,
      require: false,
    },
    refresherEnabled:{
      default:true,
      required:false,
      type:Boolean
    },
    ajax: {
      require: true,
      type: Function,
    },
  },
  data() {
    return {
      list: [],
      page: 0,
    };
  },
  methods: {
    load(over) {
      this.page++;
      this.getList(over);
    },
    ref(over) {
      this.page = 1;
      this.getList(over);
    },
    getList(over) {
      let data = Object.assign(
        {
          page: this.page,
        },
        this.data
      );
      this.ajax(data).then((res) => {
        let queryVo = res.data;
        if (queryVo.page == 1) this.list = [];
        this.list = [...this.list, ...queryVo.list];
        over &&
          over({
            finished: this.list.length >= queryVo.total,
          });
      });
    },
  },
  created() {},
};
</script>