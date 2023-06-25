<template> 
    <div>
        <div class="coin p-md color-light fn-20">
           <img :src="detail.coin_icon" width="20" height="20" alt="">
            {{detail.full_name}}
        </div>
        <div class="list">
            <div class="d-flex justify-between p-x-md p-y-xs">
                <div>{{$t('exchange.a8')}}</div>
                <div class="color-light">
                     {{detail.total_issuance}}
                </div>
            </div>
            <div class="d-flex justify-between p-x-md p-y-xs">
                <div>{{$t('exchange.a9')}}</div>
                <div class="color-light">
                     {{detail.total_circulation}}
                </div>
            </div>
            <div class="d-flex justify-between p-x-md p-y-xs">
                <div>{{$t('exchange.b0')}}</div>
                <div class="color-light">
                   {{detail.crowdfunding_price}}
                </div>
            </div>
            <div class="d-flex justify-between p-x-md p-y-xs">
                <div>{{$t('exchange.b1')}}</div>
                <div class="color-light">
                    {{detail.publish_time}}
                </div>
            </div>
            <!-- <div class="d-flex justify-between p-x-md p-y-xs">
                <div class="flex-shrink">{{$t('exchange.b2')}}</div>
                <div class="color-light d-flex">
                    <div class="address eps-1 p-r-xs m-r-xs border-r fn-wrap">
                        {{detail.white_paper_link}}
                    </div>
                    <div class="color-sell flex-shrink" @click="$copy(detail.white_paper_link)">{{$t('common.copy')}}</div>
                </div>
            </div>
            <div class="d-flex justify-between p-x-md p-y-xs">
                <div class="flex-shrink">{{$t('exchange.b3')}}</div>
                <div class="color-light d-flex">
                    <div class="address eps-1 p-r-xs m-r-xs border-r fn-wrap">
                        {{detail.official_website_link}}
                    </div>
                    <div class="color-sell flex-shrink" @click="$copy(detail.official_website_link)">{{$t('common.copy')}}</div>
                </div>
            </div>
			-->
        </div>
        <div class="p-md">
            <div class="fn-20 color-light">
                {{$t('exchange.b4')}}
            </div>
            <div class="p-y-md edit-content" v-html="detail.coin_content">
            </div>
        </div>
    </div>
</template>
<script>
import Market from '@/api/market'
export default {
    props:{
        query:{
            default:{}
        }
    },
    data(){
        return {
            detail:{}
        }
    },
    watch:{
        ['query.code'](){
            this.getCoinInfo()
        }
    },
    methods:{
        getCoinInfo(){
            let data = {
                coin_name:this.query.code.split('/')[0]
            }
            Market.getCoinInfo(data).then(res=>{
                this.detail = res.data
            })
        }
    },
    created(){
        this.getCoinInfo()
    }
}
</script>
<style lang="scss" scoped>
    
</style>