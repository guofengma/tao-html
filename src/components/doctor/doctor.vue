<template>
  <div class="home">
    <div class="doctor">
        <!-- <HotDoctorList :list='arr'/> -->
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150" @top-status-change="handleTopChange" ref="loadmore">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">加载中...</span>
          <span v-show="topStatus === 'drop'">释放更新</span>
        </div>

        <ul class="scroll-wrapper">
          <li v-for="(item,index) in arr" @click="itemClick(item)" :key="index">
            <hotDoctorList :list='item'/>
          </li>
        </ul>

      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import hotDoctorList from "./hotDoctorList/HotDoctorListCom";
export default {
  name: "doctor",
  data() {
    return {
      arr: [1, 2, 3, 4],
      list: [],
      allLoaded: false,
      topStatus: "",
      item: {
        getDataModule: "hotDoctor",
        idx: 0, // 页码
        pagesize: 10, // 请求数量
        region: "" // 城市
      }
    };
  },
  components: {
    hotDoctorList,
  },
  mounted: function() {
    var url = this.baseUrl + 'doc/getDoctorListForInternatHospital';
    this.$http.post(url, this.item).then(
      (response) => {
        console.log(response.data);
        if (response.data.statusCode == 1) {
          this.arr = response.data.data.doctorInfo.item;
        }
      },
      (response) => {
        console.log("error");
      }
    );
  },
  methods: {
    loadTop: function() {
      // 刷新数据的操作
      var _this = this;
     console.log("no up")
      // self.$refs.loadmore.onTopLoaded();
    },
    loadBottom: function() {
      // 加载更多数据的操作
      //load data
      // this.allLoaded = true;// 若数据已全部获取完毕
      console.log('no down')
      var _this = this;
      
      self.$refs.loadmore.onBottomLoaded();
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },
    itemClick: function(data) {
      console.log("item click, msg : " + data);
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
