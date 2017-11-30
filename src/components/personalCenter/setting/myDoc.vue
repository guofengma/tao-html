<template>
  <div :is="componentsName" :customerId="userInfo.id"></div>
</template>

<script>
import pubDocList from "../pubComponents/pubDocList";
export default {
  name: "myDoc",
  data() {
    return {
      componentsName: "pubDocList",
      userInfo: {}
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
  },
  components: {
    pubDocList
  }
};
</script>

<style lang="less" scoped>

</style>
