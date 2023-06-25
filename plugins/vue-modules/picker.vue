<template>
  <van-popup :value="show" @input="input" position="bottom">
    <van-picker
      :title="title"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </van-popup>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.van-popup {
  background: transparent;
  ::v-deep .van-picker__mask {
    background-image: linear-gradient(
        180deg,
        rgba($panel-1, 0.1),
        rgba($panel-3, 0.1)
      ),
      linear-gradient(0deg, rgba($panel-1, 0.1), rgba($panel-3, 0.1));
  }
}
</style>