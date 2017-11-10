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
          <p>内科</p>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_waike.png" alt=""></div>
          <p>外科</p>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_erke.png" alt=""></div>
          <p>儿科</p>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_fchk.png" alt=""></div>
          <p>妇产科</p>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_pfk.png" alt=""></div>
          <p>皮肤科</p>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_kqk.png" alt=""></div>
          <p>口腔科</p>
        </li>
        <li>
          <div class="hot_item_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_more.png" alt=""></div>
          <p>更多</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@mainColor: #fff;
@fontColor: rgb(57,57,57);
@font1Color: rgb(102,102,102);
@assistColor: #666;
@primary: #0032a7;
@placeholder: #999;
@border:rgb(238,238,238);
// 顶部tab栏
.topbar {
  font-size: 0.9rem;
  color: #fff;
  padding: 1rem 0.5rem;
  background: #3794fe;
  text-align:center;
  .topbar_icon{
    width:1rem;
    height: 1rem;
    img{
      width:100%;
      height:100%;
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
.hot{
  margin:0.3rem 0;
  .hot_top{
    height: 2rem;
    padding:0.6rem;
    border-bottom: 1px solid @border;
    span{
      color:@fontColor;
      font-size:0.8rem;
    }
    a{
      color:@font1Color;
      font-size: 0.65rem;
    }
  }
  .hot_item{
    padding:0.75rem 0;
    li{
      width:25%;
      text-align:center;
      margin-bottom:1.3rem;
      float:left;
      .hot_item_icon{
        width:2rem;
        height: 2rem;
        margin:0 auto;
        margin-bottom:0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width:100%;
          height:100%;
        }
      }
      p{
        font-size:0.7rem;
        color:@fontColor;
      }
    }
  }
}
</style>
