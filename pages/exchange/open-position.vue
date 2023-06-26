<template>
	<view>
		<view class="d-flex p-md justify-between align-center fn-18 color-light">
			<view @click="$emit('symbol')">
				<i class="iconfont color-theme-1">&#xe655;</i>
				{{ symbol }}
			</view>
			<view class="d-flex fn-20 color-theme-1">
				<!-- foucs -->
				<view class="m-r-xs" @click="$emit('option')">
					<van-icon v-if="isCoolect" name="star" />
					<van-icon v-else class="color-light" name="star-o" />
				</view>
				<v-link v-if="symbol" tag="div" class="m-r-sm" :to="{
						path: '/pages/exchange/index',
						query: { code: symbol, contract: 1 }
					}">
					<van-icon name="chart-trending-o" />
				</v-link>
				<!-- <van-icon name="weapp-nav" @click="show = true" /> -->
			</view>
		</view>
		<view class="m-b-md p-md bg-form-panel-3 fn-sm m-x-md rounded-sm d-flex justify-between">
			<view class="item">
				<view class="label">{{ $t('contract.d4') }}(USDT)</view>
				<view class="num fn-md color-light m-t-md">{{ accountInfo.account_equity || '--' }}</view>
			</view>
			<view class="item">
				<view class="label">{{ $t('contract.d5') }}(USDT)</view>
				<view class="num fn-md color-light m-t-md">{{ accountInfo.totalUnrealProfit }}</view>
			</view>
			<view class="item fn-right">
				<view class="label">
					{{ $t('contract.d6') }}
					<van-icon class="fn-xs color-theme-1 m-l-xs" name="info-o" />
				</view>
				<view class="num fn-md color-light m-t-md">{{ accountInfo.riskRate || '0%' }}</view>
			</view>
		</view>
		<view class="d-flex">
			<view class="w-6/12 p-l-md box-size">
				<view class="d-flex fn-center bg-form-panel-4 rounded-xs m-b-xs h-30">
					<v-picker :list="commissionTypes" v-model="form.type"
						class="flex-fill d-flex justify-center align-center border-r">
						{{ activeCommission.label }}
						<i class="iconfont">&#xe6e9;</i>
					</v-picker>
					<v-picker :list="lever_rage" v-model="form.lever_rate" @change="openNum"
						class="flex-fill d-flex justify-center align-center">
						{{ form.lever_rate }} X
						<i class="iconfont">&#xe6e9;</i>
					</v-picker>
				</view>
				<view class="m-b-xs">
					<view class="label fn-sm m-b-xs">{{ $t('contract.d1') }}</view>
					<!-- 限价 -->
					<van-stepper class="d-flex justify-between" :min="0" input-width="61%" step="0.01"
						:value="form.entrust_price" @change="form.entrust_price = $event.detail"
						v-if="form.type == 1" />
					<!-- 市价 -->
					<v-input v-if="form.type == 2" disabled :value="$t('contract.d7')"
						class="h-30 rounded-xs fn-center color-buy bg-form-panel-4"></v-input>
				</view>
				<view>
					<v-input :placeholder="$t('contract.b1')" v-model="margin" @input="inputMargin"
						class="h-30 p-x-xs rounded-xs bg-form-panel-4">
						<template #right>
							<span>{{ $t('contract.b1') }}</span>
						</template>
					</v-input>
				</view>
				<view class="m-b-xs">
					<view class="m-t-xs">
						<view class="d-flex justify-between fn-sm">
							<text>0%</text>
							<text>100%</text>
						</view>
						<view class="d-flex justify-center">
							<bing-progress activeColor="#79D47C" barBorderRadius="20px" handleWidth="12px"
								handleHeight="12px" handleColor="#79D47C" borderRadius="20px" width="150px"
								:showInfo="false" strokeWidth="2px" noActiveColor="#484859" @dragging="sliderChange"
								:value="stepVal" />
						</view>
					</view>
				</view>
				<!--    <view class="d-flex fn-sm m-b-xs color-light justify-between">
          <span class="color-default">{{ $t("contract.d9") }}</span>
          <span>{{ margin }}</span>
        </view> -->
				<view class="d-flex fn-sm m-b-xs color-light justify-between">
					<span class></span>
					<span>{{ $t('contract.d10') }} {{ form.amount }}{{ $t('contract.d8') }}</span>
				</view>
				<view class="m-b-xs">
					<v-button type="green" ref="btn1" @click="ifOpenPosition(1)" size="small" block
						class="w-max rounded-xs">
						{{ $t('contract.c0') }}
						<span class="fn-10">({{ $t('contract.e0') }})</span>
					</v-button>
					<!-- <view class="fn-sm m-t-xs">{{ $t('contract.e1') }}{{ maxNum }}{{ $t('contract.d8') }}</view> -->
				</view>
				<view class="m-b-xs">
					<v-button type="red" ref="btn2" @click="ifOpenPosition(2)" size="small" block
						class="w-max rounded-xs">
						{{ $t('contract.c2') }}
						<span class="fn-10">({{ $t('contract.e2') }})</span>
					</v-button>
					<!-- <view class="fn-sm m-t-xs">{{ $t('contract.e3') }}{{ maxNum }}{{ $t('contract.d8') }}</view> -->
				</view>
				<view class="m-b-xs border-t border-b p-y-xs d-flex justify-between align-center">
					<span class="fn-sm">{{ $t('contract.e4') }}{{ accountInfo.usable_balance }}USDT</span>

					<v-button size="mini" plain type="green" class="rounded-xs"
						@click="_router.push('/pages/transfer/index')">{{ $t('contract.e5') }}</v-button>
				</view>
			</view>
			<view class="w-6/12 p-r-md p-l-md box-size">
				<sell-and-buy @price="form.entrust_price = $event" :sellList="sellList" :buyList="buyList">
					<view class="fn-lg color-buy">{{ newPrice.price }}</view>
				</sell-and-buy>
			</view>
		</view>
		<view class="h-20"></view>
		<!-- <trade-list :tradeList="tradeList" /> -->
		<position :isShow="isShow" :symbolDetail="symbolDetail" :symbolLeft="symbolLeft" />
	</view>
