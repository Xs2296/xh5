<template>
	<v-page>
		<v-header :title="$t('assets.a0')">
			<template #right>
				<view @click="doChange()">
					<van-icon v-if="del" class="fn-20 m-t-xs" name="plus" />
					<van-icon v-else class="fn-20 m-t-xs" name="delete" />
				</view>
			</template>
		</v-header>
		<main class="layout-main p-t-md">
			<view class="p-md fn-sm">

				<ul>
					<li class="m-b-xs">·{{ $t("assets.a1") }}。</li>
					<li>·API{{ $t("assets.a2", { name: "API" }) }}。</li>
				</ul>
			</view>
			<template v-for="parentItem in list">
				<view class="bg-panel-4 m-md rounded overflow-hidden box-shadow" :key="parentItem.coin_name">
					<view class="fn-22 p-x-md p-y-md border-b color-light">{{
            parentItem.coin_name
          }}</view>
					<ul class="list" v-if="query.from == 'draw'">
						<view class="item d-flex border-b p-md align-center link-active" v-for="item in parentItem.list"
							:key="item.id">

							<view class="p-x-xs" v-if="del" @click.stop="$set(item, 'show', !item.show)">
								<van-checkbox icon-size="15px" :value="item.show" checked-color="#f05319">
								</van-checkbox>
							</view>
							<view class="flex-fill" @click="selectAddress(item)">
								<view class="title color-light eps-2 m-b-xs">{{
                  item.address_note
                }}</view>
								<view class="fn-sm">{{ item.address }}</view>
								<view class="time fn-sm">{{ item.times }}</view>
							</view>
							<van-icon name="arrow" />
						</view>
					</ul>
					<ul class="list" v-else>
						<!-- <v-link
              :to="{
                path: '/pages/assets/edit-address',
                query: {
                  coin_name: item.coin_name,
                  address: item.address,
                  address_note: item.address_note,
                  id: item.id,
                },
              }"
              class="item d-flex border-b p-md align-center link-active"
              v-for="item in parentItem.list"
              :key="item.id"
            > -->
						<view class="item d-flex border-b p-md align-center link-active" v-for="item in parentItem.list"
							:key="item.id">
							<view class="p-x-xs" v-if="del" @click.stop="$set(item, 'show', !item.show)">
								<van-checkbox icon-size="15px" :value="item.show" checked-color="#f05319">
								</van-checkbox>
							</view>
							<view class="flex-fill">
								<view class="title color-light eps-2 m-b-xs">{{
                  item.address_note
                }}</view>
								<!-- 地址 -->
								<view class="fn-sm">{{ item.address }}</view>
								<view class="time fn-sm">{{ item.times }}</view>
							</view>
							<!-- <van-icon name="arrow" /> -->
						</view>
						<!-- </v-link> -->
					</ul>
				</view>
			</template>
		</main>
		<view class="p-md">
			<v-button class="w-max rounded-lg" block v-if="del" type="red" @click="toDel">{{ $t("assets.a3") }}
			</v-button>
			<!-- v-if="!del&&list.lenght<=0 " -->
			<v-button class="w-max rounded-lg" block @click="_router.push('/pages/assets/edit-address')" v-if="!del"
				type="blue">{{ $t("assets.a4") }}</v-button>
		</view>
	</v-page>
</template>
<script>
	import Wallet from "@/api/wallet";
	import formData from "@/utils/class/date";
	export default {
		data() {
			return {
				del: false,
				list: [],
				query: {},
			};
		},
		computed: {},
		filters: {
			parseTime(val) {
				return formData.parseTime(val);
			},
		},
		methods: {
			doChange() {
				this.del = !this.del
			},
			getUserWithdrawAdress() {
				Wallet.getUserWithdrawAdress().then((res) => {
					// console.log(res);
					this.list = res.data;
				});
			},
			toDel() {
				// 获取删除的地址
				let delList = [];
				this.list.forEach((parentItem) => {
					parentItem.list.forEach((item) => {
						if (item.show) {
							delList.push(item.id);
						}
					});
				});
				if (!delList.length) {
					this.$toast(this.$t("assets.a5"));
				}
				uni.showModal({
					title: this.$t("common.tips"),
					content: this.$t("assets.a6"),
					success: (e) => {
						if (e.confirm) {
							let i = 0;
							delList.forEach((item) => {
								this.withdrawalAddressDeleted(item, () => {
									i++;
									if (delList.length == i) {
										this.getUserWithdrawAdress();
									}
								});
							});
							this.del = false
						}
					},
				});
			},
			// 删除
			withdrawalAddressDeleted(id, call) {
				Wallet.withdrawalAddressDeleted({
						id
					})
					.then(() => {
						call();
					})
					.catch(() => {});
			},
			selectAddress(item) {
				uni.$emit('selectAddress', item.address)
				console.log(item.address); //地址
				// uni.setStorageSync('address',item.address)

				this.$back()
			}
		},
		onShow() {
			this.getUserWithdrawAdress();
		},
		onLoad(query) {
			this.query = query;
		},

		created() {
			// this.selectAddress()
		}
	};
</script>
<style lang="scss">
</style>
