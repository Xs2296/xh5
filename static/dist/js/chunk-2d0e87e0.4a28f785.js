(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e87e0"],{"8a01":function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"layout-page"},[s("v-header",{attrs:{title:""+(e.user.phone?e.$t("safe.a0"):e.$t("safe.a1"))+e.$t("safe.d4")}}),s("main",{staticClass:"layout-main bg-panel-4 m-t-md"},[e.user.phone?e._e():s("div",{staticClass:"form-item border-b p-md"},[s("div",{staticClass:"label m-b-xs"},[e._v(e._s(e.$t("safe.d4")))]),s("div",{staticClass:"input color-light"},[s("v-input",{attrs:{placeholder:e.$t("safe.d5")},scopedSlots:e._u([{key:"left",fn:function(){return[s("v-country",{ref:"country",staticClass:"m-r-xs",model:{value:e.country_id,callback:function(t){e.country_id=t},expression:"country_id"}})]},proxy:!0}],null,!1,2373810091),model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)]),s("div",{staticClass:"form-item border-b p-md"},[s("div",{staticClass:"label m-b-xs"},[e._v("SMS"+e._s(e.$t("safe.a7")))]),s("div",{staticClass:"input color-light"},[s("v-input",{attrs:{placeholder:e.$t("safe.a6")},scopedSlots:e._u([{key:"right",fn:function(){return[e.user.phone?s("v-code",{attrs:{url:"/user/getCode",data:{type:1}}}):s("v-code",{attrs:{url:"/user/sendBindSmsCode",data:{phone:e.form.phone,country_code:e.$refs.country&&e.$refs.country.country_code}}})]},proxy:!0}]),model:{value:e.form.sms_code,callback:function(t){e.$set(e.form,"sms_code",t)},expression:"form.sms_code"}})],1)]),1==e.user.email_status?s("div",{staticClass:"form-item border-b p-md"},[s("div",{staticClass:"label m-b-xs"},[e._v(e._s(e.$t("safe.a5")))]),s("div",{staticClass:"input color-light"},[s("v-input",{attrs:{placeholder:e.$t("safe.a6")},scopedSlots:e._u([{key:"right",fn:function(){return[s("v-code",{attrs:{url:"/user/getCode",data:{type:2}}})]},proxy:!0}],null,!1,4197024707),model:{value:e.form.email_code,callback:function(t){e.$set(e.form,"email_code",t)},expression:"form.email_code"}})],1)]):e._e(),1==e.user.google_status?s("div",{staticClass:"form-item border-b p-md"},[s("div",{staticClass:"label m-b-xs"},[e._v("google"+e._s(e.$t("safe.a7")))]),s("div",{staticClass:"input color-light"},[s("v-input",{attrs:{placeholder:e.$t("safe.a6")},model:{value:e.form.google_code,callback:function(t){e.$set(e.form,"google_code",t)},expression:"form.google_code"}})],1)]):e._e()]),s("div",{staticClass:"p-md bg-panel-4"},[s("v-button",{ref:"btn",staticClass:"w-max",attrs:{type:"theme"},on:{click:e.changePhone}},[e._v(e._s(e.user.phone?e.$t("safe.a0"):e.$t("safe.a1")))])],1)],1)},a=[],r=s("5530"),n=s("90e7"),c=s("2f62"),i={data:function(){return{country_id:1,form:{phone:"",country_code:"",email_code:"",sms_code:"",google_code:""}}},computed:Object(r["a"])({},Object(c["c"])({user:"user"})),methods:Object(r["a"])(Object(r["a"])({},Object(c["b"])({setUserInfo:"setUserInfo"})),{},{changePhone:function(){var e=this;if(this.form.country_code=this.$refs.country&&this.$refs.country.country_code,this.user.phone||!this.form.phone)if(this.form.sms_code){var t=this.user.phone?n["a"].unbindPhone(this.form,{btn:this.$refs.btn}):n["a"].bindPhone(this.form,{btn:this.$refs.btn});t.then((function(){e.$toast.success(e.user.phone?e.$t("safe.a8"):e.$t("safe.a9")),e.$back(),e.setUserInfo()})).catch((function(){}))}else this.$toast(this.$t("safe.d6"));else this.$toast(this.$t("safe.d5"))}})},l=i,d=s("2877"),u=Object(d["a"])(l,o,a,!1,null,"4f02bcf5",null);t["default"]=u.exports}}]);