<template>
	<v-page>
		<v-header :leftClick="() => _router.replace('/pages/base/index')" :left-arrow="false">
			<template #left>
				<view><van-icon name="arrow-left" /></view>
				<view class="fn-20 color-light m-l-xs" @click.stop="symbolListShow = true">
					<i class="iconfont color-theme-1">&#xe655;</i>
					{{ query.code }}
				</view>
			</template>
			<template #right>
				<view class="fn-lg" @click="option">
					<van-icon v-if="isCoolect" class="color-theme-1" name="star" />
					<van-icon v-else name="star-o" />
				</view>
			</template>
		</v-header>
		<view class="layout-main" :style="this.clientHeigth">
			<view class="price-data d-flex p-t-xs p-x-md justify-between bg-panel-3 m-x-md rounded-xs">
				<view class="col">
					<view class="num fn-26 color-light">{{ activeCoin.price }}</view>
					<view class="d-flex">
						<view class="m-l-xs fn-20" :class="activeCoin.increase < 0 ? 'color-sell' : 'color-buy'">{{ activeCoin.increaseStr }}</view>
					</view>
				</view>
				<view class="col fn-right justify-center d-flex flex-col">
					<table>
						<tr>
							<td>24H{{ $t('exchange.e3') }}</td>
							<td class="color-light">{{ activeCoin.high }}</td>
						</tr>
						<tr>
							<td>24H{{ $t('exchange.e4') }}</td>
							<td class="color-light">{{ activeCoin.low }}</td>
						</tr>
						<tr v-if="!query.contract">
							<td>24H{{ $t('exchange.e5') }}</td>
							<td class="color-light">{{ activeCoin.vol }}</td>
						</tr>
					</table>
				</view>
			</view>

			<van-tabs :border="false" :active="activeTime" animated :ellipsis="false" @change="tabInterval($event.detail.name)">
				<van-tab v-for="item in resolutions" :name="item.value" :title="item.label" :key="item.label"></van-tab>
			</van-tabs>
			<view class="chart-box"><iframe class="chart-tradingview" :src="`${mobileBase}static/tradingview.html?${setQuery(iframeQuery)}`" frameborder="0"></iframe></view>
			<van-tabs animated swipeable v-model="active" sticky :ellipsis="false" offset-top="1.22667rem">
				<!-- <van-tab v-if="this.query.code!=='ABK/USDT'" :title="$t('exchange.e6')">
          <sale :buyList="buyList" :sellList="sellList" />
        </van-tab> -->
				<van-tab :title="$t('exchange.d3')"><latest-transaction :tradeList="tradeList" /></van-tab>
				<van-tab :title="$t('exchange.e7')"><coin-info :query="query" /></van-tab>
			</van-tabs>
		</view>
		<!-- 左侧的弹窗 -->
		<van-popup class="bg-panel-4" :show="symbolListShow" @close="symbolListShow = false" close-on-popstate position="left" custom-style="height:100%;width:70%">
			<symbol-list :collect="collect" :marketList="marketList" :title="query.contract ? $t('contract.a4') : ''" @check-symbol="checkSymbol" />
		</van-popup>
		<view class="btn-group footer d-flex p-md">
			<view class="buyBtn jybtn" @click="buyFunc">{{ $t('exchange.c3') }}</view>
			<view class="sellBtn jybtn" @click="sellFunc">{{ $t('exchange.c4') }}</view>
			<!-- <v-button
        block
        class="flex-fill m-r-md rounded-lg pjwidth"
        type="green"
        replace
        :to="{
          path: '/pages/base/index',
          query: {
            symbol: query.code,
            direction: 'buy',
            tel: query.contract ? 'contract' : 'exchange-operation',
          },
        }"
        >{{ $t("exchange.c3") }}</v-button
      >
      <v-button
        block
        class="flex-fill rounded-lg pjwidth"
        type="blue"
        replace
        :to="{
          path: '/pages/base/index',
          query: {
            symbol: query.code,
            direction: 'sell',
            tel: query.contract ? 'contract' : 'exchange-operation',
          },
        }"
        >{{ $t("exchange.c4") }}</v-button
      > -->
		</view>
		<van-toast id="van-toast" />
	</v-page>
