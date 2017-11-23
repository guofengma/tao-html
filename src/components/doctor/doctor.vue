<template>
  <div class="home">
    <div class="doctor">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :autoFill="autoFill" :bottom-all-loaded="allLoaded" ref="loadmore">
        <hotDoctorList :list='doctorList'/>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import hotDoctorList from "./hotDoctorList/hotDoctorList";
export default {
  name: "doctor",
  data() {
    return {
      doctorList: [],
      allLoaded: false,
      autoFill: false,
      item: {
        getDataModule: "hotDoctor",
        idx: 0, // 页码
        pagesize: 2, // 请求数量
        region: "" // 城市
      }
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
    var _this = this;
    var diseaseId = this.$route.params.diseaseId;
    var url = this.baseUrl + "doc/getDoctorListByDiseaseIdForSearch";
    var data = {
      idx: 0,
      pagesize: 10,
      key: "",
      region: "",
      diseaseId: diseaseId
    };
    this.$http.post(url, data).then(
      response => {
        // console.log(response.data);
        if (response.data.statusCode == 1) {
          _this.doctorList = response.data.object;
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
      _this.getDoctorList();
    });
  },
  methods: {
    getDoctorList() {
      var _this = this;
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      this.$http.post(url, this.item).then(
        response => {
          // console.log(response.data);
          if (response.data.statusCode == 1) {
            var list = response.data.data.doctorInfo.item;
            if (list.length > 0) {
              list.forEach((v, i) => {
                _this.doctorList.push(v);
              });
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
      this.item.idx = 0;
      this.getDoctorList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 上拉加载更多数据
      this.item.idx++;
      this.getDoctorList();
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
