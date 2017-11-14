<template>
  <div class="home">
    <div class="topbar">
      <div class="title">
        <div class="topbar_icon scan f_left"><img src="../../static/imgs/hospital/index/tdf_hospital_saoyisao.png" alt=""></div>
        <div class="topbar_icon message f_right"><img src="../../static/imgs/hospital/index/tdf_hospital_message.png" alt=""></div>
        <div>银川脑心同治互联网医院</div>
      </div>

      <div class="search">
        <div class="search_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_search.png" alt=""></div>
        <input type="text" placeholder="医生 医院 疾病" class="search_box">
      </div>
    </div>

    <div class="hot">
      <div class="hot_top">
        <span>热门科室</span>
        <a href="#" class="f_right">更多</a>
      </div>
      <ul class="hot_item clearfix">
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_neike.png" alt=""></div>
          <h2>内科</h2>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_waike.png" alt=""></div>
          <h2>外科</h2>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_erke.png" alt=""></div>
          <h2>儿科</h2>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_fchk.png" alt=""></div>
          <h2>妇产科</h2>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_pfk.png" alt=""></div>
          <h2>皮肤科</h2>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_kqk.png" alt=""></div>
          <h2>口腔科</h2>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_more.png" alt=""></div>
          <h2>更多</h2>
        </li>
      </ul>
    </div>
    <div class="hot_doctor">
      <div class="hot_top">
        <span>热门医生</span>
        <router-link tag="a" class="f_right" to="/doctor">更多</router-link>
      </div>
      <HotDoctorList :list='arr'/>
    </div>
    <!-- 导航栏 -->
    <navbar/>
    <!-- <mt-tabbar v-model="active" :fixed='tep'>
      <mt-tab-item id="tab1">
        <img slot="icon" src="../../static/imgs/hospital/index/tdf_home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="../../static/imgs/hospital/index/tdf_hospital_pre.png">
        医院
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="../../static/imgs/hospital/index/tdf_health.png">
        健康
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img slot="icon" src="../../static/imgs/hospital/index/tdf_me.png">
        我的
      </mt-tab-item>
    </mt-tabbar> -->
  </div>
</template>

<script>
import HotDoctorList from './hotDoctorList/HotDoctorList'
import navbar from './navbar'
export default {
  name: "Home",
  data() {
    return {
      active: "active",
      arr:[1,2,3,4,5],
      tep: true,
      url:'http://120.26.107.233:8080/taodoctor/rest/doc/getDoctorListForInternatHospital',
      item:{
        getDataModule:'hotDoctor',
        idx:0,
        pagesize:10,
        region:""
      }
    };
  },
  components: {
    HotDoctorList,
    navbar
  },  
  mounted:function(){
    this.$http.post(this.url,this.item).then((response) => {
      console.log(response.data);
      if(response.data.statusCode == 1){
        this.arr = response.data.data.doctorInfo.item;
      }

    }, (response) => {
        console.log("error");
    });
  },
  methods:{
    greet:function(el){
      console.log(el)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import '../../static/less/globalVar.less';
.home{
  padding-bottom:3rem;
  padding-top:3.2rem;
}
// 顶部tab栏
.topbar {
  font-size: 0.9rem;
  color: #fff;
  background: #3794fe;
  text-align: center;
  padding-bottom: 0.5rem;
  .title{
    width:100%;
    padding:1rem 0.5rem;
    background: #3794fe;
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
  }
  .topbar_icon {
    width: 1rem;
    height: 1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .search {
    padding: 0.1rem 0.8rem;
    width: 14.2rem;
    height: 1.6rem;
    border-radius: 1.5rem;
    background: @mainColor;
    margin: 0rem auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .search_icon {
      width: 0.9rem;
      height: 0.9rem;
      margin-right: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    input.search_box {
      height: 100%;
      width: 10rem;
      font-size: 0.8rem;
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: @placeholder;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: @placeholder;
      }

      &:-ms-input-placeholder {
        color: @placeholder;
      }

      &::-webkit-input-placeholder {
        color: @placeholder;
      }
    }
  }
}
.hot_top {
  padding: 0.6rem 0;
  border-bottom: 1px solid @border;
  span {
    color: @fontColor;
    font-size: 0.8rem;
  }
  a {
    color: @font1Color;
    font-size: 0.65rem;
  }
}
.hot {
  padding:0 0.6rem;
  margin: 0.35rem 0;
  background: #fff;
  .hot_item {
    padding: 0.75rem 0;
    li {
      width: 25%;
      text-align: center;
      margin-bottom: 1.3rem;
      float: left;
      .hot_item_icon {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h2 {
        font-size: 0.75rem;
        color: @fontColor;
      }
    }
  }
}
.hot_doctor {
  padding:0 0.6rem;
  margin: 0.35rem 0;
  background: #fff;
}
</style>
