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
      .post("https://www.tdaifu.cn:443/taodoctor-pay-server/wx/app/getTokenByH5", {
        url: window.location.href.split("#")[0]
      })
      .then(
        res => {
          console.log(JSON.stringify(res));
          let dataJson = res.body.object;
          wx.config({
            debug: false,
            appId: "wx944b482b1c088969",
            timestamp: dataJson.timestamp,
            nonceStr: dataJson.nonceStr,
            signature: dataJson.signature,
            jsApiList: [
               'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'onVoicePlayEnd',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'

            ]
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
