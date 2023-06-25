<template>
  <lb-picker
    :value="value"
    @confirm="select"
    :confirm-text="$t('common.confirm')"
    :cancel-text="$t('common.cancel')"
    :list="list"
    :props="{
      label: rangeLabel,
      value: rangeValue,
    }"
  >
    <slot
      v-bind="activeItem"
    ></slot>
  </lb-picker>
</template>
<script>
import lbPicker from "@/components/lb-picker";
export default {
  name: "vPicker",
  components: {
    lbPicker,
  },
  props: {
    list: {
      default: [],
      type: Array,
      required: false,
    },
    rangeLabel: {
      default: "label",
      type: String,
      required: false,
    },
    rangeValue: {
      default: "value",
      type: String,
      required: false,
    },
    value: {
      default: "",
      type: String | Number,
      required: false,
    },
  },
  computed: {
    activeItem() {
      if (this.list && this.list.length) {
        return this.list.find(item => item.value === this.value) || {};
      } else {
        return {};
      }
    },
  },
  data() {
    return {};
  },
  methods: {
    select($ev) {
      this.$emit("input", $ev.value);
      this.$emit("change", $ev.value, $ev.index, $ev.item);
    },
  },
  mounted() {},
  created() {},
};
</script>
