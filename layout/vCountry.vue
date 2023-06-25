<template>
  <v-picker :value="value" :list="selectCountryList" @change="selectCountry" range-key="label">
    <view>+{{country_code}}</view>
  </v-picker>
</template>
<script>
import serve from "@/api/serve/index";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    tag: {
      default: "span",
      type: String,
      required: false,
    },
    value: {
      default: 1,
      type: [Number, String],
      required: false,
    },
  },
  computed: {
    ...mapState({
      countryList: "countryList",
    }),
    selectCountryList() {
      return this.countryList.map((item) => {
        return {
          label: `+${item.country_code} ${item.name}`,
          value: item.id,
        };
      });
    },
    active() {
      return this.countryList.find((item) => item.id == this.value) || {};
    },
    activeIndex() {
      return this.countryList.findIndex((item) => item.id == this.value);
    },
    country_code() {
      return this.active.country_code;
    },
  },
  watch: {
    country_code(){
      this.$emit('country_code',this.country_code)
    }
  },
  methods: {
    ...mapActions({
      setCountryList: "countryList",
    }),
    //   获取区号
    getCountry() {
      serve.get("/index/country").then((res) => {
        this.setCountryList(res.data);
        this.setDefault();
      });
    },
    selectCountry(value) {
      this.$emit("input", value);
    },
    setDefault() {
      if (!this.value) {
        this.$emit("input", this.countryList[0].id);
      }
    },
  },
  created() {
    if (!this.countryList.length) {
      this.getCountry();
    } else {
      this.setDefault();
    }
  },
};
</script>