<template>
	<div class="layout-page" :style="themeStyle">
		<!-- <v-header :title="$t('help.a1')"></v-header> -->
		<v-header :title="$t('expand.联系我们')"></v-header>
		<view class="box-table">
			<view class="box-log-item">
				<view class="box-item-info d-flex">
					<view class="title">{{ $t('expand.联系信息') }}:</view>
					<view class="value">{{ contacts && contacts.contact }}</view>
				</view>
				<view class="box-item-info d-flex">
					<view class="title">{{ $t('expand.常规咨询') }}:</view>
					<view class="value">{{ contacts && contacts.email }}</view>
				</view>
				<view class="box-item-info d-flex">
					<view class="title">{{ $t('expand.客户服务') }}:</view>
					<view class="value">{{ contacts && contacts.service }}</view>
				</view>
				<view class="box-item-info d-flex">
					<view class="title">{{ $t('expand.媒体合作') }}:</view>
					<view class="value">{{ contacts && contacts.media }}</view>
				</view>
			</view>
		</view>
	</div>
</template>
<script>
import ContactUs from '@/api/contactUs';
import { mapGetters } from 'vuex';
export default {
	name: 'help',
	data() {
		return {
			list: [],
			contacts: {}
		};
	},
	computed: {
		...mapGetters(['themeStyle'])
	},
	methods: {},
	created() {
		ContactUs.contact()
			.then(data => {
				this.contacts = data.data;
				/*
    	contact:"bitmart986@gmail.com"
    	email:"bitmart986@gmail.com"
    	media:"bitmart986@gmail.com"
    	service:"bitmart986@gmail.com"
		console.log('ContactUs',data);
    	*/
			})
			.catch(err => {});
	}
};
</script>
<style lang="scss" scoped>
.box-table{
	padding: 15px;
}
.box-log-item {
	line-height: 3;
	padding: calc(15em * 0.0625);
	background-color: var(--listline);
	border-radius: 5px;
	margin-bottom: calc(8em * 0.0625);
	.box-item-info {
		font-size: calc(12em * 0.0625);
		display: flex;
		justify-content: space-around;
		.value {
			color: var(--light);
			font-weight: bold;
		}
	}
}
</style>
