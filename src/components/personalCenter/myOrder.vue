<template>
    <div class="container">
        <div class="header">
            <i class="iconfont "></i>
        </div>
        <ul class="top_title">
            <li>全部</li>
        </ul>
        <mt-tab-container v-model="active">
            <mt-tab-container-item id="tab-container1">
                <mt-cell v-for="n in 1" :key="n" title="tab-container1"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <mt-cell v-for="n in 5" :key="n" title="tab-container2"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container3">
                <mt-cell v-for="n in 7" :key="n" title="tab-container3"></mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
  name: "myOrder",
  data() {
    return {
      active: "tab-container2"
    };
  }
};
</script>

<style lang="less" scoped>
.container {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    background-color: #eff4fa;
    height: 100%;
}
</style>
