<template>
    <v-page>
        <v-header :title="$t('notice.a0')"></v-header>
        <main class="layout-main p-md">
            <view class="top p-b-sm border-b">
                <view class="title fn-lg fn-center color-light">
                    {{data.title}}
                </view>
                <view class="time fn-sm">
                   {{detail.created_at}}
                </view>
            </view>
            <view class="edit-content m-t-md" v-html="data.content">
             
            </view>
        </main>
    </v-page>
</template>
<script>
import Member from "@/api/member";
export default {
    data(){
        return {
            detail:{},
            data:{},
            query:{}
        }
    },
    computed: {
    },
    methods:{
        readNotifiable(){
            Member.readNotifiable({
                id:this.query.id
            }).then(res=>{
                this.detail= res.data
                this.data = res.data.data
            }).catch(()=>{})
        }
    },
    onLoad($ev){
         this.query = $ev;
        this.readNotifiable()
    }
}
</script>
<style lang="scss">
    
</style>