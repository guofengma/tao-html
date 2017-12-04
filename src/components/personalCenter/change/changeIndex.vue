<template>
  <div class="wrap">
      <div class="top">
          <router-link tag="i" :to="{name: 'changeLog'}" class="iconfont icon-info"></router-link>
          <h3>￥{{changeInfo}}</h3>
          <p>我的零钱</p>
      </div>
      <div class="btn_box">
          <a href="javascript:;">充值</a>
          <!-- <a href="javascript:;">提现</a> -->
      </div>
  </div>
</template>

<script>
export default {
  name: "changeIndex",
  data() {
    return {
      changeInfo: ""
    };
  },
  created() {
    //零钱总额接口
    this.$http
      .post(
        this.baseUrl + "DisplayTotalAccountController/DisplayTotalAccount",
        {
          customerId: JSON.parse(localStorage.getItem('userInfo')).id
        }
      )
      .then(
        res => {
          let changeInfo = res.body.object.accountMoney;
          this.changeInfo = changeInfo / 100;
        },
        res => {
          console.log(res);
        }
      );
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-height: 100%;
  .top {
    padding-bottom: 2.25rem;
    margin-top: 1rem;
    background-color: #fff;
    position: relative;
    > i {
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      font-size: 1.5rem;
      color: #666;
    }
    h3 {
      padding-top: 3rem;
      text-align: center;
      color: #4d4d4d;
      font-size: 1.3rem;
      font-weight: 400;
    }
    p {
      font-size: 0.6rem;
      color: #666;
      text-align: center;
      margin-top: 0.3rem;
    }
  }
  .btn_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    a {
      width: 80%;
      line-height: 2rem;
      background-color: #78ccd4;
      color: #fff;
      font-size: 0.85rem;
      border-radius: 1rem;
      text-align: center;
      margin-top: 0.7rem;
      // &:last-of-type {
      //     background-color: #fff;
      //     color: #4d4d4d;
      // }
    }
  }
}
</style>
