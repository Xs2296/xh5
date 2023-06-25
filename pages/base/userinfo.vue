<template>
	<v-page class="page-box">
		<!-- 头部 -->
		<v-header :title="$t('base.e9')" :left-arrow="false"></v-header>
		<view class="userinfoHeader">
			<!-- <van-icon name="user-circle-o" class="color-theme-1 fn-30" /> -->
			<img :src="user.avatar" />
			<view class="p-y-xs fn-14">{{ user.username }}</view>
			<view class="p-y-xs fn-14">UID:{{ user.user_id }}</view>
		</view>
		<!-- 中间 -->

		<view class="m-x-lg rounded-md box-shadow bg-panel-3" style="padding: 15px 0;">
			<v-link to="/pages/auth/index" tag="div" class="per-bot p-x-md border-b border-gray-7 p-y-md d-flex align-center justify-between bg-panel-3 ">
				<!-- 高级认证 -->
				<span class="color-light">{{ $t('auth.a4') }}</span>
				<view class="d-flex align-center">
					<!-- 0:a2 1:a5 2:a3 3:a6 -->
					<span class="color-right">
						{{ detail.status == 0 ? $t('auth.a2') : detail.status == 1 ? $t('auth.a5') : detail.status == 2 ? $t('auth.a3') : $t('auth.a6') }}
					</span>
					<van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop />
				</view>
			</v-link>

			<!-- <v-link tag="div" to="/pages/safe/email" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3"> -->
			<!-- <span class="color-light">资产记录</span> -->
			<!-- <view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view> -->
			<!-- </v-link> -->

			<v-link tag="div" to="/pages/exchange/contract_m_log" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<span class="color-light">{{ $t('expand.秒合约记录') }}</span>
				<view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view>
			</v-link>

			<!-- <v-link tag="div" to="/pages/safe/email" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3"> -->
			<!-- <span class="color-light">理财记录</span> -->
			<!-- <view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view> -->
			<!-- </v-link> -->

			<!-- <v-link tag="div" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">

				<view @click="changNav" style="width: 90%; display: flex;justify-content: space-between; align-items: center;">
					<view class="color-light" >{{ $t('expand.资金明细') }}</view>
					<view class="d-flex align-center" style="position: absolute;right: 15px;"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566"/></view>
				</view>
			</v-link> -->
			<v-link tag="div" to="/pages/assets/address-list" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<!-- 提币地址管理 -->
				<span class="color-light">{{ $t('assets.a0') }}</span>
				<view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view>
			</v-link>
			<!-- <v-link tag="div" to="/pages/otc/bind-pay?type=bank_card" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3"> -->
				<!-- 银行卡 -->
				<!-- <span class="color-light">{{ $t('otc.b9') }}</span> -->
				<!-- <view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view> -->
			<!-- </v-link> -->
			<!-- 银行卡 -->
			<!-- <v-link tag="div" to="/pages/otc/bank-list" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">

				<span class="color-light">{{ $t('otc.b9') }}</span>
				<view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view>
			</v-link> -->
			<v-link tag="div" to="/pages/invite/index" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<!-- 我要分享 -->
				<span class="color-light">{{ $t('contract.c8') }}</span>
				<view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view>
			</v-link>
			<view tag="div" @click="openUrl(logoMap.service_link)" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<!-- 在线客服 -->
				<span class="color-light">{{ $t('base.a10') }}</span>
				<view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view>
			</view>
			<v-link tag="div" to="/pages/help/index" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<!-- 帮助中心 -->
				<span class="color-light">{{ $t('base.a7') }}</span>
				<view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view>
			</v-link>
			<v-link tag="div" to="/pages/help/pingtai" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<!-- 平台介绍 -->
				<span class="color-light">{{ $t('expand.平台介绍') }}</span>
				<view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view>
			</v-link>
			<!-- <v-link tag="div" to="/pages/safe/email" class="per-bot border-b border-gray-7 p-x-md p-y-md d-flex align-center justify-between bg-panel-3"> -->
			<!-- <span class="color-light">意见反馈</span> -->
			<!-- <view class="d-flex align-center"><van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop /></view> -->
			<!-- </v-link> -->
		</view>

		<!-- <view class="m-t-lg p-x-md fn-center"> -->
		<!-- <van-button icon="exchange" class="w-max fn-lg m-b-md" color="#f05319" type="info" block @click="outLogin">{{ $t('accountSettings.a8') }}</van-button> -->
		<!-- <view class="m-t-md"> -->
		<!-- <v-button block class="w-max color-light" plain @click="loginOut">{{ $t('accountSettings.a9') }}</v-button> -->
		<!-- </view> -->
		<!-- </view> -->

		<view class="footer m-x-lg">
			<view class="item-group">
				<label>{{$t('expand.关于我们')}}</label>
				<view class="item">
					<view class="info" v-for="(item, index) in service" :key="index" @click="$router.push(item.url)">{{ item.label }}</view>
				</view>
			</view>
			<view class="item-group">
				<label>{{$t('base.a7')}}<!-- 帮助中心 --></label>
				<view class="item">
					<view class="info" @click="openUrl('https://down.bitcoinified.com')">{{$t('expand.下载APP')}}</view>
					<view class="info" @click="$router.push('/pages/assets/recharge')">{{$t('expand.一键买币')}}</view>
					<view class="info" @click="openUrl2('mine')">{{$t('expand.账变记录')}}</view>
					<view class="info" @click="openUrl2('contract')">{{$t('contract.a4')}}<!-- 合约交易 --></view>
					<view class="info" @click="openUrl2('contract-m')">{{$t('expand.秒合约交易')}}</view>
				</view>
			</view>
			<view class="item-group">
				<label>{{$t('expand.学习')}}<!-- 学习 --></label>
				<view class="item">
					<view class="info" @click="$router.push('/pages/help/index')">{{$t('base.a7')}}<!-- 帮助中心 --></view>
					<view class="info" @click="$router.push('/pages/contact/index')">{{$t('expand.联系我们')}}</view>
					<view class="info" @click="$router.push('/pages/notice/index')">{{$t('expand.公告中心')}}</view>
				</view>
			</view>
			<view class="item-group">
				<label>{{$t('expand.联系我们')}}</label>
				<view class="item">
					<view class="info">
						{{$t('common.email')}}:{{ '&nbsp;&nbsp;' }}
						<span style="color: #ceb359;">{{contacts.email}}</span>
					</view>
				</view>
			</view>
			<view class="item-group">
				<view class="item">
					<view class="info">{{$t('expand.msg1')}}</view>
					<view class="info">{{$t('expand.msg2')}}</view>
					<view class="info">{{$t('expand.msg3')}}</view>
				</view>
			</view>
			<view class="item-group">
				<view class="item-title">
					<view class="info">{{ logoMap.copyright }}</view>
				</view>
			</view>
		</view>
	</v-page>
