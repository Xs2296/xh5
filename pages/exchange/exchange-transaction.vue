<template>
	<view>
		<view class="d-flex p-md justify-between align-center fn-16 color-light">
			<view @click="$emit('symbol')">
				<i class="iconfont color-theme-1 fn-18">&#xe655;</i>
				{{ symbol }}
			</view>
			<view class="d-flex fn-20 color-theme-1">
				<!-- foucs -->
				<view class="m-r-xs" @click="$emit('option')">
					<van-icon v-if="isCoolect" name="star" />
					<van-icon v-else class="color-default" name="star-o" />
				</view>
				<v-link tag="div" v-if="symbol" :to="{ path: '/pages/exchange/index', query: { code: symbol} }">
					<van-icon name="chart-trending-o" />
				</v-link>
			</view>
		</view>
		<view class="d-flex p-x-md p-b-md">
			<!-- 买卖表单 -->
			<view class="w-6/12">
				<view class="d-flex fn-center justify-between rounded-xs overflow-hidden">
					<view style="height: 34px; width: 50%;position: relative;" @click="changeType(1)">
						<view class="w-6/12 h-34 d-flex justify-center align-center btn-buy" :class="{
								'bg-form-panel-4 ': form.direction != 'buy',
								'bg-gradient-green color-plain': form.direction == 'buy'
							}"></view>
						<view class="btn-buy-label" :class="{ 'color-plain': form.direction == 'buy' }">
							{{ $t('exchange.c3') }}
						</view>
					</view>
					<view style="height: 34px; width: 50%;position: relative;" @click="changeType(2)">
						<view class="color-gray w-6/12 h-34 d-flex justify-center align-center btn-sell" :class="{
								'bg-form-panel-4': form.direction != 'sell',
								'bg-gradient-red color-plain': form.direction == 'sell'
							}"></view>
						<view class="btn-sell-label" :class="{ 'color-plain': form.direction == 'sell' }">
							{{ $t('exchange.c4') }}
						</view>
					</view>
				</view>
				<v-picker :list="typeList" v-model="form.type" class="p-y-xs fn-sm">
					{{ activeType.label }}
					<i class="iconfont">&#xe6e9;</i>
				</v-picker>
				<template v-if="form.type == 1">
					<view>
						<van-stepper :min="0" :value="form.entrust_price" @change="form.entrust_price = $event.detail"
							input-width="61%" step="0.01" />
						<view class="tips fn-xs m-t-xs">{{ targetCoin }}</view>
					</view>
					<view class="m-t-xs">
						<v-input v-model="form.amount" class="h-30 p-x-xs rounded-xs color-light bg-form-panel-4"
							:placeholder="$t('exchange.c5')">
							<template #right>
								<view class="color-default fn-10">{{ activeCoin.coin_name }}</view>
							</template>
						</v-input>
					</view>
				</template>
				<template v-if="form.type == 2">
					<view>
						<v-input disabled class="h-30 p-x-xs rounded-xs color-light bg-panel-4"
							:placeholder="$t('exchange.c6')"></v-input>
					</view>
					<view class="tips fn-xs m-t-xs color-panel-4">{{ targetCoin }}</view>
					<view class="m-t-xs">
						<v-input v-model="form.amount" @input="inputVal"
							class="h-30 p-x-xs rounded-xs color-light bg-panel-4"
							:placeholder="form.direction == 'buy' ? $t('exchange.c7') : $t('exchange.c5')">
							<template #right>
								<view class="color-default" v-if="form.direction == 'sell'">{{ currentCoin }}</view>
								<view class="color-default" v-if="form.direction == 'buy'">{{ targetCoin }}</view>
							</template>
						</v-input>
					</view>
				</template>
				<view>
					<view class="tips fn-10 m-t-xs">
						{{ $t('exchange.c8') }}：{{ curMoney.usable_balance }}{{ currentCoin }}
					</view>
					<view class="tips fn-10 m-t-xs">
						{{ $t('exchange.c8') }}：{{ usdtMoney.usable_balance }}{{ targetCoin }}
					</view>
				</view>
				<view>
					<view class="m-t-xs">
						<view class="d-flex justify-between fn-sm">
							<text>0%</text>
							<text>100%</text>
						</view>
						<view class="justify-center" style="margin:0 -40rpx">
							<slider activeColor="#79D47C" block-color="#79D47C" :max="100" block-size="12"
								:value="stepVal" :show-value="true" step="1" @changing="sliderChange" />
							<!-- <bing-progress
								activeColor="#79D47C"
								barBorderRadius="20px"
								handleWidth="12px"
								handleHeight="12px"
								handleColor="#79D47C"
								borderRadius="20px"
								width="150px"
								:showInfo="false"
								strokeWidth="2px"
								noActiveColor="#484859"
								@dragging="sliderChange"
								:value="activeStep"
							/> -->
						</view>
					</view>
				</view>
				<view class="d-flex fn-sm m-b-xs color-light justify-between">
					<span>{{ $t('exchange.c9') }}：</span>
					<span v-if="form.type == 2 && form.direction == 'sell'">{{ totalMoney }} {{ currentCoin }}</span>
					<span v-else>{{ totalMoney }} {{ targetCoin }}</span>
				</view>
				<template v-if="isLogin">
					<v-button size="small" :type="form.direction == 'buy' ? 'green' : 'red'" class="w-max rounded-xs"
						block @click="storeEntrust" ref="btn">
						{{ form.direction == 'buy' ? this.$t('exchange.c3') : this.$t('exchange.c4') }}
						{{ activeCoin.coin_name }}
					</v-button>
				</template>
				<template v-else>
					<v-button size="small" block to="/login" :type="form.direction == 'buy' ? 'primary' : 'danger'"
						class="w-max">{{ $t('exchange.d0') }}</v-button>
				</template>

				<v-link :to="{ path: '/pages/exchange/index', query: { code: symbol } }" class=" d-block m-t-md">
					<view class="fn-10 p-y-xs">{{ symbol }} {{ $t('exchange.d1') }}</view>
					<view class="h-100">
						<time-sharing :query="query" ref="highChart" :tradeList="tradeList"></time-sharing>
					</view>
				</v-link>
			</view>
			<!-- 深度列表 -->
			<view class="w-6/12 p-l-md d-flex flex-col dep-list">
				<sell-and-buy :buyList="buyList" :max="symbol == 'ABK/USDT' ? 14 : 7" :sellList="sellList"
					:symbol="symbol">
					<view class="fn-md row" :class="newPrice.increase < 0 ? 'color-sell' : 'color-buy'">
						{{ newPrice.price }}
					</view>
					<!-- <view class="fn-xs" v-if="newPrice.price">≈{{ omitTo(newPrice.price * price_cny, 2) }}CNY</view> -->
				</sell-and-buy>
			</view>
		</view>
		<!-- <view class="h-20 "></view>
    <view class="p-md">
      <view class=" fn-lg m-b-md">{{ $t("exchange.d3") }}</view>
      <table class="w-max">
        <thead class="fn-xs">
          <tr>
            <td class="p-y-xs p-l-md">{{ $t("exchange.d4") }}</td>
            <td class="p-y-xs ">{{ $t("exchange.d5") }}</td>
            <td class="p-y-xs fn-right">{{ $t("exchange.d2") }}</td>
            <td class="p-y-xs fn-right p-r-md">{{ $t("exchange.c5") }}</td>
          </tr>
        </thead>
        <tbody class="color-light trade-list">
          <tr v-for="(item,idx) in tradeList" :key="idx">
            <td class="p-y-xs p-l-md rounded-bl-xs rounded-tl-xs ">
              {{ parseTime(item.ts, false, "{h}:{i}:{s}") }}333
            </td>
            <td :class="`color-${item.direction}`">
              <template v-if="item.direction == 'buy'">{{
                $t("exchange.b5")
              }}</template>
              <template v-else-if="'sell'">{{ $t("exchange.b6") }}</template>
            </td>
            <td class="fn-right">{{ item.price }}</td>
            <td class="p-y-xs fn-right p-r-md rounded-br-xs rounded-tr-xs">{{ omitTo(item.amount, 8) * 1 }}</td>
          </tr>
        </tbody>
      </table>
    </view> -->
	</view>
