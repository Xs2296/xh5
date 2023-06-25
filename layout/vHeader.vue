<template>
  <van-nav-bar @click-left="onClickLeft" :border="border" :title="title" :left-arrow="leftArrow">
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>
<script>
export default {
  name: "vHeader",
  props: {
    title: {
      default: "",
      type: String,
      required: false,
    },
    leftArrow: {
      default: true,
      type: Boolean,
      required: false,
    },
    leftClick: {
      default: undefined,
      type: Function,
      required: false,
    },
    border:{
      default:true,
      type:Boolean,
      required:false
    }
  },
  methods: {
    onClickLeft() {
		console.log(1111)
      if (this.leftClick) {
        this.leftClick();
      } else {
        this.$back();
      }
    },
  },
};
</script>