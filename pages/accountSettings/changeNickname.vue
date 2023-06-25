<template>
    <div class="layout-page">
        <v-header :title="$t('accountSettings.b0')"></v-header>
        <!-- 内容 -->
        <div class="h-max bg-panel-5 p-x-md layout-main">
            <div class="per-bot  p-t-md border-b border-gray-7 d-flex flex-col">
                <span class="color-light p-b-sm">{{$t('accountSettings.a2')}}</span>
                <van-field :placeholder="$t('accountSettings.b1')" maxlength="12"/>
            </div>
           
        </div>
        <div class="p-x-md bg-panel-5">
             <van-button class=" w-max fn-lg m-b-sm" color="#f05319" type="info">{{$t('common.save')}}</van-button>
        </div>
       
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .head-account {
        font-size: 20px;
    }
    ::v-deep .van-cell{
        padding: 0 !important;
    }
</style>