<template>
  <div :is="componentsName" :list="[1,2,3]"></div>
</template>

<script>
import pubDocList from '../pubComponents/pubDocList'
export default {
    name: 'myDoc',
    data() {
        return {
            componentsName: 'pubDocList'
        }
    },
    components:{
        pubDocList
    }
}
</script>

<style lang="less" scoped>

</style>
