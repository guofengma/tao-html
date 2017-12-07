<template>
  <div class="wrap">
      <ul class="box">
          <router-link tag="li" :to="{name:'personalData'}" class="big_img">
              <div class="img_name">
                  <img :src="userInfo.headerImage" alt="">
                  <span>昵称：{{userInfo.name}}</span>
              </div>
              <i class="iconfont icon-right"></i>
          </router-link>
          <router-link tag="li" :to="{name:'accountSecurity'}">
              <span>账户安全</span>
              <i class="iconfont icon-right"></i>
          </router-link>
          <!-- <li>
              <span>通用</span>
              <i class="iconfont icon-right"></i>
          </li> -->
          <li>
              <span>联系我们</span>
              <a href="tel:4008167576">400-816-7576</a>   
          </li>
          <router-link tag="li" :to="{name:'feedBack'}">
              <span>意见反馈</span>
              <i class="iconfont icon-right"></i>
          </router-link>
          <router-link tag="li" :to="{name:'aboutTao'}">
              <span>关于涛大夫</span>
              <b>v2.2.0.11</b>
          </router-link>
      </ul>
      <div class="log_out">
          <button @click="quitOut">退出登录</button>
      </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: "settingIndex",
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
  },
  methods: {
    quitOut() {
      //退出登录
      this.$http
        .post(this.baseUrl + "logInOut/logout", {
          customerId: JSON.parse(localStorage.getItem("userInfo")).id
        })
        .then(
          res => {
            Toast({
              message: res.body.message,
              duration: 1000,
              position: 'bottom'
            });
            localStorage.removeItem('userInfo');
            this.$router.push({name: 'loginIndex'});
          },
          res => {
            console.log(res);
          }
        );
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: rgb(239, 244, 250);
  .box {
    margin-top: 0.6rem;
    li {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0 0.6rem;
      align-items: center;
      span {
        font-size: 0.75rem;
        color: rgb(57, 57, 57);
      }
      a {
        color: rgb(82, 163, 255);
      }
      b {
        color: rgb(255, 82, 82);
      }
      i {
        font-size: 1rem;
        color: #999;
      }
      &:nth-of-type(n + 2) {
        height: 2.25rem;
      }
      &:nth-of-type(2) {
        margin-bottom: 0.35rem;
      }
      &:nth-of-type(n + 3) {
        border-bottom: 1px solid rgb(238, 238, 238);
      }
      &:last-of-type {
        border-bottom: 0;
      }
    }
    .big_img {
      margin-bottom: 0.35rem;
      .img_name {
        display: flex;
        align-items: center;
        padding: 0.6rem;
        img {
          height: 2.75rem;
          width: 2.75rem;
          margin-right: 0.8rem;
        }
        span {
          font-size: 0.8rem;
          color: rgb(57, 57, 57);
        }
      }
    }
  }
  .log_out {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    button {
      font-size: 0.8rem;
      background-color: #2e8eff;
      color: #fff;
      line-height: 2.25rem;
      width: 100%;
    }
  }
}
</style>
