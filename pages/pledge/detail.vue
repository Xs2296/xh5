<template>
  <v-page class="pledgeRonqi">
    <v-header class="" :border="false" :title="$t('pledge.introduce')" :leftClick="()=>_router.replace('/pages/pledge/index')">
		<template #right>
			<v-link :to="{path:'/pages/pledge/order'}">
				<van-icon class="fn-20 pld-mt" name="orders-o" />
			</v-link>
		</template>
	</v-header>
	<view class="pledgeDetailMain">
		<view class="pledgeMain">
		  <view class='lunbo'>
			  <img width="100%" height="100%" fit="cover" :src="pledge.spread_img" />
		  </view>
		</view>
		<view class="pledgeIntroduce">
		  <view class="pledgeDetailTitle">
			  <view class='pledgeTitleLine'></view>
			  <view class='pledgeTitleFont'>{{ $t("pledge.introduce")}}</view>
		  </view>
			<view class="pledgeDetailContent">
				{{pledge.content}}
			</view>
		</view>
		<view class='pledgeDetailForm'>
			<view class="pledgeDetailList">
				<text class="detailTextLeft">{{ $t('pledge.bzkyzc') }}</text>
				<text class="detailTextRight">{{pledge.coin_num}} {{pledge.coin_name}}</text>
			</view>
			<view class="pledgeDetailList">
				<text class="detailTextLeft">{{ $t('pledge.cycle') }}</text>
				<text class="detailTextRight">{{pledge.cycle}} {{ $t('exchange.f0')}}</text>
			</view>
			<view class="pledgeDetailList">
				<text class="detailTextLeft">{{ $t('pledge.rate') }}</text>
				<text class="detailTextRight">{{pledge.rate}}%</text>
			</view>
			<view class="pledgeDetailList">
				<text class="detailTextLeft">{{ $t('pledge.zynum') }}</text>
				<view class="detailTextRight detailInput">
					<input class="pledgeZynum"  v-model="form.num" type="text" :placeholder='$t("pledge.zdyxt")' placeholder-style="text-align:right;">
				</view>
			</view>
			<view class="pledgeDetailList">
				<text class="detailTextLeft">{{$t('pledge.maxnum')}}：{{this.maxnum}}，{{$t('pledge.minnum')}}：{{this.minnum}}</text>
				<!-- <text class="detailTextRight" style="margin-bottom:20upx;"></text> -->
			</view>
		</view>
	</view>
	<view class="pledgeDetailFooter">
		<view class="van-button__text">
			<button ref="btn" @click="pledgeCreateOrder" class="pledgeLjzy">{{ $t('pledge.ljzy') }}</button>
		</view>
		<!-- <uni-popup ref="popup" type="top" :animation="false" :maskClick="true" ></uni-popup> -->
	</view>
	<van-toast id="van-toast" />
  </v-page>
</template>

<script>
import Pledge from "@/api/pledge";
import app from "@/app";
export default {
  data() {
    return {
      pledge:{},
      app,
      taskHeight:0,
	  pledgenum:0,
	  minnum:0,
	  maxnum:0,
	  form: {
	    id: "",
	    num: "",
	  },
    };
  },
  methods:{
	  getDetail(param) {
	    let ajax = Pledge.getDetail({"id": param });
	    ajax
	      .then((res) => {
			console.log(res);
	        this.pledge = res.data;
			this.minnum = res.data.min_amount;
			this.maxnum = res.data.max_amount;
	      })
	      .catch(() => {});
	  },
	  getParam(){
		  let url = window.location.href;
		  let idStr = url.split('?id=')[1];
		  let id = idStr.split('&')[0];
		  return id;
	  },
	  pledgeCreateOrder(){
		  this.form.id = this.getParam();
		  let patten = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
		  let num = this.form.num;
		  if(!patten.test(num)){
			let numTips = this.$t('common.enter')+this.$t('common.money');
			this.$toast(numTips);
			return;
		  }
		  //check MinMaxNum
		  if( (num > this.maxnum) || (num < this.mixnum) ){
			  this.$toast(this.$t('pledge.qtxhlfwndsz'));
			  return;
		  }
		  
		  
		  let data = this.form;
		  let ajax = Pledge.buygoods(data,{btn:this.$refs.btn});
		  ajax
		    .then((res) => {
				// this.$route.push('/order');
				// #ifdef H5
				this.$dialog.confirm({
				   title: this.$t("option.c1"),
				   message: this.$t('pledge.goorder'),
				   cancel:true,
				   cancelButtonText: this.$t('common.cancelButtonText'),
				   confirmButtonText:this.$t('common.confirmButtonText')
				 })
				 .then(() => {
				   this._router.replace("/pages/pledge/order");
				 }).catch(()=>{
				   if (this.query.from) {
					this.$back();
				  } else {
				    this._router.replace("/pages/pledge/order");
				  }
				 });
				// #endif
				// #ifdef APP-PLUS
				  if (this.query.from) {
				    this.$back();
				  } else {
				    this._router.replace("/pages/pledge/order");
				  }
				// #endif
				// this.$toast(this.$t('reg.c5'));
		    })
		    .catch(() => {});
	  },
	  jumpBack(){
		  this.$router.push({path:'/pages/pledge/index'});
	  }
  },
  onLoad() {
	let param = this.getParam();
  	this.getDetail(param);
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
	.lunbo{margin:30upx;height:300upx;}
	.pledgeDetailMain{height:1100upx;overflow:auto;}
	.pledgeTitleLine{width:11upx;height:40upx;background:#FFC119;}
	.pledgeTitleFont{font-size:36upx;margin-left:15upx;position:relative;top:-8upx}
	.pledgeDetailTitle{	display:flex;flex-direction:row;padding:30upx 30upx 0;}
	.pledgeDetailContent{padding:15upx 30upx 0upx 30upx;max-height:276upx;overflow:auto;}
	.detailTextLeft{}
	.detailTextRight{position:absolute;right:0px;}
	input::-ms-input-placeholder{text-align: right;}
	input::-webkit-input-placeholder{text-align: right;}
	.detailInput{top:20upx;width:250upx;}
	.pledgeZynum{text-align:right;}
	.pledgeDetailFooter{width:750upx;text-align:center;position:fixed;width:690upx;bottom:30upx;z-index:100;margin:0 30upx;}
	.pledgeLjzy{background-color:#FFC119;}
	
	.pld-mt{margin-top:30upx;}
</style>