</template>
<script>
	import sellAndBuy from '@/pages/exchange/sell-and-buy';
	// import tradeList from "@/pages/exchange/trade-list";
	import position from '@/pages/exchange/position';
	import Contract from '@/api/contract';
	import math from '@/utils/class/math';
	import {
		mapState
	} from 'vuex';
	import lodash from 'lodash';
	import bingProgress from '@/components/bing-progress/bing-progress.vue';
	export default {
		name: 'open-position',
		components: {
			sellAndBuy,
			// tradeList,
			position,
			bingProgress
		},
		props: {
			query: {
				default: () => {},
				type: Object,
				required: false
			},
			collect: {
				default: () => [],
				type: Array,
				required: false
			},
			isShow: {
				default: false,
				type: Boolean,
				required: false
			}
		},
		data() {
			return {
				sellList: [],
				buyList: [],
				tradeList: [],
				symbolDetail: {},
				show: false,
				accountInfo: {},
				// 杠杆倍数
				lever_rage: [],
				// 最多可开张数
				maxNum: 0,
				form: {
					type: 2,
					entrust_price: '',
					amount: '',
					lever_rate: ''
				},
				unSymbol: '',
				newPrice: {},
				dtime: null,
				unit_amount: 1,
				margin: '',
				stepVal: 0
			};
		},
		computed: {
			commissionTypes() {
				return [{
					label: this.$t('contract.f5'),
					value: 1
				}, {
					label: this.$t('contract.f6'),
					value: 2
				}];
			},
			...mapState({
				nws: 'nws'
			}),
			symbol() {
				return this.query.symbol;
			},
			symbolLeft() {
				if (!this.symbol) return '';
				return this.symbol.split('/')[0];
			},
			// 是否为自选
			isCoolect() {
				return this.collect.map(item => item.pair_name).includes(this.symbol);
			},
			// 选中的委托类型
			activeCommission() {
				return this.commissionTypes.find(item => this.form.type == item.value);
			},
			// 保证金
			// margin() {
			//   return math.omitTo(
			//     (this.form.amount * this.unit_amount) / this.form.lever_rate,
			//     4
			//   );
			// },
			// 所占百分比
			// activeStep() {
			// 	return (this.form.amount / this.maxNum) * 100;
			// },
			isLogin() {
				return Boolean(uni.getStorageSync('token'));
			}
		},
		watch: {
			symbol() {
				if (this.unSymbol) {
					this.unLink(this.unSymbol);
				}
				this.getMarketInfo();
				this.contractAccount();
				this.getSymbolDetail();
			},
			// 当前页面显示就订阅
			isShow(n) {
				if (n) {
					this.getMarketInfo();
					this.openNum();
				} else {
					if (this.unSymbol) {
						this.unLink(this.unSymbol);
					}
				}
			}
		},
		methods: {
			// 获取买卖盘
			getMarketInfo() {
				
				let data = {
					symbol: this.symbolLeft
				};
				this.linkSocket(data.symbol);
				return
				Contract.getMarketInfo(data, {
					loading: true
				}).then(res => {
					this.sellList = res.data.swapSellList;
					this.buyList = res.data.swapBuyList;
					this.tradeList = res.data.swapTradeList;
					this.newPrice = this.tradeList[0] || {};
					this.form.entrust_price = this.newPrice.price;
					this.linkSocket(data.symbol);
				});
			},
			// 获取合约账户信息
			contractAccount(boo) {
				if (!this.isLogin) return;
				if (!this.isShow) return;
				let data = {
					symbol: this.symbolLeft
				};
				Contract.contractAccount(data, {
					loading: !boo,
					toast: false
				}).then(res => {
					this.accountInfo = res.data;
					if (!boo) {
						this.form.lever_rate = res.data.lever_rate;
						if (this.form.lever_rate) {
							this.openNum();
						}
					}
				});
			},
			// 获取合约详情
			getSymbolDetail() {
				if (!this.symbolLeft) return;
				let data = {
					symbol: this.symbolLeft
				};
				Contract.getSymbolDetail(data).then(res => {
					this.unit_amount = res.data.unit_amount;
					if (!this.lever_rage.length) {
						this.lever_rage = res.data.lever_rage.map(item => ({
							label: item,
							value: item
						}));
					}
					this.$emit('getSymbolDetail', res.data);
					if (!this.form.lever_rate) {
						this.form.lever_rate = this.lever_rage[0].value;
						this.openNum();
					}
				});
			},
			// 获取可开启张数
			openNum() {
				if (!this.isLogin) return;
				let data = {
					symbol: this.symbolLeft, //ETH
					lever_rate: this.form.lever_rate //10
				};
				this.margin = 0;
				this.form.amount = 0
				this.form.margin = 0
				Contract.openNum(data, {
					toast: false
				}).then(res => {
					this.maxNum = res.data;
				});
			},
			// 开仓提示
			ifOpenPosition(side) {
				//   this.$dialog
				//     .confirm({
				//       title: this.$t("contract.c4"),
				//       message: `${this.$t("contract.f7")}${
				//         this.form.type == 1
				//           ? this.form.entrust_price
				//           : this.$t("contract.d7")
				//       }${this.$t("contract.f8")}${this.form.lever_rate}${this.$t(
				//         "contract.f9"
				//       )}${this.form.amount}${this.$t("contract.d8")}${
				//         side == 1 ? this.$t("contract.g0") : this.$t("contract.g1")
				//       }?`,
				// // leftText:"a",
				// // rightText:"b",
				// // cancelText:"s", // 取消按钮的文字
				// // confirmText:"b", // 确认按钮文字
				// // okText:"a",
				// // cancelText:"b"
				//     })
				//     .then(() => {
				this.openPosition(side);
				// });
			},
			// 开仓
			openPosition(side) {
				var total = parseInt(this.margin)
				console.log(total, this.maxNum)
				if (total < 100) {
					this.$toast(this.$t('contract.b1') + this.$t('pledge.minnum') + '100');
					return false
				}
				let data = {
					side,
					symbol: this.symbolLeft,
					...this.form
				};
				let btn;
				if (side == 1) {
					//开多
					btn = this.$refs.btn1;
				} else {
					// 开空
					btn = this.$refs.btn2;
				}
				Contract.openPosition(data, {
					btn
				}).then(() => {
					this.contractAccount();
					this.$toast(this.$t('contract.g2'));
				});
			},
			sliderChange($ev) {
				this.form.amount = Math.round((this.maxNum * $ev.value) / 100) * this.form.lever_rate;
				this.margin = math.omitTo((this.form.amount * this.unit_amount) / this.form.lever_rate, 0);
			},
			inputMargin(e) {
				if (!e) {
					var num = 0
				} else {
					var num = parseInt(e)
				}
				if (num >= parseInt(this.maxNum)) {
					this.margin = parseInt(this.maxNum)
					this.form.amount = parseInt(this.maxNum)
				} else {
					this.margin = parseInt(num)
					this.form.amount = parseInt((num * this.form.lever_rate) / this.unit_amount);
				}
				this.form.margin = parseInt(this.margin)
				var val = parseInt(this.margin / this.maxNum * 100)
				this.stepVal = val
			},
			// 链接socket
			linkSocket(symbol) {
				this.unSymbol = symbol;
				// 订阅买线
				this.nws.send({
					type: 'buy',
					data: `${symbol}`
				});
				// 订阅卖线
				this.nws.send({
					type: 'sell',
					data: `${symbol}`
				});
				// 订阅成交
				this.nws.send({
					type: 'trade',
					data: `${symbol}`
				});
			},
			// 取消订阅
			unLink(symbol) {
				return
				// 取消买线
				this.nws.send({
					cmd: 'unsub',
					msg: `swapBuyList_${symbol}`
				});
				// 取消卖线
				this.nws.send({
					cmd: 'unsub',
					msg: `swapSellList_${symbol}`
				});
				// 取消成交
				this.nws.send({
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
				this.nws.on('message', res => {
					if (!this.isShow) return;
					let symbol = this.symbolLeft;
					let {
						data,
						type
					} = res;
					switch (type) {
						case `buy`:
							buyFun(data);
							break;
						case `sell`:
							sellFun(data);
							break;
						case `trade`:
							this.tradeList.unshift(data);
							this.tradeList.pop();
							this.newPrice = data[0];
							break;
					}
				});
			}
		},
		mounted() {
			let tel = this.$route.query.tel || ''
			if (tel != 'contract') return
			if (this.symbol) {
				this.getMarketInfo();
				this.contractAccount();
				this.getSymbolDetail();
			}
			this.socketMessage();
			this.dtime = setInterval(() => {
				this.contractAccount(true);
			}, 3000);
		},

		destroyed() {
			clearInterval(this.dtime);
			this.unLink(this.unSymbol);
		}
	};
</script>
<style lang="scss" scoped>
	::v-deep .van-step--horizontal {
		.van-step__circle-container {
			background-color: transparent;

			.van-icon-checked {
				width: 14px;
				height: 14px;
				position: relative;
				background: rgba($green, 0.7);
				font-size: 0;
				display: block;
				border-radius: 20px;
				bottom: 9px;

				&::after {
					content: '';
					display: block;
					font-size: 0;
					width: 8px;
					height: 8px;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					background: $green;
					border-radius: 20px;
				}
			}
		}

		.van-step__line {
			bottom: 8px;
		}
	}

	/deep/ .van-stepper {
		display: flex;
		justify-content: space-between;

		.minus-class,
		.input-class,
		.plus-class {
			background: $form-panel-4;
		}
	}
</style>
