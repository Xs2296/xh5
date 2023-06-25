<template>
  <v-page>
    <template v-for="item in navList">
      <component
        v-if="cashViews.includes(item.tel)"
        v-show="tab == item.tel"
        :is="item.tel"
        :key="item.tel"
        :isShow="tab == item.tel && tabShow"
        class="layout-main"
      ></component>
    </template>
   
  </v-page>
</template>

<script>
import Home from "./home";
import ExchangeOperations from "./exchange-operations";
import ExchangeOperation from "./exchange-operation";
import Mine from "./mine";
import OptionList from "./option-list";
// import List from "./list";
import Contract from "./contract";
export default {
  name: "Base",
  components: {
    Home,
    ExchangeOperation,
	ExchangeOperations,
    OptionList,
    Mine,
    Contract
  },
  computed: {
    navList() {
      return [
        {
          label: this.$t("base.d0"),
          tel: "home",
          icon: "static/img/base_home_0.png",
          activeIcon: "static/img/base_home_1.png",
        },
        {
          label: this.$t("exchange.a0"),
          tel: "exchange-operations",
          icon: "static/img/base_link_0.png",
          activeIcon: "static/img/base_link_1.png",
        },
        {
          label: this.$t("base.a4"),
          tel: "option-list",
          icon: "static/img/base_qukuai_0.png",
          activeIcon: "static/img/base_qukuai_1.png",
        },
        {
          label: this.$t("exchange.a2"),
          tel: "contract",
          icon: "static/img/base_caidan_0.png",
          activeIcon: "static/img/base_caidan_1.png",
        },
        {
          label: this.$t("base.d2"),
          tel: "mine",
          icon: "static/img/base_assets_0.png",
          activeIcon: "static/img/base_assets_1.png",
        },
      ];
    },
  },
  data() {
    return {
      cashViews: [],
      tab: "",
      tabShow: true,
    };
  },
  methods: {
    tabChange(name) {
      this.tab = name;
      if (!this.cashViews.includes(name)) {
        this.cashViews.push(name);
      }
    },
  },
  onShow() {
    this.tabShow = true;
  },
  onLoad(query) {
    if (query.tel) {
      this.tabChange(query.tel);
    } else {
      this.tabChange("home");
    }
  },
  mounted() {},
  onHide() {
    this.tabShow = false;
  },
};
</script>
<style lang="scss" scoped>
.footer {
  box-shadow: $tab-nav-shadow;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 99;
}
.router-link-active {
  color: $theme-1;
}
</style>