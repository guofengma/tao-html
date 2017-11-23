<template>
  <div class="home">
    <div class="department">
      <div class="departmentList">
        <ul class="department_left">
          <li v-for="(item,index) in department" :key="index" :class="{'activeDep':showid == index}" @click="choiceDepartment(item,index)">{{item.name}}</li>
        </ul>
        <ul class="department_right">
          <li @click="transferDepart(item,index)" v-for="(item,index) in department_item" :key="index">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: [], // 一级科室列表
      department_item: [], // 二级科室列表
      activeDep: "activeDep", // 选中当前科室特殊状态
      showid: "0" // 判断是否选中当前科室
    };
  },
  mounted: function() {
    var _this = this;
    var url = _this.baseUrl + "doctor/getDepartmentWithChildren";
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this.$http.post(url, this.item).then(
        response => {
          // console.log(response.data);
          if (response.data.success) {
            this.department = response.data.data;
            this.department_item = this.department[0].childDepartment;
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
      this.department_item = item.childDepartment; // 二级科室列表数据
    },
    transferDepart(item, index) {
      // 传递给父组件的事件、数据对象、索引
      this.$emit("searchDepart", item, index);
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