</template>

<script>
import College from '@/api/college';
import { mapState, mapGetters } from 'vuex';
import Member from '@/api/member';
import Profile from "@/api/profile";
import ContactUs from '@/api/contactUs';
export default {
	data() {
		return {
			detail:{},
			service:[],
			contacts:''
		};
	},
	computed: {
		...mapState({
			user: 'user',
			logoMap: 'logoMap'
		}),
		...mapGetters(['themeStyle'])
	},
	created(){
	    this.getAuthInfo()
		this.getServiceLink();
		ContactUs.contact()
			.then(data => {
				this.contacts = data.data;

			})
			.catch(err => {});
	},
	methods: {
		openUrl(url) {
			window.open(url);
		},
		openUrl2(url) {
			uni.$emit('topNavTab', { name: url });
		},
		getAuthInfo(){
		    Profile.getAuthInfo().then(res=>{
		        this.detail = res.data
		    })
		},
		changeNickname() {
			this.$router.push({ path: '/changeNickname' });
		},

		// 切换用户
		outLogin() {
			uni.removeStorageSync('token');
			this._router.replace({
				path: '/pages/login/index',
				query: {
					notLogin: 1,
					from: '/pages/accountSettings/accountSettings'
				}
			});
		},
		// 退出登录
		loginOut() {
			Member.logout({}, { toast: true })
				.then(() => {
					this.outLogin();
				})
				.catch(() => {});
		},
		changNav() {
			// this.navName = name;
			uni.$emit('topNavTab', { name: 'mine' })
		},
		getServiceLink() {
			this.service = [];
			College.getServiceList()
				.then(list => {
					list.data.forEach(item => {
						this.service.push({
							url: `/pages/server/index?id=${item.id}&name=${item.name}`,
							label: item.name
						});
					});
		 	})
		 	.catch(err => {});
		},
	}
};
</script>

<style lang="scss" scoped>
.page-box{
	height: 100vh !important;
	overflow-y: auto;
	margin-bottom: 60px;
}
.head-account {
	font-size: 20px;
}
.userinfoHeader {
	text-align: center;
	img {
		border-radius: 50%;
		height: 80rpx;
		width: 80rpx;
	}
}
.border-b::after{
	border-bottom: none;
}
.footer {
	margin-top: 25px;
	line-height: 2;
	.item-group {
		margin-top: calc(6em * 0.0625);
		uni-label {
			font-size: calc(18em * 0.0625);
			font-weight: bold;
		}
		.item {
			width: 100%;
			margin-top: calc(6em * 0.0625);
			display: flex;
			flex-wrap: wrap;
			    // justify-content: space-between;
			.info {
				// flex: 1;
				margin: 0 4px;
				min-width: 22.5%;
				font-size: calc(14em * 0.0625);
				line-height: 2;
			}
		}
		.item-title {
			width: 100%;
			text-align: center;
			.info {
				font-size: calc(12em * 0.0625);
				line-height: 2;
			}
		}
	}
}
</style>
