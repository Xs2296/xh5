<template>
   <img :src="`http://iph.href.lu/${width}x${height}`"/>
</template>
<script>
export default {
    name:'PlaceImg',
    props:['width','height']
}
</script>