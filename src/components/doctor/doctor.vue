<template>
  <div class="home">
    <div class="doctor">
      <mt-loadmore :bottom-method="loadBottom" :autoFill="autoFill" :bottom-all-loaded="allLoaded" ref="loadmore">
        <hotDoctorList :list='doctorList'/>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import hotDoctorList from "./hotDoctorList/hotDoctorList";
export default {
  name: "doctor",
  data() {
    return {
      doctorList: [],
      allLoaded: false,
      autoFill: false,
      idx:0,
    };
  },
  components: {
    hotDoctorList
  },
  computed: {
    aDouble() {
      return this.list;
    }
  },
  created() {
    Indicator.open({ text: '加载中...' });
    var _this = this;
    var diseaseId = this.$route.params.diseaseId;
    var url = this.baseUrl + "doc/getDoctorListByDiseaseIdForSearch";
    var data = {
      idx: 0,
      pagesize: 20,
      key: "",
      region: "",
      diseaseId: diseaseId
    };
    this.$http.post(url, data).then(
      response => {
        console.log(response.data);
        if (response.data.statusCode == 1) {
          _this.doctorList = response.data.object;
          Indicator.close();
        }
      },
      response => {
        console.log("error");
      }
    );
  },
  mounted: function() {
    var _this = this;
    this.$nextTick(function() {
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      var data = {
        getDataModule: "hotDoctor",
        idx: this.idx, // 页码
        pagesize: 20, // 请求数量
        region: "" // 城市
      }
      _this.getDoctorList(url,data);
    });
  },
  methods: {
    // 获取医生列表
    getDoctorList(url,data) {
      var _this = this;
      this.$http.post(url, data).then(
        response => {
          console.log(response.data);
          if (response.data.statusCode == 1) {
            var list = response.data.data.doctorInfo.item;
            if (list.length > 0) {
              list.forEach((v, i) => {
                _this.doctorList.push(v);
              });
            }else{
              this.allLoaded = true;
              Toast("暂无更多数据");
            }
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    loadTop() {
      // 下拉刷新
      this.idx = 0;
      this.getDoctorList();
      this.$refs.loadmore.onTopLoaded();
    },
    // 上拉加载更多数据
    loadBottom() {      
      this.idx++;
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      var data = {
        getDataModule: "hotDoctor",
        idx: this.idx, // 页码
        pagesize: 20, // 请求数量
        region: "" // 城市
      }
      console.log(this.idx)
      this.getDoctorList(url,data);
      this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../static/less/globalVar.less";
.home {
  padding-top: 0.3rem;
  .doctor {
    background: #fff;
    padding: 0 0.6rem;
  }
}
</style>
