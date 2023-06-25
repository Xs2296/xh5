<template>
	<view class="layout-page" :style="themeStyle">
		<!-- <v-header :title="$t('help.a1')"></v-header> -->
		<v-header :title="title"></v-header>
		<view class="box-html"><view v-html="article.body" v-cloak></view></view>
	</view>
</template>

<script>
import College from '@/api/college';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			cid: this.$route.query.id,
			title: this.$route.query.name,
			article: {
				body: ''
			}
		};
	},

	computed: {
		...mapGetters(['themeStyle'])
	},
	methods: {
		initPage() {
			this.article.body='';
			if (this.cid) {
				College.getServiceDetail(this.cid)
					.then(data => {
						this.article = data.data || {body: ''};
					})
					.catch(err => {});
			}
		}
	},
	watch: {
		$route() {
			this.cid = this.$route.query.id;
			this.title = this.$route.query.name;
			this.initPage();
		}
	},
	created() {
		this.initPage();
	}
};
</script>

<style lang="scss" scoped>
	.layout-page{
		overflow-y: auto;
	}
.box-html {
	padding: 15px;
	color: var(--light) !important;
	::v-deep {
		p {
			background-color: rgba(0, 0, 0, 0) !important;
			color: var(--light) !important;
		}
		span {
			background-color: rgba(0, 0, 0, 0) !important;
			color: var(--light) !important;
		}
	}
}
[v-cloak] {
	display: none !important;
}
</style>
