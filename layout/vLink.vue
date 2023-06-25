<template>
  <navigator
    :url="url"
    :openType="currentOpenType"
    :animationDuration="animationDuration"
    :hoverClass="hoverClass"
    :hoverStopPropagation="hoverStopPropagation"
    :hoverStartTime="hoverStartTime"
    :hoverStayTime="hoverStayTime"
    :target="target"
    @click="toNext"
  >
    <slot></slot>
  </navigator>
</template>
<script>
import qs from "qs";
export default {
  name: "vLink",
  props: {
    to: {
      default() {
        return "";
      },
      require: true,
      type: String | Object,
    },
    replace: {
      defalut: false,
      requires: false,
      type: Boolean,
    },
    openType: {
      default: "navigate",
      require: false,
      type: String,
    },
    animationDuration: {
      default: 300,
      require: false,
      type: Number,
    },
    hoverClass: {
      default: "navigator-hover",
      reuqire: false,
      type: String,
    },
    hoverStopPropagation: {
      default: false,
      reuqire: false,
      type: Boolean,
    },
    hoverStartTime: {
      default: 50,
      require: false,
      type: Number,
    },
    hoverStayTime: {
      default: 600,
      require: false,
      type: Number,
    },
    target: {
      default: "self",
      require: false,
      type: String,
    },
  },
  computed: {
    currentOpenType() {
      if (this.replace) {
        return "redirect";
      } else {
        return this.openType;
      }
    },
    url() {
      var url = "",
        query;
      if (typeof this.to == "string") {
        url = this.to;
      } else {
        url = this.to.path;
        query = qs.stringify(this.to.query);
      }
      return  `${url}${url.includes('?') ? '&' : '?'}${query||''}`
    },
  },
  methods: {
    toNext(){
      this.$navFontColor()
    }
  },
};
</script>

