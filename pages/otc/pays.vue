<template>
   <v-page>
       <v-header :title="$t('otc.j6')"></v-header>
       <view class="layout-main">
           <v-link to="/pages/otc/bind-pay?type=alipay" class="m-md p-md bg-panel-3 box-shadow rounded-sm d-flex">
               <view class="flex-fill">
                {{$t('otc.b7')}}
               </view>
               <van-icon name="arrow" />
           </v-link>
           <v-link to="/pages/otc/bind-pay?type=wechat" class="m-md p-md bg-panel-3 box-shadow rounded-sm d-flex">
               <view class="flex-fill">
                {{$t('otc.b8')}}
               </view>
               <van-icon name="arrow" />
           </v-link>
           <v-link to="/pages/otc/bind-pay?type=bank_card" class="m-md p-md bg-panel-3 box-shadow rounded-sm d-flex">
               <view class="flex-fill">
                {{$t('otc.b9')}}
               </view>
               <van-icon name="arrow" />
           </v-link>
       </view>
   </v-page>
</template>