<template>
  <div class="home">
    <div class="searchbar">
      <mt-button @click="switchTab(item,index)" v-for="(item,index) in tabList" :key="index"><span :class="{'active':showid == 'tab' + index}">{{item.name}}</span></mt-button>
    </div>
    <mt-tab-container v-model="showid">
      <mt-tab-container-item id="tab0">
        <div class="lists" v-if="doctorInfo.length>0">
          
          <div class="list_top">
            <h2>医生</h2>
            <p @click="openUpDoctor($event)"></p>
          </div>
          <div class="list_item" v-if="isDoctorInfo">
            <hotdoctorList :list="doctorInfo" /> 
            <div class="more" @click='viewDoctor(1)'>查看更多相关医生和团队</div>
          </div>
        </div>
        <div class="lists" v-if="hospitalInfo.length>0">
           <div class="list_top">
            <h2>医院</h2>
            <p @click="openUpHospital($event)"></p>
          </div>
          <div class="list_item" v-if="ishospitalInfo">
            <hospitalList :list="hospitalInfo" /> 
            <div class="more" @click='viewDoctor(2)'>查看更多相关医院</div>
          </div>
        </div>
        <div class="lists" v-if="diseaseInfo.length>0">
           <div class="list_top">
            <h2>疾病</h2>
            <p @click="openUpDisease($event)"></p>
          </div>
          <div class="list_item" v-if="isdiseaseInfo">
            <diseaseList :list="diseaseInfo" /> 
            <div class="more" @click='viewDoctor(3)'>查看更多相关疾病</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab1">
        <div class="lists"><hotdoctorList :list="doctorInfo" /></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <div class="lists"><hospitalList :list="hospitalInfo" /></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
        <div class="lists"><diseaseList :list="diseaseInfo" /></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab4">
        <p class="no-data">暂无数据</p> 
      </mt-tab-container-item>
    </mt-tab-container>
  </div> 
</template>

<script>
import hotdoctorList from "../hotDoctorList/hotDoctorList";
import hospitalList from "../hospitalList/hospitalList";
import diseaseList from "../diseaseList/diseaseList";
import { getRequest } from "../getRequest";
// import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      showid: "tab0",
      keywords: this.$route.params.key,
      tabList: [
        { name: "全部", key: "all" },
        { name: "医院", key: "hospital" },
        { name: "医生", key: "doctor" },
        { name: "疾病", key: "disease" },
        { name: "文章", key: "article" },
      ], // tab栏
      isDoctorInfo: true, // 医生列表展开折叠
      ishospitalInfo: true, // 医院列表展开折叠
      isdiseaseInfo: true, // 疾病列表展开折叠
      isDoctorList:false, // 医生列表面板是否显示
      isHospitalList:false, // 医院列表面板是否显示
      isDiseaseList:false, // 疾病列表面板是否显示
      doctorInfo: [], // 医生列表信息
      hospitalInfo: [], // 医院列表信息
      diseaseInfo: [] // 疾病列表信息
    };
  },
  components: {
    hotdoctorList, // 医生列表组件
    hospitalList, // 医院列表组件
    diseaseList // 疾病列表组件
  },
  created() {
    this.getKeywords(this.keywords);
  },
  activated(){
    var item = this.$route.params;
    if(item.key){
      this.keywords = item.key; // 获取搜索关键词
      this.getKeywords(item.key);
    }
  },
  deactivated(){
    console.log('level')
  },
  watch:{
    keywordsFn(){
      if(this.keywords != this.$route.params.key){
        this.getKeywords(this.keywords);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 doctorDetail 不缓存，即刷新
    next();
  },
  computed:{
    
  },
  mounted() {
    
  },
  methods: {
    // tab栏切换
    switchTab(item,index){
      this.showid = "tab" + index;
    },
    // 查看更多
    viewDoctor(index){
      this.showid = 'tab' + index;
    },
    // 根据关键词搜索列表数据
    getKeywords(keywords) {
      var _this = this;
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      var data = {
        getDataModule: "searchBar",
        idx: 0,
        pagesize: 20,
        region: "",
        // key: decodeURI(getRequest()["keywords"])
        key: keywords
      };
      Indicator.open({
        text: '加载中...'
      });
      this.$http.post(url, data).then(
        response => {
          // console.log(response.data);
          if (response.data.statusCode == 1) {
            _this.doctorInfo = response.data.data.doctorInfo.item; // 医生
            _this.hospitalInfo = response.data.data.hospitalInfo.item; // 医院
            _this.diseaseInfo = response.data.data.diseaseInfo.item; // 疾病
            Indicator.close(); // 关闭加载动画
          }
        },
        response => {
          console.log("error");
        }
      );
      
    },
    // 医生列表展开关闭
    openUpDoctor(e) {
      this.isDoctorInfo = !this.isDoctorInfo;
      if (e.target.className.indexOf("active") == -1) {
        e.target.className = "active";
      } else {
        e.target.className = "";
      }
    },
    // 医院列表展开关闭
    openUpHospital(e) {
      this.ishospitalInfo = !this.ishospitalInfo;
      if (e.target.className.indexOf("active") == -1) {
        e.target.className = "active";
      } else {
        e.target.className = "";
      }
    },
    // 疾病列表展开关闭
    openUpDisease(e) {
      this.isdiseaseInfo = !this.isdiseaseInfo;
      if (e.target.className.indexOf("active") == -1) {
        e.target.className = "active";
      } else {
        e.target.className = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@borderColor: rgb(238, 238, 238);
.home {
  padding-top: 2.3rem;
}
.searchbar {
  display: flex;
  width: 100%;
  height: 2rem;
  background: #fff;
  border-bottom: 1px solid @borderColor;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  button {
    width: 20%;
    color: rgb(57, 57, 57);
    text-align: center;
    border: 0;
    // background-color: #fff;
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
.lists {
  background: #fff;
  padding: 0 0.6rem;
}  
.no-data{text-align:center;}
.list_top {
  height: 2.3rem;
  border-bottom: 1px solid @borderColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    color: rgb(102, 102, 102);
    font-size: 0.75rem;
  }
  p {
    width: 0.8rem;
    height: 0.4rem;
    background: url("../../../../static/imgs/hospital/search/tdf_search_zhankai.png")
      no-repeat;
    background-size: 100%;
    &.active {
      background: url("../../../../static/imgs/hospital/search/tdf_search_shouqi.png")
        no-repeat;
      background-size: 100%;
    }
  }
}
.more {
  padding: 0.8rem;
  color: rgb(102, 102, 102);
  font-size: 0.75rem;
  text-align: center;
  border-top: 1px solid @borderColor;
  margin-bottom: 0.35rem;
}
</style>
