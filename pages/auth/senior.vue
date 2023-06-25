<template>
  <div class="layout-page" :style="themeStyle">
    <v-header :title="$t('auth.a4')"></v-header>
    <main class="layout-main">
      <div class="form-item   p-md m-md">
        <div class="color-light p-b-xs">1、{{$t('auth.b5')}}</div>
        <div class="d-flex justify-between m-t-md ">
          <div class="examples m-r-xs bg-panel-3 p-md rounded-sm box-shadow">
            <img src="static/img/fill6.png" />
          </div>
          <div
            @click="getFile('front_img')"
            class="upload-box d-flex justify-center align-center rounded-sm  bg-panel-3 box-shadow"
          >
            <van-icon v-if="!form.front_img" class="color-light fn-30" name="photograph" />
            <img v-else :src="form.front_img" alt />
          </div>
        </div>
      </div>
      <div class="form-item  p-md m-md">
        <div class="color-light p-b-xs">2、{{$t('auth.b6')}}</div>
        <div class="d-flex justify-between m-t-md">
          <div class="examples m-r-xs bg-panel-3 p-md rounded-sm box-shadow">
            <img src="static/img/fill7.png" />
          </div>
          <div
            @click="getFile('back_img')"
            class="upload-box d-flex justify-center align-center rounded-sm  bg-panel-3 box-shadow"
          >
            <van-icon v-if="!form.back_img" class="color-light fn-30" name="photograph" />
            <img v-else :src="form.back_img" alt />
          </div>
        </div>
      </div>
      <!-- <div class="form-item p-md m-md ">
        <div class="color-light  p-b-xs">3、{{$t('auth.b7')}}</div>
        <div class="fn-sm ">{{$t('auth.b8')}}。</div>
        <div class="d-flex justify-between m-t-md">
          <div class="examples m-r-xs bg-panel-3 p-md rounded-sm box-shadow">
            <img src="static/img/fill6.png" />
          </div>
          <div
            @click="getFile('hand_img')"
            class="upload-box d-flex justify-center align-center rounded-sm  bg-panel-3 box-shadow"
          >
            <van-icon v-if="!form.hand_img" class="color-light fn-30" name="photograph" />
            <img v-else :src="form.hand_img" alt />
          </div>
        </div>
      </div> -->
    </main>
    <div class="p-md">
      <v-button block type="green" class="w-max rounded-lg" @click="topAuth" ref="btn">{{$t('common.submit')}}</v-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import utils from "@/utils";
import Profile from "@/api/profile";
import Member from "@/api/member";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      imgBase: undefined,
      form: {
        hand_img: "",
        back_img: "",
        front_img: "",
      },
    };
  },
  computed: {
    ...mapGetters(['themeStyle'])
  },
  methods: {
    getFile(name) {
      this.$getFile({count:9}).then((res) => {
        this.upLoadImg(res, name);
      })
    },
    // 上传图片
    upLoadImg(chooseImageRes, name) {
      Member.uploadImage(chooseImageRes).then((res) => {
        console.log(res)
        this.form[name] = res.data.url;
        this.$toast.success(this.$t('auth.c1'));
      });
    },
    // 提交审核
    topAuth() {
      let data = this.form;
      // if (!data.hand_img) {
      //   this.$toast(this.$t('auth.b7'));
      //   return;
      // }
      if (!data.back_img) {
        this.$toast(this.$t('auth.c2'));
        return;
      }
      if (!data.front_img) {
        this.$toast(this.$t('auth.c3'));
        return;
      }
      Profile.topAuth(data, { btn: this.$refs.btn })
        .then(() => {
          this.$toast.success(this.$t('auth.c4')+"。");
          
		  setTimeout(() => {
		    this.maskBgColor = this.maskColor
		    this.$back();
		  }, 500)
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.examples {
  width: 122px;
  height: 70px;
  display: flex;
  align-items: center;
  img {
    width: 100%;
  }
}
.upload-box {
  width: 150px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>