</template>
<script>
import sale from './sale';
import symbolList from './symbol-list';
import latestTransaction from './latest-transaction';
import coinInfo from './coin-info';
import Market from '@/api/market';
import Contract from '@/api/contract';
import Home from '@/api/home';
import Hangqing from '@/api/hangqing';
import { mapState } from 'vuex';
import math from '@/utils/class/math';
import Exchange from '@/api/exchange';
import qs from 'qs';
import app from 'app.js';
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
	components: {
		sale,
		symbolList,
		latestTransaction,
		coinInfo
	},
	data() {
		return {
			timeFilter: false,
			indexFilter: false,
			symbolListShow: false,
			active: 0,
			buyList: [],
			sellList: [],
			tradeList: [],
			activeTime: '1',
			index: '',
			marketList: [],
			collect: [],
			unSymbol: '',
			query: {},
			isLoad: false,
			isShow: true,
			price_cny: 0,
			app,
			clientHeigth: ''
		};
	},
	watch: {
		timeFilter(n) {
			if (n) this.indexFilter = false;
		},
		indexFilter(n) {
			if (n) this.timeFilter = false;
		}
	},
	computed: {
		resolutions() {
			let arr = [
				{
					label: '1' + this.$t('exchange.e8'),
					value: '1'
				},
				{
					label: '5' + this.$t('exchange.e8'),
					value: '5'
				},
				{
					label: '15' + this.$t('exchange.e8'),
					value: '15'
				},
				{
					label: '30' + this.$t('exchange.e8'),
					value: '30'
				},
				{
					label: '1' + this.$t('exchange.e9'),
					value: '60'
				},
				{
					label: '1' + this.$t('exchange.f0'),
					value: '1D'
				},
				{
					label: '1' + this.$t('exchange.f1'),
					value: '1W'
				},
				{
					label: '1' + this.$t('exchange.f2'),
					value: '1M'
				}
			];
			return arr;
		},
		activeTimeObj() {
			return this.resolutions.find(item => item.value == this.activeTime);
		},
		isLogin() {
			return Boolean(uni.getStorageSync('token'));
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
			return list.find(item => item.pair_name == this.query.code);
		},
		// 是否为自选
		isCoolect() {
			return this.collect.map(item => item.pair_name).includes(this.query.code);
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
		}
	},
	methods: {
		setQuery: qs.stringify,
		omitTo: math.omitTo,
		// 页面通知图形
		tabInterval(idx) {
			// if (this.isLoad) return;
			// this.isLoad = true;
			this.activeTime = idx;
		},
		// 图形通知页面
		changeInterval($ev) {
			this.activeTime = $ev;
			setTimeout(() => {
				this.isLoad = false;
			}, 300);
		},
		getBooks() {
			this.ajax
				.getBooks({
					symbol: this.ajax.getSymbol(this.query.code)
				})
				.then(res => {
					this.buyList = res.data[this.ajax.buyList];
					this.sellList = res.data[this.ajax.sellList];
					this.tradeList = res.data[this.ajax.tradeList];
				});
		},
		// 获取市场行情
		getMarketList() {
			this.ajax.getMarketList().then(res => {
				this.marketList = res.data;
				this.linkSocket(this.activeCoin.symbol);
				this.symbolListSocket();
			});
		},
		// 获取自选列表
		getCollect() {
			if (!this.isLogin) return;
			let para = {
				ctype: this.query.contract ? 2 : 1
			};
			Hangqing.getCollect(para)
				.then(res => {
					this.collect = res.data || [];
				})
				.catch(() => {});
		},
		// 切换币种
		checkSymbol(obj) {
			this.symbolListShow = false;
			if (obj.pair_name == this.query.code) return;
			//  this.query = {code:obj.pair_name};
			this._router.replace({
				path: '/pages/exchange/index',
				query: { code: obj.pair_name, contract: this.query.contract }
			});
			this.getBooks();
		},
		// 添加自选
		option() {
			let data = {
				pair_name: this.query.code,
				ctype: this.query.contract ? 2 : 1
			};
			Hangqing.option(data)
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
		// 获取汇率
		getCurrencyExCny() {
			Exchange.getCurrencyExCny({
				coin_name: this.query.code.split('/')[1]
			}).then(res => {
				this.price_cny = res.data.price_cny;
			});
		},
		// 链接socket
		linkSocket(symbol) {
			this.unSymbol = symbol;
			// 订阅买线
			this.ws.send({
				cmd: 'sub',
				msg: `${this.ajax.buy}${symbol}`
			});
			// 订阅卖线
			this.ws.send({
				cmd: 'sub',
				msg: `${this.ajax.sell}${symbol}`
			});
			// 订阅成交
			this.ws.send({
				cmd: 'sub',
				msg: `${this.ajax.trade}${symbol}`
			});
		},
		// 取消订阅
		unLink(symbol) {
			// 取消买线
			this.ws.send({
				cmd: 'unsub',
				msg: `${this.ajax.buy}${symbol}`
			});
			// 取消卖线
			this.ws.send({
				cmd: 'unsub',
				msg: `${this.ajax.sell}${symbol}`
			});
			// 取消成交
			this.ws.send({
				cmd: 'unsub',
				msg: `${this.ajax.trade}${symbol}`
			});
		},
		// 左侧的socket  不做切换要单独开来
		symbolListSocket() {
			this.ws.send({
				cmd: 'sub',
				msg: this.ajax.market
			});
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
				if (sub == `${this.ajax.buy}${symbol}`) {
					this.buyList = data;
				}
				if (sub == `${this.ajax.sell}${symbol}`) {
					this.sellList = data;
				}
				if (sub == `${this.ajax.trade}${symbol}`) {
					this.tradeList.unshift(data);
					this.tradeList.pop();
				}
			});
		},
		getHeightScreen() {
			var oMeta = document.createElement('meta');
			oMeta.content = 'yes';
			oMeta.name = 'apple-mobile-web-app-capable';
			document.getElementsByTagName('head')[0].appendChild(oMeta);
			// let clientHieght = document.documentElement.clientHeight;
			// console.log(clientHieght);
			// let mainHeight = clientHieght - 100;
			// this.clientHeigth = 'max-height:'+mainHeight+'px';
		},
		buyFunc() {
			this._router.replace({
				path: '/pages/base/index',
				query: {
					symbol: this.query.code,
					direction: 'buy',
					tel: this.query.contract ? 'contract' : 'exchange-operation'
				}
			});
		},
		sellFunc() {
			this._router.replace({
				path: '/pages/base/index',
				query: {
					symbol: this.query.code,
					direction: 'sell',
					tel: this.query.contract ? 'contract' : 'exchange-operation'
				}
			});
		}
	},
	onUnload() {
		this.isShow = false;
		this.unLink(this.unSymbol);
	},
	onLoad(query) {
		this.getHeightScreen();
		this.query = query;
		console.log(this.query);
		this.isShow = true;
		this.getBooks();
		this.getMarketList();
		this.getCollect();
		this.socketMessage();
		this.getCurrencyExCny();
	},
	destroyed() {
		this.ws.send({
			cmd: 'unsub',
			msg: this.ajax.market
		});
		this.unLink(this.unSymbol);
	}
};
</script>
<style lang="scss" scoped>
.price-data {
	position: relative;
	.filter {
		label {
			.button {
				border: none;
				background: none;
				&:active {
					color: $theme-1;
				}
			}
			input {
				display: none;
			}

			.filter-panel {
				position: absolute;
				top: 103%;
				left: $padding-md;
				right: $padding-md;
				overflow: hidden;

				button {
					background: none;
					border: none;
					&.active,
					&:active {
						color: $theme-1;
					}
				}
			}
		}
	}
}
.chart-tradingview {
	height: 450px;
	width: 100%;
}
.footer {
	box-shadow: var(--tab-nav-shadow, 0 -7px 20px 0 rgba(37, 37, 48, 0.83));
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 99;
	background: var(--ronqi);
}
.pjwidth {
	width: 250upx !important;
	overflow: hidden;
}
.buyBtn {
	background: linear-gradient(328deg, #2fad66 0%, #9de686 100%);
}
.sellBtn {
	background: linear-gradient(315deg, #4048ef 0%, #5a7bef 100%);
}
.jybtn {
	width: 300upx;
	// color:var(--dd);
	border-radius: 60upx;
	padding: 20upx;
	text-align: center;
	display: inline-block;
	margin-right: 10upx;
	color: #fff;
}
</style>
