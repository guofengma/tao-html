<template>
  <ul class="disease_list">
    <router-link tag="li" v-for="(item,index) in list" :key="index" :to="{name:'doctor',params:item}">
      <h2>{{item.diseaseName}}</h2>
      <p><img src="../../../../static/imgs/hospital/search/tdf_search_nex.png" alt=""></p>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["list"]
};
</script>

<style lang="less" scoped>
@borderColor: rgb(238, 238, 238);
@fontColor: rgb(57, 57, 57);
.disease_list {
  background:#fff;
  li {
    height: 2.25rem;
    border-bottom: 1px solid @borderColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:last-child {
      border-bottom: 0;
    }
    h2 {
      font-size: 0.75rem;
      color: @fontColor;
    }
    p {
      width: 0.4rem;
      height: 0.5rem;
      img {
        width: 100%;
      }
    }
  }
}
</style>
