<template>
	<view id="box-page" class="d-flex flex-col">
		<view class="title-group">
			<!-- <view class="title" @click="changNav('exchange-operation')"
				:class="navName == 'exchange-operation' && 'active'">{{ $t('exchange.a0') }}</view>
			<view class="title" @click="changNav('contract')" :class="navName == 'contract' && 'active'">
				{{ $t('exchange.a2') }}
			</view> -->
			<view class="title" @click="changNav('miao')" :class="navName == 'miao' && 'active'">{{ $t('base.a4') }}
			</view>
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
				<v-link v-if="symbol" tag="div" class="m-r-sm"
					:to="{ path: '/pages/exchange/contract_m_k', query: { code: symbol, contract: 1 } }">
					<van-icon name="chart-trending-o" />
				</v-link>
			</view>
		</view>
		<view class="box-c-cont-1">
			<view v-if="activeCoin != undefined" class="num"
				:class="activeCoin.increase < 0 ? 'color-sell' : 'color-buy'">{{ numFormat(activeCoin.price) }}</view>
			<!-- <view>≈ €20,339.07</view> -->
		</view>
		<view class="time-group">
			<text class="time" :class="timeActive == i && 'active'" @click="changeTime(i)" v-for="(item, i) in timeList"
				:key="i">{{ item }}</text>
		</view>
		<!-- 折线图 -->
		<!-- <view class="box-echarts"><view id="echart"></view></view> -->
		<view class="chart-box"><iframe class="chart-tradingview"
				:src="`${mobileBase}static/tradingview.html?${setQuery(iframeQuery)}`" frameborder="0"></iframe></view>

		<view class="button">
			<radio-group class="uni-list align" @change="radioChange">
				<label class="label">
					<view>
						<radio :id="radioList[0].id" :value="radioList[0].id" :checked="true" @click="at_time = 1" />
					</view>
					<label class="label-2-text">
						<view>{{ radioList[0].value }}</view>
					</label>
				</label>
				<!-- {{this.isTimeShow}} -->
				<!-- 时间 -->
				<view class="time mainTime">
					<view v-if="current == 2">
						<view>{{ $t('option.e7') }}</view>
						<!-- {{this.time}} -->
						<uni-datetime-picker :end="maxDate" :start="minDate" @confirm="confirm2" ref="datetimePicker"
							type="datetime" v-model="time" :clear-icon="false" :border="false" hide-second='true' />
					</view>
				</view>
				<label class="label">
					<view>
						<radio :value="radioList[1].id" :id="radioList[1].id" :checked="false" @click="at_time = 2" />
					</view>
					<label class="label-2-text">
						<view>{{ radioList[1].value }}</view>
					</label>
				</label>
			</radio-group>
		</view>
		<view class="box-c-cont">
			<view class="label d-flex justify-between align-center">
				<view>{{ $t('expand.秒合约账户可用余额') }}</view>
				<view class="d-flex align-center" style="color: var(--light);">
					<van-icon name="replay" size="1em" style="margin-right: calc(4em * .07);" @click="getDetail" />
					{{ detail.user_usdt ? detail.user_usdt : 0 }}&nbsp;{{ symbolRight }}
					<v-link to="/pages/transfer/index">
						<van-icon name="../../static/img/icon_huazhuan.png" size="1.4em"
							style="margin-left: calc(8em * .07);" />
					</v-link>
				</view>
			</view>
		</view>
		<!-- 购买数量 -->
		<view class="box-c-cont">
			<!--  -->

			<v-input class="box-inp-bg" v-model="qiToujine" type="number"
				:placeholder="$t('expand.起投金额') + (detail.pricelist.length ? detail.pricelist[timeProfitActive].second_minprice : '')">
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

				<view v-for="(item, i) in detail.pricelist" :key="i" class="box-time-profit"
					:class="timeProfitActive == i && 'active'" @click="changeTimeProfit(i)">
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
			<view class="ref-icon" @click="getOrderLog">
				<van-icon name="replay" />
			</view>

			<!-- 切换 -->
			<van-tabs :active="tabs_active" class="box-tabs records" @change="tabsActiveEv">
				<van-tab :title="$t('contract.a1')">
					<!-- 持仓 -->
				</van-tab>
				<van-tab :title="$t('expand.交易记录')">
					<!-- 交易记录 -->
				</van-tab>
				<van-tab :title="$t('expand.预约记录')">
					<!-- 交易记录 -->
				</van-tab>
			</van-tabs>

			<view class="box-table" v-if="tabs_active == 1 || tabs_active == 0">
				<view class="box-log-item" v-for="(item, i) in orderLog" :key="i">
					<!-- {{item}} -->
					<view class="box-item-info d-flex">
						<view class="title">
							<view>
								<span :class="item.otype == 2 ? 'text-red' : 'text-green'">
									{{ item.otype == 2 ? $t('exchange.b5') + $t('option.c0') : $t('exchange.b5') + $t('option.b8') + '&nbsp;' }}
								</span>
								<span style="font-weight: bold;">{{ '&nbsp;' + item.symbol + '&nbsp;' }}</span>
								<span>{{ $t('expand.合约时长') + '&nbsp;' }}</span>
								<span style="font-weight: bold;">{{ item.second + 's' + '&nbsp;' }}</span>
								<span style="font-weight: bold;">{{ `[${$t('expand.盈利')}${item.rate}%]` }}</span>
							</view>
						</view>
						<view class="value" style="font-weight: 400;">
							{{ item.status == 1 ? $t('expand.进行中') : $t('otc.c9') }}
						</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title" v-if="tabs_active == 1 || tabs_active == 0">{{ $t('expand.买入价') }}</view>
						<view class="title" v-if="tabs_active == 2">{{ $t('expand.预约时间') }}</view>
						<view class="value" v-if="tabs_active == 1 || tabs_active == 0">
							{{ numFormat(parseFloat(item.buy_price).toFixed(2)) }} {{ symbolRight }}
						</view>
						<view class="value" v-if="tabs_active == 2">{{ item.din_time }}</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 1">
						<view class="title">{{ $t('expand.结算价') }}</view>
						<view class="value">{{ numFormat(parseFloat(item.sell_price).toFixed(2)) }} {{ symbolRight }}
						</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title" v-if="tabs_active == 1 || tabs_active == 0">{{ $t('expand.交易额') }}</view>
						<view class="title" v-if="tabs_active == 2">{{ $t('expand.购买时间') }}</view>
						<view class="value" v-if="tabs_active == 1 || tabs_active == 0">
							{{ numFormat(parseFloat(item.buy_num).toFixed(2)) }} {{ symbolRight }}
						</view>
						<view class="value" v-if="tabs_active == 2">{{ item.buy_time }}</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title" v-if="tabs_active == 2">{{ $t('assets.d0') }}</view>
						<view class="value" v-if="tabs_active == 2">
							{{ item.status == 1 ? $t('expand.定时中') : item.status == 2 ? $t('otc.c9') : $t('expand.已取消') }}
						</view>
					</view>
					<view class="box-item-info d-flex" v-if="item.status == 1">
						<view class="title" v-if="tabs_active == 2">{{ $t('exchange.g3') }}</view>
						<view class="value" v-if="tabs_active == 2">{{ $t('otc.d3') }}</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 0">
						<view class="title">{{ $t('expand.结束时间') }}</view>
						<view class="value">{{ item.time + '&nbsp;s' }}</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 1">
						<view class="title">{{ $t('expand.盈亏') }}</view>
						<view class="value" :class="item.order_result == 2 ? 'text-red' : 'text-green'">
							{{ item.order_result == 2 ? '-' : '' }}{{ numFormat(parseFloat(item.profits).toFixed(2)) }}
							{{ symbolRight }}
						</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 1 || tabs_active == 0">
						<view class="title">{{ $t('expand.开仓时间') }}:{{ item.created_at }}</view>
					</view>
				</view>
			</view>
			<view class="box-table" v-if="tabs_active == 2">
				<view class="box-log-item" v-for="(item, i) in holdDingshiOrderList" :key="i">
					<view class="box-item-info d-flex">
						<view class="title">
							<view>
								<span :class="item.otype == 2 ? 'text-red' : 'text-green'">
									{{ item.otype == 2 ? $t('exchange.b5') + $t('option.c0') : $t('exchange.b5') + $t('option.b8') + '&nbsp;' }}
								</span>
								<span style="font-weight: bold;">{{ '&nbsp;' + item.symbol + '&nbsp;' }}</span>
								<span>{{ $t('expand.合约时长') + '&nbsp;' }}</span>
								<span style="font-weight: bold;">{{ item.second + 's' + '&nbsp;' }}</span>
							</view>
						</view>
						<view class="value" style="font-weight: 400;">
							{{ item.status == 1 ? $t('expand.进行中') : $t('otc.c9') }}
						</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title" v-if="tabs_active == 1 || tabs_active == 0">{{ $t('expand.买入价') }}</view>
						<view class="title" v-if="tabs_active == 2">{{ $t('expand.预约时间') }}</view>
						<view class="value" v-if="tabs_active == 1 || tabs_active == 0">
							{{ numFormat(parseFloat(item.buy_price).toFixed(2)) }} {{ symbolRight }}
						</view>
						<view class="value" v-if="tabs_active == 2">{{ (item.din_time / 1000) | parseTime }}</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 1">
						<view class="title">{{ $t('expand.结算价') }}</view>
						<view class="value">{{ numFormat(parseFloat(item.sell_price).toFixed(2)) }} {{ symbolRight }}
						</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title" v-if="tabs_active == 2">{{ $t('expand.购买时间') }}</view>
						<view class="value" v-if="tabs_active == 2">{{ item.buy_time | parseTime }}</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title">{{ $t('expand.交易额') }}</view>
						<view class="value">{{ numFormat(parseFloat(item.buy_num).toFixed(2)) }} {{ symbolRight }}
						</view>
					</view>
					<view class="box-item-info d-flex">
						<view class="title" v-if="tabs_active == 2">{{ $t('assets.d0') }}</view>
						<view class="value" v-if="tabs_active == 2">
							{{ item.status == 1 ? $t('expand.定时中') : item.status == 2 ? $t('otc.c9') : $t('expand.已取消') }}
						</view>
					</view>
					<view class="box-item-info d-flex" v-if="item.status == 1">
						<view class="title" v-if="tabs_active == 2">{{ $t('exchange.g3') }}</view>
						<view class="value"
							style=" padding: 0 20rpx; height: 50rpx; line-height: 50rpx; border-radius: 10rpx; border:2rpx solid #3771e2;"
							v-if="tabs_active == 2" @click="dingshiCancel(item.id)">
							{{ $t('otc.d3') }}
						</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 0">
						<view class="title">{{ $t('expand.结束时间') }}</view>
						<view class="value">{{ item.time + '&nbsp;s' }}</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 1">
						<view class="title">{{ $t('expand.盈亏') }}</view>
						<view class="value" :class="item.order_result == 2 ? 'text-red' : 'text-green'">
							{{ item.order_result == 2 ? '-' : '' }}{{ numFormat(parseFloat(item.profits).toFixed(2)) }}
							{{ symbolRight }}
						</view>
					</view>
					<view class="box-item-info d-flex" v-if="tabs_active == 1 || tabs_active == 0">
						<view class="title">{{ $t('expand.开仓时间') }}:{{ item.created_at }}</view>
					</view>
				</view>
			</view>

			<view v-if="wushujuShowEv" class="d-flex flex-col align-center"
				style="padding: calc(40em * 0.0625); font-size: 12px; background-color: var(--listline); border-radius: 5px;">
				<view>
					<image style="width:3.375em; height:3.375em;"
						:src="`../../static/img/icon_kongshuju_${theme == 'dark' ? '0' : '1'}.png`" />
				</view>
				<view style="line-height: 4;">{{ $t('common.notData') }}</view>
			</view>
		</view>

		<van-popup :show="buyShow" @close="buyShow = false" closeable round custom-style="width:70%;padding:15px;">
			<view class="box-popup">
				<label>{{ symbol }}</label>
				<view class="item-info">
					<view class="">{{ $t('expand.现价') }}</view>
					<view class="">{{ numFormat(activeCoin.price) }}</view>
				</view>
				<view class="item-info">
					<view class="">{{ $t('exchange.d5') }}</view>
					<view :class="buyStat == 0 ? 'text-green' : 'text-red'">
						{{ buyStat == 0 ? $t('exchange.b5') + $t('option.b8') : $t('exchange.b5') + $t('option.c0') }}
					</view>
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
		<van-popup :show="symbolListShow" position="left" @close="symbolListShow = false" closeable
			custom-style="width:70%;height:100%;padding:15px;">
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
										<tr class="link-active" v-for="(item, i) in collect" :key="i"
											@click="checkSymbol(item)">
											<td class="p-l-md p-y-xs rounded-tl-xs rounded-bl-xs">
												<span class="color-light">{{ item.pair_name }}</span>
												<!-- <span class="fn-sm">/{{ item.symbolRight }}</span> -->
											</td>
											<td class="fn-right"
												:class="item.increase < 0 ? 'color-sell' : 'color-buy'">
												{{ item.lastPrice }}
											</td>
											<td :class="item.increase < 0 ? 'color-sell' : 'color-buy'"
												class="p-r-md p-y-xs fn-right rounded-tr-xs rounded-br-xs">
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
										<tr class="link-active" v-for="(item, i) in marketList[0].marketInfoList"
											:key="i" @click="checkSymbol(item)">
											<td class="p-l-md p-y-xs rounded-tl-xs rounded-bl-xs">
												<template v-if="marketList[0].isCollect">
													<span class="color-light">{{ item.pair_name }}</span>
												</template>
												<template v-else>
													<span class="color-light">{{ item.coin_name || item.symbol }}</span>
													<span class="fn-sm">/{{ marketList[0].coin_name }}</span>
												</template>
											</td>
											<td class="fn-right"
												:class="item.increase < 0 ? 'color-sell' : 'color-buy'">{{ item.price }}
											</td>
											<td :class="item.increase < 0 ? 'color-sell' : 'color-buy'"
												class="p-r-md p-y-xs fn-right rounded-tr-xs rounded-br-xs">
												{{ item.increaseStr }}
											</td>
										</tr>
									</tbody>
								</table>
							</view>
						</van-tab>
					</van-tabs>
				</view>
			</view>
		</van-popup>
		<!-- 弹出层 -->
		<view class="datetime" v-if="isTimeShow == true">
			<van-datetime-picker :value="currentDate" @change="change" type="datetime" :min-date="minDate"
				:max-date="maxDate" @cancel="cancel" @confirm="confirm" />
		</view>
	</view>
