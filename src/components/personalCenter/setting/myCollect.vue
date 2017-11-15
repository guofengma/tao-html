<template>
 <div :is="pubDoclist" :list="[1]"></div> 
</template>

<script>
import pubDoclist from '../pubComponents/pubDocList'
export default {
    name: 'myCollect',
    data() {
        return {
            pubDoclist: 'pubDoclist'
        }
    },
    components: {
        pubDoclist
    }
}
</script>

<style lang="less" scoped>

</style>
