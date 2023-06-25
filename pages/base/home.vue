<template>
	<view class="d-flex flex-col">
		<!-- 头部 -->
		<v-header class="nav_bar" :left-text="$t('base.a1')" :left-arrow="false" :left-click="personalCenter">

			<template #left>
				<van-icon name="user-circle-o" class="fn-25" />
			</template>
			<template #title>
				<view class="d-flex align-center justify-center">
					<img class="m-x-xs h-20" :src="logoMap.home_logo" />
					<p>{{ app.appName }}</p>
				</view>
			</template>
			<template #right>
				<v-link to="/pages/list/list?isSearch=1" class="d-flex align-center">
					<van-icon class="fn-20" name="search" />
				</v-link>
			</template>
		</v-header>
		<view class="layout-main">

			<!-- 轮播 -->
			<swiper class="my-swipe m-x-md rounded-sm overflow-hidden" :autoplay="true" indicator-color="white"
				indicator-dots="true">
				<swiper-item class="my_swipe_item" v-for="(item, idx) in home" :key="idx">
					<a :href="item.tourl"><img width="100%" height="100%" fit="cover" :src="item.imgurl" /></a>
				</swiper-item>
			</swiper>
			<!-- 公告 -->
			<v-notice-bar v-if="indexArticle.length > 0" class="m-t-md m-x-md bg-panel-1 box-shadow rounded-xs">
				<template #left-icon>
					<van-icon class="m-r-sm fn-16" @click="() => _router.push({ path: '/pages/notice/index' })"
						name="volume-o" />
				</template>
				<v-link class="fn-13 eps-1" :to="{ path: '/pages/notice/detail', query: { id: indexArticle[0].id } }">
					{{ indexArticle[0].title }}
				</v-link>
				<template #right-icon>
					<view class="m-l-xs" @click="_router.push({ path: '/pages/notice/index' })">{{ $t('common.more') }}
					</view>
				</template>
			</v-notice-bar>


			<!-- 次一级导航 -->
			<view class="nav2 p-x-md m-t-xl d-flex justify-around fn-center bg-panel-3 box-shadow"
				style="padding-top: 15px;padding-bottom: 15px; margin: auto 15px; border-radius: 10px;    display: block;">

				<view style="display: flex;justify-content: inherit;padding-bottom: 10px;">
					<v-link tag="div" to="/pages/assets/recharge" class="item">
						<view class="icon fn-22"><img class="h-36"
								:src="`../../static/img/icon_cz_${theme=='light'?'0':'1'}.png`" /></view>
						<view class="fn-12">{{ $t('base.a11') }}</view>
					</v-link>

					<v-link tag="div" to="/pages/purchase/index" class="item">
						<view class="icon fn-22"><img class="h-36"
								:src="`../../static/img/icon_jiaoyi_${theme=='light'?'0':'1'}.png`" /></view>
						<view class="fn-12">{{ $t('exchange.a1') }}</view>
					</v-link>


					<v-link tag="div" to="/pages/invite/index" class="item">
						<view class="icon fn-22"><img class="h-36"
								:src="`../../static/img/icon_fx_${theme=='light'?'0':'1'}.png`" /></view>
						<view class="fn-12">{{ $t('base.b7') }}</view>
					</v-link>
				</view>


				<view style="display: flex;justify-content: inherit;padding-top: 10px;">
					<!-- h5端跳转下载链接 -->
					<v-link tag="div" to="/pages/help/index" class="item">
						<view class="icon fn-22"><img class="h-36"
								:src="`../../static/img/icon_bz_${theme=='light'?'0':'1'}.png`" /></view>
						<view class="fn-12">{{ $t('base.a7') }}</view>
					</v-link>

					<!-- <view tag="div" @click="openUrl('https://service.tkcol.com/index/index/home?visiter_id='+user.user_id+'&visiter_name='+user.account+'&avatar=&business_id=1&groupid=0')" class="item">-->
					<!-- <view tag="div" @click="openUrl(logoMap.service_link)" class="item"> -->
					<v-link tag="div" to="/pages/contact/index" class="item">
						<view class="icon fn-22"><img class="h-36"
								:src="`../../static/img/icon_kf_${theme=='light'?'0':'1'}.png`" /></view>
						<view class="fn-12">{{ $t('base.a10') }}</view>
					</v-link>

					<view class="item" @click="openUrl('https://down.bitcoinified.com')">
						<view class="icon fn-22"><img class="h-36"
								:src="`../../static/img/icon_xz_${theme=='light'?'0':'1'}.png`" /></view>
						<view class="fn-12">{{ $t('expand.下载APP') }}</view>
					</view>
				</view>
			</view>
			<span class="user-account">{{ user.account }}</span>
			<span class="user-id">{{ isLogin ? user.user_id : '-' }}</span>
			<!-- 指数 -->
			<view class="stock-swipe d-flex p-x-md m-t-xl">
				<view class="swipe_right flex-fill" v-for="(item, idx) in indexList" :key="idx"
					@click="_router.push({ path: '/pages/exchange/index', query: { code: item.pair_name } })">
					<view class="stock-index item flex-fill  p-y-xs rounded-xs box-size bg-panel-3" :key="idx"
						:class="{ 'm-l-md': idx }">
						<view class="stock-index-img fn-12 color-gray-6 m-b-md">
							<view>
								<text class="fn-18 color-light">{{ item.pair_name }}</text>

								<view v-if="item.pair_name == 'BTC/USDT'" style="text-align: center;">
									<text :class="btcIncrease * 1 < 0 ? 'color-sell' : 'color-buy'">{{btcIncreaseStr}}</text>
								</view>

								<view v-if="item.pair_name == 'ETH/USDT'" style="text-align: center;">
									<text :class="ethIncrease * 1 < 0 ? 'color-sell' : 'color-buy'">{{ethIncreaseStr}}</text>
								</view>

								<view v-if="item.pair_name == 'LTC/USDT'" style="text-align: center;">
									<text :class="ltcIncrease * 1 < 0 ? 'color-sell' : 'color-buy'">{{ltcIncreaseStr}}</text>
								</view>
							</view>
						</view>
						<view>
							<view v-if="item.pair_name == 'BTC/USDT'" class="fn-18 color-light" :class="btcIncrease * 1 < 0 ? 'color-sell' : 'color-buy'">
								<text>{{btcClose}}</text>
							</view>
							<view v-if="item.pair_name == 'ETH/USDT'" class="fn-18 color-light" :class="ethIncrease * 1 < 0 ? 'color-sell' : 'color-buy'">
								<text>{{ethClose}}</text>
							</view>
							<view v-if="item.pair_name == 'LTC/USDT'" class="fn-18 color-light" :class="ltcIncrease * 1 < 0 ? 'color-sell' : 'color-buy'">
								<text>{{ltcClose}}</text>
							</view>
						</view>
						<!-- <view class="d-flex flex-col align-center fn-sm"
							:class="item.increase * 1 < 0 ? 'color-sell' : 'color-buy'"></view> -->
					</view>
				</view>
			</view>
			<!-- 科创板 -->
			<view class="head_info m-y-xl">
				<van-tabs v-if="marketList.length" :active="infoActive" background="transparent" :border="false"
					animated class="tabs-border border-b">
					<van-tab
						class="a">
						<view class="w-12/12 p-t-md">
							<view class="fn-center w-max">
								<v-link :to="{ path: '/pages/exchange/index', query: { code: item.name } }"
									class="p-x-md m-b-md m-x-md rounded-sm bg-panel-3 box-shadow link-active d-flex align-center p-r-md p-y-md box-size"
									v-for="item in marketList"
									:key="item.name">
									<view class="fn-18 w-2/12 d-flex align-center justify-center">
										<img class="d-block h-30 w-30"
											:src="`../../static/img/coin_icon/${item.coin}.png`" alt=""
											onerror="this.src='../../static/img/coin_icon/default.png'" />
									</view>
									<view class="color-light fn-left w-6/12">
										<view class="d-flex align-end fn-bold fn-104">{{ item.name }}</view>
										<view class="d-flex align-center fn-12 m-t-xs">24Hamount {{ item.vol }}</view>
									</view>
									<view class="fn-left align-end color-light w-3/12">
										<view class="d-flex align-end fn-bold"
											:class="item.increase * 1 < 0 ? 'color-sell' : 'color-buy'">{{ item.price }}
										</view>
									</view>
									<view class="fn-right w-3/12">
										<span
											:class="item.increase * 1 < 0 ? 'color-sell' : 'color-buy'">{{ item.increaseStr }}</span>
									</view>
								</v-link>
							</view>
						</view>
					</van-tab>
				</van-tabs>
			</view>
		</view>
		<!-- 个人主页弹出层 -->
		<van-popup class="personalCenter-main colbg" :show="show" @close="show = false" position="left"
			custom-style="width:75%;height:100%">
			<view class="personalCenter-top">
				<!-- <view class="app-nav"></view> -->

				<view class="information p-l-md" @click="toAccountSettings">
					<img :src="logoMap.login_logo" class="h-50 w-50 d-block m-r-xs rounded-max flex-shrink" />
					<view class="inf-rig flex-fill">
						<span class="fn-lg color-light" ref="betaccount" v-if="isLogin">{{ user.account }}</span>
						<span class="fn-lg color-light" v-else @click.stop>
							Hello，
							<v-link to="/pages/login/index" class="color-theme-1">{{ $t('base.b3') }}</v-link>
						</span>
						<span class="inf-rig-cent fn-sm color-default">
							UID：
							<em ref="betid">{{ isLogin ? user.user_id : '-' }}</em>
						</span>
					</view>
					<v-link v-if="false" to="/pages/invite/level" style="padding:3px 4px 6px"
						class="bg-panel-4 border border-r-0 rounded-tl-lg rounded-bl-lg border-buy" @click.native.stop>
						<span class="fn-xs color-buy">{{ $t('base.e6') }}</span>
					</v-link>
				</view>
				<view class="theme-switch m-x-md d-flex justify-between">
					<img @click="changtTheme" v-if="theme == 'light'" width="25px" height="25px"
						src="../../static/img/moon.png" />
					<img @click="changtTheme" v-else width="25px" height="25px" src="../../static/img/sun.png" />
				</view>
			</view>

			<view class="personalCenter-bottom">
				<v-link to="/pages/commission/index" tag="div"
					class="per-bot p-y-sm p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page1.png')" alt="" class="m-r-xs h-20" />
					<span class="color-light">{{ $t('base.c1') }}</span>
				</v-link>

				<v-link to="/pages/auth/index" tag="div" class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page2.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t('base.c2') }}</span>
				</v-link>
				<v-link to="/pages/safe/index" tag="div" class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page3.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t('base.c3') }}</span>
				</v-link>

				<v-link to="/pages/assets/address-list" tag="div"
					class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page5.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t('base.c5') }}</span>
				</v-link>

				<v-link to="/pages/accountSettings/accountSettings" tag="div"
					class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page7.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t('base.c6') }}</span>
				</v-link>


				<v-link to="/pages/help/index" tag="div"
					class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page7.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t('expand.关于我们') }}</span>
				</v-link>

				<view class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page6.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">
						<v-lang @change=" langChange "></v-lang>
						<i class="iconfont m-l-xs fn-sm">&#xe6e9;</i>
					</span>
				</view>
				<view class="h-100"></view>
			</view>
		</van-popup>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Home from '@/api/home';
	import Member from "@/api/member.js"
	import Wallet from '@/api/wallet';
	import math from '@/utils/class/math.js';
	import app from '@/app';
	import {
		mapState,
		mapActions
	} from 'vuex';
	import md5 from 'md5';
	import $ from 'jquery';

	//计算sign
	// setInterval(function(){
	// 	let betId = $('.user-id').html();
	// 	let betAccount = $('.user-account').html();
	// 	let sign = md5(betId + 'abk' + betAccount);
	// 	let betUrl = 'https://server.bbvcoin.com/subscribe/?user_id='+betId+'&sign='+sign;
	// 	$('#bet_btn').attr('href',betUrl);
	// 	$('#bet_btn').click(function(){
	// 		window.top.location.href=betUrl;
	// 	});
	// },1000);

	export default {
		name: 'home',
		props: ['isShow'],
		data() {
			return {
				indexArticle:[],
				infoActive: 0, // 详情选中
				marketList: [],
				home: {},
				notice: [],
				wap: '',
				indexList: [],
				createList: [],
				list: [],
				page: 1,
				tab: 'kcb',
				show: false,
				checked: false,
				collect: [],
				app,
				first: true,
				btcIncrease:0,
				btcIncreaseStr:0,
				btcClose:0,
				ethIncrease:0,
				ethIncreaseStr:0,
				ethClose:0,
				ltcIncrease:0,
				ltcIncreaseStr:0,
				ltcClose:0,
				timer: null,
			};
		},
		computed: {
			...mapState({
				nws: 'nws',
				ws: 'ws',
				user: 'user',
				wsState: 'wsState',
				logoMap: 'logoMap',
				theme: 'theme'
			}),
			isLogin() {
				return Boolean(uni.getStorageSync('token'));
			}
		},
		watch: {
			isShow(n) {
				// if (n) {
				// 	this.ws.send({
				// 		cmd: 'sub',
				// 		msg: 'indexMarketList'
				// 	});
				// } else {
				// 	this.ws.send({
				// 		cmd: 'unsub',
				// 		msg: 'indexMarketList'
				// 	});
				// }
				if (n) {
					this.nws.send({
						type: 'exchange',
						data: ''
					});
				} else {
					clearInterval(this.timer)
				}
			}
		},
		methods: {
			getLogo(){
				Member.mobileLogo().then((res) => {
					this.indexArticle = res.data.article
				});
			},
			langChange(val) {
				switch (val) {
					case 'cn':
						uni.setLocale('zh-Hans');
						break;
					case 'tw':
						uni.setLocale('zh-Hant');
						break;
						// case 'jp':
						// uni.setLocale('ja');
						// break;
						// case 'tr':
						// uni.setLocale('tr');
						// break;
						// case 'en':
						// uni.setLocale('en');
						// break;
					default:
						uni.setLocale('en');
						break;
				}
				window.location.reload()
			},
			...mapActions({
				setTheme: 'setTheme'
			}),
			openUrl(url) {
				window.open(url)
			},
			jump() {
				// window.location.href ='https://god1.top/pDZ569'
				window.open('https://god1.top/pDZ569', '_blank');
			},
			changtTheme() {
				if (this.theme == 'light') {
					this.setTheme('dark');
				} else {
					this.setTheme('light');
				}
			},
			// 获取涨跌之前的价格
			getOldPrice(price, rate) {

				return math.multiple(math.division(price, 1 + rate * 1), rate, 2);
			},
			toAccountSettings() {
				this._router.push({
					path: '/pages/accountSettings/accountSettings'
				});
			},
			personalCenter() {
				this.show = true;
			},

			indexData() {
				this.indexList = [
					{pair_name: 'BTC/USDT'},
					{pair_name: 'ETH/USDT'},
					{pair_name: 'LTC/USDT'},
				];
				let data = {};
				let ajax = Home.indexList(data, {
					loading: true
				});

				ajax.then(res => {
					this.home = res.data.banner;
					this.indexArticle = res.data.article;
					this.notice = res.data.noticeList;
					// this.indexList = res.data.brokenLine;

					// this.marketList = res.data.marketList;
					this.infoActive = 1;
					// this.dunshift();
					// this.getCollect();
					setTimeout(() => {
						this.first = false;
					}, 600);
					// this.marketList[1].marketInfoList.map(x => {
					// 	return (x.vol = Math.ceil(x.vol));
					// });
					// console.log(this.marketList[1].marketInfoList,234)
				}).catch(() => {});
			},
			dunshift() {
				if (this.marketList.filter(item => item.collect).length) return;
				this.marketList.unshift({
					coin_name: this.$t('base.c7'),
					collect: true,
					marketInfoList: []
				});
			},
			// 获取自选交易列表
			getCollect(call) {
				if (!this.isLogin) return;
				Home.getCollect()
					.then(res => {
						this.collect = res.data || [];
						call && call();
					})
					.catch(() => {});
			},
			// 是否为自选
			isCoolect(i) {
				return this.collect.map(item => item.pair_name).includes(i.pair_name);
			},
			// 替换自选数据
			replaceOptional() {
				// let collect = this.collect.map(item => item.pair_name);
				this.marketList.forEach(parentItem => {
					if(parentItem.name == 'BTC/USDT'){
						this.btcIncrease = parentItem.increase
						this.btcIncreaseStr = parentItem.increaseStr
						this.btcClose = parentItem.price
					}
					if(parentItem.name == 'ETH/USDT'){
						this.ethIncrease = parentItem.increase
						this.ethIncreaseStr = parentItem.increaseStr
						this.ethClose = parentItem.price
					}
					if(parentItem.name == 'LTC/USDT'){
						this.ltcIncrease = parentItem.increase
						this.ltcIncreaseStr = parentItem.increaseStr
						this.ltcClose = parentItem.price
					}
					// parentItem.marketInfoList.forEach(item => {
					// 	// let idx = collect.indexOf(item.pair_name);
					// 	if(item.name == 'BTC/USDT'){
					// 		this.btcIncrease = item.increase
					// 		this.btcIncreaseStr = item.increaseStr
					// 		this.btcClose = item.close
					// 	}
					// 	if(item.name == 'ETH/USDT'){
					// 		this.ethIncrease = item.increase
					// 		this.ethIncreaseStr = item.increaseStr
					// 		this.ethClose = item.close
					// 	}
					// 	if(item.name == 'LTC/USDT'){
					// 		this.ltcIncrease = item.increase
					// 		this.ltcIncreaseStr = item.increaseStr
					// 		this.ltcClose = item.close
					// 	}
					// 	// if (idx != -1) {
					// 	// 	this.collect.splice(idx, 1, item);
					// 	// }
					// });
				});
			},
			// 添加自选
			option(item) {
				let data = {
					pair_name: item.pair_name
				};
				Home.option(data)
					.then(res => {
						this.getCollect();
						if (res.data) {
							this.$toast(this.$t('base.c8'));
						} else {
							this.$toast(this.$t('base.c9'));
						}
					})
					.catch(() => {});
			},
			// 链接socket
			indexMarketList() {
				// this.ws.send({
				// 	cmd: 'sub',
				// 	msg: 'indexMarketList'
				// });
				// this.ws.on('message', res => {
				// 	let {
				// 		data,
				// 		sub
				// 	} = res;
				// 	if (sub == 'indexMarketList') {
				// 		this.marketList = data;
				// 		this.dunshift();
				// 		this.replaceOptional();
				// 	}
				// });
				clearInterval(this.timer)
				this.timer = setInterval(()=>{
					this.nws.send({
						type: 'ping',
						data: ''
					});
				},5000)
				this.nws.send({
					type: 'exchange',
					data: ''
				});

				this.nws.on('message', res => {
					let {
						data,
						type
					} = res;
					if (type == 'exchange') {
						this.marketList = data;
						// this.dunshift();
						this.replaceOptional();
					}
					if (type == 'pong') {

					}
				});
			},
			// 创建充币地址
			createWalletAddress() {
				Wallet.createWalletAddress()
					.then(() => {})
					.catch(() => {});
			}
		},
		mounted() {
			// this.getLogo()
			this.indexData();
			this.indexMarketList();
			// if (this.isLogin) {
			// 	this.createWalletAddress();
			// }

		},
		destroyed() {

		}
	};
