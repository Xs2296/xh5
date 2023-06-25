<template>
	<view id="box-page" class="d-flex flex-col">
		<view class="title-group">
			<view class="title" @click="changNav('exchange-operation')" :class="navName == 'exchange-operation' && 'active'">{{ $t('exchange.a0') }}</view>
			<view class="title" @click="changNav('contract')" :class="navName == 'contract' && 'active'">{{ $t('exchange.a2') }}</view>
			<view class="title" @click="changNav('contract-m')" :class="navName == 'contract-m' && 'active'">{{ $t('expand.秒合约') }}</view>
		</view>
		<view class="box-c-head">
			<view class="fn-20 color-light m-l-xs" @click.stop="symbolListShow = true">
				<i class="iconfont color-theme-1">&#xe655;</i>
				{{ symbol }}
			</view>
			<view class="fn-lg d-flex color-theme-1">
				<view class="m-r-xs" @click="option">
					<van-icon v-if="isCoolect" name="star" />
					<van-icon v-else class="color-light" name="star-o" />
				</view>
				<v-link v-if="symbol" tag="div" class="m-r-sm" :to="{ path: '/pages/exchange/contract_m_k', query: { code: symbol, contract: 1 } }">
					<van-icon name="chart-trending-o" />
				</v-link>
			</view>
		</view>
		<view class="box-c-cont-1">
			<view class="num" :class="activeCoin.increase < 0 ? 'color-sell' : 'color-buy'">{{ numFormat(activeCoin.price) }}</view>
			<!-- <view>≈ €20,339.07</view> -->
		</view>
		<view class="time-group">
			<text class="time" :class="timeActive == i && 'active'" @click="changeTime(i)" v-for="(item, i) in timeList" :key="i">{{ item }}</text>
		</view>
		<!-- 折线图 -->
		<view class="box-echarts"><view id="echart"></view></view>
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
		<!-- 购买数量 -->
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
				<!-- <view v-for="(item, i) in timeList2" :key="i" class="box-time-profit" :class="timeProfitActive == i && 'active'" @click="changeTimeProfit(i)"> -->
				<!-- <view class="time-txt">{{ item.time }}s</view> -->
				<!-- <view class="profit-txt">{{ `[${$t('expand.盈利')}${item.profit}%]` }}</view> -->
				<!-- </view> -->

				<view v-for="(item, i) in detail.pricelist" :key="i" class="box-time-profit" :class="timeProfitActive == i && 'active'" @click="changeTimeProfit(i)">
					<view class="time-txt">{{ item.second_time }}s</view>
					<view class="profit-txt">{{ `[${$t('expand.盈利')}${item.second_rate}%]` }}</view>
				</view>
			</view>
		</view>
		<view class="box-c-cont d-flex">
			<!-- 买涨 -->
			<button class="box-btn parent green-bg text-white" @click="buyEv(0)">
				<span>{{ $t('exchange.b5') + $t('option.b8') }}</span>
				<div class="triangle-bottomright"></div>
			</button>
			<!-- 买跌 -->
			<button class="box-btn parent red-bg text-white" @click="buyEv(1)">
				<span>{{ $t('exchange.b5') + $t('option.c0') }}</span>
				<div class="triangle-topleft"></div>
			</button>
		</view>
		<view class="box-c-cont" style="margin-bottom: calc(60em * 0.0625); position: relative;">
			<view class="ref-icon"><van-icon name="replay" /></view>
			<van-tabs :active="tabs_active" class="box-tabs" @change="tabsActiveEv">
				<van-tab :title="$t('contract.a1')">
					<!-- 持仓 -->
					<view class="box-tabs_content"><view></view></view>
				</van-tab>

				<van-tab :title="$t('expand.交易记录')">
					<!-- 交易记录 -->
					<view class="box-tabs_content">
						<view class="box-log-item" v-for="(item, i) in orderLog">
							<view class="box-item-info d-flex">
								<view class="title">
									<view>
										<span :class="item.ostatus == 0 ? 'text-red' : 'text-green'">
											{{ item.ostatus == 0 ? $t('exchange.b5') + $t('option.c0') : $t('exchange.b5') + $t('option.b8') + '&nbsp;' }}
										</span>
										<span style="font-weight: bold;">{{ item.ptitle + '&nbsp;' }}</span>
										<span>{{ $t('expand.合约时长') + '&nbsp;' }}</span>
										<span style="font-weight: bold;">{{ item.endprofit + 's' + '&nbsp;' }}</span>
										<span style="font-weight: bold;">{{ `[${$t('expand.盈利')}${item.endloss}%]` }}</span>
									</view>
								</view>
								<view class="value" style="font-weight: 400;">{{ item.status_prize == 4 ? $t('otc.c9') : '' }}</view>
							</view>
							<view class="box-item-info d-flex">
								<view class="title">买入价</view>
								<view class="value">{{ numFormat(item.buyprice) }} {{ item.ptitle.split('/')[1] }}</view>
							</view>
							<view class="box-item-info d-flex">
								<view class="title">结算价</view>
								<view class="value">{{ numFormat(item.sellprice) }} {{ item.ptitle.split('/')[1] }}</view>
							</view>
							<view class="box-item-info d-flex">
								<view class="title">交易额</view>
								<view class="value">{{ numFormat(item.fee) }} {{ item.ptitle.split('/')[1] }}</view>
							</view>
							<view class="box-item-info d-flex">
								<view class="title">盈亏</view>
								<view class="value text-green">{{ numFormat(item.ploss) }} {{ item.ptitle.split('/')[1] }}</view>
							</view>
							<view class="box-item-info d-flex">
								<view class="title">开仓时间:{{ item.created_at }}</view>
							</view>
						</view>
					</view>
				</van-tab>
			</van-tabs>
			<view
				v-if="wushujuShowEv()"
				class="d-flex flex-col align-center"
				style="padding: calc(40em * 0.0625); font-size: 12px; background-color: var(--listline); border-radius: 5px;"
			>
				<view><van-image width="3.375em" height="3.375em" :src="`../../static/img/icon_kongshuju_${theme == 'dark' ? '0' : '1'}.png`" /></view>
				<view style="line-height: 4;">{{ $t('common.notData') }}</view>
			</view>
		</view>

		<van-popup :show="buyShow" @close="buyShow = false" closeable round custom-style="width:70%;padding:15px;">
			<view class="box-popup">
				<label>{{ symbol }}</label>
				<view class="item-info">
					<view class="">{{ $t('expand.现价') }}</view>
					<view class="">{{ numFormat(21751.39) }}</view>
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
		<van-popup :show="symbolListShow" position="left" @close="symbolListShow = false" closeable custom-style="width:70%;height:100%;padding:15px;">
			<view class="box-popup-2">
				<label>{{ $t('expand.秒合约') + $t('base.d1') }}</label>
				<view class="item">
					<v-input class="box-inp-bg search-inp" v-model="searchTxt" :placeholder="$t('base.d9')">
						<template #right>
							<van-icon name="search" />
						</template>
					</v-input>
				</view>
				<view class="item">
					<van-tabs :active="tabs_active_2" class="box-tabs" @change="tabsActiveEv2">
						<van-tab :title="$t('base.c7')">
							<!-- 自选 -->
							<view class="box-tabs_content">
								<table class="w-max a">
									<thead>
										<tr class="fn-sm">
											<th class="p-l-md p-y-xs fn-left">{{ $t('exchange.f7') }}</th>
											<th class="fn-right">{{ $t('exchange.f8') }}</th>
											<th class="p-r-md p-y-xs fn-right">{{ $t('exchange.f9') }}</th>
										</tr>
									</thead>
									<tbody class="table-list">
										<tr class="link-active" v-for="item in collect" :key="item.pair_name" @click="checkSymbol(item)">
											<td class="p-l-md p-y-xs rounded-tl-xs rounded-bl-xs">
												<span class="color-light">{{ item.pair_name }}</span>
												<!-- <span class="fn-sm">/{{ item.symbolRight }}</span> -->
											</td>
											<td class="fn-right" :class="item.increase < 0 ? 'color-sell' : 'color-buy'">{{ item.lastPrice }}</td>
											<td :class="item.increase < 0 ? 'color-sell' : 'color-buy'" class="p-r-md p-y-xs fn-right rounded-tr-xs rounded-br-xs">
												{{ item.increaseStr }}
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</van-tab>
						<van-tab :title="$t('base.d4')">
							<!-- 全部 -->
							<view class="box-tabs_content">
								<table class="w-max a">
									<thead>
										<tr class="fn-sm">
											<th class="p-l-md p-y-xs fn-left">{{ $t('exchange.f7') }}</th>
											<th class="fn-right">{{ $t('exchange.f8') }}</th>
											<th class="p-r-md p-y-xs fn-right">{{ $t('exchange.f9') }}</th>
										</tr>
									</thead>
									<tbody class="table-list">
										<!-- <tr class="link-active" v-for="item in dataList.marketInfoList" :key="item.symbol" v-show="isShow(item.pair_name)" @click=""> -->
										<tr class="link-active" v-for="item in marketList[0].marketInfoList" :key="item.symbol" @click="checkSymbol(item)">
											<td class="p-l-md p-y-xs rounded-tl-xs rounded-bl-xs">
												<template v-if="marketList[0].isCollect">
													<span class="color-light">{{ item.pair_name }}</span>
												</template>
												<template v-else>
													<span class="color-light">{{ item.coin_name || item.symbol }}</span>
													<span class="fn-sm">/{{ marketList[0].coin_name }}</span>
												</template>
											</td>
											<td class="fn-right" :class="item.increase < 0 ? 'color-sell' : 'color-buy'">{{ item.price }}</td>
											<td :class="item.increase < 0 ? 'color-sell' : 'color-buy'" class="p-r-md p-y-xs fn-right rounded-tr-xs rounded-br-xs">{{ item.increaseStr }}</td>
										</tr>
									</tbody>
								</table>
							</view>
						</van-tab>
					</van-tabs>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