</template>

<script>
	import Home from '@/api/home';
	import {
		createChart
	} from 'lightweight-charts';
	import moment from 'moment';
	import Contract from '@/api/contract';
	import Market from '@/api/market';
	import Hangqing from '@/api/hangqing';
	import lodash from 'lodash';
	import ZmTable from '@/pages/components/zm_table';
	import qs from 'qs';
	import app from 'app.js';
	import formData from '@/utils/class/date';
	import {
		mapState
	} from 'vuex';
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
			ZmTable
		},
		data() {
			return {
				holdDingshiOrderList: [],
				timeTitle: this.$t('option.e7'),
				at_time: 1,
				isTimeShow: false,
				minDate: moment()
					.add(1, 'minute')
					.format('YYYY/MM/DD HH:mm') + ':00',
				maxDate: moment()
					.add(2, 'days')
					.format('YYYY/MM/DD ') + '23:59:59',
				currentDate: '',
				// radioss: '1',
				radioList: [{
						id: '1',
						value: this.$t('option.e5'),
						checked: true
					},
					{
						id: '2',
						value: this.$t('option.e6'),
						checked: false
					}
				],
				buyShow: false,
				current: '1',
				r_index: 0,
				time: moment()
					.add(1, 'minute')
					.format('YYYY/MM/DD HH:mm') + ':00',
				navName: 'miao',
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
				timeList2: [{
						time: 300,
						profit: 5
					},
					{
						time: 600,
						profit: 10
					},
					{
						time: 1200,
						profit: 15
					},
					{
						time: 1500,
						profit: 29
					},
					{
						time: 1800,
						profit: 30
					}
				],
				tabs_active: 0,
				tabs_active_2: 0,
				buyStat: 0,
				chicangLog: [],
				orderLog: [],
				searchTxt: '',
				parentItem: {
					coin_name: 'USDT',
					isCollect: true,
					marketInfoList: []
				},
				marketList: [{
					coin_name: 'USDT',
					isCollect: true,
					marketInfoList: []
				}],
				detail: {
					pricelist: []
				},
				app,
				isShow: true,
				buyList: [],
				sellList: [],
				tradeList: [{
					buyPrice: 7.98989,
					sellPrice: 0.87878
				}],
				timeInterval: [],
				contact: {},
				service: []
			};
		},
		props: {
			// query: {
			// 	default: () => {},
			// 	type: Object,
			// 	required: false
			// }
		},
		watch: {
			currentDate: {
				handler(val) {
					console.log(val);
				}
			},
			time: {
				handler(val) {
					this.time = val.replace(/-/g, '/');
					// console.log('this.time', val);
				}
			}
		},
		computed: {
			resolutions() {
				let arr = [{
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
				if (!this.marketList.length)
					return {
						increase: 0,
						price: 0
					};
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
				return this.collect.length ? this.collect.map(item => item.pair_name).includes(this.symbol) : false;
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
			...mapState({
				socket: 'ws',
				socket1: 'ws1',
				theme: 'theme',
				logoMap: 'logoMap'
			}),
			ajax() {
				return 1 ? contractExchangeMap : ajaxExchangeMap;
			},
			ws() {
				return 1 ? this.socket1 : this.socket;
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
			},
			wushujuShowEv() {
				return this.orderLog.length == 0;
			}
		},
		created() {
			let _this = this;

			uni.$off('contract_m_theme');
			uni.$on('contract_m_theme', function() {
				// _this.echartTheme();
			});

			var myDate = new Date();
			// var myDate = new Date(date.replace(/-/g, '/'));
			myDate.getYear(); //获取当前年份(2位)
			myDate.getFullYear(); //获取完整的年份(4位,1970-????)
			myDate.getMonth(); //获取当前月份(0-11,0代表1月) 所以获取当前月份是 myDate.getMonth()+1;
			myDate.getDate(); //获取当前日(1-31)
			myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
			myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
			myDate.getHours(); //获取当前小时数(0-23)
			myDate.getMinutes(); //获取当前分钟数(0-59)
			this.time = myDate.getFullYear() + '/' + (myDate.getMonth() * 1 + 1) + '/' + myDate.getDate() + ' ' + myDate
				.getHours() + ':' + myDate.getMinutes();
		},
		mounted() {
			// let _this = this;
			// this.getMarketList(function() {
			// 	_this.isShow = true;
			// 	_this.socketMessage();
			// });

			// this.getCollect();
			// this.getOrderLog(1);

			// uni.$off('changeData-2');
			// uni.$on('changeData-2', function(res) {
			// 	_this.checkSymbol(res.obj);
			// });
		},
		filters: {
			parseTime(val) {
				return formData.parseTime(val);
			}
		},

		methods: {
			setQuery: qs.stringify,
			change(e) {
				console.log(e.detail.getValues(), 222);
				// this.time= e.detail.getValues().join('-')
				this.time = e.detail.getValues()[0] + '/' + e.detail.getValues()[1] + '/' + e.detail.getValues()[2] + ' ' +
					e.detail.getValues()[3] + ':' + e.detail.getValues()[4];
			},
			cancel() {
				// 取消
				// console.log('取消');
				// this.current = 1
				this.r_index = 0;
				this.isTimeShow = false;
			},
			confirm(item) {
				console.log(item);

				// this.current = 1;
				this.r_index = 0;
				this.isTimeShow = false;
				this.current == 2;
			},
			confirm2(item) {
				console.log(item);
			},
			radioChange(event) {
				// 单双选
				console.log(event);
				console.log(event.detail.value);
				this.current = event.detail.value;
				console.log(this.current);
				this.r_index = event.detail.value == 2 ? 1 : 2;
				if (this.current == 2) {
					this.time =
						moment()
						.add(1, 'minute')
						.format('YYYY/MM/DD HH:mm') + ':00';
					console.log(this.time);
					this.$nextTick(() => {
						this.$refs.datetimePicker.show();
					});

					// this.isTimeShow = true
				}
			},
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
					this.qiToujine = this.detail.pricelist.length ? this.detail.pricelist[0].second_minprice : 0;
					this.timeProfitActive = 0;
					this.$forceUpdate();
				});
			},
			// 获取预约记录
			dingshiOrderList() {
				Contract.dingshiOrderList()
					.then(res => {
						this.holdDingshiOrderList = res.data.data || [];
					})
					.catch(() => {});
			},
			// 取消订单
			dingshiCancel(id) {
				Contract.dingshiCancel({
						id: id
					})
					.then(res => {
						this.$toast.success(this.$t('base.c9'));
						this.dingshiOrderList();
					})
					.catch(() => {});
			},
			// 获取市场行情
			getMarketList(func) {
				let param = {
					type: 3
				};
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
					} else {}

					this.getDetail();
					func && func();
				});
			},
			numFormat(num) {
				if (num == undefined || num == null) return num;
				var c = num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(
					/(\d)(?=(?:\d{3})+$)/g, '$1,');
				return c;
			},
			tabsActiveEv(val) {
				// console.log(val);
				this.tabs_active = val.detail.index;

				// console.log(this.tabs_active);
				this.getOrderLog();
				this.dingshiOrderList();
			},
			tabsActiveEv2(val) {
				this.tabs_active_2 = val.detail.index;
			},

			changNav(name) {
				// this.navName = name;
				uni.$emit('topNavTab', {
					name: name
				});
			},
			// 切换数据
			changeTime(i) {
				this.activeTime = this.timeActive = i;
			},
			// 切换购买时间
			changeTimeProfit(i) {
				this.timeProfitActive = i;
				this.qiToujine = this.detail.pricelist[i].second_minprice;
				this.$forceUpdate();
			},
			buyEv(t) {
				this.buyStat = t;
				this.buyShow = true;
			},
			buyEvSub() {
				// console.log('确定');
				if (!this.time) {
					uni.showToast({
						title: this.$t('option.e7'),
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				console.log(this.at_time);
				let price = this.detail.pricelist[this.timeProfitActive];
				if (this.qiToujine < parseFloat(price.second_minprice)) {
					uni.showToast({
						title: this.$t('expand.起投金额提示') + ' ' + price.second_minprice,
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				// console.log('din_time',this.time)
				let para = {
					symbol: this.symbolLeft,
					otype: this.buyStat == 0 ? 1 : 2,
					second: price.second_time,
					buy_num: this.qiToujine,
					at_time: this.at_time,
					din_time: new Date(this.time).getTime()
				};
				Hangqing.setOrder(para).then(res => {
					this.buyShow = false;
					this.getDetail();
					this.getOrderLog();
					this.dingshiOrderList();
				});
			},
			getOrderLog() {
				let _this = this;
				this.orderLog = [];
				for (let k = 0; k < this.timeInterval.length; k++) {
					clearInterval(this.timeInterval[k]);
				}
				this.timeInterval = [];
				let para = {
					status: this.tabs_active + 1,
					symbol: this.symbolLeft
				};
				Hangqing.getOrderLog(para).then(res => {
					this.orderLog = res.data.data;
					if (this.tabs_active == 0) {
						for (let i = 0; i < this.orderLog.length; i++) {
							var d1 = new Date();
							var d2 = new Date(parseInt(this.orderLog[i].buy_time + '000'));
							this.orderLog[i]['time'] = parseInt(this.orderLog[i].second) - parseInt(parseInt(d1 -
								d2) / 1000); //parseInt(this.orderLog[i].second);
							this.timeInterval.push(
								setInterval(() => {
									if (_this.orderLog[i]['time'] == 0) {
										setTimeout(() => {
											_this.getOrderLog();
										}, 2000);
									} else {
										if (_this.orderLog[i]['time'] <= 0) {
											_this.orderLog[i]['time'] = 0;
											return;
										}
										_this.orderLog[i]['time']--;
										_this.$forceUpdate();
									}
								}, 1000)
							);
						}
					}
				});
			},

			checkSymbol(obj) {
				this.symbolListShow = false;
				if (obj.pair_name != this.query.symbol)
					this.query = {
						symbol: obj.pair_name
					};
				this.changeTime(0);
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

			// 接受socket
			socketMessage() {
				this.ws.on('message', res => {
					if (!this.isShow) return;
					let {
						data,
						sub
					} = res;
					let symbol = this.query.symbol.replace('/', '').toLocaleLowerCase();
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
			// 获取自选列表
			getCollect() {
				if (!this.isLogin) return;
				Hangqing.getCollect({
						ctype: 3
					})
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
					return businessDay.year + '/' + businessDay.month + '/' + businessDay.day;
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
						shiftedCoordinate = Math.max(0, Math.min(container.clientWidth - toolTipWidth,
							shiftedCoordinate));
						var coordinateY =
							coordinate - toolTipHeight - toolTipMargin > 0 ?
							coordinate - toolTipHeight - toolTipMargin :
							Math.max(0, Math.min(container.clientHeight - toolTipHeight - toolTipMargin,
								coordinate + toolTipMargin));
						toolTip.style.left = shiftedCoordinate + 'px';
						toolTip.style.top = coordinateY + 'px';
					}
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
		}
	};
</script>

<style scoped lang="scss">
	::v-deep {
		.uni-date-x {
			color: #999;
			padding: 10rpx 0;
			background-color: transparent;
		}

		.uni-calendar--fixed {
			bottom: 100rpx !important;
		}
	}

	// ::v-deep .records .nav-class {
	// 	position: relative;
	// 	z-index: 100;
	// }
	// ::v-deep .records .tab-class {
	// 	color:#666;
	// }
	::v-deep .records .tab-class.van-ellipsis {
		overflow: auto !important;
		text-overflow: unset !important;
		white-space: pre-wrap !important;
		line-height: 16px;
	}

	::v-deep .records .tab-class .van-ellipsis {
		overflow: auto !important;
		text-overflow: unset !important;
		white-space: pre-wrap !important;
	}

	#box-page {
		// border:1px solid red;
		padding: 0 calc(15em * 0.0625) calc(15em * 0.0625);
		font-size: 16px;
	}

	.button {

		// border: 1px solid red;
		::v-deep {
			uni-radio-group {
				// border:1px solid red;
				display: flex;
				justify-content: space-around;
				line-height: 45px;

				.label {
					// width: 100%;
					text-align: center;
					// border: 1px solid red;
				}
			}
		}
	}

	.datetime {
		// border:1px solid red;
		position: fixed;
		width: 100%;
		bottom: 0px;
		left: 0;
		z-index: 666;

		// bottom:10px;

		// height: 200px;

		// bottom:10px;
		// color:var(--text-color);
		::v-deep {
			.van-picker {
				// border: 1px solid red;
				background-color: gray;
			}
		}
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
		// width: calc(106em * 0.0625);
		width: 30%;
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
				width: 600rpx !important;
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
				transform: translateX(100rpx);
				color: #3771e2 !important;
				bottom: -8px;
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
		z-index: 5;
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

	.mainTime {
		color: #999;
		margin: 0 auto;
		text-align: center;
	}
</style>
