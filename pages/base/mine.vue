<template>
	<view class="flex-col">
		<v-header :title="$t('base.d2')" :left-arrow="false"></v-header>
		<!-- <view style="height: var(--status-bar-height)"></view> -->
		<view class=" p-x-md">
			<view class="bg-panel-3 p-xs p-x-md rounded-lg bgb3" :class="theme == 'light' ? 'bgb3-white' : ''"
				style="position: relative">
				<view class=" d-flex   align-center">
					<text class="fn-12 d-block color-gray-4 m-t-xs">{{ $t('base.d6') }}(USDT)</text>
					<view class="fn-20 m-t-md m-l-md" @click="setHide(!hideMoney)">
						<van-icon v-if="!hideMoney" name="eye-o" />
						<van-icon v-else name="closed-eye" />
					</view>
				</view>
				<view class=" d-flex ">
					<!-- <text class="fn-16 d-block color-light ">{{ filterMoney(account.funds_account_btc) }}</text> -->
					<text class="fn-16 d-block color-light ">{{ filterMoney(totalAmount) }}</text>

				</view>
				<!-- <view class=" d-flex justify-center">
			<text class="fn-sm d-block m-t-xs color-gray-6"
			  >≈{{ filterMoney(account.funds_account_usd) }} USDT</text
			>
		</view> -->
				<view class="p-t-xs p-b-ms" style="margin-top: 10px">
					<view class="d-flex justify-between align-center rounded-lg">
						<v-link tag="view" to="/pages/assets/recharge"
							class="d-flex botton-border align-center p-y-xxs rounded-xs w-33 justify-center ">
							<!-- <view class="m-r-xs align-center">
	            <img
	              :src="$localImgUrl('12.png')"
	              alt=""
	              class="h-25"
	            />
	          </view> -->
							<text class="color-light fn-middle">{{ $t('base.b5') }}</text>
						</v-link>
						<v-link tag="view" to="/pages/assets/draw"
							class="d-flex botton-border align-center p-y-xxs rounded-xs w-33 justify-center  ">
							<!-- <view class="m-r-xs align-center">
	            <img
	              :src="$localImgUrl('5.png')"
	              alt=""
	              class="h-25"
	            />
	          </view> -->
							<!-- 提币 -->
							<text class="color-light fn-middle" @click="Toclick">{{ $t('base.b6') }}</text>
						</v-link>
						<v-link tag="view" to="/pages/transfer/index"
							class="d-flex botton-border align-center p-y-xxs rounded-xs w-33 justify-center ">
							<!-- <view class="m-r-xs align-center">
	            <img
	              :src="$localImgUrl('hua.png')"
	              alt=""
	              class="h-25"
	            />
	          </view> -->
							<text class="color-light fn-middle">{{ $t('base.d8') }}</text>
						</v-link>
						<!-- <v-link tag="view" to="/pages/assets/draw" class="d-flex bg-form-panel-3 align-center p-y-xxs rounded-xs w-33 justify-center shadow-panel-4 ">
			  <view class="m-r-xs align-center">
			    <img
			      :src="$localImgUrl('5.png')"
			      alt=""
			      class="h-25"
			    />
			  </view>
			  <text class="color-light fn-middle">{{
			    $t("base.b10")
			  }}</text>
			</v-link> -->
					</view>
				</view>
			</view>
		</view>

		<view class="layout-main">
			<!-- 头部 -->
			<view class="top p-t-md">
				<van-tabs :active="tabActive" @change="changtTab" :border="false" v-if="show" :line-width="30" swipeable
					animated class="tabs-main d-flex justify-between align-center flex-col">
					<van-tab :title="$t('base.d7')" :name="0">
						<view class="m-x-md m-y-md">
							<view
								class="head bg-panel-3  bg-form-panel-3 shadow-panel-nei p-x-md d-flex justify-between align-center  rounded-md color-plain p-x-md color-light p-xs box-nei-shadow">
								<view>
									<view class="fn-20 d-block color-light m-t-xs">
										<!-- <text class="fn-28">{{ filterMoney(account.total_assets_btc) }}</text> -->
										<text
											class="fn-20 d-block color-light">{{ filterMoney(account.total_assets_usd) }}</text>
									</view>
									<view class="fn-20 d-block color-light m-t-xs">
										<text class="fn-sm d-block ">{{ $t('base.d6') }}(USDT)</text>
									</view>
								</view>
							</view>

							<view class="h-60 d-flex justify-between align-center">
								<van-field :value="searchText" @input="searchText = $event.detail" left-icon="search"
									:placeholder="$t('base.d9')" input-class="fn-12 "
									class="flex-fill color-gray-6  rounded-md pos fn-12 m-r-md"
									style="padding-left: 0" />

								<van-checkbox :value="hide" @change="hide = !hide" icon-size="16"></van-checkbox>
								<text class="color-gray-6 p-r-xs" @click="hide = !hide">{{ $t('base.e0') }} 0
									{{ $t('base.e1') }}</text>
							</view>
							<view :to="{ path: '/pages/assets/bill', query: { coin_name: item.coin_name } }"
								v-show="ifShow(item)" class="p-t-xs d-block  rounded-md " style="margin: 10px 0;min-height: 120px;"
								v-for="(item, index) in list" :key="index">
								<view class="m-x-md d-flex justify-between align-center p-b-sm">
									<view>
										<img :src="item.image" class="w-20 h-20 rounded-max fn-middle" />
										<text class="fn-16 color-light fn-middle p-l-sm">{{ item.coin_name }}</text>
									</view>
									<view>
										<text
											class="fn-lg color-light fn-middle">{{ add(item.usable, item.freeze, 4) }}</text>
										<!-- <van-icon class="p-l-xs fn-middle" name="arrow" size="16" color="#646566" /> -->
									</view>
								</view>
								<view class="p-x-md d-flex justify-between align-center">
									<view class="w-4/12">
										<p class="color-gray-6" style="padding: 5px 0">{{ $t('base.b9') }}</p>
										<p class="fn-xs color-light">{{ item.usable }}</p>
									</view>
									<view class="w-4/12">
										<p class="color-gray-6" style="padding: 5px 0">{{ $t('base.e2') }}</p>
										<p class="fn-xs color-light">{{ item.freeze }}</p>
									</view>
									<view class="w-4/12 fn-right">
										<p class="color-gray-6" style="padding: 5px 0">{{ $t('base.e3') }}(USD)</p>
										<p class="fn-xs color-light">{{ omitTo(item.total, 4) }}
										</p>
									</view>
								</view>
								<view class="h-4 m-t-xs"></view>
							</view>
						</view>
					</van-tab>

					<van-tab :title="$t('base.e4')" :name="1" class="p-t-md">
						<view class="m-x-md">
							<view class="bgb3 p-x-md p-y-lg rounded-lg" :class="theme == 'light' ? 'bgb3-white' : ''"
								style="position: relative">
								<view class="fn-sm d-flex justify-between color-gray-6 m-t-xs">
									<span>USDT</span>
									<v-link class="color-buy" to="/pages/assets/account-bill">
										{{ $t('base.e4') }}
										<van-icon class="fn-middle" name="arrow" size="16" />
									</v-link>
								</view>
								<span
									class="fn-20 d-block color-light m-t-md">{{ filterMoney(account.contract_account_usd) }}{{ account.symbol }}</span>
								<view class="d-flex justify-between m-t-xs">
									<v-link to="/pages/transfer/index" class="d-flex">
										<view class="m-r-xs align-center"><img :src="$localImgUrl('fill4.png')" alt=""
												class="h-18" /></view>
										<!-- <van-icon class="color-theme-1 fn-26 fn-middle m-r-xs" name="exchange" /> -->
										<text class="color-light fn-middle">{{ $t('base.d8') }}</text>
									</v-link>
								</view>
							</view>
						</view>
					</van-tab>

					<!-- <van-tab :title="$t('expand.秒合约账户')" :name="2" class="p-t-md">
						<view class="m-x-md">
							<view class="bgb3 p-x-md p-y-lg rounded-lg" :class="theme == 'light' ? 'bgb3-white' : ''"
								style="position: relative">
								<view class="fn-sm d-flex justify-between color-gray-6 m-t-xs">
									<span>USDT</span>
									<v-link class="color-buy" to="/pages/assets/account-miao">
										{{ $t('expand.秒合约账户') }}
										<van-icon class="fn-middle" name="arrow" size="16" />
									</v-link>
								</view>
								<span
									class="fn-20 d-block color-light m-t-md">{{ filterMoney(account.second_account_usd) }}{{ account.symbol }}</span>
								<view class="d-flex justify-between m-t-xs">
									<v-link to="/pages/transfer/index" class="d-flex">
										<view class="m-r-xs align-center"><img :src="$localImgUrl('fill4.png')" alt=""
												class="h-18" /></view> -->
										<!-- <van-icon class="color-theme-1 fn-26 fn-middle m-r-xs" name="exchange" /> -->
										<!-- <text class="color-light fn-middle">{{ $t('base.d8') }}</text>
									</v-link>
								</view>
							</view>
						</view>
					</van-tab> -->

					
				</van-tabs>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import Wallet from '@/api/wallet';
	import math from '@/utils/class/math.js';
	import Contract from '@/api/contract.js';

	export default {
		name: 'mine',
		data() {
			return {
				NewAddress: '',
				account: {
					total_assets_usd: 0
				},
				list: [],
				tabActive: 0, // 切换选择
				searchText: '',
				hide: false,
				show: false,
				accountDetail: {},
				accountDetail2: {},
				accountDetail3: {},
				otc_info: []
			};
		},
		computed: {
			...mapState({
				hideMoney: 'hideMoney',
				theme: 'theme'
			}),
			totalAmount: function() {
				if (!this.account) return 0
				return this.account.second_account_usd + this.account.total_assets_usd
				// return this.account.contract_account_btc +
				// this.account.funds_account_usd +
				// this.account.otc_account_usd +
				// this.account.second_account_usd
			}
		},
		props: {
			isShow: {
				default: true,
				type: Boolean,
				required: false
			}
		},
		watch: {
			isShow(n, o) {
				if (n) {
					this.upDateData();
				}
			}
		},
		methods: {
			omitTo: math.omitTo,
			// 计算和
			add: math.add,
			...mapActions({
				setHide: 'hideMoney'
			}),
			filterMoney(val) {
				if (this.hideMoney) return '******';
				return this.omitTo(val, 8);
			},
			//充币
			Toclick() {
				this.NewAddress = uni.getStorageSync('address')
				console.log(this.NewAddress);
			},
			ifShow(item) {
				// 搜索过滤
				let show = item.coin_name.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1;
				if (!this.hide) return true && show;

				// 0余额资金过滤
				let hasMoney = this.add(item.usable, item.freeze, 4) * 1 != 0;
				return hasMoney && show;
			},
			fundAccount() {
				Wallet.fundAccount().then(res => {
					this.list = res.data;
					// this.otc_info = res.data.otc_info;
				});
			},
			personalAssets() {
				Wallet.personalAssets().then(res => {
					this.account = res.data;
					this.account.second_account_usd = 0
				});
			},
			// 获取合约列表
			accounts() {
				Contract.contractAccount().then(res => {
					this.accountDetail = res.data;
				});
			},

			changtTab($ev) {
				this.tabActive = $ev.detail.name;
				this.upDateData();
			},
			// 刷新数据
			upDateData() {
				this.accounts();
				this.personalAssets();
				this.fundAccount();
				// if (this.tabActive == 1) {

				// } else {
				// 	this.personalAssets();
				// 	this.fundAccount();
				// }
			}
		},
		mounted() {
			this.show = true;
			console.log(this.theme);
		},
		onShow() {
			this.upDateData();
		},
		created() {
			this.upDateData();
			// this.Toclick()
			// this.NewAddress=uni.getStorageSync('address')

		}
	};
