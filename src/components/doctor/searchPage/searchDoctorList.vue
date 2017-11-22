<template>
  <div class="home">
    <div class="searchbar">
      <mt-button @click="showid = 'tab1'"><span :class="{'active':showid == 'tab1'}">全部</span></mt-button>
      <mt-button @click="showid = 'tab2'"><span :class="{'active':showid == 'tab2'}">医生</span></mt-button>
      <mt-button @click="showid = 'tab3'"><span :class="{'active':showid == 'tab3'}">医院</span></mt-button>
      <mt-button @click="showid = 'tab4'"><span :class="{'active':showid == 'tab4'}">疾病</span></mt-button>
      <mt-button @click="showid = 'tab5'"><span :class="{'active':showid == 'tab5'}">文章</span></mt-button>
    </div>
    <mt-tab-container v-model="showid">
      <mt-tab-container-item id="tab1">
        <div class="lists">
          <div class="list_top">
            <h2>医生</h2>
            <p @click="openUpDoctor($event)"></p>
          </div>
          <div class="list_item" v-if="isDoctorInfo">
            <hotdoctorList :list="doctorInfo" /> 
            <div class="more">查看更多相关医生和团队</div>
          </div>
        </div>
        <div class="lists">
           <div class="list_top">
            <h2>医院</h2>
            <p @click="openUpHospital($event)"></p>
          </div>
          <div class="list_item" v-if="ishospitalInfo">
            <hospitalList :list="hospitalInfo" /> 
            <div class="more">查看更多相关医院</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <p>这是2</p> 
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
        <p>这是3</p> 
      </mt-tab-container-item>
      <mt-tab-container-item id="tab4">
        <p>这是4</p> 
      </mt-tab-container-item>
      <mt-tab-container-item id="tab5">
        <p>这是5</p> 
      </mt-tab-container-item>
    </mt-tab-container>
  </div> 
</template>

<script>
import hotdoctorList from "../hotDoctorList/hotDoctorList";
import hospitalList from "../hospitalList/hospitalList";
import { getRequest } from "../getRequest";
export default {
  data() {
    return {
      showid: "tab1",
      keywords: "",
      isDoctorInfo:true, // 医生列表展开折叠
      ishospitalInfo:true,// 医院列表展开折叠
      isdiseaseInfo:true,// 疾病列表展开折叠
      doctorInfo:[], // 医生列表信息
      hospitalInfo:[], // 医院列表信息
      diseaseInfo:[], // 疾病列表信息
    };
  },
  components:{
    hotdoctorList, // 医生列表组件
    hospitalList, // 医院列表组件
  },
  mounted() {
    this.getKeywords();
  },
  methods: {
    getKeywords() {
      var _this = this;
      var url = _this.baseUrl + "doc/getDoctorListForInternatHospital";
      var data = {
        getDataModule: "searchBar",
        idx: 0,
        pagesize: 2,
        region: "",
        key: decodeURI(getRequest()["keywords"])
      };
      this.$http.post(url, data).then(
        response => {
          console.log(response.data);
          if (response.data.statusCode == 1) {
            _this.doctorInfo = response.data.data.doctorInfo.item; // 医生
            _this.hospitalInfo = response.data.data.hospitalInfo.item; // 医院
            _this.diseaseInfo = response.data.data.diseaseInfo.item; // 疾病
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    openUpDoctor(e){
      this.isDoctorInfo = !this.isDoctorInfo;
      if(e.target.className.indexOf('active') == -1){
        e.target.className = "active";
      }else{
        e.target.className = "";
      }
    },
    openUpHospital(e){
      this.ishospitalInfo = !this.ishospitalInfo;
      if(e.target.className.indexOf('active') == -1){
        e.target.className = "active";
      }else{
        e.target.className = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@borderColor: rgb(238, 238, 238);
.home{
  padding-top:2.3rem;
}
.searchbar {
  display:flex;
  width: 100%;
  height: 2rem;
  background: #fff;
  border-bottom: 1px solid @borderColor;
  position: fixed;
  top:0;
  left: 0;
  z-index: 9999;
  button {
    width: 20%;
    color: rgb(57, 57, 57);
    text-align: center;
    border: 0;
    background-color: #fff;
    span {
      font-size: 0.7rem;
      padding-bottom: 0.5rem;
      &.active {
        color: rgb(255, 82, 82);
        border-bottom: 2px solid rgb(255, 82, 82);
      }
    }
  }
  .mint-button--default {
    box-shadow: none;
  }
}
.lists{
  background:#fff;
  padding:0 0.6rem;
}
.list_top{
  height: 2.3rem;
  border-bottom:1px solid @borderColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2{
    color:rgb(102,102,102);
    font-size:0.75rem;
  }
  p{
    width:0.8rem;
    height: 0.4rem;
    background: url('../../../../static/imgs/hospital/search/tdf_search_zhankai.png') no-repeat;
    background-size:100%;
    &.active{
      background: url('../../../../static/imgs/hospital/search/tdf_search_shouqi.png') no-repeat;
      background-size:100%;
    }
  }
}
.more{
  padding:0.8rem;
  color:rgb(102,102,102);
  font-size:0.75rem;
  text-align:center;
  border-top:1px solid @borderColor;
  margin-bottom:0.35rem;
}
</style>
