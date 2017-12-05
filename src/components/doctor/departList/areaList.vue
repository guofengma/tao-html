<template>
  <div class="home">
    <div class="department">
      <div class="departmentList">
        <ul class="department_left">
          <li v-for="(item,index) in area" :key="index" :class="{'activeDep':showid == index}" @click="choiceDepartment(item,index)">{{item.pAreaName}}</li>
        </ul>
        <ul class="department_right">
          <li v-for="(item,index) in area_item" :key="index" @click="transferArea(item,index)">{{item.areaName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showid: "0",
      area_item: []
    };
  },
  props:['area'],
  mounted: function() {
    this.area_item != 0 ? this.area[0].areainfoCustom : []; // 默认显示第一项
  },
  methods: {
    choiceDepartment(item, index) {
      // console.log(item,index);
      this.showid = index; // 添加当前状态
      this.area_item = item.areainfoCustom;
    },
    transferArea(item,index){
      // console.log(item,index);
      // 传递给父组件的事件、数据对象、索引
      this.$emit("seachArea",item,index);
    }
  }
};
</script>

<style lang="less" scoped>
.department {
  background: #fff;
}
.departmentList {
  display: flex;
  margin: 0.5rem 0;
  height: 25rem;
  overflow: hidden;
  .department_left {
    width: 7rem;
    background: rgb(242, 242, 242);
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      line-height: 2rem;
      border-bottom: 1px solid rgb(229, 229, 229);
      font-size: 0.75rem;
      color: rgb(57, 57, 57);
      padding-left: 1rem;
      position: relative;
      &.activeDep {
        background: #fff;
        &::after {
          content: "";
          display: block;
          width: 0.2rem;
          height: 0.9rem;
          background: #ff5252;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -0.45rem;
        }
      }
    }
  }
  .department_right {
    flex-grow: 1;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      padding: 0 1.2rem 0 2.4rem;
      line-height: 2rem;
      border-bottom: 1px solid rgb(238, 238, 238);
      font-size: 0.75rem;
      color: rgb(102, 102, 102);
    }
  }
}
</style>
