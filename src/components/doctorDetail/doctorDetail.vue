<template>
  <div class="home">
      <div class="doctor_top">
        <div class="doctor_title  clearfix">
            <a href="#" class="f_left"><img src="../../../static/imgs/hospital/index/tdf_back.png" alt=""></a>
            <a href="#" class="f_right"><img src="../../../static/imgs/hospital/index/tdf_doctor_share.png" alt=""></a>
            <a href="#" class="f_right"><img src="../../../static/imgs/hospital/index/tdf_doctor_gzh.png" alt=""></a>
        </div>
        <div class="doctor_avatar"><img src="../../../static/imgs/hospital/index/tdf_hospital_head.png" alt=""></div>
      </div>
      <div class="doctor_info">
        <div class="doctor_main">
          <h2>徐亮</h2>
          <p>北京安贞医院</p>
        </div>
        <ul class="doctor_minor">
          <li>
            <h2>儿科</h2>
            <p>所属科室</p>
          </li>
          <li>
            <h2>主任</h2>
            <p>医生职称</p>
          </li>
          <li>
            <h2>19年</h2>
            <p>临床经验</p>
          </li>
        </ul>
      </div>
      <div class="patient">
        <h2>患者印象</h2>
        <ul>
          <li>非常耐心</li>
          <li>非常专业</li>
          <li>解答非常及时</li>
          <li>很好</li>
          <li>解答非常及时</li>
          <li>解答非常及时</li>
          <li>解答非常及时</li>
        </ul>
      </div>
      <div class="tab">
        <mt-navbar v-model="active">
          <mt-tab-item id="1"><h2 :class="{'activeTab':active == '1'}">医生介绍</h2></mt-tab-item>
          <mt-tab-item id="2"><h2 :class="{'activeTab':active == '2'}">用户评价</h2></mt-tab-item>
          <mt-tab-item id="3"><h2 :class="{'activeTab':active == '3'}">专家文章</h2></mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="1">
            <mt-cell v-for="n in 10" :title="'内容 ' + n" :key="n"/>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <mt-cell v-for="n in 4" :title="'测试 ' + n"  :key="n"/>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <mt-cell v-for="n in 6" :title="'选项 ' + n"  :key="n"/>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active:"activeTab"
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../static/less/globalVar.less";
.doctor_top {
  background: #fff url("../../../static/imgs/hospital/index/tdf_doctor_bg.png")
    no-repeat;
  background-size: 100%;
  padding: 0.6rem;
  height: 6.5rem;
  position: relative;
  .doctor_title {
    a {
      width: 1rem;
      height: 1rem;
      &:last-child {
        margin-right: 0.5rem;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .doctor_avatar {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 100%;
    border: 1px solid #fff;
    position: absolute;
    bottom: -2.1rem;
    left: 50%;
    margin-left: -2.1rem;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.doctor_info {
  padding: 2.5rem 0 0rem;
  background: #fff;
  margin-bottom:0.35rem;
  .doctor_main {
    text-align: center;
    h2 {
      color: @fontColor;
      font-size: 0.9rem;
      margin-bottom: 0.6rem;
    }
    p {
      color: @font1Color;
      font-size: 0.7rem;
    }
  }
  .doctor_minor{
    padding:0.6rem 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li{
      
      text-align:center;
      h2{
        font-size:0.75rem;
        color:@fontColor;
        margin-bottom:0.5rem;
      }
      p{
        font-size:0.65rem;
        color:@font1Color;
      }
    }
  }
}
.patient{
  background:#fff;
  h2{
    font-size:0.7rem;
    color:@fontColor;
    padding:0.6rem;
  }
  ul{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding:0 0.6rem;
    li{
      background:#82BCFF;
      padding:0.2rem 0.6rem;
      color:#fff;
      border-radius:0.3rem;
      font-size:0.6rem;
      margin-right:1.1rem;
      margin-bottom:0.6rem;
    }
  }
}
.tab{
  margin-top:0.35rem;
  h2{
    font-size:0.75rem;
    &.activeTab{
      border-bottom:1px solid blue;
    }
  }
}
</style>