import Home from '@/api/home';
import { createChart } from 'lightweight-charts';
import Contract from '@/api/contract';
import Hangqing from '@/api/hangqing';
import lodash from 'lodash';
import ZmTable from '@/pages/components/zm_table';
import qs from 'qs';
import app from 'app.js';
export default {
	components: { ZmTable },
	data() {
		return {
			buyShow: false,
			theme: '',
			navName: 'contract-m',
			symbolListShow: false,
			timeActive: 0,
			activeTime: 0,
			timeList: [
				`1${this.$t('common.m')}`,
				`5${this.$t('common.m')}`,
				`15${this.$t('common.m')}`,
				`30${this.$t('common.m')}`,
				`1${this.$t('option.d9')}`,
				`1${this.$t('option.e0')}`
			],
			collect: [],
			query: {},
			chart: null,
			areaSeries: null,
			qiToujine: '200',
			timeProfitActive: 0,
			timeList2: [{ time: 300, profit: 5 }, { time: 600, profit: 10 }, { time: 1200, profit: 15 }, { time: 1500, profit: 29 }, { time: 1800, profit: 30 }],
			tabs_active: 0,
			tabs_active_2: 0,
			buyStat: 0,
			chicangLog: [],
			orderLog: [
				{
					ptitle: 'BTC/USDT',
					endprofit: '1200',
					endloss: 15,
					status_prize: 4,
					ostatus: 1,
					buyprice: 21664.13,
					sellprice: '21664.1301',
					fee: 150000,
					ploss: 22500,
					created_at: '2023-02-11 09:06:01'
				}
			],
			searchTxt: '',
			parentItem: {
				coin_name: 'USDT',
				isCollect: true,
				marketInfoList: [
					{
						pair_name: 'ZKS',
						coin_name: '',
						symbol: '1',
						price: 0.88,
						increase: 0.88,
						increaseStr: -0.34
					}
				]
			},
			marketList: {},
			detail: {},
			app
		};
	},
	props: {
		// query: {
		// 	default: () => {},
		// 	type: Object,
		// 	required: false
		// }
	},
	watch: {},
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
		symbol() {
			return this.query.symbol;
		},
		symbolLeft() {
			if (!this.symbol) return '';
			return this.symbol.split('/')[0];
		},
		symbolRight() {
			if (!this.symbol) return '';
			return this.symbol.split('/')[1];
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
			return list.find(item => item.pair_name == this.query.symbol);
		},
		// 是否为自选
		isCoolect() {
			return this.collect.map(item => item.pair_name).includes(this.symbol);
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
		iframeQuery() {
			// if (this.query.contract) {
			if (1) {
				return {
					getLinkUrl: this.app.baseUrl + '/api/app/contract/getKline',
					symbol: this.symbolLeft,
					theme: this.theme,
					ws: this.app.socketUrl1,
					interval: this.activeTime,
					resolutions: this.resolutions.map(item => item.value),
					contract: 1
				};
			} else {
				return {
					getLinkUrl: this.app.baseUrl + '/api/app/option/getKline',
					symbol: this.symbol,
					theme: this.theme,
					ws: this.app.socketUrl,
					interval: this.activeTime,
					resolutions: this.resolutions.map(item => item.value)
				};
			}
		}
	},
	created() {
		let _this = this;
		this.theme = uni.getStorageSync('theme');
		uni.$off('contract_m_theme');
		uni.$on('contract_m_theme', function() {
			_this.echartTheme();
		});
	},
	mounted() {
		this.getMarketList();
		this.getCollect();
		// this.initEchart();

		let _this = this;
		uni.$off('changeData-2');
		uni.$on('changeData-2', function(res) {
			_this.checkSymbol(res.obj);
		});
	},

	methods: {
		setQuery: qs.stringify,
		qtAllEv() {
			this.qiToujine = this.detail.user_usdt;
			this.$forceUpdate();
		},
		getDetail() {
			let par = {
				symbol: this.symbolLeft
			};
			Hangqing.getDetail(par).then(res => {
				this.detail = res.data;
			});
		},
		// 获取市场行情
		getMarketList() {
			let param = { type: 3 };
			Contract.getMarketList(param).then(res => {
				// 整理数据格式
				this.marketList = res.data.map(item => {
					item.marketInfoList.forEach(el => {
						el.coin_name = el.symbol;
					});
					return item;
				});
				// console.log('整理数据格式',this.marketList)
				if (!this.query.symbol) {
					let parentItem = this.marketList[0].marketInfoList[0];
					this.checkSymbol(parentItem);
				} else {
				}

				this.getDetail();
			});
		},
		numFormat(num) {
			if (num == undefined || num == null) return num;
			var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
			return c;
		},
		tabsActiveEv(val) {
			this.tabs_active = val.detail.index;
		},
		tabsActiveEv2(val) {
			this.tabs_active_2 = val.detail.index;
		},
		wushujuShowEv() {
			if (this.tabs_active == 0) {
				return this.chicangLog.length == 0;
			}
			if (this.tabs_active == 1) {
				return this.orderLog.length == 0;
			}
		},
		changNav(name) {
			// this.navName = name;
			uni.$emit('topNavTab', { name: name });
		},
		// 切换数据
		changeTime(i) {
			this.activeTime = this.timeActive = i;

			return;
			let timeListStr = ['1min', '5min', '15min', '30min', '60min', '1day'];

			let _data = [];

			// let dateStr = '2018-03-01';
			// for (var k = 0; k < 100; k++) {
			// 	var date = new Date(dateStr);
			// 	var dateTime = date.setDate(date.getDate() + 1);
			// 	var dateTime = new Date(dateTime);
			// 	var year = dateTime.getFullYear();
			// 	var month = dateTime.getMonth() + 1;
			// 	var day = dateTime.getDate();
			// 	dateStr = `${year}-${month}-${day}`;
			// 	data.push({ time: dateStr, value: Math.floor(Math.random() * 100 + 1) });
			// }
			// if (this.areaSeries) {
			// 	this.chart.removeSeries(this.areaSeries);
			// 	this.areaSeries = null;
			// }
			// this.areaSeries = this.chart.addAreaSeries();
			// this.areaSeries.setData(data);

			// this.chart.timeScale().fitContent();

			// this.echartTheme();
			// console.log(data)

			let dateNow = new Date();

			let param = {
				symbol: this.symbolLeft,
				period: timeListStr[i],
				form: 0,
				to: 0,
				size: 200
				// zip:1
			};
			/*
			1分钟 1天;5分钟 5天;15分钟 半个月;30分钟 1个月;1小时 两个月;1天 1年;1周 5年;1月 30年;
			*/
			param.to = Date.parse(dateNow);
			switch (i) {
				case 0:
					var dateTime = dateNow.setDate(dateNow.getDate() - 1);
					param.form = Date.parse(new Date(dateTime));
					break;
				case 1:
					var dateTime = dateNow.setDate(dateNow.getDate() - 5);
					param.form = Date.parse(new Date(dateTime));
					break;
				case 2:
					var dateTime = dateNow.setDate(dateNow.getDate() - 15);
					param.form = Date.parse(new Date(dateTime));
					break;
				case 3:
					var dateTime = dateNow.setDate(dateNow.getDate() - 30);
					param.form = Date.parse(new Date(dateTime));
					break;
				case 4:
					var dateTime = dateTime.setDate(dateNow.getDate() - 60);
					param.form = Date.parse(new Date(dateTime));
					break;
				case 5:
					var dateTime = dateTime.setDate(dateNow.getDate() - 365);
					param.form = Date.parse(new Date(dateTime));
					break;
			}
			Contract.getKline(param).then(res => {
				res.data.data.map(item => {
					_data.push({ time: parseInt(item.id), value: item.close });
				});

				if (this.areaSeries) {
					this.chart.removeSeries(this.areaSeries);
					this.areaSeries = null;
				}
				this.areaSeries = this.chart.addAreaSeries();
				this.areaSeries.setData(_data);

				this.chart.timeScale().fitContent();

				this.echartTheme();
			});
		},

		changeTimeProfit(i) {
			this.timeProfitActive = i;
			this.qiToujine = this.detail.pricelist[i].second_minprice
			this.$forceUpdate();
		},
		buyEv(t) {
			this.buyStat = t;
			this.buyShow = true;
		},
		buyEvSub() {
			this.buyShow = false;
		},
		checkSymbol(obj) {
			this.symbolListShow = false;
			if (obj.pair_name != this.query.symbol) this.query = { symbol: obj.pair_name };
			this.changeTime(0);
		},
		// 链接socket
		linkSocket(symbol) {
			this.unSymbol = symbol;
			// 订阅买线
			this.ws.send({
				cmd: 'sub',
				msg: `swapBuyList_${symbol}`
			});
			// 订阅卖线
			this.ws.send({
				cmd: 'sub',
				msg: `swapSellList_${symbol}`
			});
			// 订阅成交
			this.ws.send({
				cmd: 'sub',
				msg: `swapTradeList_${symbol}`
			});
		},
		// 取消订阅
		unLink(symbol) {
			// 取消买线
			this.ws.send({
				cmd: 'unsub',
				msg: `swapBuyList_${symbol}`
			});
			// 取消卖线
			this.ws.send({
				cmd: 'unsub',
				msg: `swapSellList_${symbol}`
			});
			// 取消成交
			this.ws.send({
				cmd: 'unsub',
				msg: `swapTradeList_${symbol}`
			});
		},
		socketMessage() {
			// 节流防抖
			let buyFun = lodash.throttle(data => {
				this.buyList = data;
			}, 500);
			let sellFun = lodash.throttle(data => {
				this.sellList = data.sort((a, b) => b.price - a.price);
			}, 500);
			this.ws.on('message', res => {
				if (!this.isShow) return;
				let symbol = this.symbolLeft;
				let { data, sub } = res;
				switch (sub) {
					case `swapBuyList_${symbol}`:
						buyFun(data);
						break;
					case `swapSellList_${symbol}`:
						sellFun(data);
						break;
					case `swapTradeList_${symbol}`:
						this.tradeList.unshift(data);
						this.tradeList.pop();
						this.newPrice = data;
						break;
				}
			});
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

		// 添加自选
		option() {
			let data = {
				pair_name: this.symbol,
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
		// 主题
		echartTheme() {
			var darkTheme = {
				chart: {
					layout: {
						backgroundColor: '#000',
						lineColor: '#000',
						textColor: '#D9D9D9'
					},
					watermark: {
						color: 'rgba(0, 0, 0, 0)'
					},
					crosshair: {
						color: '#758696'
					},
					grid: {
						vertLines: {
							color: '#2B2B43'
						},
						horzLines: {
							color: '#363C4E'
						}
					},
					timezone: 'Europe/Paris',
					timeScale: {
						timeVisible: true,
						secondsVisible: true
					},
					localization: {
						locale: 'it'
					}
				},
				series: {
					topColor: 'rgba(255,82,82, 0.56)',
					bottomColor: 'rgba(255,82,82, 0.04)',
					lineColor: 'rgba(255,82,82, 1)'
				}
			};

			const lightTheme = {
				chart: {
					layout: {
						backgroundColor: '#FFFFFF',
						lineColor: '#2B2B43',
						textColor: '#191919'
					},
					watermark: {
						color: 'rgba(0, 0, 0, 0)'
					},
					grid: {
						vertLines: {
							visible: false
						},
						horzLines: {
							color: '#f0f3fa'
						}
					},
					timezone: 'Europe/Paris',
					timeScale: {
						timeVisible: true,
						secondsVisible: true
					},
					localization: {
						locale: 'it'
					}
				},
				series: {
					topColor: 'rgba(33, 150, 243, 0.56)',
					bottomColor: 'rgba(33, 150, 243, 0.04)',
					lineColor: 'rgba(33, 150, 243, 1)'
				}
			};

			var themesData = {
				dark: darkTheme,
				light: lightTheme
			};

			this.chart && this.chart.applyOptions(themesData[this.theme].chart);
			this.areaSeries && this.areaSeries.applyOptions(themesData[this.theme].series);
		},
		initEchart() {
			const chartOptions = {
				width: 345,
				height: 300,
				rightPriceScale: {
					scaleMargins: {
						top: 0.2,
						bottom: 0.2
					},
					borderVisible: false
				},
				timeScale: {
					borderVisible: false
				}
			};
			const container = document.querySelector('#echart');
			this.chart = createChart(container, chartOptions);
			this.areaSeries = this.chart.addAreaSeries();

			// this.areaSeries.setData(data);
			// 加载数据
			// this.changeTime(0);
			// this.chart.timeScale().fitContent();
			// 加载主题
			// this.echartTheme();

			function businessDayToString(businessDay) {
				return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
			}

			var toolTipWidth = 80;
			var toolTipHeight = 80;
			var toolTipMargin = 15;

			var toolTip = document.createElement('div');
			toolTip.className = 'floating-tooltip-2';
			container.appendChild(toolTip);

			// update tooltip
			this.chart.subscribeCrosshairMove(function(param) {
				// chart.subscribeClick(function(param) {

				if (
					param.point === undefined ||
					!param.time ||
					param.point.x < 0 ||
					param.point.x > container.clientWidth ||
					param.point.y < 0 ||
					param.point.y > container.clientHeight
				) {
					toolTip.style.display = 'none';
				} else {
					const dateStr = businessDayToString(param.time);
					toolTip.style.display = 'block';
					var price = param.seriesPrices.get(this.areaSeries);
					toolTip.innerHTML =
						'<div style="color: #009688">Apple Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: #21384d">' +
						Math.round(100 * price) / 100 +
						'</div><div style="color: #21384d">' +
						dateStr +
						'</div>';
					var coordinate = this.areaSeries.priceToCoordinate(price);
					var shiftedCoordinate = param.point.x - 50;
					if (coordinate === null) {
						return;
					}
					shiftedCoordinate = Math.max(0, Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate));
					var coordinateY =
						coordinate - toolTipHeight - toolTipMargin > 0
							? coordinate - toolTipHeight - toolTipMargin
							: Math.max(0, Math.min(container.clientHeight - toolTipHeight - toolTipMargin, coordinate + toolTipMargin));
					toolTip.style.left = shiftedCoordinate + 'px';
					toolTip.style.top = coordinateY + 'px';
				}
			});
		}
	},
	onUnload() {},
	onLoad(query) {},
	destroyed() {}
};
</script>

<style scoped lang="scss">
#box-page {
	// border:1px solid red;
	padding: 0 calc(15em * 0.0625) calc(15em * 0.0625);
	font-size: 16px;
}
.title-group {
	width: 100%;
	margin-top: calc(20em * 0.0625);
	margin-bottom: calc(10em * 0.0625);
	font-size: calc(14em * 0.0625);
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: flex-end;
	.title {
		color: #888 !important;
		font-weight: bold !important;
	}
	.active {
		color: var(--light) !important;
		font-size: calc(18em * 0.0625);
	}
}
.box-c-head {
	line-height: 2;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.box-c-cont {
	padding: calc(10em * 0.0625) 0 0;
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
	width: calc(169em * 0.0625);
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
.triangle-bottomright {
	width: 0;
	height: 0;
	position: absolute;
	right: 0;
	top: 0;
	border-bottom: calc(34em * 0.0625) solid;
	border-bottom-color: var(--bg-bottom, #242230);
	border-left: calc(10em * 0.0625) solid transparent !important;
}
.triangle-topleft {
	width: 0;
	height: 0;
	position: absolute;
	left: 0;
	top: 0;
	border-top: calc(34em * 0.0625) solid;
	border-top-color: var(--bg-bottom, #242230);
	border-right: calc(10em * 0.0625) solid transparent !important;
}

.box-c-cont-1 {
	display: flex;
	align-items: flex-end;
	font-size: calc(14em * 0.0625);
	line-height: 1;
	margin-top: calc(10em * 0.0625);
	.num {
		font-size: calc(30em * 0.0625);
		font-weight: 600;
	}
}
.time-group {
	font-size: calc(12em * 0.0625);
	margin-top: calc(20em * 0.0625);
	.time {
		margin-right: calc(16em * 0.0625);
	}
	.time.active {
		color: #1987ed !important;
		padding-bottom: calc(2px);
		border-bottom: 3px solid #1987ed;
	}
}
.text-green {
	color: #3ead5d !important;
}
.text-red {
	color: #da5252 !important;
}
.box-echarts {
	margin-top: calc(20em * 0.0625);
	::v-deep {
		.floating-tooltip-2 {
			width: 96px;
			height: 80px;
			position: absolute;
			display: none;
			padding: 8px;
			box-sizing: border-box;
			font-size: 12px;
			color: #131722;
			background-color: rgba(255, 255, 255, 1);
			text-align: left;
			z-index: 1000;
			top: 12px;
			left: 12px;
			pointer-events: none;
			border: 1px solid rgba(0, 150, 136, 1);
			border-radius: 2px;
		}
	}
}

.box-tabs {
	width: 100%;
	::v-deep {
		.vant-sticky-index {
			display: block;
			width: 50% !important;
		}
		.van-hairline--top-bottom::after {
			border: none !important;
		}
		.van-ellipsis {
			font-size: calc(12em * 0.0625);
		}
		.van-tab--active .van-ellipsis {
			font-size: calc(14em * 0.0625);
			color: #3771e2;
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
	.box-tabs_content {
		margin-top: calc(10em * 0.0625);
	}
}
.ref-icon {
	position: absolute;
	right: 0;
	top: calc(54em * 0.0625 / 2);
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
.box-popup-2 {
	margin-top: calc(20em * 0.0625);
	uni-label {
		display: block;
		width: 100%;
		text-align: center;
		font-weight: bold;
		color: var(--light);
	}
	.item {
		width: 100%;
		margin-top: calc(10em * 0.0625);
	}
	.search-inp {
		::v-deep {
			.van-cell--center {
				height: calc(30em * 0.0625) !important;
				border-radius: calc(30em * 0.0625);
			}
			.uni-input-placeholder {
				font-size: calc(14em * 0.0625);
			}
			.uni-input-input {
				font-size: calc(14em * 0.0625);
			}
		}
	}
	.box-tabs_content {
		font-size: calc(12em * 0.0625) !important;
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

.table-list {
	tr:nth-of-type(2n-1) {
		td {
			background: $panel-3;
		}
	}
}
</style>