</script>

<style lang="scss" scoped>
	.tabs-main {
		::v-deep.van-tabs {
			width: 100%;
		}

		::v-deep.van-tabs__wrap,
		::v-deep.van-tabs__content {
			// width: 100%;
		}

		::v-deep.van-tabs__content {
			flex: 1;
			overflow: hidden;
		}

		::v-deep.van-pull-refresh {
			height: calc(100vh - 200px);
			overflow-y: auto;
		}

		::v-deep.van-cell {
			background: transparent;

			&::after {
				position: absolute;
				box-sizing: border-box;
				-webkit-transform-origin: center;
				transform-origin: center;
				content: ' ';
				pointer-events: none;
				top: auto;
				right: 16px;
				bottom: 0;
				left: 16px;
				border-bottom: 1px solid #ebedf0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}
		}

		::v-deep .van-cell__left-icon {
			// color: $white;
		}
	}

	.bgb3 {
		background: linear-gradient(90deg, #3771e2, #134cbc);
		background-size: 100% auto;
		background-position: right bottom;

		&.bgb3-white {
			background-image: url(../../static/img/light/bgb3.png);
		}
	}

	.bgb4 {
		background: url(../../static/img/bgb4.png) no-repeat;
		background-size: 100% auto;
		background-position: right bottom;
	}

	.pos {
		position: relative;
	}

	.posa {
		position: absolute;
	}

	.w-33 {
		width: 30%;
	}

	.p-y-xxs {
		padding: 5px 0;
	}

	.p-xs {
		padding: 6px;
	}

	// .p-b-ms{
	// 	padding-bottom: 8px;
	// }
	.botton-border {
		border: 0.01333rem solid hsla(0, 0%, 100%, 0.1);
	}
</style>
