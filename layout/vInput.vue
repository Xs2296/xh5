<template>
  <view class="d-flex align-center">
    <slot name="left"></slot>
    <input @input="input" @blur="$emit('blur',$event)" v-bind="{...$props}" class="flex-fill" />
    <slot name="right"></slot>
  </view>
</template>
<script>
export default {
  name: "vInput",
  props: {
    value: {
      defalult: "",
      require: false,
    },
    type: {
      default: "text",
      type: String,
      require: false,
    },
    placeholder: {
      default: "",
      type: String,
      require: false,
    },
    maxLength: {
      default: undefined,
      type: String,
      require: false,
    },
    minLength: {
      default: undefined,
      type: String,
      require: false,
    },
    disabled: {
      default: false,
      type: Boolean,
      require: false,
    },
  },
  methods:{
    input($ev){
      this.$emit('input',$ev.target.value)
    }
  }
};
</script>
<style lang="scss">
input {
  color: inherit;
  font-size: inherit;
  text-align: inherit;
  width: auto;
  min-width: 0;
}
</style>