<template>
  <v-page class="pledgeRonqi">
    <v-header class="" :border="false" :title="$t('pledge.funcname')" :leftClick="()=>_router.replace('/pages/base/index')">
		<template #right>
		  <v-link :to="{path:'/pages/pledge/order'}">
		  	<van-icon class="fn-20 pld-mt" name="orders-o" />
		  </v-link>
		</template>
	</v-header>
    <view class="pledgeMain">
      <swiper
        class="lunbo"
        :autoplay="true" 
        indicator-color="white" 
      >
        <swiper-item
          class="my_swipe_item"
          v-for="(item, idx) in pledge"
          :key="idx"
        >
          <img width="100%" height="100%" fit="cover" :src="item.spread_img" />
        </swiper-item>
      </swiper>
    </view>
	<view class="pledgeList" v-for="(item, idx) in pledge"
          :key="idx"
		  >
	  <view class="listLeft">
		  <img class="listImg" :src="item.cover" />
	  </view>
	  <view class="listRigth">
		  <view class="pledgeFirstTitle pledgeListTitle">{{item.name}}</view>
		  <view class="pledgeListTitle">
				<text>{{ $t("pledge.biz") }}：</text>
				<text class="fgrey">{{item.coin_name}}</text>
		  </view>
		  <view class="pledgeListTitle">
			  <text>{{ $t("pledge.cycle") }}：</text>
			  <text class="fgrey">{{item.cycle}}{{$t('exchange.f0')}}</text>
		  </view>
		  <view class="pledgeListTitle">
			  <text>{{ $t("pledge.rate") }} ≈  </text>
			  <text class="fgreen">{{item.rate}}%</text>
		  </view>
		  <view class="pledgeListTitle">
			  <text>{{ $t("option.b3") }}：</text>
			  <text class="fgreen">{{item.can_buy_num}}</text>
		  </view>
		  <button v-if="item.can_buy == true" @click="dump(item.id)" class='join'>{{ $t("pledge.join")}}</button>
		  <button v-if="item.can_buy == false" class='unjoin'>{{ $t("pledge.join")}}</button>
	  </view>
	</view>
	
	<!-- <view class="pledgeList_main" v-for="(item, idx) in pledge"
	      :key="idx"
		  >
	  <view class="listLeft_logo">
		  <img class="listImg" :src="item.cover" />
	  </view>
	  <view class="listRigth">
		  <view class="pledgeFirstTitle pledgeListTitle">{{item.name}}</view>
		  <view class="pledgeListTitle">
				<text>{{ $t("pledge.biz") }}：</text>
				<text class="fgrey">{{item.coin_name}}</text>
		  </view>
		  <view class="pledgeListTitle">
			  <text>{{ $t("pledge.cycle") }}：</text>
			  <text class="fgrey">{{item.cycle}}{{$t('exchange.f0')}}</text>
		  </view>
		  <view class="pledgeListTitle">
			  <text>{{ $t("pledge.rate") }} ≈  </text>
			  <text class="fgreen">{{item.rate}}%</text>
		  </view>
		  <view class="pledgeListTitle">
		  			  <text>{{ $t("option.b3") }}：</text>
		  			  <text class="fgreen">{{item.can_buy_num}}</text>
		  </view>
		  <button v-if="item.can_buy == true" @click="dump(item.id)" class='join'>{{ $t("pledge.join")}}</button>
		  <button v-if="item.can_buy == false" class='unjoin'>{{ $t("pledge.join")}}</button>
	  </view>
	</view> -->
  </v-page>
</template>

<script>
import Pledge from "@/api/pledge";
import app from "@/app";
export default {
  name: "pledge",
  data() {
    return {
      pledge:{},
      app,
      taskHeight:0
    };
  },
  methods:{
	  indexData() {
	    let data = {};
	    let ajax = Pledge.indexList(data, { loading: true });
		console.log(ajax);
	    ajax
	      .then((res) => {
	        this.pledge = res.data;
	      })
	      .catch(() => {});
	  },
	  dump(id){
		   this.$router.push({path:'/pages/pledge/detail?id='+id})
	  },
	  jumpBack(){
		  this.$router.push({path:'/pages/base/index'});
	  }
  },
  mounted() {
    this.indexData();
  },
  onLoad() {
  	this.indexData();
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
	//50 185 450 11 =》696 750  54
	.pledgeList{
		margin-top:30upx;
		background:var(--list);
		padding:25upx;
		display:block;
	}
	.lunbo{margin:30upx;}
	.listLeft{
		width:185upx;
		height:185upx;
		line-height:400upx;
		display:inline-block;
	}
	.listRigth{
		width:490upx;
		margin-left:11upx;
		position:relative;
		display:inline-block;
	}
	.listImg{width:100%;height:100%;}
	.fgrey{color:#666666}
	.fgreen{color:#00A67F}
	.join{background: #FFC119;color:#333333;width:145upx;height:73upx;position:absolute;right:0upx;bottom:70upx;font-size:26upx;font-weight:bold;padding:0;}
	.pld-mt{margin-top:30upx;}
	.unjoin{background: gray;color:#aaa;width:145upx;height:73upx;position:absolute;right:0upx;bottom:100upx;font-size:26upx;font-weight:bold;padding:0;}

	.pledgeList_main{
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items:center ;
		margin-top:30upx;
		padding:25upx;
		background:var(--list);
	}
	.listLeft_logo{
		width:185upx;
		height:185upx;
	}
</style>