<template>
	<view id="page" class="d-flex flex-col">
		<view class="box-page">
			<van-tabs :active="active" @click="onChange" line-width="0px" line-height="0px" class="box-tabs">
				<van-tab :title="$t('base.c7')">
					<!-- 自选 -->
					<van-tabs :active="active1_1" class="box-tabs_child" @click="onChange1">
						<van-tab :title="$t('expand.现货')">
							<!-- 现货 -->
							<view class="box-tabs_child_content">
								<label class="box-label">
									{{ $t('expand.涨跌幅榜') }}
									<van-icon name="../../static/img/icon_up.png" size="1.136em" />
								</label>
								<ZmTable ref="child_1_0" :dataList="parentItem" :type="0"></ZmTable>
							</view>
						</van-tab>

						<van-tab :title="$t('exchange.a2')">
							<!-- 合约 -->
							<view class="box-tabs_child_content">
								<label class="box-label">
									{{ $t('expand.涨跌幅榜') }}
									<van-icon name="../../static/img/icon_up.png" size="1.136em" />
								</label>
								<ZmTable ref="child_1_1" :dataList="parentItem" :type="1"></ZmTable>
							</view>
						</van-tab>

						<van-tab :title="$t('expand.秒合约')">
							<!-- 秒合约 -->
							<view class="box-tabs_child_content">
								<label class="box-label">
									{{ $t('expand.涨跌幅榜') }}
									<van-icon name="../../static/img/icon_up.png" size="1.136em" />
								</label>
								<ZmTable ref="child_1_2" :dataList="parentItem" :type="2"></ZmTable>
							</view>
						</van-tab>
					</van-tabs>
				</van-tab>

				<van-tab :title="$t('expand.现货')">
					<!-- 现货 -->
					<van-tabs :active="active2_1" class="box-tabs_child box-tabs_child_c">
						<van-tab title="USDT">
							<view class="box-tabs_child_content">
								<label class="box-label">
									{{ $t('expand.涨跌幅榜') }}
									<van-icon name="../../static/img/icon_up.png" size="1.136em" />
								</label>
								<ZmTable ref="child_1" :dataList="parentItem":type="0"></ZmTable>
							</view>
						</van-tab>
					</van-tabs>
				</van-tab>

				<van-tab :title="$t('exchange.a2')">
					<!-- 合约 -->
					<van-tabs :active="active3_1" class="box-tabs_child box-tabs_child_c">
						<van-tab title="USDT">
							<view class="box-tabs_child_content">
								<label class="box-label">
									{{ $t('expand.涨跌幅榜') }}
									<van-icon name="../../static/img/icon_up.png" size="1.136em" />
								</label>
								<ZmTable ref="child_2" :dataList="parentItem" :type="1"></ZmTable>
							</view>
						</van-tab>
					</van-tabs>
				</van-tab>

				<van-tab :title="$t('expand.秒合约')">
					<!-- 秒合约 -->
					<van-tabs :active="active4_1" class="box-tabs_child box-tabs_child_c">
						<van-tab title="USDT">
							<view class="box-tabs_child_content">
								<label class="box-label">
									{{ $t('expand.涨跌幅榜') }}
									<van-icon name="../../static/img/icon_up.png" size="1.136em" />
								</label>
								<ZmTable ref="child_3" :dataList="parentItem" :type="2"></ZmTable>
							</view>
						</van-tab>
					</van-tabs>
				</van-tab>
			</van-tabs>
		</view>
	</view>
</template>

<script>
import Hangqing from '@/api/hangqing';
import Market from '@/api/market';
import ZmTable from '@/pages/components/zm_table';
import { mapState } from 'vuex';

