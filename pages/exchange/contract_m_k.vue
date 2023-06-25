<template>
	<view class="box-page">
		<v-page class="box-page-v">
			<v-header :leftClick="changNav('contract-m')" :left-arrow="false">
				<template #left>
					<view class="head-label">
						<view><van-icon name="arrow-left" /></view>
						<view class="title">{{ query.code }}</view>
					</view>
				</template>
				<template #right>
					<view class="fn-lg" @click="option">
						<van-icon v-if="isCoolect" class="color-theme-1" name="star" />
						<van-icon v-else name="star-o" />
					</view>
				</template>
			</v-header>
			<view class="box-cont">
				<view class="box-item d-flex justify-between ">
					<view class="txt-left">
						<text class="price" :class="activeCoin.increase < 0 ? 'color-sell' : 'color-buy'">{{ activeCoin.price || '0' }}</text>
						<text>
							<!-- €20,282.24 {{ '&nbsp;' }} -->
							<text :class="activeCoin.increase < 0 ? 'color-sell' : 'color-buy'">{{ activeCoin.increaseStr || '0' }}</text>
						</text>
					</view>
					<view class="txt-right">
						<view class="num-info">
							<view class="title">24H{{ $t('exchange.e3') }}</view>
							<view class="num">{{ numFormat(activeCoin.high) }}</view>
						</view>
						<view class="num-info">
							<view class="title">24H{{ $t('exchange.e4') }}</view>
							<view class="num">{{ numFormat(activeCoin.low) }}</view>
						</view>
						<view class="num-info">
							<view class="title">24H{{ $t('exchange.e5') }}</view>
							<view class="num">{{ numFormat(activeCoin.vol ? parseFloat(activeCoin.vol) : 0) }}</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<van-tabs class="box-tabs" :border="false" :active="activeTime" animated :ellipsis="false" @change="tabInterval($event.detail.name)">
					<van-tab v-for="item in resolutions" :name="item.value" :title="item.label" :key="item.label"></van-tab>
				</van-tabs>
			</view>
			<view class="chart-box"><iframe class="chart-tradingview" :src="`${mobileBase}static/tradingview.html?${setQuery(iframeQuery)}`" frameborder="0"></iframe></view>
			<view class="box-c-cont">
				<view class="label d-flex justify-between align-center">
					<view>{{ $t('expand.秒合约账户可用余额') }}</view>
					<view class="d-flex align-center" style="color: var(--light);">
						{{ detail.user_usdt ? detail.user_usdt : 0 }}&nbsp;{{ symbolRight }}
						<v-link to="/pages/transfer/index"><van-icon name="../../static/img/icon_huazhuan.png" size="1.4em" style="margin-left: calc(8em * .07);" /></v-link>
					</view>
				</view>
			</view>
			<view class="box-c-cont">
				<v-input class="box-inp-bg" v-model="qiToujine" :placeholder="$t('expand.起投金额') + 200">
					<template #right>
						<van-button size="small" plain type="info" @click="qtAllEv">{{ $t('base.d4') }}</van-button>
					</template>
				</v-input>
			</view>
			<view class="box-c-cont">
				<view class="label">
					<view>{{ $t('expand.选择购买时长') }}</view>
				</view>
				<view class="d-flex flex-wrap" style="margin-top: calc(10em * 0.0625);">
					<view v-for="(item, i) in detail.pricelist" :key="i" class="box-time-profit" :class="timeProfitActive == i && 'active'" @click="changeTimeProfit(i)">
						<view class="time-txt">{{ item.second_time }}s</view>
						<view class="profit-txt">{{ `[${$t('expand.盈利')}${item.second_rate}%]` }}</view>
					</view>
				</view>
			</view>
			<view class="box-c-cont" style="margin-bottom: calc(10em * 0.0625); ">
				<!-- 委托订单 -->
				<view class="order-label">
					<text>{{ $t('expand.委托订单') }}</text>
				</view>
			</view>
			<view class="box-table" style="margin-bottom: calc(60em * 0.0625); ">
				<table class="w-max">
					<thead>
						<tr class="fn-sm">
							<th class="fn-left">{{ $t('expand.买盘') + `[${query.code.split('/')[0]}]` }}</th>
							<th class="fn-center">{{ $t('exchange.d2') + `[${query.code.split('/')[1]}]` }}</th>
							<th class="fn-right">{{ $t('expand.卖盘') + `[${query.code.split('/')[0]}]` }}</th>
						</tr>
					</thead>
					<tbody class="box-table-tbody">
						<tr v-for="(item, idx) in tradeList" :key="idx">
							<td class="fn-left td-center td-buy">
								<view class="text">{{ item.buy_amount }}</view>
								<view class="text-green">{{ item.buy_price }}</view>
								<view class="bg-left" :style="{width:  buyMax?(parseFloat(item.buy_amount / buyMax).toFixed(2) * 100)+'%':'0%'}"></view>
							</td>
							<td class="fn-right td-center td-sell">
								<view class="text-red">{{ item.sell_price }}</view>
								<view class="text">{{ item.sell_amount }}</view>
								<view class="bg-right" :style="{width:  sellMax?(parseFloat(item.sell_amount / sellMax).toFixed(2) * 100)+'%':'0%'}"></view>
							</td>
						</tr>
					</tbody>
				</table>
			</view>
		</v-page>

		<view class="box-c-cont d-flex" style="position: absolute; bottom: 0;">
			<!-- 买涨 -->
			<button class="box-btn parent green-bg text-white" @click="buyEv(0)">
				<span>{{ $t('exchange.b5') + $t('option.b8') }}</span>
			</button>
			<!-- 买跌 -->
			<button class="box-btn parent red-bg text-white" @click="buyEv(1)">
				<span>{{ $t('exchange.b5') + $t('option.c0') }}</span>
			</button>
		</view>

		<van-popup :show="buyShow" @close="buyShow = false" closeable round custom-style="width:70%;padding:15px;">
			<view class="box-popup">
				<label>{{ query.code }}</label>
				<view class="item-info">
					<view class="">{{ $t('expand.现价') }}</view>
					<view class="">{{ numFormat(activeCoin.price) }}</view>
				</view>
				<view class="item-info">
					<view class="">{{ $t('exchange.d5') }}</view>
					<view :class="buyStat == 0 ? 'text-green' : 'text-red'">{{ buyStat == 0 ? $t('exchange.b5') + $t('option.b8') : $t('exchange.b5') + $t('option.c0') }}</view>
				</view>
				<view class="item-info">
					<view class="">{{ $t('exchange.c5') }}</view>
					<view class="">{{ qiToujine ? qiToujine : 'USDT' }}</view>
				</view>
				<view class="item-info text-red">
					<view class="">{{ $t('expand.预期收益') }}</view>
					<view class="">{{ '--' }}</view>
				</view>
				<van-button type="info" class="buy-btn" @click="buyEvSub">{{ $t('expand.确认下单') }}</van-button>
			</view>
		</van-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import Market from '@/api/market';
