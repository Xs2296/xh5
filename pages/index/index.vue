<template>
  <v-page class="container">
    <v-header title="地球olLine"></v-header>
    <view class="d-flex">
      <van-button type="danger" @click="aler">{{test}}</van-button>
      <button type="primary">test</button>
      <navigator :url="'/pages/login/index'">login</navigator>
      <v-button type="danger">testt</v-button>
    </view>
    <view>
      <navigator :url="'/pages/reg/index'">reg</navigator>
    </view>
    <view>{{text}}</view>

    <v-code type="theme" url="/login/sendSmsCodeBeforeLogin" :data="{signature:'123'}"></v-code>
    <v-input placeholder="test" value="test"></v-input>
    <lb-picker cancel-text="老子不选了" @confirm="select" :value="value" :list="list">pickerTest{{value}}</lb-picker>
    <v-picker v-model="value" :list="list">vPicker{{value}}</v-picker>
	  <view class="colora">colora</view>
  </v-page>
</template>

<script>
import lbPicker from "@/components/lb-picker";
import app from "@/app";
import { mapGetters } from "vuex";
export default {
  components: {
    lbPicker,
  },
  computed: {
    text() {
      return this.$t("common.confirm");
	},
	...mapGetters(['themeStyle'])
  },
  data() {
    return {
      value: 2,
      test: 1,
      href: "https://uniapp.dcloud.io/component/README?id=uniui",
      list: [
        {
          value: 1,
          label: "标签1",
        },
        {
          value: 2,
          label: "标签2",
        },
        {
          value: 3,
          label: "标签3",
        },
        {
          value: 4,
          label: "标签4",
        },
	  ],
    };
  },
  methods: {
    aler() {
      this.test++;
    },
    select($ev) {
      console.log($ev);
    },
    toPing() {
      let d = new Date();

    },
    linkSocket() {
      // new Socket(app.socketUrl)
    },
  },
  onLoad() {

	this.linkSocket();

  },
};
</script>

<style lang="scss">
body{
	--main-color: #06c;
}
.colora{
	color:var(--main-color);
}
.container {
  font-size: 14px;
  line-height: 24px;
}
</style>