</template>
<script>
	import timeSharing from '@/pages/exchange/time-sharing';
	import Exchange from '@/api/exchange';
	import Market from '@/api/market';
	import date from '@/utils/class/date';
	import math from '@/utils/class/math';
	import {
		mapState
	} from 'vuex';
	import sellAndBuy from '@/pages/exchange/sell-and-buy';
	import bingProgress from '@/components/bing-progress/bing-progress.vue';
	import Otc from "@/api/otc";
	export default {
		props: {
			collect: {
				default () {
					return [];
				},
				type: Array,
				required: false
			},
			marketList: {
				defalut() {
					return [];
				},
				type: Array,
				required: false
			},
			query: {
				default: {},
				type: Object,
				required: false
			},
			isShow: {
				default: true,
				type: Boolean,
				required: false
			}
		},
		components: {
			timeSharing,
			sellAndBuy,
			bingProgress
		},
		name: 'exchange-transaction',
		data() {
			return {
				buyList: [],
				sellList: [],
				tradeList: [],
				form: {
					direction: 'buy',
					type: 2,
					symbol: this.symbol,
					entrust_price: '',
					amount: '',
					trigger_price: undefined,
					total: ''
				},
				usableBalance: [],
				balanceMap: {},
				unSymbol: '',
				newPrice: {},
				price_cny: 0,
				curMoney: {},
				usdtMoney: {},
				stepVal: 0
			};
		},
		computed: {
			...mapState({
				ws: 'ws'
			}),
			isLogin() {
				return Boolean(uni.getStorageSync('token'));
			},
			symbol() {
				return this.query.symbol;
			},
			// 是否为自选
			isCoolect() {
				return this.collect.map(item => item.pair_name).includes(this.symbol);
			},
			typeList() {
				return [{
						value: 1,
						label: this.$t('exchange.d6')
					},
					{
						value: 2,
						label: this.$t('exchange.d7')
					}
				];
			},
			activeType() {
				return this.typeList.find(item => item.value == this.form.type);
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
				return list.find(item => item.pair_name == this.symbol);
			},
			// 当前币种
			currentCoin() {
				if (!this.symbol) return '';
				return this.symbol.split('/')[0];
			},
			// 目标币种
			targetCoin() {
				if (!this.symbol) return '';
				return this.symbol.split('/')[1];
			},
			// 当前余额
			currentBalance() {
				return this.balanceMap[this.currentCoin] || {};
			},
			// 目标余额
			targetBalance() {
				this.curMoney = this.balanceMap[this.currentCoin]
				this.usdtMoney = this.balanceMap[this.targetCoin]
				return this.balanceMap[this.targetCoin] || {};
			},
			// 计算交易额
			totalMoney() {
				// todo
				let totalMoney = 0;
				if (this.form.type == 1) {
					totalMoney = math.multiple(this.form.amount, this.form.entrust_price);
				} else {
					totalMoney = this.form.amount;
				}
				return totalMoney;
			},
			// 显示百分比
			activeStep() {
				let num = 0;
				return num * 100;
			},
			// 可用数量
			usable() {
				if (this.form.direction == 'buy') {
					if (this.usableBalance.length <= 0) return 0;
					const usable = this.usableBalance.find((val) => val.coin_name == 'USDT')
					return this.omitTo(usable.usable_balance, this.activeCoin.price_decimals);

					// if (!this.targetBalance.usable_balance) return 0;
					// return this.omitTo(this.targetBalance.usable_balance, this.activeCoin.price_decimals);
				} else {
					if (this.usableBalance.length <= 0) return 0;
					const usable = this.usableBalance.find((val) => val.coin_name == this.symbol.replace('/USDT', ''))
					return this.omitTo(usable.usable_balance, this.activeCoin.qty_decimals);
					// if (!this.currentBalance.usable_balance) return 0;
					// return this.omitTo(this.currentBalance.usable_balance, this.activeCoin.qty_decimals);
				}
			},

			// 可用单位
			usableUnit() {
				if (this.form.direction == 'buy') {
					return this.targetCoin;
				} else {
					return this.currentCoin;
				}
			}
		},
		watch: {
			symbol(n, o) {
				this.getBooks();
				this.getUserBalance();
				if (o) {
					this.unLink(o.replace('/', '').toLocaleLowerCase());
				}
			},
			isShow(n) {
				if (n) {
					this.linkSocket(this.activeCoin.symbol);
				} else {
					this.unLink(this.activeCoin.symbol);
				}
			}
		},
		methods: {
			parseTime: date.parseTime,
			omitTo: math.omitTo,
			inputVal(e) {
				var money = 0
				var setpVal = 0
				if (this.form.direction == 'buy') {
					if (e >= this.usdtMoney.usable_balance) {
						money = this.usdtMoney.usable_balance
					} else {
						money = e
					}
					setpVal = parseInt(money / this.usdtMoney.usable_balance * 100)
				} else {
					if (e >= this.curMoney.usable_balance) {
						money = this.curMoney.usable_balance
					} else {
						money = e
					}
					setpVal = parseInt(money / this.curMoney.usable_balance * 100)
				}
				this.form.amount = money
				this.stepVal = setpVal
			},
			changeType(type) {
				if (type == 1) {
					this.form.direction = 'buy'
				} else {
					this.form.direction = 'sell'
				}
				this.form.amount = 0
				this.getDefaultPrice()
				this.setSetp(0)
			},
			otcAccount() {
				Otc.otcAccount().then((res) => {
					this.usableBalance = res.data
				});
			},
			setSetp(val) {
				this.stepVal = val
			},
			// 计算滑动出来的金额
			sliderChange($ev) {
				$ev.value = $ev.detail.value
				let num = $ev.value / 100;
				if (this.form.direction == 'buy') {
					var curmoney = this.usdtMoney.usable_balance
					if (this.form.type == 1) {
						this.form.amount = math.multiple(curmoney / this.form.entrust_price, num, 4)
					} else {
						this.form.amount = math.multiple(curmoney, num, 4);
					}
				} else if (this.form.direction == 'sell') {
					var curmoney = this.curMoney.usable_balance
					this.form.amount = math.multiple(curmoney, num, 4);
				}
				this.setSetp($ev.value)
			},
			// 提交订单
			storeEntrust() {
				let data = this.form;
				if (this.form.type == 1) {
					//限价
					if (!this.form.entrust_price) {
						this.$toast(this.$t('exchange.d8'));
						return;
					}
					if (!this.form.amount) {
						this.$toast(this.$t('exchange.d9'));
						return;
					}
				} else if (this.form.type == 2) {
					//市价
					this.form.total = this.form.amount;
					if (!this.form.total) {
						if (this.form.direction == 'buy') {
							this.$toast(this.$t('exchange.e0'));
						} else {
							this.$toast(this.$t('exchange.d9'));
						}
						return;
					}
				}
				this.form.symbol = this.symbol;
				Exchange.storeEntrust(data, {
						btn: this.$refs.btn
					})
					.then(() => {
						this.form.amount = '';
						this.form.total = '';
						this.$toast.success(this.$t('exchange.e1'));
						this.getUserBalance();
						// this.otcAccount();
						this.getBooks();
					})
					.catch(() => {});
			},
			// 获取列表
			getBooks() {
				if (!this.symbol) return;
				Market.getBooks({
					symbol: this.symbol
				}).then(res => {
					this.buyList = res.data.buyList;
					this.sellList = res.data.sellList;
					this.tradeList = res.data.tradeList;
					this.linkSocket(this.activeCoin.symbol);
					this.setChartData(this.tradeList);
					this.getDefaultPrice();
					this.newPrice = this.tradeList[0] || {};
				});
			},
			// 获取默认价格
			getDefaultPrice() {
				if (this.form.direction == 'buy') {
					this.form.entrust_price = Math.min(...this.tradeList.map(item => item.price));
				} else {
					this.form.entrust_price = Math.max(...this.buyList.map(item => item.price));
				}
			},
			// 计算深度
			getValue(amount) {
				const arr = this.buyList.concat(this.sellList).map(item => item.amount);
				let max = Math.max(...arr);
				return math.division(amount, max, 2) * 100;
			},
			selectType() {
				this.$picker(this.typeList, {
					value: this.form.type
				}).then(res => {
					this.form.type = res;
				});
			},
			// 获取余额
			getUserBalance() {
				if (!this.symbol || !this.isLogin) return;
				Exchange.getUserBalance({
					symbol: this.symbol
				}).then(res => {
					this.curMoney = res.data[this.currentCoin]
					this.usdtMoney = res.data[this.targetCoin]
					this.balanceMap = {
						...this.balanceMap,
						...res.data
					};
				});
				this.getCurrencyExCny();
			},
			// 获取汇率
			getCurrencyExCny() {
				Exchange.getCurrencyExCny({
					coin_name: this.targetCoin
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
					msg: `buyList_${symbol}`
				});
				// 订阅卖线
				this.ws.send({
					cmd: 'sub',
					msg: `sellList_${symbol}`
				});
				// 订阅成交
				this.ws.send({
					cmd: 'sub',
					msg: `tradeList_${symbol}`
				});
			},
			// 取消订阅
			unLink(symbol) {
				// 取消买线
				this.ws.send({
					cmd: 'unsub',
					msg: `buyList_${symbol}`
				});
				// 取消卖线
				this.ws.send({
					cmd: 'unsub',
					msg: `sellList_${symbol}`
				});
				// 取消成交
				this.ws.send({
					cmd: 'unsub',
					msg: `tradeList_${symbol}`
				});
			},
			socketMessage() {
				this.ws.on('message', res => {
					let symbol = this.activeCoin && this.activeCoin.symbol;
					let {
						data,
						sub
					} = res;

					switch (sub) {
						case `buyList_${symbol}`:
							this.buyList = data;
							break;
						case `sellList_${symbol}`:
							this.sellList = data.sort((a, b) => b.price - a.price);
							break;
						case `tradeList_${symbol}`:
							if (this.tradeList.length > 20) {
								this.tradeList.unshift(data);
								this.tradeList.pop();
							} else {
								this.tradeList.unshift(data);
							}
							this.addChartPoint(data);
							this.newPrice = data;
							break;
					}
				});
			},

			// 设置highChart
			setChartData(arr) {
				if (!this.$refs.highChart) return;
				let list = arr.map(item => {
					return [item.ts, item.price];
				});
				this.$nextTick(() => {
					this.$refs.highChart.resetData(list);
				});
			},
			// 添加highChart点
			addChartPoint(obj) {
				if (!this.$refs.highChart) return;
				this.$refs.highChart.addPoint([obj.ts, obj.price]);
			}
		},
		mounted() {
			// this.otcAccount();
			this.getBooks();
			this.getUserBalance();
			this.socketMessage();
			if (this.query.direction) {
				this.form.direction = this.query.direction;
			}
		},
		destroyed() {
			// this.unLink(this.unSymbol);
		},
		created() {

		}
	};
