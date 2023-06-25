<template>
	<v-page>
		<!-- 头部 -->
		<v-header :title="$t('accountSettings.a0')"></v-header>

		<!-- 中间 -->
		<view class=" m-y-sm rounded-md m-x-lg overflow-hidden box-shadow">
			<view
				class="p-y-xs per-bot p-x-md h-36 border-b border-gray-7 d-flex align-center justify-between bg-panel-3 ">
				<span class="color-light">{{$t('accountSettings.a1')}}</span>
				<view class="d-flex align-center">
					<van-icon name="user-circle-o" class="color-theme-1 fn-30" />
				</view>
			</view>
			<view class="per-bot p-x-md p-y-md border-b border-gray-7 d-flex align-center justify-between bg-panel-3">
				<span class="color-light">{{$t('accountSettings.a2')}}</span>
				<view class="d-flex align-center">
					<span>{{user.username}}</span>
				</view>
			</view>
			<view class="per-bot p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<span class="color-light">{{$t('accountSettings.a3')}}</span>
				<view class="d-flex align-center">
					<span>{{user.account}}</span>
				</view>
			</view>
		</view>
		<view class="m-x-lg rounded-md overflow-hidden box-shadow">
			<v-link to="/pages/safe/phone" tag="div"
				class="per-bot p-x-md border-b border-gray-7 p-y-md d-flex align-center justify-between bg-panel-3 ">
				<span class="color-light">{{$t('accountSettings.a4')}}</span>
				<view class="d-flex align-center">
					<span class="color-right">{{user.phone}}</span>
					<span class="color-theme-1 m-l-xs" v-if="user.phone">{{$t('accountSettings.a5')}}</span>
					<span class="color-theme-1 m-l-xs" v-else>{{$t('accountSettings.a6')}}</span>
					<van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop />
				</view>
			</v-link>

			<v-link tag="div" to="/pages/safe/email"
				class="per-bot p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<span class="color-light">{{$t('accountSettings.a7')}}</span>
				<view class="d-flex align-center">
					<span>{{user.email}}</span>
					<span class="color-theme-1 m-l-xs" v-if="user.email">{{$t('accountSettings.a5')}}</span>
					<span class="color-theme-1 m-l-xs" v-else>{{$t('accountSettings.a6')}}</span>
					<van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop />
				</view>
			</v-link>
		</view>
		<view class="m-y-sm m-x-lg overflow-hidden rounded-md box-shadow">
			<view class="per-bot p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<view class="color-light">{{$t('accountSettings.b2')}}</view>
				<view class="d-flex align-center">
					<v-lang />
					<van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop />
				</view>
			</view>
		</view>

		<view class="m-x-lg rounded-md overflow-hidden box-shadow">
			<view @click="outLogin"
				class="per-bot p-x-md border-b border-gray-7 p-y-md d-flex align-center justify-between bg-panel-3 ">
				<span class="color-light">{{$t('accountSettings.a8')}}</span>
				<view class="d-flex align-center">
					<van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop />
				</view>
			</view>

			<view @click="loginOut" class="per-bot p-x-md p-y-md d-flex align-center justify-between bg-panel-3">
				<span class="color-light">{{$t('accountSettings.a9')}}</span>
				<view class="d-flex align-center">
					<van-icon class="p-l-xs" name="arrow" size="16" color="#646566" @click.stop />
				</view>
			</view>
		</view>

		<!-- <view class="m-t-lg p-x-md fn-center">
      <van-button
        icon="exchange"
        class="w-max fn-lg m-b-md"
        color="#f05319"
        type="info"
        block
        @click="outLogin"
      >{{$t('accountSettings.a8')}}</van-button>
      <view class="m-t-md">
        <v-button block  class="w-max color-light" plain @click="loginOut">{{$t('accountSettings.a9')}}</v-button>
      </view>
    </view> -->
	</v-page>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex";
	import Member from "@/api/member";
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState({
				user: "user",
			}),
			...mapGetters(['themeStyle'])
		},
		methods: {

			changeNickname() {
				this.$router.push({
					path: "/changeNickname"
				});
			},

			// 切换用户
			outLogin() {
				uni.removeStorageSync("token");
				this._router.replace({
					path: "/pages/login/index",
					query: {
						notLogin: 1,
						from: '/pages/accountSettings/accountSettings',
					},
				});
				uni.clearStorage();
				uni.clearStorageSync()
			},
			// 退出登录
			loginOut() {
				Member.logout({}, {
						toast: true
					})
					.then(() => {
						this.outLogin();
					})
					.catch(() => {});
				uni.clearStorage();
				uni.clearStorageSync()
			},
		},
	};
</script>

<style lang="scss" scoped>
	.head-account {
		font-size: 20px;
	}
</style>
