<template>
  <div class="wrap">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
            <img src="../../../static/imgs/login/tdf_login_bg1.png" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
            <img src="../../../static/imgs/login/tdf_login_bg2.png" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
            <img src="../../../static/imgs/login/tdf_login_bg3.png" alt="">
        </mt-swipe-item>
    </mt-swipe>
    <div class="btn_box">
        <a href="javascript:;" @click="popPage">手机号登录</a>
        <a href="javascript:;" @click="wxPop">微信登录</a>
    </div>
    <!-- 底部弹出框 -->
    <mt-popup v-model="popupVisible" position="bottom">
        <slot>
            <div class="layerout">
                <div class="layer_head">
                    <b></b>
                    <h3>涛大夫</h3>
                    <a href="javascript:;" @click="closePop">取消</a>
                </div>
                <div class="layer_body">
                    <ul>
                        <li>
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span v-if="telLogin">验证手机号，涛大夫就可以帮您解答您的健康问题。</span>
                            <span v-else-if="!telLogin">亲爱的{{userBase.nickname}}，请输入手机验证，涛大夫就可以帮您解答您的健康问题。</span>
                        </li>
                        <li v-if="wrongTel">
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>手机号不正确（仅支持中国大陆手机号）</span>
                        </li>
                        <li v-if="!hadAgree">
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>请先同意涛大夫服务协议</span>
                        </li>
                        <li v-if="hadTel" class="user_say">
                            <img src="../../../static/imgs/login/tdf_login_user.png" alt="">
                            <span>{{userTel}}</span>
                        </li>
                        <li v-if="codeMsg">
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>您将收到一条短信验证按，请保持手机通畅，注意查收。</span>
                        </li>
                        <li v-if="codeTextShow" class="user_say">
                            <img src="../../../static/imgs/login/tdf_login_user.png" alt="">
                            <span>{{userCode}}</span>
                        </li>
                        <li v-if="codeWrong">
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>您发送的验证码无效，请重新输入验证码。</span>
                        </li>
                        <li v-if="codeWrong">
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>
                                若收不到验证码，可以尝试语音验证<br />
                                <b @click="callCode">点击获取&nbsp;&nbsp;[语音验证]</b>
                            </span>
                        </li>
                        <li v-if="callMsg">
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>请注意接听涛大夫来电。</span>
                        </li>
                        <li v-if="successTextShow">
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>您发送的验证码正确，正在登录...</span>
                        </li>
                    </ul>
                </div>
                <div class="layer_bottom">
                    <div class="bot_top">
                        <img :src="noAggrementUrl" alt="" @click="agreeOnot">
                        <span>完成验证操作，即表示您同意</span>
                        <router-link tag="a" :to="{name:'userAgreement'}" href="javascript:;">《涛大夫服务协议》</router-link>
                    </div>
                    <div class="bot_input" v-if="telInputShow">
                        <span>CNN +86</span>
                            <input type="tel" v-model.trim="userTel" placeholder="请输入手机号">
                            <button @click="getCode" :disabled="disabledTrue">{{codeBtnText}}</button>
                    </div>
                    <div class="bot_input bot_input_end" v-if="!telInputShow">
                            <input type="tel" v-model.trim="userCode" placeholder="请输入验证码">
                            <a href="javascript:;" @click="codeConfirm">发送</a>
                    </div>
                </div>
            </div>
        </slot>
    </mt-popup>
  </div>    
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "loginIndex",
  data() {
    return {
      disabledTrue: false,
      codeBtnText: "发送",
      userBase: {}, //微信授权获取到的用户信息
      popupVisible: false,
      noAggrementUrl: require("../../../static/imgs/login/tdf_login_select_pre.png"),
      hadAgree: true,
      //变量决定对话框显示
      telLogin: true,
      telInputShow: true,
      wrongTel: false,
      hadTel: false,
      codeMsg: false,
      codeWrong: false,
      codeTextShow: false,
      callMsg: false,
      successTextShow: false,
      userTel: "",
      userCode: ""
    };
  },
  beforeCreate() {
    //如果用户已经存储了userInfo则直接跳转到首页
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // if (!!userInfo) {
    //   //已经登录过涛大夫
    //   this.$router.push({ name: "home" });
    // }
  },
  created() {
    let parameterObj = this.GetRequest();
    if (parameterObj["code"]) {
      //用户已经授权登录
      //得到用户的基本信息（必须用户同意）
      this.$http
        .post(this.baseAuthonUrl + "customer/getWechatAuthorizationInfo", {
          code: this.GetRequest()["code"]
        })
        .then(
          res => {
            let obj = res.body;
            console.log(JSON.stringify(obj));
            localStorage.setItem("wxBaseInfo", JSON.stringify(obj.object));
            if (obj.statusCode == 1) {
              //用户授权成功
              this.popupVisible = true;
              this.telLogin = false;
              this.userBase = obj.object;
            }
          },
          res => {
            console.log(res);
          }
        );
    }
  },
  watch: {
    userCode() {}
  },
  methods: {
    popPage() {
      this.popupVisible = true;
    },
    closePop() {
      this.popupVisible = false;
    },
    agreeOnot() {
      //替换同意图标
      if (this.hadAgree) {
        this.noAggrementUrl = require("../../../static/imgs/login/tdf_login_select.png");
        this.hadAgree = false;
      } else {
        this.noAggrementUrl = require("../../../static/imgs/login/tdf_login_select_pre.png");
        this.hadAgree = true;
      }
    },
    getCode() {
      //获取验证按
      let userTel = this.userTel;
      if (!this.hadAgree) {
        this.hadAgree = false;
        return false;
      }
      if (!this.regTel.test(userTel)) {
        this.wrongTel = true;
        this.userTel = "";
      } else {
        let sCount = 59;
        let timer = setInterval(() => {
          this.codeBtnText = sCount-- + "s";
          this.disabledTrue = true;
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          this.disabledTrue = false;
          this.codeBtnText = "重新发送";
        }, 60000);
        this.wrongTel = false;
        this.hadTel = true;
        this.$http
          .post(this.baseUrl + "message/sendMessageCode", {
            mobilePhone: userTel
          })
          .then(res => {
            if (res.body.statusCode == 1) {
              this.codeMsg = true;
              this.telInputShow = false;
            }
          });
      }
    },
    //电话获取验证码
    callCode() {
      this.callMsg = true;
    },
    //验证码验证
    codeConfirm() {
      let userCode = this.userCode;
      if (!this.regCode.test(userCode)) {
        this.codeWrong = true;
      } else {
        this.codeWrong = false;
        this.codeTextShow = true;
        if (this.telLogin) {
          //手机号登录
          this.$http
            .post(this.baseUrl + "logInOut/login", {
              mobilePhone: this.userTel,
              messageCode: this.userCode
            })
            .then(res => {
              //在localStorage中存储用户的基本信息userInfo

              if (res.body.statusCode == 1) {
                /**
                 *根据状态判断用户是否已经存在
                 *根据用户的头像和昵称去判断用户是否已经存在
                 */
                let dataObj = res.body.object;

                console.log(JSON.stringify(res));
                localStorage.setItem("userInfo", JSON.stringify(dataObj));
                this.successTextShow = true;
                Toast({
                  message: "手机号登录成功",
                  position: "bottom"
                });
                setTimeout(() => {
                  if (!dataObj.name && !dataObj.headerImage) {
                    //该用户是新注册的
                    this.$router.push({ name: "settingNameLogo" });
                  } else {
                    this.$router.push({ name: "navPage" });
                  }
                }, 1000);
              } else if (res.body.statusCode == 0) {
                this.codeWrong = true;
                this.codeTextShow = false;
              }
            });
        } else if (!this.telLogin) {
          //微信登录
          let userBase = this.userBase;
          this.$http
            .post(this.baseUrl + "logInOut/outsideLogin", {
              openid: userBase.openid,
              nickname: userBase.nickname,
              headimgurl: userBase.headimgurl,
              mobilePhone: this.userTel,
              messageCode: this.userCode,
              outsideType: "021001"
            })
            .then(
              res => {
                if (res.body.statusCode == 1) {
                  localStorage.setItem(
                    "userInfo",
                    JSON.stringify(res.body.object)
                  );
                  this.successTextShow = true;
                  Toast("微信登录成功");
                  setTimeout(() => {
                    this.$router.push({ name: "navPage" });
                  }, 1000);
                } else if (res.body.statusCode == 0) {
                  this.codeWrong = true;
                  this.codeTextShow = false;
                }
              },
              res => {
                console.log();
              }
            );
        }
      }
    },
    wxPop() {
      window.location.href =
        "https://www.tdaifu.cn/taodoctor/get-weixin-code.html?appid=wx944b482b1c088969&scope=snsapi_userinfo&state=wangyiyang&redirect_uri=" +
        encodeURI(this.baseUpUrl) +
        "loginIndex";
    },
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
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  img {
    height: auto;
    width: 100%;
    display: block;
  }
  .btn_box {
    position: absolute;
    bottom: 1.5rem;
    display: flex;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    justify-content: space-between;
    a {
      width: 48%;
      line-height: 2rem;
      background-color: #2d8eff;
      color: #fff;
      text-align: center;
      border-radius: 0.4rem;
    }
  }
  .mint-popup {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: transparent;
    background-color: #eff4fa;
    .layerout {
      .layer_head {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        background-color: #2d8eff;
        height: 2rem;
        align-items: center;
        border-top-left-radius: 0.4rem;
        border-top-right-radius: 0.4rem;
        h3 {
          color: #fff;
          font-size: 0.85rem;
        }
        a {
          color: #fff;
          font-size: 0.65rem;
        }
      }
      .layer_body {
        background-color: #eff4fa;
        padding: 0 0.6rem;
        height: 100%;
        li {
          display: flex;
          justify-content: flex-start;
          padding-top: 0.5rem;
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
          &.user_say {
            justify-content: flex-end;
            img {
              order: 1;
            }
            span {
              order: 0;
              border-radius: 1.4rem;
              border-top-right-radius: 0;
              margin-right: 0.4rem;
              background-color: #3b95ff;
              color: #fff;
            }
          }
        }
      }
      .layer_bottom {
        background-color: #eff4fa;
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        .bot_top {
          display: flex;
          justify-content: center;
          height: 1.3rem;
          align-items: center;
          img {
            width: 0.8rem;
            height: 0.8rem;
            margin-right: 0.2rem;
          }
          span {
            font-size: 0.6rem;
            color: rgb(153, 153, 153);
          }
          a {
            color: rgb(81, 163, 255);
            font-size: 0.6rem;
          }
        }
        .bot_input {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          padding: 0 0.6rem;
          height: 2rem;
          span {
            font-size: 0.7rem;
            color: rgb(57, 57, 57);
          }
          input {
            width: 10rem;
            height: 1.5rem;
            background-color: #eaeff5;
            padding: 0 0.5rem;
            border-radius: 0.4rem;
          }
          a,
          button {
            width: 3.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            color: #fff;
            font-size: 0.75rem;
            background-color: #3090ff;
            border-radius: 0.3rem;
          }
        }
        .bot_input_end {
          justify-content: flex-end;
          input {
            margin-right: 1rem;
          }
        }
      }
    }
  }
}
</style>
