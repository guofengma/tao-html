<template>
  <div class="departmentList">
    <ul class="department_left">
      <li v-for="(item,index) in department" :key="index" :class="{'activeDep':showid == index}" @click="choiceDepartment(item,index)">{{item.name}}</li>
    </ul>
    <ul class="department_right">
      <router-link tag="li" :to="{path:'/doctorList',query:{id:item.id}}" v-for="(item,index) in department_item" :key="index">{{item.name}}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: [],
      activeDep: "activeDep",
      showid: "0",
      department_item: []
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
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 doctorDetail 不缓存，即刷新
    next();
  },
  methods: {
    choiceDepartment(item, index) {
      // console.log(item,index);
      this.showid = index; // 添加当前状态
      this.department_item = item.childDepartment;
    }
  }
};
</script>

<style lang="less" scoped>
.departmentList {
  display: flex;
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
    background: #fff;
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
