<template>
	<div class="layout-page" :style="themeStyle">
		<v-header :title="$t('exchange.a1')" :leftClick="() => _router.replace('/pages/base/index')"></v-header>
		<view class="layout-main">
			<!-- 申购数据和申购周期 -->
			<view class="m-md bg-form-panel-4 rounded p-md fn-center d-flex">
				<view class="w-6/12 d-flex align-center">
					<van-circle size="130" class="w-max" stroke-width="6" :value="detail.info.status*25"
						:color="{ '0%': '#27CAE0', '100%': '#4653EF' }">
						<view class="color-light fn-center fn-10">
							<view class="label m-b-xs color-default">{{ $t("purchase.a0") }}</view>
							<view class="fn-11">1 USDT≈</view>
							<view class="fn-11">
								<text class="fn-16">{{ detail.danjia }}</text>
								{{ detail.info.coin_name }}
							</view>
							<view class="fn-center fn-15 color-success">
								{{ detail.info.coin_name }}
							</view>
						</view>
					</van-circle>
				</view>
				<view>
					<view class="m-b-xs">
						<view class="label fn-10">{{ $t("purchase.a1") }}</view>
						<view class="color-light">{{ detail.info.subscribe_currency }}</view>
					</view>
					<view class="m-b-xs">
						<view class="label fn-10">{{ $t("purchase.a2") }}</view>
						<view class="color-light">{{detail.expected_time_online }}</view>
					</view>
					<view class="m-b-xs">
						<view class="label fn-10">{{ $t("purchase.a3") }}</view>
						<view class="color-light">{{detail.info.start_subscription_time}}</view>
					</view>
					<view class="m-b-xs">
						<view class="label fn-10">{{ $t("purchase.a4") }}</view>
						<view class="color-light">{{detail.info.end_subscription_time}}</view>
					</view>
				</view>
			</view>
			<!-- 申购 -->
			<view class="m-md bg-panel-4 rounded p-md box-shadow">
				<view class="title p-b-xs border-b">{{ $t("purchase.a5") }}</view>
				<view class="m-y-md">
					<view class="label">{{ $t("purchase.a1") }}</view>
					<v-picker :list="coinList" v-model="coin" range-label="coin_name" range-value="coin_name"
						class="border-b p-y-xs color-light">
						<v-input disabled :value="activeCoin.coin_name" :placeholder="$t('purchase.a6')">
							<template #right>
								<i class="iconfont">&#xe6e9;</i>
							</template>
						</v-input>
					</v-picker>
					<view class="tips m-t-xs fn-sm d-flex justify-between color-sell">
						<view>1 {{ activeCoin.coin_name }} ≈
							{{ omitTo(activeCoin.proportion_amount, 4) }}
							{{ detail.info.coin_name }}
						</view>
						<!-- <view class="color-sell">{{ num || 0 }} {{ activeCoin.coin_name }} ≈ {{ total }}
							{{ detail.info.coin_name }}
						</view> -->
					</view>
				</view>
				<view class="m-y-md">
					<view class="label">{{ $t("purchase.a7") }}</view>
					<view class="border-b p-y-xs color-light">
						<v-input type="number" v-model="num" :placeholder="$t('purchase.a8')">
							<template #right>
								<view class="color-success" @click="num = activeCoin.usable_balance * 1 || 0">
									{{ $t("purchase.a9") }}
								</view>
							</template>
						</v-input>
					</view>
				</view>
				<v-button block class="w-max rounded-lg" type="green" ref="btn" @click="ifSubscribeNow">
					{{ $t("purchase.b0") }}
				</v-button>
			</view>
			<!-- 周期 -->
			<view class="m-md bg-panel-4 rounded p-md box-shadow">
				<view class="title p-b-xs border-b">{{ $t("purchase.b1") }}</view>
				<van-steps :active="detail.info.status" :steps="[
          {
            text: $t('purchase.b2'),
            desc: '',
          },
          {
            text: $t('purchase.b3'),
            desc: detail.info.start_subscription_time
          },
          {
            text: $t('purchase.b4'),
            desc: detail.info.end_subscription_time
          },
          {
            text: $t('purchase.b5'),
            desc: detail.info.announce_time
          }
        ]" active-color="#79D47C" align-center direction="vertical">
				</van-steps>
			</view>
			<!-- 项目详情 -->
			<view class="m-md bg-panel-4 rounded p-md box-shadow">
				<view class="title p-b-xs border-b">{{ $t("purchase.b6") }}</view>
				<view class="m-t-md edit-content" style="overflow:auto;max-height:400upx;margin-bottom:70upx;"
					v-html="detail.info.project_details"></view>
			</view>

			<van-dialog id="van-dialog"></van-dialog>
		</view>
	</div>
