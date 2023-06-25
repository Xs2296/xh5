<template>
	<v-page>
		<v-header :title="$t('expand.平台介绍')"></v-header>
		<view style="padding: 15px;" v-html="content"></view>
	</v-page>
</template>

<script>
	import Home from '@/api/home';
	export default {
		name: '',
		data() {
			return {
				data:[],
				content:''
			}
		},
		components: {

		},
		created() {

		},
		mounted() {
			Home.getPtContent({}).then(res=>{
				this.content = res.data
			});
		},
		methods: {
			
		},
		watch: {
			data: {
				handler(val) {

				},
				// 深度监视
				deep: true,
				// 是否立即执行一次
				immediate: true
			}
		}
	};
</script>

<style lang="scss" scoped>

::v-deep img{
	width: 100%;
}
</style>