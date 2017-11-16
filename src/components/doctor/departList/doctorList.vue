<template>
  <div class="doctorList">
    <ul class="doctor_top">
      <li @click="showid = '1'" :class="{'active':showid == '1'}"><h2>科室</h2><span class="triangle"></span></li>
      <li @click="showid = '2'" :class="{'active':showid == '2'}"><h2>地区</h2><span class="triangle"></span></li>
      <li @click="showid = '3'" :class="{'active':showid == '3'}"><h2>筛选</h2><span class="triangle"></span></li>
    </ul>
    <div class="depart_list" v-if="showid==1">
      <departmentList/>
    </div>
    <div class="area_list" v-if="showid==2">
      <areaList/>
    </div>
    <div class="fliter_list" v-if="showid==3">
      <fliterList/>
    </div>
    <div class="shadow_box" @click="closeShadow" v-if="showid==1 || showid == 2 || showid == 3"></div>
  </div>
</template>

<script>
import departmentList from "./departList";
import areaList from "./areaList";
import fliterList from "./fliterList";
export default {
  components: {
    departmentList, // 科室列表
    areaList, // 地区列表
    fliterList // 筛选列表
  },
  data() {
    return {
      showid: "3",// 选中当前项
    };
  },
  methods:{
    closeShadow(){
      this.showid = 4;
    }
  }
};
</script>

<style lang="less" scoped>
.doctorList{
  position: relative;
}
.doctor_top {
  width: 100%;
  height: 2rem;
  background: #fff;
  border-bottom:1px solid rgb(229, 229, 229);
  position: fixed;
  left: 0;
  top: 2rem;
  z-index: 10000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  li {
    display: flex;
    align-items: center;
    &.active {
      h2 {
        color: #52a2ff;
      }
      .triangle {
        display: block;
        width: 0;
        height: 0;
        border-top: 0.5rem solid #52a2ff;
        border-right: 0.3rem solid transparent;
        border-left: 0.3rem solid transparent;
        border-bottom: 0;
      }
    }
    h2 {
      font-size: 0.75rem;
      margin-right: 0.3rem;
      color: rgb(57, 57, 57);
    }
    .triangle {
      display: block;
      width: 0;
      height: 0;

      border-top: 0;
      border-right: 0.3rem solid transparent;
      border-left: 0.3rem solid transparent;
      border-bottom: 0.5rem solid #52a2ff;
    }
  }
}
.shadow_box {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}
.depart_list,.area_list,.fliter_list{
  width:100%;
  position: absolute;
  left: 0;
  top:3.5rem;
  z-index: 10000;
}
</style>
