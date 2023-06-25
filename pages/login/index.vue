<template>
	<v-page>
		<!-- <v-header class="nav-tab" :leftClick="()=>_router.replace('/pages/base/index')"></v-header><v-lang/> -->
		<v-header class="nav-tab" :leftClick="()=>_router.replace('/pages/base/index')">
			<template #right>
				<v-lang />
			</template>
		</v-header>
		<main class="flex-fill flex-shrink">
			<view class="fn-center p-t-lg p-b-md">
				<img :src="logoMap.login_logo" class="h-80" style="width:80px" />
			</view>
			<view class="form m-lg bg-panel-3 p-lg rounded-md box-shadow">
				<view class="form-item border-b m-b-lg p-b-xs ">
					<view class="label m-b-lg">{{$t('login.a0')}}</view>
					<v-input class="color-light" v-model="form.account" :placeholder="$t('login.a1')"></v-input>
				</view>
				<view class="form-item border-b m-b-xl p-b-xs">
					<view class="label m-b-lg">{{$t('login.a2')}}</view>
					<v-input class="color-light" v-model="form.password" type="password" :placeholder="$t('login.a3')">
					</v-input>
				</view>
				<view class="m-b-lg">
					<v-button type="blue" block class="w-max rounded-md" key="loginbtn" @click="toLogin">
						{{$t('login.a4')}}</v-button>
				</view>

			</view>
			<view class="m-x-lg m-y-md d-flex">

				<v-link tag="div" to="/pages/safe/forget-password" class="tips fn-sm color-sell">{{$t('login.a5')}}？
				</v-link>



				<view class="mlaotu fn-12">
					{{$t('login.a6')}}，
					<v-link to="/pages/reg/index?from=login" class="color-sell d-inline-block">{{$t('login.a7')}}
					</v-link>
				</view>
			</view>
		</main>
		<view class="m-x-lg p-x-lg">
			<!-- <view class="p-y-md border-t fn-center">
        {{$t('login.a6')}}，
        <v-link to="/pages/reg/index?from=login" class="color-theme-1 d-inline-block" >{{$t('login.a7')}}</v-link>
      </view> -->
		</view>
		<!-- 二次验证弹框 -->
		<van-popup :show="secondaryShow" @close="secondaryShow=false" closeable close-on-popstate position="bottom"
			custom-style="height:40%">
			<van-tabs class="m-t-lg p-t-lg" v-if="secondaryShow" :sticky="false" :active="form2.code_type"
				@change="changeTab">
				<van-tab title="Google" v-if="secondaryData.google_status==1" :name="3">
					<v-input class="border h-40 m-y-md m-x-lg p-x-md" type="number" :placeholder="$t('common.code')"
						v-model="form2.code"></v-input>
				</van-tab>
				<van-tab :title="$t('login.a8')" v-if="secondaryData.phone_status==1" :name="1">
					<v-input class="border h-40 m-y-md m-x-lg p-x-md" type="number" :placeholder="$t('common.code')"
						v-model="form2.code">
						<template #right>
							<v-code type="green-plain" url="/login/sendSmsCodeBeforeLogin"
								:data="{signature:form2.signature}" ref="mobileCode"></v-code>
						</template>
					</v-input>

				</van-tab>
				<van-tab :title="$t('login.a9')" v-if="secondaryData.email_status==1" :name="2">
					<v-input class="border h-40 m-y-md m-x-lg p-x-md" type="number" :placeholder="$t('common.code')"
						v-model="form2.code">
						<template #right>
							<v-code type="green-plain" url="/login/sendEmailCodeBeforeLogin"
								:data="{signature:form2.signature}" ref="emailCode"></v-code>
						</template>
					</v-input>
					<view class="m-md"></view>
				</van-tab>
			</van-tabs>
			<view class="m-md">
				<v-button type="blue" block class="w-max rounded-md" @click="sendCodeLogin">{{$t('login.a4')}}
				</v-button>
			</view>
		</van-popup>
		<van-toast id="van-toast" />
	</v-page>
</template>
<script>
	import Profile from "@/api/profile";
	import Member from "@/api/member";
	import {
		mapActions,
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				form: {
					type: 1,
					account: "",
					password: "",
				},
				form2: {
					code: "",
					code_type: "",
					signature: "",
				},
				secondaryData: {},
				secondaryShow: false,
				activeName: 1,
			};
		},
		computed: {
			...mapState({
				logoMap: "logoMap",
			}),
		},
		methods: {
			...mapActions({
				setToken: "token",
				setUser: "user",
			}),
			changeTab(ev) {
				this.form2.code_type = ev.detail.name
			},
			// 去登陆
			toLogin() {
				if (this.form.account.includes("@")) {
					this.form.type = 2;
				} else {
					this.form.type = 1;
				}
				if (!this.form.account) {
					this.$toast(this.$t("login.a1"));
					return;
				}
				if (!this.form.password) {
					this.$toast(this.$t("login.a3"));
					return;
				}
				Member.login(this.form)
					.then((res) => {
						if (res.code == 1021) {
							//二次验证
							this.loginVer(res.data);
						} else {
							this.loginSuccess(res.data);
						}
					})
					.catch(() => {});
			},
			loginVer(data) {
				this.secondaryShow = true;
				this.secondaryData = data;
				this.form2.signature = data.signature;
				if (data.google_status == 1) {
					this.form2.code_type = 3;
				} else if (data.phone_status == 1) {
					this.form2.code_type = 1;
					this.$nextTick(() => {
						this.$refs.mobileCode.send();
					});
				} else if (data.email_status == 1) {
					this.form2.code_type = 2;
					this.$nextTick(() => {
						this.$refs.emailCode.send();
					});
				}
			},
			// 发送验证码 二次验证登录用
			sendCodeLogin() {
				Member.loginConfirm(this.form2, {
					loading: true
				}).then((res) => {
					this.loginSuccess(res.data);
				});
			},
			// 登录成功
			async loginSuccess(data) {
				this.setToken(data.token);
				let user = await this.loginInfo()
				this.setUser(user);
				this._router.push("/pages/base/index");
			},
			async loginInfo(){
				let data = await Profile.getUserInfo()
				return data.data
			},
		},
		mounted() {},
		created() {

		}

	};
</script>
<style lang="scss" scoped>
	.nav-tab {
		background: transparent;

		&::after {
			border: none;
		}
	}

	.mlaotu {
		margin-left: auto;
	}
</style>