import Contract from '@/api/contract';
import qs from 'qs';
import app from 'app.js';
import math from '@/utils/class/math';
import Home from '@/api/home';
import Hangqing from '@/api/hangqing';
// 所使用的请求
let ajaxExchangeMap = {
	getMarketList: Market.getMarketList,
	getBooks: Market.getBooks,
	sell: 'sellList_',
	sellList: 'sellList',
	buy: 'buyList_',
	buyList: 'buyList',
	trade: 'tradeList_',
	tradeList: 'tradeList',
	market: 'exchangeMarketList',
	getSymbol(name) {
		return name;
	}
};
let contractExchangeMap = {
	getMarketList: Contract.getMarketList,
	getBooks: Contract.getMarketInfo,
	sell: 'swapSellList_',
	sellList: 'swapSellList',
	buy: 'swapBuyList_',
	buyList: 'swapBuyList',
	trade: 'swapTradeList_',
	tradeList: 'swapTradeList',
	market: 'swapMarketList',
	getSymbol(name) {
		return name.split('/')[0];
	}
};
export default {
	name: '',
	data() {
		return {
			data: [],
			query: {},
			collect: [],
			marketList: [],
			activeTime: '1',
			app,
			qiToujine: '',
			timeProfitActive: 0,
			timeList2: [{ time: 300, profit: 5 }, { time: 600, profit: 10 }, { time: 1200, profit: 15 }, { time: 1500, profit: 29 }, { time: 1800, profit: 30 }],
			buyStat: 0,
			buyShow: false,
			tradeList: [{ buyPrice: 7.98989, sellPrice: 0.87878 }],
			detail: {},
			unSymbol: '',
			isShow: true,
			buyList: [],
			sellList: [],
			buyMax:0,
			sellMax:0
		};
	},
	components: {},
	computed: {
		
		symbol() {
			return this.query.code;
		},
		symbolLeft() {
			if (!this.symbol) return '';
			return this.symbol.split('/')[0];
		},
		symbolRight() {
			if (!this.symbol) return '';
			return this.symbol.split('/')[1];
		},
		resolutions() {
			let arr = [
				{ label: '1' + this.$t('exchange.e8'), value: '1' },
				{ label: '5' + this.$t('exchange.e8'), value: '5' },
				{ label: '15' + this.$t('exchange.e8'), value: '15' },
				{ label: '30' + this.$t('exchange.e8'), value: '30' },
				{ label: '1' + this.$t('exchange.e9'), value: '60' },
				{ label: '1' + this.$t('exchange.f0'), value: '1D' },
				{ label: '1' + this.$t('exchange.f1'), value: '1W' },
				{ label: '1' + this.$t('exchange.f2'), value: '1M' }
			];
			return arr;
		},
		// 是否为自选
		isCoolect() {
			return this.collect.map(item => item.pair_name).includes(this.query.code);
		},
		// 当前选中的coin
		activeCoin() {
			if (!this.marketList.length) return {};
			let list = [];
			this.marketList.forEach(parentItem => {
				parentItem.marketInfoList.forEach(item => {
					list.push(item);
				});
			});
			let arr = list.find(item => item.pair_name == this.query.code);
			return arr;
		},
		...mapState({
			socket: 'ws',
			socket1: 'ws1',
			theme: 'theme'
		}),
		ajax() {
			return this.query.contract ? contractExchangeMap : ajaxExchangeMap;
		},
		ws() {
			return this.query.contract ? this.socket1 : this.socket;
		},
		iframeQuery() {
			if (this.query.contract) {
				return {
					getLinkUrl: this.app.baseUrl + '/api/app/contract/getKline',
					symbol: this.query.code.split('/')[0],
					theme: this.theme,
					ws: this.app.socketUrl1,
					interval: this.activeTime,
					resolutions: this.resolutions.map(item => item.value),
					contract: 1
				};
			} else {
				return {
					getLinkUrl: this.app.baseUrl + '/api/app/option/getKline',
					symbol: this.query.code,
					theme: this.theme,
					ws: this.app.socketUrl,
					interval: this.activeTime,
					resolutions: this.resolutions.map(item => item.value)
				};
			}
		},
		mobileBase() {
			// #ifdef APP-PLUS
			if (plus.os.name == 'Android') {
				return '';
			} else {
				return this.app.mobile + '/';
			}
			// #endif
			// #ifdef H5
			return '/';
			// #endif
		},
		isLogin() {
			return Boolean(uni.getStorageSync('token'));
		}
	},
	onLoad(query) {
		this.query = query;
		this.isShow = true;
		this.getMarketList();
		this.getCollect();
		this.socketMessage();
	},
	created() {},
	mounted() {},
	methods: {
		omitTo: math.omitTo,
		setQuery: qs.stringify,
		qtAllEv() {
			this.qiToujine = this.detail.user_usdt;
			this.$forceUpdate();
		},
		numFormat(num) {
			if (num == undefined || num == null) return num;
			var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			return c;
		},
		// 页面通知图形
		tabInterval(idx) {
			this.activeTime = idx;
		},
		// 获取自选列表
		getCollect() {
			if (!this.isLogin) return;
			Hangqing.getCollect({ ctype: 3 })
				.then(res => {
					this.collect = res.data || [];
				})
				.catch(() => {});
		},
		option() {
			let data = {
				pair_name: this.query.code,
				ctype: 3
			};
			Home.option(data)
				.then(res => {
					this.getCollect();
					if (res.data) {
						this.$toast(this.$t('exchange.a6'));
					} else {
						this.$toast(this.$t('exchange.a7'));
					}
				})
				.catch(() => {});
		},
		getDetail() {
			let par = {
				symbol: this.symbolLeft
			};
			Hangqing.getDetail(par).then(res => {
				this.detail = res.data;
				this.qiToujine = this.detail.pricelist[0].second_minprice;
				this.timeProfitActive = 0;
				this.$forceUpdate();
			});
		},
		// 获取市场行情
		getMarketList() {
			// this.ajax.getMarketList().then(res => {
			let param = { type: 3 };
			Contract.getMarketList(param).then(res => {
				this.marketList = res.data;
				let arr = this.marketList[0].marketInfoList.find(item => {
					return item.pair_name == this.query.code;
				});
				this.getDetail();
				this.linkSocket(this.activeCoin.symbol);
				// this.symbolListSocket();
			});
		},
		buyEv(t) {
			this.buyStat = t;
			this.buyShow = true;
		},
		buyEvSub() {
			let price = this.detail.pricelist[this.timeProfitActive];

			if (this.qiToujine < parseFloat(price.second_minprice)) {
				uni.showToast({
					title: this.$t('expand.起投金额提示') + ' ' + price.second_minprice,
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			let para = {
				symbol: this.symbolLeft,
				otype: this.buyStat == 0 ? 1 : 2,
				second: price.second_time,
				buy_num: this.qiToujine
			};
			Hangqing.setOrder(para).then(res => {
				this.buyShow = false;
				this.getDetail();
			});
		},
		// 切换购买时间
		changeTimeProfit(i) {
			this.timeProfitActive = i;
			this.qiToujine = this.detail.pricelist[i].second_minprice;
			this.$forceUpdate();
		},
		changNav(name) {
			// this.navName = name;
			uni.$emit('topNavTab', { name: name });
		},
		// 链接socket
		linkSocket(symbol) {
			this.unSymbol = symbol;
			// 订阅买线
			this.ws.send({
				cmd: 'sub',
				msg: `${this.ajax.buy}${symbol}`
			});
			// 订阅委托订单
			this.ws.send({
				cmd: 'sub',
				msg: `swapTradeSecondList_${symbol}`
			});
			// // 订阅卖线
			// this.ws.send({
			//   cmd: "sub",
			//   msg: `${this.ajax.sell}${symbol}`,
			// });
			// // 订阅成交
			// this.ws.send({
			//   cmd: "sub",
			//   msg: `${this.ajax.trade}${symbol}`,
			// });
		},
		// 取消订阅
		unLink(symbol) {
			// 取消买线
			this.ws.send({
				cmd: 'unsub',
				msg: `${this.ajax.buy}${symbol}`
			});
			// 订阅委托订单
			this.ws.send({
				cmd: 'unsub',
				msg: `swapTradeSecondList_${symbol}`
			});
			// // 取消卖线
			// this.ws.send({
			//   cmd: "unsub",
			//   msg: `${this.ajax.sell}${symbol}`,
			// });
			// // 取消成交
			// this.ws.send({
			//   cmd: "unsub",
			//   msg: `${this.ajax.trade}${symbol}`,
			// });
		},

		// 接受socket
		socketMessage() {
			this.ws.on('message', res => {
				if (!this.isShow) return;
				let { data, sub } = res;
				let symbol = this.query.code.replace('/', '').toLocaleLowerCase();

				if (sub == this.ajax.market) {
					this.marketList = data;
				}
				if (sub == `swapTradeSecondList_${this.activeCoin.symbol}`) {
					let _data = JSON.parse(JSON.stringify(data));
					function compare(property) {
						return function(a, b) {
							var val1 = a[property];
							var val2 = b[property];
							return val2 - val1;
						};
					}
					this.buyMax = _data.sort(compare("buy_amount"))[0]["buy_amount"];
					this.sellMax = _data.sort(compare("sell_amount"))[0]["sell_amount"];
					
					this.tradeList = data;
				}
				// if (sub == `${this.ajax.buy}${symbol}`) {
				//   this.buyList = data;
				// }
				// if (sub == `${this.ajax.sell}${symbol}`) {
				//   this.sellList = data;
				// }
				// if (sub == `${this.ajax.trade}${symbol}`) {
				//   this.tradeList.unshift(data);
				//   this.tradeList.pop();
				// }
			});
		}
	},
	onUnload() {
		this.isShow = false;
		this.unLink(this.unSymbol);
	},
	destroyed() {
		this.ws.send({
			cmd: 'unsub',
			msg: this.ajax.market
		});
		this.unLink(this.unSymbol);
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
.text-green {
	color: #3ead5d !important;
}
.text-red {
	color: #da5252 !important;
}
.box-page {
	height: 100vh;
	font-size: 16px;
	background-color: var(--UI-BG-0);
	margin-bottom: calc(1145em * 0.0625) !important;
	overflow-y: auto;
}
.box-page-v {
	font-size: 16px;
	height: 100vh;
	overflow-y: auto;
}
::v-deep {
	.van-nav-bar__content {
		padding: 10px 0;
		line-height: 1;
	}
}
.head-label {
	display: flex;
	font-weight: bold;
	.title {
		margin-left: calc(10em * 0.0625);
	}
}
.box-cont {
	padding: 15px;
}
.box-item {
	.txt-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		uni-text {
			font-size: calc(12em * 0.0625);
			color: var(-light);
		}
		.price {
			font-size: calc(30em * 0.0625);
			font-weight: bold;
		}
	}
	.txt-right {
		// width: 60%;
		display: flex;
		flex-direction: column;
		.num-info {
			font-size: calc(12em * 0.0625);
			display: flex;
			justify-content: space-between;
		}
		.num {
			color: var(--light);
		}
		.title {
			text-align: left;
			width: calc(100em * 0.0625);
		}
	}
}
.box-tabs {
	::v-deep {
		.vant-sticky-index {
			display: block;
		}
		.van-hairline--top-bottom::after {
			border: none !important;
		}
		.van-ellipsis {
			font-size: calc(12em * 0.0625);
		}
		.van-tab--active {
			font-size: calc(14em * 0.0625);
			color: #3771e2 !important;
		}
		.van-tab--active .van-ellipsis {
			font-size: calc(14em * 0.0625);
			color: #3771e2 !important;
		}
		.van-tabs__line {
			color: #3771e2 !important;
		}
		.van-tabs__line:before {
			width: calc(25em * 0.0625);
			height: 3px;
			border-radius: 0;
			background-color: #3771e2 !important;
		}
	}
}
.chart-tradingview {
	height: calc(454em * 0.0625);
	width: 100%;
}
.chart-box {
	width: 100%;
	height: calc(454em * 0.0625);
}

.box-c-cont {
	padding: calc(10em * 0.0625) calc(10em * 0.0625) 0;
}

.box-inp-bg {
	background-color: var(--listline);
	border-radius: 5px;
	padding-left: 8px;
	::v-deep {
		uni-button {
			border: none !important;
		}
		uni-button:after {
			border: none !important;
		}
		.van-cell {
			background-color: var(--listline) !important;
			border-radius: 5px;
		}
		.van-cell:after {
			border-bottom: none;
		}
	}
}

.box-time-profit {
	width: calc(106em * 0.0625);
	padding: calc(8em * 0.0625) 0;
	margin: 0 calc(10em * 0.0625) calc(12em * 0.0625) 0;
	line-height: 1.2;
	text-align: center;
	color: var(--light);
	background-color: var(--listline) !important;
	border-radius: 5px;
	.time-txt {
		font-size: calc(14em * 0.0625);
	}
	.profit-txt {
		font-size: calc(12em * 0.0625);
	}
}
.box-time-profit.active {
	color: #fff;
	background-color: #1987ed !important;
}
.box-time-profit:nth-child(3n + 3) {
	margin-right: 0;
}
.parent {
	position: relative;
}
.box-btn {
	width: calc(160em * 0.0625) !important;
	height: calc(34em * 0.0625);
	color: #fff;
	line-height: calc(30em * 0.0625);
	text-align: center;
	display: flex;
	flex-direction: row;
	align-items: center;
	span {
		width: 100%;
		display: block;
		text-align: center;
		font-size: calc(14em * 0.0625);
	}
}
::v-deep {
	.box-btn:after {
		border: none !important;
	}
}
.green-bg {
	background-color: #3ead5d !important;
}
.red-bg {
	background-color: #da5252 !important;
}

.box-popup {
	line-height: 2.5;
	uni-label {
		display: block;
		width: 100%;
		text-align: center;
		font-weight: bold;
	}
	.item-info {
		font-size: calc(12em * 0.0625);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.buy-btn {
		width: 100%;
		height: calc(43em * 0.0625);
		display: block;
		margin-top: calc(20em * 0.0625);
		::v-deep {
			.van-button {
				width: 100%;
				border-radius: calc(43em * 0.0625);
			}
		}
	}
}
.order-label {
	uni-text {
		font-size: calc(14em * 0.0625);
		padding-bottom: 5px;
		color: #1987ed;
		border-bottom: 3px solid #1987ed;
	}
}
.box-table {
	padding: 15px;
	tr {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	td {
		font-weight: bold;
		line-height: 2;
		position: relative;
		display: block;
	}
	.text {
		color: var(--light);
		font-size: calc(12em * 0.0625);
	}
	.td-center {
		display: flex;
		justify-content: space-between;
	}
	.text-red,
	.text-green {
		font-size: calc(12em * 0.0625);
		padding: 0 10px;
	}
	.td-buy,
	.td-sell {
		width: 50%;
	}
	.bg-left {
		height: calc(26em * 0.0625);
		background-color: rgba(62, 173, 93, 0.2);
		position: absolute;
		top: 0;
		right: 0;
	}
	.bg-right {
		height: calc(26em * 0.0625);
		background-color: rgba(218, 82, 82, 0.2);
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>
