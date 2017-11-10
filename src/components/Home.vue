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
        <a href="#" class="f_right">更多</a>
      </div>
      <div class="hot_list">
        <div class="doctor_list clearfix">
              <div class="avatar f_left"><img src="../../static/imgs/hospital/index/tdf_hospital_head.png" alt=""></div>
              <div class="doctor_info">
                  <h2><span>徐亮</span><span>主任</span><span>儿科</span></h2>
                  <h4>北京安贞医院</h4>
                  <p>擅长：发育不完整、发育缓慢、呼吸道感染、支气管感染</p>
              </div>
              <ul class="server_item clearfix">
                  <li><img src="../../static/imgs/hospital/index/tdf_hospital_jkzx.png" alt=""></li>
                  <li><img src="../../static/imgs/hospital/index/tdf_hospital_jzhyy.png" alt=""></li>
                  <li><img src="../../static/imgs/hospital/index/tdf_hospital_jtysh_pre.png" alt=""></li>
              </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotDoctorList from './hotDoctorList/HotDoctorList'
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    HotDoctorList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@mainColor: #fff;
@fontColor: rgb(57, 57, 57);
@font1Color: rgb(102, 102, 102);
@assistColor: #666;
@primary: #0032a7;
@placeholder: #999;
@border: rgb(238, 238, 238); 
// 顶部tab栏
.topbar {
  font-size: 0.9rem;
  color: #fff;
  padding: 1rem 0.5rem;
  background: #3794fe;
  text-align: center;
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
    margin-top: 1.5rem;
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
  padding: 0.6rem;
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
        font-size: 0.8rem;
        color: @fontColor;
      }
    }
  }
}
.hot_doctor {
  margin: 0.35rem 0;
  background: #fff;
  .doctor_list {
    background: #fff;
    padding: 0.75rem 0.6rem;
    .avatar {
      width: 2.75rem;
      height: 2.75rem;
      border-radius:100%;
      border: 1px solid #3794fe;
      margin-right: 0.8rem;
      img{
        width:100%;
      }
    }
    .doctor_info{
      overflow:hidden;
      font-size:0.8rem;
      color:@font1Color;
      h2{
        color:@fontColor;        
        margin-bottom:0.6rem;
        span{
          margin-right:0.5rem;
        }
      }
      h4{  
        margin-bottom:0.6rem;
      }
      p{
        line-height:1.3rem;
        margin-bottom:0.8rem;
      }
    }
    .server_item {
      margin-left:3.5rem;
      li {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1.8rem;
        float:left;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