</template>
<script>
	import Subscride from "@/api/subscride";
	import date from "@/utils/class/date";
	import math from "@/utils/class/math";
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				coinList: [{
					coin_name: "USDT",
					qtyDecimals: 2,
					priceDecimals: 4,
					proportion_amount: 0,
					subscribe_coin_name: '',
					usable_balance: 0
				}],
				detail: {
					info:{
						coin_name: ''
					}
				},
				num: "",
				coin: "USDT",
			};
		},
		computed: {
			...mapGetters(['themeStyle']),
			total() {
				if (!this.activeCoin.proportion_amount) return 0;
				return math.multiple(
					this.num || 0,
					this.activeCoin.proportion_amount * 1,
					2
				);
			},
			activeCoin() {
				if (!this.coin) return {};
				return this.coinList.find((item) => item.coin_name == this.coin);
			},
		},
		methods: {
			omitTo(num, idx) {
				if (!num) return 0;
				return math.omitTo(num, idx);
			},
			parseTime(num) {
				if (!num) return;
				return date.parseTime(num);
			},
			subscribeTokenList() {
				Subscride.subscribeTokenList().then((res) => {
					this.coinList = res.data;
					this.coin = this.coinList[0].coin_name;
				});
			},
			getInfo() {
				Subscride.subscribe().then((res) => {
					this.detail = res.data;
					this.coinList[0].proportion_amount = res.data.info.danjia
					this.coinList[0].subscribe_coin_name = res.data.info.coin_name
				});
			},
			// 选择币种
			selectCoin() {
				let arr = this.coinList.map((item) => {
					return {
						label: item.coin_name,
						value: item.coin_name,
					};
				});

				this.$picker(arr, {
					value: this.coin
				}).then((res) => {
					this.coin = res;
				});
			},
			// 提交询问
			ifSubscribeNow() {

				this.$dialog
					.confirm({
						title: this.$t("common.tips"),
						message: `${this.$t("purchase.b7")} ${this.activeCoin.coin_name} ${this.$t("purchase.b8")}？`,
						cancelButtonText: this.$t('common.cancelButtonText'),
						confirmButtonText: this.$t('common.confirmButtonText')
					})
					.then(() => {
						this.subscribeNow();
					})
					.catch(() => {});
			},
			// 申购
			subscribeNow() {
				let data = {
					money: this.num,
					coin_name: this.activeCoin.coin_name,
					id: this.detail.info.id
				};
				Subscride.subscribeNow(data, {
						btn: this.$refs.btn
					})
					.then((res) => {
						if (res) {
							this.$toast.success(this.$t("purchase.b9"));
							this.num = "";
						}
					})
					.catch(() => {});
			},
		},
		created() {
			// this.subscribeTokenList();
			this.getInfo();
		},
	};
</script>
<style lang="scss" scoped>
	::v-deep uni-canvas {
		width: 130px;
		height: 130px;
	}

	::v-deep .van-step--finish {
		color: $light;
	}

	::v-deep .van-step--vertical:first-child::before {
		background: transparent;
	}

	::v-deep .van-step--vertical {
		.van-step__circle-container {
			background-color: transparent;

			.van-icon-checked {
				width: 14px;
				height: 14px;
				background: rgba($green, 0.7);
				font-size: 0;
				display: block;
				border-radius: 20px;

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
	}
</style>
