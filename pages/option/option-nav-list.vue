<template>
  <div class="p-md">
    <view :style="{height:taskHeight+'px'}"></view>
    <div class="title fn-22 color-light">Option</div>
    <div class="group">
      <table class="w-max">
          <thead>
              <tr class="fn-sm">
                  <th class="fn-left">{{$t('option.a0')}}</th>
                  <th>{{$t('option.e4')}}</th>
                  <th class="fn-right">{{$t('option.a1')}}</th>
              </tr>
          </thead>
        <template v-for="parentItem in list">
          <thead :key="parentItem.guessPairsName">
            <tr>
              <th colspan="3" class="fn-left color-light p-y-md">
                <div class="d-inline-block h-10 w-4 bg-danger"></div>
               {{parentItem.guessPairsName}}
              </th>
            </tr>
          </thead>
          <tbody :key="parentItem.guessPairsName+'1'">
            <tr v-for="item in parentItem.scenePairList" :key="item.pair_time_name" class="link-active" @click="$emit('check',item);$emit('close')">
              <td class="color-light">
               {{item.pair_time_name|coinText}}
              </td>
              <td>
                <span :class="item.increase>=0?'color-buy':'color-sell'">{{item.increaseStr}}</span>
              </td>
              <td class="fn-right">
                 <van-count-down :time="item.seconds*1000">
                  </van-count-down>
              </td>
            </tr>
          </tbody>
        </template>
      </table>
    </div>
  </div>
</template>
<script>
import Option from '@/api/option'
import { mapState } from "vuex";
export default {
  data(){
    return {
      list:[],
      taskHeight:0
    }
  },
  filters:{
    coinText(str){
      return str.replace('/USDT','').replace('-','·')
    }
  },
  computed:{
    ...mapState({
      ws:'ws'
    })
  },
  methods:{
       // 获取交易对
    sceneListByPairs(){
      Option.sceneListByPairs().then(res=>{
        this.list = res.data
      })
    }
  },
   created(){
    this.sceneListByPairs()
     uni.getSystemInfo({
        success:(obj)=>{
          this.taskHeight = obj.statusBarHeight
        }
      })
  }
}
</script>