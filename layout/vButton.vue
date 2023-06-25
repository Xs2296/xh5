<template>
	<van-button
		v-bind="{ ...$props }"
		:disabled="dDisabled"
		:loading="dLoading"
		:class="type"
		@click="
			$emit('click', $event);
			toNext();
		"
	>
		<slot></slot>
	</van-button>
</template>
<script>
export default {
	name: 'v-button',
	props: {
		type: {
			default: '',
			require: false,
			type: String
		},
		size: {
			default: 'normal',
			require: false,
			type: String
		},
		text: {
			default: undefined,
			require: false,
			type: String
		},
		color: {
			default: undefined,
			require: false,
			type: String
		},
		icon: {
			default: '',
			require: false,
			type: String
		},
		iconPrefix: {
			default: '',
			require: false,
			type: String
		},

		block: {
			default: false,
			require: false,
			type: Boolean
		},
		plain: {
			default: false,
			require: false,
			type: Boolean
		},
		square: {
			default: false,
			require: false,
			type: Boolean
		},
		round: {
			default: false,
			require: false,
			type: Boolean
		},
		disabled: {
			default: false,
			require: false,
			type: Boolean
		},
		hairline: {
			default: false,
			require: false,
			type: Boolean
		},
		loading: {
			default: false,
			require: false,
			type: Boolean
		},
		loadingText: {
			default: 'loading...',
			require: false,
			type: String
		},
		loadingType: {
			default: 'circular',
			require: false,
			type: String
		},
		loadingSize: {
			default: '14px',
			require: false,
			type: String
		},
		url: {
			default: '',
			require: false,
			type: String
		},
		to: {
			default: '',
			require: false,
			type: String | Object
		},
		replace: {
			default: false,
			require: false,
			type: Boolean
		}
	},
	data() {
		return {
			dLoading: this.loading,
			dDisabled: this.disabled
		};
	},
	methods: {
		toNext() {
			if (this.to) {
				if (this.replace) {
					this._router.replace(this.to);
				} else {
					this._router.push(this.to);
				}
			}
		}
	},
	watch: {
		loading(n) {
			this.dLoading = n;
		},
		disabled(n) {
			this.dDisabled = n;
		}
	}
};
</script>
<style lang="scss" scoped>
.theme {
	::v-deep uni-button {
		background: $theme-1;
		color: #fff;
		border: 1px solid $theme-1;
	}
}
.blue {
	::v-deep uni-button {
		background: $gradient-blue;
		color: #fff !important;
		border: none;
		border-radius: inherit;
	}
}
.yellow {
	::v-deep uni-button {
		background: $gradient-yellow;
		color: #000;
		border: none;
		border-radius: inherit;
	}
}
.green {
	::v-deep uni-button {
		background: $gradient-green;
		color: #fff;
		border: none;
		border-radius: inherit;
	}
}
.green-plain {
	::v-deep uni-button {
		background: transparent;
		color: $green;
		border: 1px solid $green;
		border-radius: inherit;
		padding-left: 2px;
		padding-right: 2px;
	}
}
.red {
	::v-deep uni-button {
		background: $gradient-red;
		color: #fff;
		border: none;
		border-radius: inherit;
	}
}
.red-plain {
	::v-deep uni-button {
		background: transparent;
		color: $red !important;
		border: 1px solid $red;
		border-radius: 10upx;
		// padding-left: 2px;
		// padding-right: 2px;
	}
}
</style>