export default {
	name: '',
	data() {
		return {
			data: [],
			active: 1,
			active1_1: 0,
			active2_1: 0,
			active3_1: 0,
			active4_1: 0,
			parentItem: {},
		};
	},
	props: {
	  isShow: {
	    default: false,
	    type: Boolean,
	    required: false,
	  },
	},
	computed:{
		...mapState({
			socket: 'ws', // 交易
			socket1: 'ws1', // 合约
		}),
	},
	components: {
		ZmTable
	},
	created() {
		this.getCollect();
	},
	mounted() {
		
		this.linkSocket();
	},
	methods: {
		getDataList() {
			
			this.parentItem = { coin_name: '', isCollect: true, marketInfoList: [] };
			if (this.active == 0) {
				this.getCollect();
			} else if (this.active == 1) {
				Market.getMarketList().then(res => {
					this.parentItem = res.data[0];
					this.$forceUpdate();
				});
			} else {
				let param = { type: -1 };
				switch (this.active) {
					case 2:
						param.type = 1;
						break;
					case 3:
						param.type = 3;
						break;
				}
				Hangqing.getCombinationData(param).then(res => {
					this.parentItem = res.data[0];
					this.$forceUpdate();
				});
			}
		},
		getCollect() {
			let param = { ctype: -1 };
			switch (this.active1_1) {
				case 0:
					param.ctype = 1;
					break;
				case 1:
					param.ctype = 2;
					break;
				case 2:
					param.ctype = 3;
					break;
			}
			Hangqing.getCollect(param).then(res => {
				this.parentItem = { coin_name: '', isCollect: true, marketInfoList: [] };
				res.data.map(item=>{
					this.parentItem.marketInfoList.push({
						pair_name:item.pair_name,
						symbol:item.pair_name.split('/')[0],
						increase:item.increase,
						price:item.lastPrice,
						increaseStr:item.increaseStr
					})
				})
				this.$forceUpdate();
			});
		},
		onChange(event) {
			this.active = event.detail.index;
			console.log(this.active)
			this.getDataList();
		},
		onChange1(event) {
			this.active1_1 = event.detail.index;
			this.getCollect();
		},
		// 链接socket
		linkSocket() {
			let _this = this;
			
			this.unLink(function(){
				// 订阅合约
				_this.socket1.send({
					cmd: 'sub',
					msg: `swapMarketList`
				});
				// 订阅交易
				_this.socket.send({
					cmd: 'sub',
					msg: `exchangeMarketList`
				})
				
				_this.socketMessage();
			});
		},
		// 取消订阅
		unLink(func) {
			// 取消订阅合约
			this.socket1.send({
				cmd: 'unsub',
				msg: `swapMarketList`
			});
			// 取消订阅交易
			this.socket.send({
				cmd: 'unsub',
				msg: `exchangeMarketList`
			})
			func&& func();
		},
		
		// 接受socket
		socketMessage() {
			let _this = this;
			// 接收合约消息
			this.socket1.on('message', res => {
				if (!this.isShow) return;
				let { data, sub } = res;
				if (sub == 'swapMarketList') {
					if(this.active == 2 || this.active == 3){
						this.parentItem.marketInfoList = data[0].marketInfoList;
						this.$refs['child_'+this.active].refData(this.parentItem);
					}
					else if(this.active == 0 && (this.active1_1 == 1 || this.active1_1 == 2)){
						this.parentItem.marketInfoList.map((item,i)=>{
							let node = data[0].marketInfoList.find(k=>{ return k.pair_name == item.pair_name  });
							if(node){
								this.parentItem.marketInfoList[i] = node;
								this.$refs['child_1_'+this.active1_1].refData(this.parentItem);
							}
							
						})
					}
					
				}
			});
			// 接收交易消息
			this.socket.on('message', res => {
				if (!this.isShow) return;
				let { data, sub } = res;
				if (sub == 'exchangeMarketList') {
					if(this.active == 0 && this.active1_1 == 0){
						this.parentItem.marketInfoList.map((item,i)=>{
							let node = data[0].marketInfoList.find(k=>{ return k.pair_name == item.pair_name  });
							if(node){
								this.parentItem.marketInfoList[i] = node;
								this.$refs.child_1_0.refData(this.parentItem);
							}
							
						})
					}
					else if(this.active == 1){
						this.parentItem.marketInfoList = data[0].marketInfoList;
						this.$refs.child_1.refData(this.parentItem);
					}
				}
			});
		},
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
#page {
	width: 100vw;
	height: 100vh;
	padding: 0;
	margin: 0;
	font-size: 16px;
}
.box-page {
	height: 100vh;
	overflow-y: auto;
	margin-bottom: 50px;
	padding: calc(15em * 0.0625);
}
.box-tabs {
	::v-deep {
		.van-hairline--top-bottom::after {
			border: none !important;
		}
		.van-ellipsis {
			font-weight: bold;
		}
		.van-tab--active .van-ellipsis {
			font-size: calc(18em * 0.0625);
		}
	}
	.box-tabs_child {
		width: 100%;
		::v-deep {
			.vant-sticky-index {
				display: block;
				width: 50% !important;
			}
			.van-hairline--top-bottom::after {
				border: none !important;
			}
			.van-ellipsis {
				font-size: calc(12em * 0.0625);
			}
			.van-tab--active .van-ellipsis {
				font-size: calc(14em * 0.0625);
				color: #3771e2;
			}
			.van-tabs__line {
				color: #3771e2 !important;
			}
			.van-tabs__line:before {
				width: calc(25em * 0.0625);
				height: 3px;
				border-radius: 0;
				background-color: #3771e2 !important;
			}
		}
		.box-tabs_child_content {
			padding: calc(15em * 0.0625);
			padding-left: 0;
			padding-right: 0;
		}
	}
	.box-tabs_child.box-tabs_child_c {
		::v-deep {
			.vant-sticky-index {
				display: block;
				width: 16% !important;
			}
		}
	}
}
.box-label {
	font-size: calc(16em * 0.0625);
	font-weight: bold;
	color: var(--light);
	margin: 0 0 calc(16em * 0.0625) 0;
	display: block;
}
</style>
