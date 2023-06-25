<template>
	<view style="padding-bottom: 50px">
		<view class="p-x-md p-t-md fn-right d-flex justify-between">
			<!-- <view>
				<v-button type="green" class="rounded-lg opt-btn m-b-xs" @click="onekeyAllFlat">{{ $t('contract.k7') }}
				</v-button>
			</view> -->
			<view class="d-flex align-center" @click="
					checked = !checked;
					holdPosition();
				">
				{{ $t('contract.g3') }}
				<van-checkbox class="m-l-xs" :value="checked"></van-checkbox>
			</view>
		</view>
		<van-empty v-if="!list.length" :description="$t('contract.d0')" />
		<view class="item bg-panel-4 m-md rounded-sm box-shadow" v-for="item in list" :key="item.id">
			<view class="head d-flex align-center border-b p-x-md p-y-xs justify-between">
				<view class="d-flex">
					<view>
						<view class="color-light fn-20">{{ item.pair_name }}</view>
					</view>
				</view>
				<text class="fn-20"
					:class="item.side == 1 ? 'color-success' : 'color-danger'">{{ item.side == 1 ? $t('contract.e8') : $t('contract.e9') }}</text>
				<view class="d-flex color-light">
					<span>{{ item.lever_rate }}X</span>
				</view>
			</view>
			<view class="p-x-md p-y-xs data-list">
				<view class="row d-flex m-y-xs">
					<view class="label fn-sm">{{ $t('contract.a1') }}/{{ $t('contract.g5') }}/{{ $t('contract.g4') }}
					</view>
					<view class="color-light fn-right flex-fill">
						{{ item.hold_position }}/{{ item.freeze_position }}/{{ item.avail_position }}
					</view>
				</view>

				<view class="d-flex">
					<view class="row w-6/12 d-flex m-y-xs justify-between">
						<view class="label fn-sm">{{ $t('contract.b1') }}</view>
						<view class="color-light">{{ item.position_margin }}</view>
					</view>
					<view class="row w-6/12 d-flex m-y-xs justify-between">
						<view class="label fn-sm">{{ $t('contract.h1') }}/{{ $t('contract.h2') }}</view>
						<view class="color-light">{{ item.tpPrice || '--' }}/{{ item.slPrice || '--' }}</view>
					</view>
				</view>
				<view class="d-flex">
					<view class="row w-6/12 d-flex m-y-xs justify-between">
						<view class="label fn-sm">{{ $t('contract.g6') }}</view>
						<view class="color-light">{{ item.avg_price }}</view>
					</view>
					<view class="row w-6/12 d-flex m-y-xs justify-between">
						<view class="label fn-sm">{{ $t('contract.h0') }}</view>
						<view class="color-light">{{ item.profitRate }}</view>
					</view>
				</view>
				<view class="d-flex">
					<view class="row w-6/12 d-flex m-y-xs justify-between">
						<view class="label fn-sm">{{ $t('contract.g8') }}</view>
						<view class="color-light">{{ item.flatPrice }}</view>
					</view>
					<view class="row w-6/12 d-flex m-y-xs justify-between">
						<view class="label fn-sm">{{ $t('contract.d5') }}</view>
						<view class="color-light">{{ item.unRealProfit }}</view>
					</view>
				</view>
				<view class="row d-flex m-y-xs justify-between">
					<v-button type="green" size="small" class="opt-btn rounded-xs m-b-xs"
						@click="closePositionShow(item)">{{ $t('contract.h3') }}</v-button>

					<v-button type="green" size="small" class="opt-btn rounded-xs m-b-xs m-l-xs"
						@click="onekeyReverse(item)">{{ $t('contract.k8') }}</v-button>
					<!-- <v-button
              type="danger"
              class="opt-btn m-l-xs m-b-xs"
              plain
              size="small"
              @click="ifCloseAllPosition(item)"
              >{{ $t("contract.h4") }}</v-button
            > -->
					<v-button type="blue" class="opt-btn m-l-xs m-b-xs rounded-xs" size="small"
						@click="toStoploss(item)">{{ $t('contract.h5') }}</v-button>
					<v-button type="green-plain" class="m-l-xs m-b-xs d-inline-block rounded-xs" size="small" plain :to="{
							path: '/pages/income/index',
							query: {
								symbol: item.symbol,
								side: item.side,
								profitRate: item.profitRate,
								lever_rate: item.lever_rate,
								pair_name: item.pair_name,
								avg_price: item.avg_price,
								newPrice: newPrice,
								position_side: item.side
							}
						}">
						{{ $t('contract.c8') }}
					</v-button>
				</view>
			</view>
		</view>
		<van-popup :show="show" @close="show = false" closeable position="bottom"
			custom-style="height:55%;width:100%;overflow:auto;">
			<view>
				<view class="p-y-xs p-x-md border-b d-flex align-center">
					<view class="p-xs rounded-xs fn-bold"
						:class="activeItem.side == 1 ? 'bg-danger-transparent color-danger' : 'bg-success-transparent color-success'">
						{{ $t('contract.h6') }}{{ activeItem.side == 1 ? $t('contract.e8') : $t('contract.e9') }}
					</view>
					<view class="fn-bold m-x-sm">{{ activeItem.pair_name }}</view>
					<view>{{ activeItem.lever_rate }}X</view>
				</view>
				<view class="p-md">
					<v-input class="p-sm rounded border" :placeholder="$t('contract.h7')" type="number"
						v-model="form.entrust_price" v-if="activeItem.closeType == 1">
						<template #right>
							<v-button size="mini" type="theme">{{ $t('contract.h8') }}</v-button>
						</template>
					</v-input>
					<v-input class="p-sm rounded border bg-panel-1 fn-center color-sell" disabled
						:value="$t('contract.d7')" v-else>
						<template #right>
							<v-button size="mini" type="theme">{{ $t('contract.d7') }}</v-button>
						</template>
					</v-input>
					<v-input class="p-sm rounded border m-t-sm" :placeholder="$t('contract.h9')" type="number"
						v-model="form.amount" disabled="">
						<template #right>
							<span class="color-default">{{ $t('contract.d8') }}</span>
						</template>
					</v-input>
					<view class="fn-sm m-y-xs">{{ $t('contract.i0') }} {{ activeItem.avail_position }}
						{{ $t('contract.d8') }}
					</view>
					<v-button type="blue" class="rounded-lg" block @click="closePosition" ref="btn">
						{{ $t('contract.h3') }}
					</v-button>
					<view class="h-55"></view>
				</view>
			</view>
		</van-popup>
		<van-popup :show="stoplossShow" @close="stoplossShow = false" closeable position="bottom"
			custom-style="height:55%;width:100%:overflow:auto;">
			<view>
				<view class="p-y-xs p-x-md border-b d-flex align-center">
					<view class="p-xs rounded-sm fn-bold"
						:class="activeItem.side == 2 ? 'bg-danger-transparent color-danger' : 'bg-success-transparent color-success'">
						{{ activeItem.side == 1 ? $t('contract.e8') : $t('contract.e9') }}
					</view>
					<view class="fn-bold m-x-sm">{{ activeItem.pair_name }}</view>
					<view>{{ activeItem.lever_rate }}X</view>
				</view>
				<view class="p-x-md p-t-md d-flex">
					<view class="m-r-md">
						<span>{{ $t('contract.e9') }}：</span>
						<span class="color-light">{{ activeItem.avg_price * 1 }}</span>
					</view>
					<view>
						<span>{{ $t('contract.i2') }}：</span>
						<span class="color-light">{{ activeItem.realtimePrice }}</span>
					</view>
				</view>
				<view class="p-x-md p-t-0">
					<v-input class="p-sm rounded border m-t-sm" :placeholder="$t('contract.i3')" type="number"
						v-model="strategyForm.tp_trigger_price">
						<template #left>
							<span class="color-default">{{ $t('contract.i4') }}：</span>
						</template>
					</v-input>
					<view class="p-t-xs fn-sm color-tips" v-if="strategyForm.tp_trigger_price">
						{{ $t('contract.i5') }}{{ strategyForm.tp_trigger_price }}{{ $t('contract.i6') }}
						{{ activeItem.side == 1 ? many(activeItem, strategyForm.tp_trigger_price) : air(activeItem, strategyForm.tp_trigger_price) }}
						USDT
					</view>
					<v-input class="p-sm rounded border m-t-sm" :placeholder="$t('contract.i3')" type="number"
						v-model="strategyForm.sl_trigger_price">
						<template #left>
							<span class="color-default">{{ $t('contract.i7') }}：</span>
						</template>
					</v-input>
					<view class="p-t-xs fn-sm color-tips" v-if="strategyForm.sl_trigger_price">
						{{ $t('contract.i5') }}{{ strategyForm.sl_trigger_price }}{{ $t('contract.i8') }}
						{{ activeItem.side == 1 ? many(activeItem, strategyForm.sl_trigger_price) : air(activeItem, strategyForm.sl_trigger_price) }}
						USDT
					</view>
					<view class="h-10"></view>
					<v-button class="m-t-md rounded-lg" type="blue" block @click="stoploss" ref="strateBtn">
						{{ $t('contract.i9') }}
					</v-button>
					<view class="h-55"></view>
				</view>
			</view>
		</van-popup>
	</view>
