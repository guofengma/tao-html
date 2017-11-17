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
      area: [],
      activeDep: "activeDep",
      showid: "0",
      area_item: []
    };
  },
  mounted: function() {
    var _this = this;
    var url = this.baseUrl + 'doc/getAllAreaList';
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this.$http.post(url, this.item).then(
        response => {
          // console.log(response.data);
          var city = response.data.data ;
          if (response.data.success) {
            this.area = response.data.data.areaInfoList.item;
            this.area.unshift({pAreaName:"重点城市",areainfoCustom:response.data.data.emphasesCityInfo.item});
            this.area_item = this.area[0].areainfoCustom;
          }
        },
        response => {
          console.log("error");
        }
      );
    });
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
