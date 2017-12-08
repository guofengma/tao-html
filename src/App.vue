<template>
 <!-- v-wechat-title="$route.meta.title" -->
  <div id="app">
    <div class="dask" v-if="isLoading"></div>
    <keep-alive><router-view v-if="$route.meta.keepAlive"/></keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isLoading: false
    };
  },
  created() {
    //调用后台接口，请求相关数据，对wxconfig进行相关配置
    this.$http
      .post(this.baseUrl + "", {
        url: window.location.href.split("#")[0]
      })
      .then(
        res => {
          wx.config({
            debug: true,
            appId: "wx5b95d4f216a65e2d",
            timestamp: 1512628779,
            nonceStr: "3d43cd2ecb664fa2a9495cf129537d",
            signature: "7C4358A08A982ED5A89403F1C045BA6F",
            jsApiList: ["chooseWXPay"]
          });
          
        },
        res => {
          console.log(res);
        }
      );
  }
};
</script>

<style>
html,
body {
  height: 100vh;
  background: #ececec;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.dask {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000000;
  background: rgba(0, 0, 0, 0.3);
}
</style>
