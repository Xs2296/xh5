<template>
  <v-page class="pledgeRonqi">
    <v-header class="" :border="false" :title="$t('pledge.record')"  :leftClick="()=>_router.replace('/pages/pledge/index')">
		<template #right>
		  <v-link :to="{path:'/pages/pledge/index'}">
		  	<van-icon class="fn-20 pld-mt" name="orders-o" />
		  </v-link>
		</template>
	</v-header>
    <view class="ordermain" v-for="(item, idx) in pledge"
          :key="idx">
		<view class="ordernum">
			{{$t(`pledge.ordernum`)}}：{{item.order_no}}
		</view>
		<view class='orderInfo font-new'>
			<view class="orderImg">
				<!-- <img style="width:100%;height:100%;" src="/static/img/drak_doing.png" alt=""> -->
				<view :class="item.status == 1 ? 'cycleDiv_out cycleDivDoing' : 'cycleDiv_out' ">
					<view class="cycleDiv_in">
						<text style="line-height:150upx;font-size:18upx;color:#00A67F;"  v-if="item.status=='1'">{{$t(`pledge.income`)}}</text>
						<text style="line-height:150upx;font-size:18upx;color:#00A67F;"  v-else>{{$t(`pledge.completed`)}}</text>
					</view>
					<view class="cycle_mengban"></view>
				</view>
			</view>
			<view class='orderInfoRight'>
				<view class="orderTitle">{{item.product_name}}</view>
				<view class="orderContent orderMagin">
					<text>{{$t(`pledge.biz`)}}:</text>
					<text>{{item.coin_name}}</text>
				</view>
				<view class="orderContent orderMagin">
					<text>{{$t(`pledge.cycle`)}}:</text>
					<text>{{item.cycle}} {{$t(`exchange.f0`)}}</text>
				</view>
				<view class="orderContent orderMagin">
					<text>{{$t(`pledge.zynum`)}}:</text>
					<text>{{item.num}}</text>
				</view>
				<view class="orderContent orderMagin">
					<text>{{$t(`pledge.profit`)}} ≈ </text>
					<text>{{item.reward}}</text>
				</view>
			</view>
		</view>
<!-- 		<view class="orderTimeArea">
			<view class="orderTime">{{$t(`pledge.create_time`)}} : {{item.created_at}}</view>
			<view class="orderTime orderTimeR">{{$t(`pledge.end_time`)}}  : {{item.end_time}}</view>
		</view> -->
		<view class="orderTimeArea">
			{{$t(`pledge.create_time`)}} : {{item.created_at}}
		</view>
		<view class="orderTimeArea">
			{{$t(`pledge.end_time`)}}  : {{item.end_time}}
		</view>
    </view>
  </v-page>
</template>

<script>
import Order from "@/api/pledge";
import app from "@/app";
export default {
  name: "order",
  data() {
    return {
      pledge:{},
      app,
      taskHeight:0,
	  form:{
		  limit:"",
		  page:""
	  }
    };
  },
  methods:{
	  indexData() {
	    let data = this.form;
		data.limit = 100;
		data.page = 1;
	    let ajax = Order.getOrderList(data, { loading: true });
	    ajax
	      .then((res) => {
			  if(res.code == 200){
				  this.pledge = res.data;
			  }
	      })
	      .catch(() => {});
	  },
	  jumpBack(){
		  this.$router.push({path:'/pages/pledge/index'});
	  }
  },
  onLoad() {
  	this.indexData();
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
	// .orderlistRonqi{margin-bottom:15upx;}
	.ordernum{font-size:24upx;color:#999999;margin-bottom:29upx;}
	.orderImg{width:210upx;height:210upx;}
	.orderInfo{display:flex;padding-bottom:27upx;}
	.orderInfoRight{margin-left:15upx;width:500upx;}
	.orderContent{}
	.orderCLeft{display:inline-block;font-size:28upx;}
	.orderCRight{display:inline-block;margin-left:28upx;}
	.orderMagin{margin-bottom:7upx;}
	.orderTime{font-size:20upx;color:#999;display:inline-block;}
	.orderTimeR{position: absolute;right:0;}
	.orderTimeArea{display:flex;position:relative;}
	// .cycle_mengban{
	// 	width:100upx;
	// 	height:100upx;
	// 	border-radius:0 100% 0 0;
	// 	position:absolute;
	// 	top:0;
	// 	right:0;
	// 	background:#F6F6F6;
	// }
	
	.cycleDiv_out{
		width:100%;
		height:100%;
		border-radius:50%;
		position:relative;
		// background:#00A67F;
		background:var(--menban);
		text-align:center;
		z-index:5;
	}
	
	.cycleDivDoing{
		background:#00A67F !important;
	}
	
	
	// .cycleDiv_in{
	// 	width:160upx;
	// 	height:160upx;
	// 	border-radius:50%;
	// 	top:25upx;
	// 	margin:auto;
	// 	position:relative;
	// 	background:#FFFFFF;
	// 	z-index:10;
	// }
	
	.fgreen{color:#00A67F}
	.join{background: #FFC119;color:#333333;width:145upx;height:60upx;position:absolute;right:0upx;bottom:0upx;font-size:26upx;font-weight:bold;padding:0;}
</style>