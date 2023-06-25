<template>
  <view class="layout-page" :style="themeStyle">
    <v-header title=""></v-header>
    <main class="layout-main">
      <view class="top bgb5">
        <view class="user d-flex align-center">
          <view class="head-box flex-shrink m-r-lg">
            <!-- <van-icon
              class="head w-63 h-63 rounded-max overflow-hidden color-theme-1"
              name="user-circle-o"
            /> -->
            <img :src="logoMap.login_logo" class="h-80 rounded-max" />
          </view>
          <view class="info color-plain">
            <view class="name">
              {{$t('invite.c0')}}：
              <span>{{user.username}}</span>
            </view>
            <view class="id">ID：{{user.user_id}}</view>
          </view>
        </view>
        <view class="d-flex level-text justify-between align-center">
          <view class="color-plain fn-lg">{{$t('invite.b6')}}：{{user.user_grade_name}}</view>
          <view
            class="fn-sm border-buy border-r-0  border color-success rounded-tl-lg rounded-bl-lg"
            style="padding:4px 6px"
          >{{$t('invite.c9')}}</view>
        </view>
      </view>
      <view  @click="_router.push('/pages/invite/index')" class="nav-two d-flex justify-between color-light">
        <view class="item fn-center fn-10 flex-fill flex-shrink">
          <img src="static/img/13@2x.png" class="icon h-40" />
          <p>{{$t('invite.c3')}}</p>
        </view>
        <view class="item fn-center fn-10 flex-fill flex-shrink">
          <img src="static/img/8@2x.png" class="icon h-40" />
          <p>
            {{$t('invite.c2')}}
            <span class="fn-8">（USDT）</span>
          </p>
        </view>
        <view class="item fn-center fn-10 flex-fill flex-shrink">
          <img src="static/img/4@2x.png" class="icon h-40" />
          <p>{{$t('invite.c1')}}</p>
        </view>

        <view class="item fn-center fn-10 flex-fill flex-shrink">
          <img src="static/img/4@2x(1).png" class="icon h-40" />
          <p>{{$t('invite.c4')}}</p>
        </view>
      </view>
      <view class="bg-panel-3 table-box color-light level-box box-shadow">
        <view class="title fn-center">{{$t('invite.c5')}}</view>
        <table class="table">
          <thead class="fn-13 fn-center bg-form-panel-4">
            <tr>
              <th>{{$t('invite.c6')}}</th>
              <th class="fn-wrap">{{$t('invite.b8')}} / {{$t('invite.b9')}}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in grade">
              <tr :key="item.grade_id">
                <td rowspan="2" class="fn-center fn-nowrap p-x-lg">
                  <img
                    v-if="levelListIcon[item.grade_id]"
                    class="icon h-16"
                    :src="levelListIcon[item.grade_id]"
                    alt
                  />
                  <p>{{item.grade_name}}</p>
                </td>
                <td class="fn-sm">
                  <view
                    class="m-b-xs"
                    v-for="(minItem,idx) in item.upgrade_condition_text"
                    :key="idx"
                  >({{idx+1}}){{minItem}}</view>
                  <view class="fn-center" v-if="!item.upgrade_condition_text.length">-</view>
                </td>
              </tr>
              <tr :key="item.grade_id+'a'">
                <td class="fn-sm">{{item.bonus_text}}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </view>
      <view class="bg-panel-3 invate-info color-light box-shadow">
        <view class="title m-b-xs">{{remark.title}}</view>
        <view v-html="remark.body"></view>
      </view>
    </main>
  </view>
</template>
<script>
import Profile from "@/api/profile";
import { mapGetters,mapState } from "vuex";
export default {
  name: "level",
  data() {
    return {
      levelListIcon: {
        //  普通账户
        1: "",
        //  期权矿工
        2: "static/img/invite-2.png",
        //  节点矿工
        3: "static/img/invite-3.png",
        //  高级矿工
        4: "static/img/invite-4.png",
        //  超级矿工
        5: "static/img/invite-5.png",
        //  矿池
        6: "static/img/invite-6.png",
      },
      user: {},
      grade: [],
      remark: {},
    };
  },
  computed:{
    ...mapGetters(['themeStyle']),
	...mapState({
	  logoMap: "logoMap",
	}),
  },
  methods: {
    getGradeInfo() {
      Profile.getGradeInfo().then((res) => {
        this.user = res.data.user;
        this.grade = res.data.grade;
        this.remark = res.data.remark;
      });
    },
  },
  created() {
    this.getGradeInfo();
  },
};
</script>
<style lang="scss" scoped>
$rounded: 16px;
$pad: 23px;
$border: $border-color;
.top {
  margin: 27px 18px 0;
  border-radius: $rounded;

  padding: 19px 0;
    background: url("../../static/img/invite-bg.png") $panel-4
      no-repeat;
    background-size: 100% 100%;
  .user {
    padding: 0 $pad;
    .head-box {
      position: relative;
      .head {
        font-size: 63px;
      }
      .level-icon {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
  .level-text {
    margin-top: 40px;
    padding-left: $pad;
  }
}
.fn-8 {
  font-size: 8px;
}
.nav-two {
  margin: 21px 15px;
}
.table-box {
  border-radius: $rounded;
  margin: 0 18px;
  // padding: 0 13px;
    th,
    td {
      padding: 14px 10px;
      &:not(:last-of-type) {
        border-right: 1px solid $border-color;
      }
    }
    td {
      border-top: 1px solid $border-color;
    }
  .title {
    padding: 15px 0;
  }
}
.invate-info {
  margin: 13px 18px;
  border-radius: $rounded;
  padding: 16px $pad;
}
.bgb5{
	background: url(../../static/img/bgb5.png)no-repeat;
	background-size: 100% 100%;
}

</style>