</script>
<style lang="scss" scoped>
	.custom-button {
		min-width: 26px;
		color: #fff;
		line-height: 18px;
		text-align: center;
		border-radius: 100px;
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

	.dep-list {
		height: 440px;

		.row {
			position: relative;

			.proagess {
				position: absolute;
				right: 0;
				top: 0;
				transition: width 0.3s;
			}
		}
	}

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

	.trade-list {
		tr:nth-of-type(2n-1) {
			box-shadow: $shadow;
			border-radius: $border-radius-xs;

			td {
				background: $panel-3;
			}
		}
	}

	.btn-buy {
		width: 100%;
		border-radius: 6px;
		transform: perspective(12px) scale(1.1, 1.3) rotateX(-5deg);
		transform-origin: top left;
		box-shadow: inset -2px -3px 6px -4px #000;
	}

	.btn-buy-label {
		width: 100%;
		position: absolute;
		left: 0px;
		top: 8px;
	}

	.btn-sell {
		width: 100%;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		transform: perspective(12px) scale(1.1, 1.3) rotateX(5deg);
		transform-origin: bottom right;
		box-shadow: inset 2px 2px 5px -4px #000;
	}

	.btn-sell-label {
		width: 100%;
		position: absolute;
		left: 0px;
		top: 8px;
	}
</style>
