<template>
  <div class="qrbox">
    <canvas :canvas-id="id" :style="{
      width:`100%`,
      height:`100%`,
    }"></canvas>
  </div>
</template>
<script>
import uQRCode from "@/js_sdk/Sansnn-uQRCode/uqrcode.js";
export default {
  props: {
    text: {
      default: "",
      type: String,
      required: false,
    },
  },
  data() {
    return {
      width: 100,
      height: 100,
      id: `qrcode${Math.random()}`,
    };
  },
  watch: {
    text() {
      this.getRec();
    },
  },
  methods: {
    // 获取尺寸
    getRec() {
      let query = uni.createSelectorQuery().in(this);
      query
        .select(".qrbox canvas")
        .boundingClientRect((e)=> {
          this.width = e.width
          this.height = e.height
          this.make()
        })
        .exec();
    },
    make() {
      uQRCode.make({
        canvasId: this.id,
        componentInstance: this,
        text: this.text,
        size: this.width,
        margin: 0,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        correctLevel: uQRCode.errorCorrectLevel.H,
        success: res => {
        }
      })
    }
  },
  mounted() {
    this.getRec();
  },
};
</script>