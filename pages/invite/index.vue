<template>
  <v-page>
    <v-header class="nav-head" :border="false" :title="$t('invite.a0')"></v-header>
    
    <view class="layout-main">
      <view class="top color-plain">
        <view :style="{height:taskHeight+'px'}"></view>
       <!-- <view class="fn-center fn-30 title">{{app.appName}} {{$t('invite.a1')}}</view>
        <view class="fn-center fn-18">{{$t('invite.a2')}}</view> -->
        <view class="leveup m-md p-md bg-light rounded-lg">
          <view class="d-flex align-center m-t-md m-b-lg justify-between fn-center">
            <view>
              <view class="fn-lg">{{$t('invite.a3')}}</view>
              <view>{{$t('invite.a4')}}</view>
            </view>
            <view class="fn-30 color-yellows ">
              <img src="static/img/rbox.png" alt="" class="w-30" >
            </view>
            <view>
              <view class="fn-lg">{{app.appName}}{{$t('invite.a1')}}</view>
              <view>
                <van-icon name="diamond-o" />
                {{$t('invite.a5')}}
              </view>
            </view>
          </view>
          <view class="fn-center">
            <v-qr :text="detail.invite_url" class="search-code"></v-qr>
          </view>
        </view>
      </view>
      <!-- 邀请码 -->
      <view class="invite-code m-x-md m-b-md bg-panel-4 rounded bg-inv p-y-xl p-x-md">
        <view class="  ">
          <view class="d-flex justify-center fn-16">{{$t('invite.a6')}}</view>
          <view class="fn-22 color-theme-1 d-flex justify-center m-y-lg">
            {{detail.invite_code}}
            <i class="iconfont" @click="$copy(detail.invite_code)">&#xe706;</i>
          </view>
        </view>
        <view class="group d-flex m-t-xs">
          <button
			type="blue"
            class="btn flex-fill color-plain rounded-sm h-34 btn-1 m-r-md fn-md bg-gradient-blue"
            @click="downImg"
          >{{$t('invite.a7')}}</button>

          <button
			type="green"
            class="btn flex-fill rounded-sm color-plain h-34 btn-2 fn-md bg-gradient-green"
            @click="$copy(detail.invite_url)"
          >{{$t('invite.a8')}}</button>
        </view>
      </view>
      <!-- 推广 -->
	  <view class="d-flex justify-between m-b-lg m-x-lg fn-18">
	    <span>{{$t('invite.a9')}}</span>
	  </view>
      <view class="extension bg-panel-4 p-md m-y-md m-x-lg rounded-md">
        
        <view class="data d-flex justify-between fn-center p-x-md">
          <view class="item">
			  <view class="label fn-sm">{{$t('invite.b0')}}（{{$t('invite.b1')}}）</view>
            <view class="num color-light fn-lg">{{detail.invite_nums}}</view>
          </view>
          <view class="item">
			  <view class="label fn-sm">{{$t('invite.b2')}}（USDT）</view>
            <view class="num color-light fn-lg">{{detail.invite_dividend}}</view>
          </view>
        </view>
      </view>
      <!-- 记录 -->
      <view class="bill p-x-md">
        <van-tabs v-model="active" animated class="bg-panel-4" lazy-render :broder="false">
          <van-tab :title="$t('invite.b3')">
            <!-- <v-paging :ajax="generalizeList" :refresher-enabled="false">
              <template #box="list " class=""> -->
                <view class="d-flex justify-between p-x-md p-y-xs color-light bg-panel-3 rounded-sm m-y-md" v-for="item in detail.users" :key="item.account">
                  <view>
                    {{item.account||item.username}}
                    <van-tag mark plain type="danger">{{$t('invite.b4')}}</van-tag>
                  </view>
                  <view>{{item.times}}</view>
                </view>
              <!-- </template>
            </v-paging> -->
          </van-tab>
          <van-tab :title="$t('invite.b5')">
            <v-paging :ajax="rewardLogs" :refresher-enabled="false">
              <template #box="list">
                <table class="w-max">
                  <tbody>
                    <tr v-for="item in $list(list)" :key="item.id">
                      <td class="p-l-md p-y-xs color-light">{{item.log_type_text}}</td>
                      <td class="fn-sm fn-center color-default">{{item.created_at}}</td>
                      <td class="p-r-md fn-right color-light">
                        {{item.amount}}{{item.coin_name}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </v-paging>
          </van-tab>
        </van-tabs>
      </view>
    </view>
  </v-page>
</template>
<script>
import Profile from "@/api/profile";
import app from "@/app";
export default {
  data() {
    return {
      active: 0,
      detail: {},
      imgBase64: undefined,
      app,
      taskHeight:0
    };
  },
  computed: {
  },
  methods: {
    // 获取推广记录
    generalizeList: Profile.generalizeList,
    // 获取返佣记录
    rewardLogs: Profile.rewardLogs,
    generalizeInfo() {
      Profile.generalizeInfo().then((res) => {
        this.detail = res.data;
      });
    },
    downImg() {
  
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      var bitmap = null;
      var currentWebview = page.$getAppWebview();
      bitmap = new plus.nativeObj.Bitmap("amway_img");
      // 将webview内容绘制到Bitmap对象中
      currentWebview.draw(
        bitmap,
        function () {
          bitmap.save(
            "_doc/a.jpg",
            {},
            function (i) {
              uni.saveImageToPhotosAlbum({
                filePath: i.target,
                success: function () {
                  bitmap.clear(); //销毁Bitmap图片
                  uni.showToast({
                    title: "保存图片成功",
                    mask: false,
                    duration: 1500,
                  });
                },
              });
            },
            function (e) {
              console.log("保存图片失败：" + JSON.stringify(e));
            }
          );
        },
        function (e) {
          console.log("截屏绘制图片失败：" + JSON.stringify(e));
        }
      );
    },
    callback($ev) {
      this.imgBase64 = $ev;
    },
    getTaskHeight(){
      uni.getSystemInfo({
        success:(obj)=>{
          this.taskHeight = obj.statusBarHeight
        }
      })
    }
  },
  onLoad() {
    this.generalizeInfo();
    this.getTaskHeight()
  },
};
</script>
<style lang="scss" scoped>
// .nav-head {
//   background: transparent;
//   ::v-deep .van-nav-bar{
// 	  background-color: inherit;
// 	  .van-nav-bar__title,.van-icon{
// 		   color:$plain;
// 	  }
//   }
//   // position: absolute;
//   left: 0;
//   width: 100%;
//   top: 0;
//   z-index: 99;
 
//   &::after {
//     border-bottom: none;
//   }
// }
.bg-inv{
	  background: $white url("../../static/img/bgb3.png") no-repeat center top;
	  background-size: 100% 100%;
  }
.top {
  // background: linear-gradient(180deg, #c86b49, $theme-1);
  padding-bottom: 80px;
  .title {
    padding-top: 45px;
  }
  
  .leveup {
    background: $white url("../../static/img/bgshare.png") no-repeat center top;
    .search-code {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border: 4px solid $white;
    }
    background-size: 100% 100%;
    box-sizing: border-box;
    .apply-btn {
      border-radius: 50px;
      border: none;
      width: 120px;
      background: linear-gradient(180deg, #ffd01e, #ff9d2c);
      box-shadow: 1px 1px 6px 1px #c8c9cc;
    }
  }
}
.invite-code {
  margin-top: -45px;
  .group {
    .btn-1 {
      border: 0;
      // background: linear-gradient(90deg, $theme-1, #ff9d2c);
    }
    .btn-2 {
      border: 0;
      // background: linear-gradient(90deg, $blue, #6dabe8);
    }
  }
}
</style>