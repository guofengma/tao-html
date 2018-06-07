<template>
  <div class="wrap">
      <div class="top">
          <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
          <span>
              Hi~恭喜您登录成功！请问有什么可以帮助您？
          </span>
      </div>
      <ul class="nav_box">
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
  name: "navPage",
  created() {
    console.log("navPage的created事件已执行");
    if (!this.GetRequest().code) {
      window.location.href =
        "https://www.tdaifu.cn/taodoctor/get-weixin-code.html?appid=wx944b482b1c088969&scope=snsapi_base&state=wangyiyang&redirect_uri=" +
        encodeURI(this.baseUpUrl) +
        "navPage";
    } else {
      let code = this.GetRequest().code;
      this.$http
        .post(this.baseAuthonUrl + "customer/getWechatOpenid", {
          code
        })
        .then(
          res => {
            let taoOpenid = res.body.object;
            localStorage.setItem('taoOpenid',taoOpenid);
            //通过静默授权获取用户的openid
          },
          res => {
            console.log(res);
          }
        );
    }
  },
  methods: {
    GetRequest() {
      var url = location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  max-width: 640px;
  min-width: 320px;
  margin: 0 auto;
  background-color: #eff4fa;
  min-height: 100%;
  .top {
    display: flex;
    justify-content: flex-start;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
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
  .nav_box {
    padding-top: 0.7rem;
    display: flex;
    justify-content: center;
    li {
      background-color: #fff;
      height: 6rem;
      width: 5rem;
      border-radius: 0.3rem;
      img {
        height: 3.6rem;
        width: 3.6rem;
        display: block;
        margin: 0 auto;
        margin-top: 0.6rem;
      }
      span {
        font-size: 0.75rem;
        color: rgb(57, 57, 57);
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
