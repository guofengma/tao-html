<template>
  <div class="doctorList">
    <ul class="doctor_top">
      <li @click="switchTab(item,index)" :class="{'active':switchTabActive == 'switch' + index}" v-for="(item,index) in switchTabList" :key='index'><h2>{{item.switchName}}</h2><span class="triangle"></span></li>
    </ul>
    <div class="depart_list" v-show="showid==1">
      <departmentList @searchDepart = "searchDepart" :department="department"/>
    </div>
    <div class="area_list" v-show="showid==2">
      <areaList @seachArea="seachArea" :area='area'/>
    </div> 
    <div class="fliter_list" v-show="showid==3">
      <fliterList @searchFliter='searchFliter'/>
    </div>
    <div class="shadow_box" @click="closeShadow" @touchmove="closeShadow" v-if="isShowShadow"></div>
    <div class="hot_doctor_list">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <hotDoctorList :list='departList'/>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import departmentList from "./departList";
import areaList from "./areaList";
import fliterList from "./fliterList";
import hotDoctorList from "../hotDoctorList/hotDoctorList";
import { Indicator } from "mint-ui";
export default {
  components: {
    departmentList, // 科室列表
    areaList, // 地区列表
    fliterList, // 筛选列表
    hotDoctorList
  },
  data() {
    return {
      showid: "", // 判断是否选中当前项
      switchTabActive: "switch",
      departList: [], // 医生列表数据
      switchTabList: [
        { switchName: "科室" },
        { switchName: "地区" },
        { switchName: "筛选" }
      ],
      isShowShadow: false, // 是否显示遮罩
      departmentId:'', // 科室ID(已选择科室增加地区等条件是需要存储)
      region:'', // 地区(已选择地区增加筛选等条件是需要存储)
      list:[],
      idx:0,
      allLoaded:false,
      department:[], // 科室列表数据
      department_item:[], // 二级科室第一项
      area:[], // 地区列表
    };
  },
  created() {
    let item = this.$route.params;
    var option = {
      getDataModule: "hotDepartment",
      idx: 0,
      pagesize: 20,
      region: "",
      department: item.id
    };
    Indicator.open({ text:"加载中..." });
    var doctorUrl = this.baseUrl + "doc/getDoctorListForInternatHospital";
    this.$http.post(doctorUrl, option).then(
      response => {
        // console.log(response.data);
        if (response.data.success && response.data.statusCode == 1) {
          this.departList = response.data.data.doctorInfo.item;
          Indicator.close(); // 关闭加载动画
        }
      },
      response => {
        console.log("error");
      }
    );
    // 获取科室列表
    var departUrl = this.baseUrl + 'doctor/getDepartmentWithChildren';
    this.getDepartList(departUrl);
    // 获取地区列表
    var areaUrl = this.baseUrl + 'doc/getAllAreaList';
    this.getAreaList(areaUrl);
  },
  mounted() {
    
  },
  methods: {
    // 获取科室列表
    getDepartList(url){
      this.$http.post(url).then(
        response => {
          // console.log(response.data);
          if (response.data.success) {
            this.department = response.data.data;
            // this.department_item = this.department[0].childDepartment;
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    // 获取地区列表
    getAreaList(url){
      this.$http.post(url).then(
        response => {
          console.log(response.data);
          var city = response.data.data ;
          if (response.data.success) {
            this.area = response.data.data.areaInfoList.item;
            this.area.unshift({pAreaName:"重点城市",areainfoCustom:response.data.data.emphasesCityInfo.item});
            // this.area_item = this.area[0].areainfoCustom;
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    // 获取查询医生列表
    getDoctorList() {
      var url = this.baseUrl + 'doc/getDoctorListForInternatHospital';
      // this.$http.post(url, this.item).then(
      //   (response) => {
      //     // console.log(response.data);
      //     if (response.data.statusCode == 1) {
      //       this.list.push(response.data.data.doctorInfo.item);
      //     }
      //   },
      //   (response) => {
      //     console.log("error");
      //   }
      // );
    },
    loadTop() {
      // 下拉刷新
      this.getDoctorList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 上拉加载更多数据
      this.idx++;
      this.getDoctorList();
      this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    // 遮罩消失
    closeShadow() {
      this.isShowShadow = false; // 遮罩消失
      this.showid = "4"; // 查询条件列表消失
      this.switchTabActive = 'switch' // 取消当前选中状态
    },
    // 切换查询条件tab栏
    switchTab(item, index) {
      this.showid = index + 1; // 查询条件列表出现
      this.isShowShadow = true; // 遮罩出现
      this.switchTabActive = "switch" + index; // 当前选中的特殊状态
    },
    // 按科室查询
    searchDepart(item, index) {
      // console.log(item, index);
      Indicator.open({
        text:"科室加载中..."
      });
      this.showid = "4"; // 查询条件列表消失
      this.switchTabList[0].switchName = item.name; // 显示当前选中的科室名字
      this.isShowShadow = false; // 遮罩的显示隐藏
      this.departmentId = item.id;// 科室ID(已选择科室增加地区等条件是需要存储)
      var option = {
        getDataModule: "hotDepartment",
        idx: 0,
        pagesize: 10,
        region: "",
        department: item.id 
      };
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      this.$http.post(url, option).then(
        response => {
          // console.log(response.data);
          if (response.data.success && response.data.statusCode == 1) {
            this.departList = response.data.data.doctorInfo.item;
            Indicator.close(); // 关闭loading动画
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    // 按地区查询
    seachArea(item, index) {
      // console.log(item, index);
      this.showid = "4"; // 查询条件列表消失
      this.switchTabList[1].switchName = item.areaName; // 显示当前选中的地区名字
      this.isShowShadow = false; // 遮罩的显示隐藏
      this.region = item.areaName // 地区(已选择地区增加筛选等条件是需要存储)
      var option = {
        getDataModule: "hotDepartment",
        idx: 0,
        pagesize: 10,
        region: item.areaName,
        chooseRegion:item.areaName,
        department:this.departmentId
      };
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      this.$http.post(url, option).then(
        response => {
          console.log(response.data);
          if (response.data.success && response.data.statusCode == 1) {
            this.departList = response.data.data.doctorInfo.item;
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    // 按筛选查询
    searchFliter(serviceType,doctorTitle){
      this.showid = "4"; // 查询条件列表消失
      this.isShowShadow = false; // 遮罩的显示隐藏
      var option = {
        getDataModule: "hotDepartment",
        idx: 0,
        pagesize: 10,
        region: this.region,
        department:this.departmentId,
        serviceType:serviceType,
        doctorTitle:doctorTitle
      };
      Indicator.open({ text:"加载中..." });
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      this.$http.post(url, option).then(
        response => {
          console.log(response.data);
          if (response.data.success && response.data.statusCode == 1) {
            this.departList = response.data.data.doctorInfo.item;
            Indicator.close();
          }
        },
        response => {
          console.log("error");
        }
      );
      console.log(serviceType,doctorTitle)
    }
  }
};
</script>

<style lang="less" scoped>
.doctorList {
  position: relative;
  padding-top:2.3rem;
}
.hot_doctor_list{
  padding:0rem 0.6rem 0;
  background:#fff;
}
.doctor_top {
  width: 100%;
  height: 2rem;
  background: #fff;
  border-bottom: 1px solid rgb(229, 229, 229);
  position: fixed;
  left: 0;
  top: 0rem;
  z-index: 10001;
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
.depart_list,
.area_list,
.fliter_list {
  width: 100%;
  position: fixed;
  left: 0;
  top:1.5rem;
  z-index: 10000;
}
</style>
