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
        <a href="javascript:;">微信登录</a>
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
                            <span>验证手机号，涛大夫就可以帮您解答您的健康问题。</span>
                        </li>
                        <li class="user_say">
                            <img src="../../../static/imgs/login/tdf_login_user.png" alt="">
                            <span>17071892627</span>
                        </li>
                        <li>
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>您将收到一条短信验证按，请保持手机通畅，注意查收。</span>
                        </li>
                        <li class="user_say">
                            <img src="../../../static/imgs/login/tdf_login_user.png" alt="">
                            <span>6666</span>
                        </li>
                        <li>
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>您发送的验证码无效，请重新输入验证码。</span>
                        </li>
                        <li>
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>
                                若收不到验证码，可以尝试语音验证<br />
                                <b>点击获取&nbsp;&nbsp;[语音验证]</b>
                            </span>
                        </li>
                        <li>
                            <img src="../../../static/imgs/login/tdf_login_logo.png" alt="">
                            <span>请注意接听涛大夫来电。</span>
                        </li>
                        <li class="user_say">
                            <img src="../../../static/imgs/login/tdf_login_user.png" alt="">
                            <span>17071892627</span>
                        </li>
                        <li>
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
                    <div class="bot_input">
                        <span>CNN +86</span>
                        <input type="tel">
                        <a href="javascript:;">发送</a>
                    </div>
                </div>
            </div>
        </slot>
    </mt-popup>
  </div>    
</template>

<script>
export default {
  name: "loginIndex",
  data() {
      return {
          popupVisible: false,
          noAggrementUrl: require('../../../static/imgs/login/tdf_login_select_pre.png'),
          hadAgree: true
      }
  },
  methods: {
      popPage() {
          this.popupVisible = true
      },
      closePop() {
          this.popupVisible = false
      },
      agreeOnot() {
          if(this.hadAgree) {
                this.noAggrementUrl = require('../../../static/imgs/login/tdf_login_select.png')
                this.hadAgree = false
          }else {
              this.noAggrementUrl = require('../../../static/imgs/login/tdf_login_select_pre.png')
              this.hadAgree = true
          }
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
        height: 100%;
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
            border-radius: .4rem;
        }
    }
    .mint-popup {
        width: 100%;
        max-height: 80%;
        overflow: auto;
        background-color: transparent;
        .layerout {
            .layer_head {
                display: flex;
                justify-content: space-between;
                padding: 0 1rem;
                background-color: #2d8eff;
                height: 2rem;
                align-items: center;
                border-top-left-radius: .4rem;
                border-top-right-radius: .4rem;
                h3 {
                    color: #fff;
                    font-size: .85rem;
                }
                a {
                    color: #fff;
                    font-size: .65rem;
                }
            }
            .layer_body {
                background-color: #eff4fa;
                padding: 0 .6rem;
                li {
                    display: flex;
                    justify-content: flex-start;
                    padding-top: .5rem;
                    align-items: center;
                    img {
                        width: 2rem;
                        height: 2rem;
                    }
                    span {
                        padding: .3rem;
                        max-width: 70%;
                        margin-left: .4rem;
                        background-color: #fff;
                        color: rgb(57,57,57);
                        font-size: .7rem;
                        border-radius: 1.4rem;
                        border-top-left-radius: 0;
                        b {
                            margin-top: .2rem;
                            color: rgb(255,82,82);
                            font-size: .7rem;
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
                            margin-right: .4rem;
                            background-color: #3b95ff;
                            color: #fff;
                        }
                    }
                }
            }
            .layer_bottom {
                background-color: #eff4fa;
                .bot_top {
                    display: flex;
                    justify-content: center;
                    height: 1.3rem;
                    align-items: center;
                    img {
                        width: .8rem;
                        height: 0.8rem;
                        margin-right: .2rem;
                    }
                    span {
                        font-size: .6rem;
                        color: rgb(153,153,153);
                    }
                    a {
                        color: rgb(81,163,255);
                        font-size: .6rem;
                    }
                }   
                .bot_input {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #fff;
                    padding: 0 .6rem;
                    height: 2rem;
                    span {
                        font-size: .7rem;
                        color: rgb(57,57,57);
                    }
                    input {
                        width: 10rem;
                        height: 1.5rem;
                        background-color: #eaeff5;
                        padding: 0 .5rem;
                        border-radius: .4rem;
                    }
                    a {
                        width: 3rem;
                        height: 1.5rem;
                        line-height: 1.5rem;
                        text-align: center;
                        color: #fff;
                        font-size: .75rem;
                        background-color: #3090ff;
                        border-radius: .3rem;
                    }
                }
            }
        }
    }
}
</style>
