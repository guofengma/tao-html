<template>
  <ul class="nav">
    <li>
      <div class="nav_icon"><img src="../../static/imgs/hospital/index/tdf_home.png" alt=""></div>
      <p>首页</p>
    </li>
    <li :class="active">
      <div class="nav_icon"><img src="../../static/imgs/hospital/index/tdf_hospital_pre.png" alt=""></div>
      <p>医院</p>
    </li>
    <li>
      <div class="nav_icon"><img src="../../static/imgs/hospital/index/tdf_health.png" alt=""></div>
      <p>健康</p>
    </li>
    <li>
      <div class="nav_icon"><img src="../../static/imgs/hospital/index/tdf_me.png" alt=""></div>
      <p>我的</p>
    </li>
</ul>
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

<style lang='less'>
// 底部tab栏
.nav {
  position: fixed;
  width: 100%;
  height: 3rem;
  border-top: 1px solid #ececec;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  li {
    width: 25%;
    text-align: center;
    &.activeTab{
      color:#3794fe;
    }
    .nav_icon{
      width:1.2rem;
      height: 1.2rem;
      margin:0 auto;
      margin-bottom:0.1rem;
      img{
        max-width:100%;
        max-height:100%;
      }
    }
  }
}
</style>
