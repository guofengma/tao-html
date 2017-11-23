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
        <router-link tag="input" to="/searchPage" placeholder="医生 医院 疾病" class="search_box"></router-link>
      </div>
    </div>

    <div class="hot">
      <div class="hot_top">
        <span>热门科室</span>
        <router-link tag="a"  class="f_right" to="/departListPage">更多</router-link>
      </div>
      <ul class="hot_item clearfix">
        <router-link tag="li" :to="{name:'doctorList',params:item}" v-for="(item,index) in hotDepartment" :key="index">
          <div class="hot_item_icon"><img :src="item.departmentPicture" alt=""></div>
          <h2>{{item.departmentName}}</h2>
        </router-link>
        <router-link tag="li" to="/departListPage">
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_more.png" alt=""></div>
          <h2>更多</h2>
        </router-link>
      </ul>
    </div>
    <div class="hot_doctor">
      <div class="hot_top">
        <span>热门医生</span>
        <router-link tag="a" class="f_right" to="/doctor">更多</router-link>
      </div>
      <hotDoctorList :list='arr'/>
    </div>
    <!-- 导航栏 -->
    <navbar/>
  </div>
</template>

<script>
import hotDoctorList from './doctor/hotDoctorList/hotDoctorList'
import navbar from './navbar'
export default {
  name: "Home",
  data() {
    return {
      active: "active",
      arr:[1,2,3,4,5],
      hotDepartment:[], // 科室列表
      tep: true,
      item:{
        getDataModule:'hotDoctor',
        idx:0,
        pagesize:10,
        region:""
      }
    };
  },
  components: {
    hotDoctorList,
    navbar
  },  
  mounted:function(){
    this.getHotDepartment();
    var url = this.baseUrl + 'doc/getDoctorListForInternatHospital';
    this.$http.post(url,this.item).then((response) => {
      // console.log(response.data);
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
    },
    // 获取热门科室
    getHotDepartment(){
      var _this = this;
      var url = _this.baseUrl + "doctor/selectHotDepartments";
      _this.$http.post(url).then(res => {
        // console.log(res.data)
        if(res.data.success){
          res.data.data.forEach(function(v,i){
            v.departmentPicture = _this.baseImgUrl + v.departmentPicture;
            v.id = v.departmentId; // 添加id字段，统一二级菜单的字段名
          });
          _this.hotDepartment = res.data.data;
        }
      }),res => {
        console.log('error')
      }
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
