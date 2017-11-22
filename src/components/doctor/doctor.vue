<template>
  <div class="home">
    <div class="doctor">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :autoFill="autoFill" :bottom-all-loaded="allLoaded" ref="loadmore">
        <hotDoctorList :list='list'/>
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
      list: [],
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
  mounted: function() {
    this.getDoctorList();
  },
  methods: {
    getDoctorList() {
      var url = this.baseUrl + 'doc/getDoctorListForInternatHospital';
      this.$http.post(url, this.item).then(
        (response) => {
          // console.log(response.data);
          if (response.data.statusCode == 1) {
            this.list.push(response.data.data.doctorInfo.item);
          }
        },
        (response) => {
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
  padding-top: 2rem;
  .doctor {
    background: #fff;
    padding: 0 0.6rem;
  }
}
</style>