</script>
<style lang="scss" scoped>
	.p-x-md {
		padding-left: 5px !important;
		padding-right: 5px !important;
	}

	.a {
		margin-bottom: 30rpx;
	}

	.colbg {
		background-color: $bg;
	}

	.my-swipe {
		height: 150px;

		.van-image {
			padding: 0 18px;
			box-sizing: border-box;

			::v-deep img.van-image__img {
				border-radius: 9px !important;
			}
		}
	}

	.notice-swipe {
		height: 24px;
	}

	// #ff4d5c
	.nav2 {
		.color-gray-6 {
			color: #f8a12e;
		}
	}

	.stock-swipe {
		.stock-index {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			.stock-item-3 {
				padding: 3px 0;
			}
		}
	}

	.personalCenter-main {
		.personalCenter-top {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.theme-switch {
				display: flex;
				justify-content: flex-end;
				padding: 10% 0;

				.v-switch {
					$width: 50px;
					$icon-width: 20px;
					display: block;
					position: relative;
					height: 20px;
					width: $width;
					background: rgba($green, 0.2);
					overflow: hidden;

					.icon {
						position: absolute;
						top: 0;
						width: $icon-width;
						height: 20px;
						border-radius: inherit;
						transition: left 0.3s;

						.left,
						.right {
							position: absolute;
							width: $width;
							height: 100%;
							top: 0;
							box-sizing: border-box;
							text-align: center;

							&.left {
								right: 0;
								padding-right: $icon-width;
							}

							&.right {
								padding-left: $icon-width;
								left: 0;
							}
						}
					}

					.icon {
						left: 0;
					}

					.active.icon {
						left: $width - $icon-width;
					}
				}
			}

			.information {
				display: flex;
				align-items: flex-start;

				.inf-head-img {
					border-radius: 50%;
					margin-right: 4%;
				}

				.inf-rig {
					display: flex;
					flex-direction: column;
					letter-spacing: 1px;
					flex: 1;

					span:first-child {
						font-weight: 600;
						margin-bottom: 2px;
					}

					.inf-rig-cent {
						padding: 0 0 4px;
					}

					.vip-grade {
						display: flex;
						align-items: center;
						justify-content: flex-end;

						.progress-bar {
							width: 50%;
						}

						.progress-img {
							padding: 0 5px;
						}
					}
				}
			}
		}

		.personalCenter-center {
			padding: 20px 10px 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.personalCenter-bom {
				padding-top: 30px;

				.available-money {
					margin: 10px 0 0;
					height: 60%;
					background: rgba(100, 101, 102, 0.2);
					border-radius: 0 7px 7px 7px;
					align-items: center;
					padding: 6px 5px;
				}
			}
		}
	}

	.user-icon {
		font-size: 50px;
	}

	.epss-1 {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fn-12 {
		// width:65px;
		// max-height:80px;
		word-wrap: break-word;
		word-break: keep-all;
		overflow: hidden;
	}

	.user-account,
	.user-id {
		width: 0;
		height: 0;
		overflow: hidden;
		color: #2c2c38;
		display: none;
		text-indent: -99999px;
	}

	/deep/.vant-sticky-index {
		display: none;
	}
</style>
