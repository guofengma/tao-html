<template>
  <div class="home">
    <div class="doctor">
        <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='all'>
          <li v-for="(item,index) in arr" :key="index">
            <HotDoctorList :list='item'/>
          </li>
          <li v-for="(item,index) in list" :key="index">{{ item }}</li>
        </ul> -->

        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :maxDistance='120' :autoFill="all" ref="loadmore">
          <ul>
            <li v-for="(item,index) in arr" :key="index">
              <hotDoctorList :list='item'/>
            </li>
          </ul>
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
      arr: [],
      list: [1, 2, 3, 4],
      loading: false,
      allLoaded: false,
      topStatus: "",
      index: 0,
      all: false
    };
  },
  components: {
    hotDoctorList
  },
  mounted: function() {
    // var url = this.baseUrl + 'doc/getDoctorListForInternatHospital';
    // this.$http.post(url, this.item).then(
    //   (response) => {
    //     console.log(response.data);
    //     if (response.data.statusCode == 1) {
    //       this.arr = response.data.data.doctorInfo.item;
    //     }
    //   },
    //   (response) => {
    //     console.log("error");
    //   }
    // );
  },
  methods: {
    // loadTop() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     let last = this.list[this.list.length - 1];
    //     for (let i = 1; i <= 10; i++) {
    //       this.list.push(i);
    //     }
    //     this.loading = false;
    //     this.$refs.loadmore.onTopLoaded();
    //   }, 2500);
    // },
    loadBottom() {
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      this.index += 1;
      let data = {
        getDataModule: "hotDoctor",
        idx: this.index, // 页码
        pagesize: 2, // 请求数量
        region: "" // 城市
      };
      this.$http.post(url, data).then(res => {
        // console.log(JSON.stringify(res.body));
        console.log(res.data, res.data.data.doctorInfo.item);
        if (res.data.statusCode == 1) {
          this.arr = res.data.data.doctorInfo.item;
        }
      });
      // 加载更多数据
      // this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    loadTop() {
      var url = this.baseUrl + "doc/getDoctorListForInternatHospital";
      this.loading = true;
      this.index += 1;
      let data = {
        getDataModule: "hotDoctor",
        idx: this.index, // 页码
        pagesize: 2, // 请求数量
        region: "" // 城市
      };
      this.$http.post(url, data).then(res => {
        // console.log(JSON.stringify(res.body));
        console.log(res.data, res.data.data.doctorInfo.item);
        if (res.data.statusCode == 1) {
          this.arr = res.data.data.doctorInfo.item;
        }
      });
      this.loading = false;
      this.$refs.loadmore.onTopLoaded();
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