</template>
<script>
	import Contract from '@/api/contract';
	import {
		mapState
	} from 'vuex';
	import math from '@/utils/class/math';
	export default {
		name: 'position',
		props: {
			symbolLeft: {
				default: '',
				type: String,
				required: false
			},
			symbolDetail: {
				default: () => {},
				type: Object
			},
			isShow: {
				default: false,
				type: Boolean,
				required: false
			}
		},
		data() {
			return {
				list: [],
				checked: false,
				show: false,
				activeItem: {},
				newPrice: 0,
				form: {
					entrust_price: '',
					amount: ''
				},
				strategyForm: {
					symbol: '',
					position_side: '',
					tp_trigger_price: '',
					sl_trigger_price: ''
				},
				stoplossShow: false,
				dtime: null,
				timer: null
			};
		},
		watch: {
			symbolLeft(n) {
				if (n) this.holdPosition();
			},
			isShow(n) {
				if (n) {
					this.holdPosition();
				} else {
					this.ws.send({
						cmd: 'unsub',
						msg: `swapTradeList_${this.symbolLeft}`
					});
				}
			}
		},
		computed: {
			...mapState({
				ws: 'ws1'
			})
		},
		methods: {
			// 多仓盈亏
			many(item, newPrice) {
				let face = this.symbolDetail.unit_amount;
				return math.omitTo(((newPrice - item.avg_price) * item.avail_position * face) / item.avg_price, 4);
			},
			// 空仓盈亏
			air(item, newPrice) {
				let face = this.symbolDetail.unit_amount;
				return math.omitTo(((item.avg_price - newPrice) * item.avail_position * face) / item.avg_price, 4);
			},
			holdPosition(boo) {
				let data = {
					symbol: (this.checked && this.symbolLeft) || ''
				};
				Contract.holdPosition(data, {
					loading: !boo
				}).then(res => {
					this.list = res.data.filter(item => item.hold_position);
					if (!boo) {
						this.sendPrice();
					}
				});
				var token = uni.getStorageSync('token')
				if (token) {
					this.timer = setTimeout(() => {
						//需要定时执行的代码
						this.holdPosition(true);
					}, 10000)
				} else {
					clearInterval(this.timer)
				}
			},
			// 限价平仓
			closePositionShow(item) {
				this.activeItem = item;
				this.form.amount = this.activeItem.avail_position
				this.$set(this.activeItem, 'closeType', 2);
				this.show = true;
			},
			// 获取买卖盘
			getMarketInfo() {
				let data = {
					symbol: this.symbolLeft
				};
				Contract.getMarketInfo(data).then(res => {
					this.newPrice = res.data.swapTradeList[0].price;
				});
			},
			closePosition() {
				let data = {
					side: this.activeItem.side == 1 ? 2 : 1,
					type: this.activeItem.closeType,
					symbol: this.activeItem.symbol,
					entrust_price: this.form.entrust_price || 0,
					amount: this.form.amount
				};
				Contract.closePosition(data, {
					btn: this.$refs.btn
				}).then(() => {
					this.show = false;
					this.form.entrust_price = '';
					this.form.amount = '';
					this.holdPosition();
					this.$toast(this.$t('contract.j0'));
				});
			},
			// 一键平仓
			ifCloseAllPosition(item) {
				this.$dialog
					.confirm({
						title: this.$t('contract.c4'),
						message: `${this.$t('contract.j1')}${item.pair_name}?`,
						confirmButtonText: this.$t('common.confirm'),
						cancelButtonText: this.$t('common.cancel')
					})
					.then(() => {
						this.closeAllPosition(item);
					});
			},
			closeAllPosition(item) {
				let data = {
					symbol: item.symbol,
					side: item.side == 1 ? 2 : 1
				};
				Contract.closeAllPosition(data, {
					loading: true
				}).then(() => {
					this.$toast(`${this.$t('contract.j2')}${item.pair_name}${this.$t('contract.j3')}`);
					this.holdPosition();
				});
			},
			// 获取最新价格
			sendPrice() {
				this.ws.send({
					cmd: 'sub',
					msg: `swapTradeList_${this.symbolLeft}`
				});
			},
			socketMessage() {
				this.ws.on('message', res => {
					let symbol = this.symbolLeft;
					let {
						data,
						sub
					} = res;
					switch (sub) {
						case `swapTradeList_${symbol}`:
							this.newPrice = data.price;
							break;
					}
				});
			},
			// 止盈止损
			toStoploss(item) {
				this.activeItem = item;
				this.strategyForm.symbol = this.activeItem.symbol;
				this.strategyForm.position_side = this.activeItem.side;
				this.stoplossShow = true;
			},
			stoploss() {
				Contract.setStrategy(this.strategyForm, {
					btn: this.$refs.strateBtn
				}).then(() => {
					this.strategyForm.tp_trigger_price = '';
					this.strategyForm.sl_trigger_price = '';
					this.stoplossShow = false;
					this.$toast(this.$t('contract.j4'));
				});
			},
			// 一键全平
			onekeyAllFlat() {
				this.$dialog
					.confirm({
						title: this.$t('contract.c4'),
						message: this.$t('contract.k9') + `?`,
						cancelButtonText: this.$t('common.cancelButtonText'),
						confirmButtonText: this.$t('common.confirmButtonText')
					})
					.then(() => {
						Contract.onekeyAllFlat({}).then(() => {
							this.holdPosition(true);
							this.$toast(this.$t('contract.l0'));
						});
					});
			},
			// 一键反向
			onekeyReverse(item) {
				this.$dialog
					.confirm({
						title: this.$t('contract.c4'),
						message: this.$t('contract.l1') + `?`,
						cancelButtonText: this.$t('common.cancelButtonText'),
						confirmButtonText: this.$t('common.confirmButtonText')
					})
					.then(() => {
						Contract.onekeyReverse({
							symbol: item.symbol,
							position_side: item.side
						}).then(() => {
							this.holdPosition(true);
							this.$toast(this.$t('contract.l2'));
						});
					});
			}
		},
		mounted() {
			if (this.symbolLeft) {
				this.getMarketInfo();
				this.holdPosition();
			}
			// this.dtime && clearInterval(this.dtime);
			// this.dtime = setInterval(() => {
			// 	if (this.symbolLeft) {
			// 		this.holdPosition(true);
			// 	}
			// }, 10000);
		},
		beforeDestroy() {
			clearInterval(this.dtime);
			this.ws.send({
				cmd: 'unsub',
				msg: `swapTradeList_${this.symbolLeft}`
			});
		}
	};
</script>
<style lang="scss" scoped>
	.data-list {
		.row:first-of-type {
			margin-right: $padding-sm;
		}
	}
</style>
