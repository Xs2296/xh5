<template>
	<v-page>
		<v-header :title="$t('otc.b9')">
			<template #right>
				<v-link class="fn-lg" :to="{ path: '/pages/otc/bind-pay?type=bank_card' }"><van-icon name="plus" /></v-link>
			</template>
		</v-header>
		<view class="box-page">
			<view class="bank-item" v-for="(item, i) in dataList" :key="i">
				<view class="d-flex">
					<view class="img"><image src="../../static/img/icon_bank.png" style="width: 100%;height: 100%;"></image></view>
					<view class="info">
						<view class="label">{{ item.bank_name }}</view>
						<view class="group">
							<view class="">{{ hideMiddle2(item.bank_username) + '&nbsp;|&nbsp;' }}</view>
							<view class="">{{ hideMiddle(item.bank_card) }}</view>
						</view>
					</view>
				</view>
				<view class="icon" @click="showDelBank(item)"><van-icon name="delete" /></view>
			</view>
		</view>
		<van-popup :show="delShow" @close="delShow = false" closeable round custom-style="width:70%;padding:15px;">
			<view class="box-popup">
				<label>{{ $t('expand.请输入资金密码') }}</label>
				<view class="item-info padding-input"><v-input class="box-inp-bg" v-model="pay_pass" type="password" :placeholder="$t('expand.请输入资金密码')"></v-input></view>

				<van-button type="info" class="buy-btn" @click="deleteBank">{{ $t('expand.确认删除') }}</van-button>
			</view>
		</van-popup>
	</v-page>
</template>

<script>
import Otc from '@/api/otc';
export default {
	name: '',
	data() {
		return {
			delShow: false,
			data: [],
			dataList: [],
			pay_pass: '',
			pay_pass: '',
			bankItem: null
		};
	},
	components: {},
	created() {
		this.getBankList();
	},
	mounted() {},
	methods: {
		getBankList() {
			Otc.getBankList().then(res => {
				this.dataList = res.data;
			});
		},
		showDelBank(item) {
			this.delShow = true;
			this.bankItem = item;
		},
		deleteBank() {
			let para = {
				id: this.bankItem.id,
				pay_pass: this.pay_pass
			};
			Otc.delBankList(para).then(res => {
				this.delShow = false;
				this.getBankList();
			});
		},
		hideMiddle(val) {
			return `${val.substring(0, 3)}****${val.substring(val.length - 4)}`;
		},
		hideMiddle2(val) {
			return `${val.substring(0, 1)}**${val.substring(val.length)}`;
		}
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
.layout-page {
	font-size: 16px;
}
.box-page {
	padding: 15px;
	height: 100vh;
	font-size: 16px;
	overflow-y: auto;
}
.bank-item {
	padding: 15px 0;
	border-bottom: 1px solid #dcdcdc;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.img {
		width: calc(40em * 0.0625);
		height: calc(40em * 0.0625);
		margin-right: 4px;
	}
	.info {
		.group {
			display: flex;
			font-size: calc(14em * 0.0625);
		}
	}
	.icon {
		font-size: calc(24em * 0.0625);
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
.padding-input {
	padding: calc(10em * 0.0625) 0 0;
}
.box-inp-bg {
	width: 100%;
	font-size: calc(18em * 0.0625);
	background-color: var(--listline);
	border-radius: 5px;
	padding: 8px;
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
</style>
