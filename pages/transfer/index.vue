<template>
	<v-page>
		<v-header class="nav-head" :title="$t('transfer.a8')">
			<template #right>
				<v-link to="/pages/transfer/bill">
					<van-icon class="fn-20 m-t-xs" name="todo-list-o" />
				</v-link>
			</template>
		</v-header>
		<main class="">
			<view style="height: var(--status-bar-height)"></view>
			<view class="top">
				<view style="height: var(--status-bar-height)"></view>
			</view>
			<view class="panel-box m-x-md rounded p-md bg-panel-3 box-shadow">
				<v-picker :list="fromList" v-model="form.from_account" class="from item border-b p-y-xs p-l-md">
					<view class="label fn-sm color-gray-6">{{ $t("transfer.a9") }}</view>
					<view class="select d-flex align-center">
						<span class="fn-lg color-light">{{
              accountMap[form.from_account]
            }}</span>
						<van-icon class="m-l-xs fn-lg" name="arrow" />
					</view>
				</v-picker>
				<v-picker :list="toList" v-model="form.to_account" class="to item p-y-xs p-l-md">
					<view class="label fn-sm color-gray-6">{{ $t("transfer.b0") }}</view>
					<view class="select d-flex align-center">
						<span class="fn-lg color-light">{{
              accountMap[form.to_account]
            }}</span>
						<van-icon class="m-l-xs fn-lg" name="arrow" />
					</view>
				</v-picker>
				<view class=""></view>
				<view class="exchange d-flex justify-center align-center bg-panel-3 box-shadow link-active"
					@click="swap">
					<van-icon style="transform:rotateZ(90deg)" class="fn-22 color-light" name="exchange" />
				</view>
			</view>
			<v-picker :list="coinList" v-model="form.coin_name" range-label="coin_name" range-value="coin_name" class=""
				@change="onChangeCoin">
				<view class="m-md p-md d-flex rounded bg-panel-3 box-shadow">
					<view class="flex-fill">{{ $t("transfer.b1") }}</view>
					<view class="color-light">{{ form.coin_name }}</view>
					<van-icon class="m-l-xs" name="arrow" />
				</view>
			</v-picker>
			<view class="m-md p-md rounded bg-panel-3 box-shadow">
				<view class="label fn-sm d-flex justify-between">
					<view>{{ $t("transfer.b1") }}</view>
					<view class=" fn-sm">{{ $t("transfer.b2") }}：{{ activeCoin.usable_balance }}</view>
				</view>
				<view class="m-t-md">
					<v-input placeholder="0.000" v-model="form.amount" class="fn-20">
						<template #right>
							<view class="d-flex fn-md">
								<view class="m-r-xs">{{ form.coin_name }}</view>
								<view class="border-l color-buy p-l-xs" @click="change">{{ $t("transfer.b3") }}</view>
							</view>
						</template>
					</v-input>
				</view>

			</view>

		</main>
		<view class="m-x-md">
			<view class="  rounded-md ">
				<v-button class="w-max rounded-md" block type="blue" ref="btn" @click="fundsTransfer">
					{{ $t("common.confirm") }}
				</v-button>
			</view>
		</view>
	</v-page>
