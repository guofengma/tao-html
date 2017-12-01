<template>
  <div class="wrap">
      <div class="top">
          <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
          <span>
              Hi~恭喜您登录成功！请问有什么可以帮助您？
          </span>
      </div>
      <ul class="nav">
          <router-link tag="li" :to="{name: 'home'}">
              <img src="../../../static/imgs/login/tdf_ksrk_jrzhy.png" alt="">
              <span>进入主页</span>
          </router-link>
          <li>
              <img src="../../../static/imgs/login/tdf_ksrk_kswzh.png" alt="">
              <span>快速问诊</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "navPage"
};
</script>

<style lang="less" scoped>
.wrap {
  max-width: 640px;
  min-width: 320px;
  margin: 0 auto;
  background-color: #eff4fa;
  height: 100%;
  .top {
    display: flex;
    justify-content: flex-start;
    padding-top: 0.5rem;
    padding-left: .5rem;
    align-items: center;
    img {
      width: 2rem;
      height: 2rem;
    }
    span {
      padding: 0.3rem;
      max-width: 70%;
      margin-left: 0.4rem;
      background-color: #fff;
      color: rgb(57, 57, 57);
      font-size: 0.7rem;
      border-radius: 1.4rem;
      border-top-left-radius: 0;
      b {
        margin-top: 0.2rem;
        color: rgb(255, 82, 82);
        font-size: 0.7rem;
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  }
  .nav {
      margin-top: .7rem;
      display: flex;
      justify-content: center;
      li {
          background-color: #fff;
          height: 6rem;
          width: 5rem;
          border-radius: .3rem;
          img {
              height: 3.6rem;
              width: 3.6rem;
              display: block;
              margin: 0 auto;
              margin-top: .6rem;
          }
          span {
              font-size: .75rem;
              color: rgb(57,57,57);
              display: block;
              width: 100%;
              text-align: center;
          }
      }
      li:first-of-type {
          margin-right: 1.25rem;
      }
  }
}
</style>
