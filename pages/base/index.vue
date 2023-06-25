<template>
	<v-page>
		<template v-for="item in navList">
			<!-- v-if="cashViews.includes(item.tel)"  去掉此处页面可以预加载 -->
			<component v-show="tab == item.tel" :is="item.tel" :key="item.tel" :isShow="tab == item.tel && tabShow"
				class="layout-main"></component>
		</template>
		<!-- <template> -->
			<!-- v-if="cashViews.includes('contract')" -->
			<!-- <component v-show="tab == 'bibi'" :is="'bibi'" :key="'bibi'" :isShow="tab == 'bibi' && tabShow"
				class="layout-main"></component> -->
		<!-- </template> -->

		<view class="footer d-flex p-y-xs bg-tab-nav fn-center">
			<view class="item line-height-1 flex-fill" :class="{ 'router-link-active': active(item.tel) }"
				v-for="item in navList" :key="item.tel" @click="tabChange(item.tel, true)">
				<view class="icon">
					<img class="h-15" v-if="active(item.tel)" :src="item.activeIcon" alt="" />
					<img class="h-15" v-else :src="item.icon" alt="" />
				</view>
				<view class="fn-12" style="margin-top: 4px">{{ item.label }}</view>
			</view>
		</view>
	</v-page>
</template>

<script>
	import Home from './home';
	import Hangqing from './hangqing';
	import Bibi from "./bibi.vue"
	// import ExchangeOperations from './exchange-operations';
	import Mine from './mine';
	import Userinfo from './userinfo';
	import OptionList from './option-list';
	// import List from "./list";
	import Contract from './contract';
	import Miao from './miao.vue';
	import Wallet from "@/api/wallet";
	export default {
		name: 'Base',
		components: {
			Home,
			Hangqing,
			Bibi,
			// ExchangeOperations,
			OptionList,
			Mine,
			Userinfo,
			Contract,
			Miao
		},
		computed: {
			navList() {
				return [{
						label: this.$t('base.d0'),
						tel: 'home',
						icon: 'static/img/base_home_0.png',
						activeIcon: 'static/img/base_home_1.png'
					},
					// {
					// 	label: this.$t('base.a3'),
					// 	tel: 'hangqing',
					// 	icon: 'static/img/base_hangqing_0.png',
					// 	activeIcon: 'static/img/base_hangqing_1.png'
					// },
					{
						label: this.$t('base.xx'),
						tel: 'contract',
						icon: 'static/img/icon_jiaoyi_0.png',
						activeIcon: 'static/img/icon_jiaoyi_1.png'
					},
					{
						label: this.$t('exchange.a0'),
						tel: 'bibi',
						icon: 'static/img/base_qukuai_0.png',
						activeIcon: 'static/img/base_qukuai_1.png'
					},
					{
						label: this.$t('base.a4'),
						tel: 'miao',
						icon: 'static/img/base_caidan_0.png',
						activeIcon: 'static/img/base_caidan_1.png'
					},
					// {
					//   label: this.$t("base.a4"),
					//   tel: "option-list",
					//   icon: "static/img/base_qukuai_0.png",
					//   activeIcon: "static/img/base_qukuai_1.png",
					// },

					{
						label: this.$t('base.d2'),
						tel: 'mine',
						icon: 'static/img/base_assets_0.png',
						activeIcon: 'static/img/base_assets_1.png'
					},
					// {
					// 	label: this.$t('base.e9'),
					// 	tel: 'userinfo',
					// 	icon: 'static/img/base_qukuai_0.png',
					// 	activeIcon: 'static/img/base_qukuai_1.png'
					// }
				];
			},
			isLogin() {
				return Boolean(uni.getStorageSync('token'));
			}
		},
		data() {
			return {
				list: '',
				NewAddress: '',
				cashViews: [],
				tab: '',
				tabShow: true
			};
		},
		methods: {
			getUserWithdrawAdress() {
				Wallet.getUserWithdrawAdress().then((res) => {
					this.list = res.data;
					this.Address = res.data[0].list[0].address

					uni.setStorageSync('address', this.Address)
				});
			},
			active(tel) {
				return this.tab == 'contract' ? tel.indexOf(this.tab) > -1 : this.tab == tel;
			},
			tabChange(name, rl = false) {
				this.tab = name;
				if (!this.cashViews.includes(name)) {
					this.cashViews.push(name);
				}
				uni.$emit('contract_m_theme');
				if (rl == true) {
					this._router.replace({path:'/pages/base/index',query:{tel:name}})
				}
			}
		},
		onShow() {
			this.tabShow = true;
		},
		onLoad(query) {
			if (query.tel) {
				this.tabChange(query.tel);
			} else {
				this.tabChange('home');
			}
		},
		mounted() {
			let _this = this;
			uni.$on('selectAddress', (e) => {
				console.log(e);

				// this.form.address = e  // 提币地址
			})
			uni.$off('topNavTab');
			uni.$on('topNavTab', function(res) {
				_this.tabChange(res.name);
				if (res.obj) {
					switch (res.name) {
						case 'bibi':
							uni.$emit('changeData-0', {
								obj: res.obj
							});
							break;
						case 'contract':
							uni.$emit('changeData-1', {
								obj: res.obj
							});
							break;
						case 'miao':
							uni.$emit('changeData-2', {
								obj: res.obj
							});
							break;
					}
				}
			});
		},
		onHide() {
			this.tabShow = false;
		},
		created() {
			this.NewAddress = uni.getStorageSync('address')
			if (this.isLogin) {
				this.getUserWithdrawAdress()
			}
		}
	};
</script>
<style lang="scss" scoped>
	.footer {
		box-shadow: $tab-nav-shadow;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}

	.router-link-active {
		color: $theme-1;
	}
</style>
