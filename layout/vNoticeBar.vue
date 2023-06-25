<template>
    <view class="van-notice-bar d-flex p-x-md p-y-xs">
        <slot class="vant-icon-index van-notice-bar__left-icon" name="left-icon"></slot>
		<view class="van-notice-bar__wrap flex-fill">
			<slot class="van-notice-bar__content"></slot>
		</view>
		<slot name="right-icon"></slot>
    </view>
</template>
<script>
export default {
    name:'v-notice-bar',
    data(){
        return {}
    }
}
</script>