</template>
<script>
	import Wallet from "@/api/wallet";
	import {
		mapGetters
	} from "vuex";
	import lodash from "lodash";
	export default {
		data() {
			return {
				coinList: [],
				accountsList: [],
				//
				accountMap: {},
				// 转换映射列表
				transferList: {},
				form: {
					from_account: 1,
					to_account: 3,
					amount: ''
				},
				activeCoin: {},
			};
		},
		computed: {
			fromList() {
				return Object.keys(this.transferList).map((item) => {
					return {
						label: this.accountMap[item],
						value: item,
					};
				});
			},
			toList() {
				if (!this.transferList[this.form.from_account]) return [];
				return this.transferList[this.form.from_account].map((item) => {
					return {
						label: this.accountMap[item],
						value: item,
					};
				});
			},
			...mapGetters(["themeStyle"]),
		},
		watch: {
			// 切换取默认值
			["form.from_account"](n) {
				if (!this.transferList[n].includes(this.form.to_account)) {
					this.form.to_account = this.transferList[n][0];
				}
				this.getUserCoinAssets();
			},
			["form.to_account"](n) {
				this.getUserCoinAssets();
			},
			coinList() {
				if (!this.coinList.includes(this.form.coin_name)) {
					if (this.coinList[0]) {
						this.form.coin_name = this.coinList[0].coin_name;
					} else {
						this.form.coin_name = "";
					}
				}
			},
		},
		methods: {
			onChangeCoin(item) {
				this.form.coin_name = item
				this.form.amount = 0
				this.getBalance()
			},
			// 互换位置
			swap() {
				[this.form.from_account, this.form.to_account] = [
					this.form.to_account,
					this.form.from_account,
				];
			},
			// 划转
			fundsTransfer() {
				Wallet.transfer(this.form)
					.then(() => {
						this.$toast.success(this.$t("transfer.b4"));
						this.form.amount = "";
						this.getUserCoinAssets();
					})
					.catch(() => {});
			},
			// 获取划转币种
			getUserCoinAssets: lodash.debounce(function() {
				Wallet.coinList({
						from_account: this.form.from_account,
						to_account: this.form.to_account,
					})
					.then((res) => {
						this.coinList = res.data;
						if (this.coinList[0]) {
							this.form.coin_name = this.coinList[0].coin_name;
							this.getBalance();
						}
					})
					.catch(() => {});
			}, 300),
			// 获取划转类型
			accounts() {
				Wallet.accounts().then((res) => {
					this.accountsList = res.data;
					// 生成map
					this.accountsList.forEach((item) => {
						this.accountMap[item.id] = item.name;
					});
					// 生成映射 (谁转换谁)
					this.transferList = {};
					this.accountsList.forEach((item) => {
						let sourceId = this.accountsList.find(
							(item) => item.type == "Sport"
						).id; //账户资产 可以转其他的资金，其他资金不能 转账户资产
						if (sourceId != item.id) {
							this.transferList[item.id] = [sourceId];
							if (!this.transferList[sourceId]) this.transferList[sourceId] = [];
							this.transferList[sourceId].push(item.id);
						}
					});
					this.getUserCoinAssets();
				});
			},
			// 获取余额
			getBalance: lodash.debounce(function() {
				let data = {
					account: this.form.from_account,
					coin_name: this.form.coin_name,
				};
				Wallet.getBalance(data).then((res) => {
					this.activeCoin = res.data;
				});
			}),
			change() {
				this.form.amount = this.activeCoin.usable_balance
			}
		},
		created() {
			this.accounts()

			// var fun=lodash.throttle((e)=>{
			//   console.log(1,e)
			// },1000)
			// setInterval(() => {
			//   fun(2)
			// }, 60);
		},
	};
</script>
<style lang="scss" scoped>
	.nav-head {
		position: absolute;
		left: 0;
		width: 100%;

		// background: transparent;
		&::after {
			border: none;
		}
	}

	.top {
		// background: linear-gradient(180deg, #c86b49, $theme-1);
		height: 150px;
	}

	.panel-box {
		margin-top: -70px;
		position: relative;

		.line {
			position: absolute;
			height: 100%;
			width: 1px;
			background: $border-color;
			transform: scale(0.5);
			top: 0;

			&::before,
			&::after {
				content: "";
				display: inline-block;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 12px;
				height: 12px;
				border-radius: 50%;
			}

			&::before {
				top: 0;
				background: $blue;
			}

			&::after {
				bottom: 0;
				background: $red;
			}
		}

		.exchange {
			position: absolute;
			right: $padding-sm;
			top: 50%;
			height: 40px;
			width: 40px;
			border-radius: 50%;
			transform: translateY(-50%);
		}
	}
</style>
