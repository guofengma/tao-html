<template>
  <ul class="nav">
    <li>
      <div class="nav_icon"><img src="" alt=""></div>
      <p>首页</p>
    </li>
    <li>
      <div class="nav_icon"><img src="" alt=""></div>
      <p>医院</p>
    </li>
    <li>
      <div class="nav_icon"><img src="" alt=""></div>
      <p>健康</p>
    </li>
    <li>
      <div class="nav_icon"><img src="" alt=""></div>
      <p>我的</p>
    </li>
</ul>
</template>

<script>
export default {};
</script>

<style lang='less'>
// 底部tab栏
.nav {
  position: fixed;
  width: 100%;
  height: 2.5rem;
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
  }
}
</style>
