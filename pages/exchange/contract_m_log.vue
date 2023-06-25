<template>
	<v-page>
		<v-header :title="$t('expand.秒合约记录')">
			<template #right>
				<view class="ref-icon" @click="getOrderLog"><van-icon name="replay" /></view>
			</template>
			
		</v-header>
		<view class="box-page" style="margin-bottom: calc(60em * 0.0625); ">
			
			<van-tabs :active="tabs_active" class="box-tabs" @change="tabsActiveEv">
				<van-tab :title="$t('contract.a1')"><!-- 持仓 --></van-tab>
				<van-tab :title="$t('expand.交易记录')"><!-- 交易记录 --></van-tab>
			</van-tabs>

			<view class="box-table">
				<view class="box-log-item" v-for="(item, i) in orderLog" :key="i">
					<view class="box-item-info d-flex">
						<view class="title">
							<view>
								<span :class="item.otype == 1 ? 'text-red' : 'text-green'">
									{{ item.otype == 1 ? $t('exchange.b5') + $t('option.c0') : $t('exchange.b5') + $t('option.b8') + '&nbsp;' }}
								</span>
								<span style="font-weight: bold;">{{ '&nbsp;' +  item.symbol + '&nbsp;' }}</span>
								<span>{{ $t('expand.合约时长') + '&nbsp;' }}</span>
								<span style="font-weight: bold;">{{ item.second + 's' + '&nbsp;' }}</span>
								<span style="font-weight: bold;">{{ `[${$t('expand.盈利')}${item.rate}%]` }}</span>
							</view>
						</view>
						<view class="value" style="font-weight: 400;">{{ item.status == 1 ? $t('expand.进行中') : $t('otc.c9') }}</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title">{{$t('expand.买入价')}}</view>
						<view class="value">{{ numFormat(parseFloat(item.buy_price).toFixed(2)) }} {{ symbolRight }}</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title">{{$t('expand.结算价')}}</view>
						<view class="value">{{ numFormat(parseFloat(item.sell_price).toFixed(2)) }} {{ symbolRight }}</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title">{{$t('expand.交易额')}}</view>
						<view class="value">{{ numFormat(parseFloat(item.buy_num).toFixed(2)) }} {{ symbolRight }}</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title">{{$t('expand.盈亏')}}</view>
						<view class="value" :class="item.order_result == 2 ? 'text-red' : 'text-green'">{{item.order_result == 2 ? '-' : ''}}{{ numFormat(parseFloat(item.profits).toFixed(2)) }} {{ symbolRight }}</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title">{{$t('expand.开仓时间')}}:{{ item.created_at }}</view>
					</view>
				</view>
			</view>

			<view
				v-if="wushujuShowEv"
				class="d-flex flex-col align-center"
				style="padding: calc(40em * 0.0625); font-size: 12px; background-color: var(--listline); border-radius: 5px;"
			>
				<view><image style="width:3.375em; height:3.375em;" :src="`../../static/img/icon_kongshuju_${theme == 'dark' ? '0' : '1'}.png`" /></view>
				<view style="line-height: 4;">{{ $t('common.notData') }}</view>
			</view>
		</view>
	</v-page>
</template>

<script>
import Hangqing from '@/api/hangqing';
export default {
	name: '',
	data() {
		return {
			data: [],
			tabs_active: 0,
			orderLog: []
		};
	},
	components: {},
	computed: {
		wushujuShowEv() {
			return this.orderLog.length == 0;
		}
	},
	created() {
		this.getOrderLog(1);
	},
	mounted() {
		
	},
	methods: {
		numFormat(num) {
			if (num == undefined || num == null) return num;
			var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			return c;
		},
		tabsActiveEv(val) {
			this.tabs_active = val.detail.index;
			this.getOrderLog();
		},
		getOrderLog() {
			this.orderLog = [];
			let para = {
				status: this.tabs_active + 1,
				symbol: 'BTC'
			};
			Hangqing.getOrderLog(para).then(res => {
				this.orderLog = res.data.data;
				console.log(this.orderLog)
				this.$forceUpdate();
			});
		}
	},
	watch: {
		data: {
			handler(val) {},
			// 深度监视
			deep: true,
			// 是否立即执行一次
			immediate: true
		}
	}
};
</script>

<style scoped lang="scss">
.box-page {
	padding: 15px;
	font-size: 16px;
}
.box-log-item {
	line-height: 3;
	padding: 0 calc(15em * 0.0625);
	background-color: var(--listline);
	border-radius: 5px;
	margin-bottom: calc(8em * 0.0625);
	.box-item-info {
		font-size: calc(12em * 0.0625);
		display: flex;
		justify-content: space-between;
		.value {
			color: var(--light);
			font-weight: bold;
		}
	}
}
.ref-icon {
	z-index: 5;
}
.text-green {
	color: #3ead5d !important;
}
.text-red {
	color: #da5252 !important;
}
</style>
