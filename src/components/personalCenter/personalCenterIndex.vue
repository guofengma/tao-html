<template>
  <div class="container">
    <!-- 头部背景 -->
    <div class="top">
      <div class="top_header">
        <router-link tag="i" :to="{name:'settingIndex'}" class="iconfont icon-settings"></router-link>
        <i class="iconfont icon-mark"></i>
      </div>
      <router-link tag="div" :to="{name:'personalData'}" class="top_main">
        <!-- 头像和昵称 -->
        <div>
          <img :src="userInfo.headerImage" alt="">
        </div>
        <span>{{userInfo.name}}</span>
      </router-link>
      <ul class="top_footer">
        <router-link tag="li" :to="{name: 'changeIndex'}">
          <span>{{accountMoney}}元</span>
          <b>零钱</b>
        </router-link>
        <li>
          <span>0个</span>
          <b>健康果</b>
        </li>
        <router-link tag="li" :to="{name: 'couponIndex'}">
          <span>{{customerCoupons}}张</span>
          <b>优惠券</b>
        </router-link>
      </ul>
    </div>
    <!-- 查看订单部分 -->
    <div class="order">
      <router-link tag="div" :to="{name: 'myOrder',params:{id: '1'}}" class="order_top">
        <span>我的订单</span>
        <b>查看更多订单&nbsp;&nbsp;&nbsp;<i class="iconfont icon-right"></i></b>
      </router-link>
      <ul class="order_main">
        <router-link tag="li" :to="{name: 'myOrder',params:{id: '2'}}">
          <!-- <i>5</i> -->
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_obligation@2x.png" alt="">
          <span>待付款</span>
        </router-link>
        <router-link tag="li" :to="{name: 'myOrder',params:{id: '3'}}">
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_serve@2x.png" alt="">
          <span>待服务</span>
        </router-link>
        <router-link tag="li" :to="{name: 'myOrder',params:{id: '4'}}">
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_in_service@2x.png" alt="">
          <span>服务中</span>
        </router-link>
        <router-link tag="li" :to="{name: 'myOrder',params:{id: '5'}}">
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_evaluate@2x.png" alt="">
          <span>待评价</span>
        </router-link>
      </ul>
    </div>
    <!-- 列表展示部分 -->
    <ul class="meau_list">
      <router-link :to="{name: 'patienterIndex'}" tag="li">
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_see_a_doctor@2x.png" alt="">
          <span>就诊人</span>
        </div>
        <i class="iconfont icon-right"></i>
      </router-link>
      <router-link tag="li" :to="{name:'myDoc'}">
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_doctor@2x.png" alt="">
          <span>我的医生</span>
        </div>
        <i class="iconfont icon-right"></i>
      </router-link>
      <li>
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_recipe@2x.png" alt="">
          <span>我的处方</span>
        </div>
        <i class="iconfont icon-right"></i>
      </li>
      <li>
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_order@2x.png" alt="">
          <span>药品订单</span>
        </div>
        <i class="iconfont icon-right"></i>
      </li>
      <router-link tag="li" :to="{name:'myCollect'}">
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_collect@2x.png" alt="">
          <span>我的收藏</span>
        </div>
        <i class="iconfont icon-right"></i>
      </router-link>
      <router-link tag="li" :to="{name:'InviteFriends'}">
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_invite@2x.png" alt="">
          <span>邀好友&nbsp;&nbsp;&nbsp;得奖励</span>
        </div>
        <i class="iconfont icon-right"></i>
      </router-link>
    </ul>
    <navbar :index="3"/>
  </div>
</template>

<script>
import navbar from "../navbar";
export default {
  name: "personalCenterIndex",
  data() {
    return {
      customerCoupons: 0,
      accountMoney: 0,
      userInfo: {}
    };
  },
  components: { navbar },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userInfo.headerImage = this.baseImgUrl + userInfo.headerImage;
    this.userInfo = userInfo;
    //优惠券接口
    this.$http
      .post(this.baseUrl + "coupon/getMyCouponNumber", {
        customerId: userInfo.id
      })
      .then(
        res => {
          let customerCoupons = res.body.object;
          this.customerCoupons = customerCoupons;
        },
        res => {
          console.log(res);
        }
      );
    //零钱总额接口
    this.$http
      .post(
        this.baseUrl + "DisplayTotalAccountController/DisplayTotalAccount",
        {
          customerId: userInfo.id
        }
      )
      .then(
        res => {
          let accountMoney = res.body.object.accountMoney;
          this.accountMoney = accountMoney / 100;
        },
        res => {
          console.log(res);
        }
      );
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: rgb(239, 244, 250);
  min-height: 100%;
  padding-bottom: 3.5rem;
}
.top {
  background-color: #4da0ff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .top_header {
    width: 100%;
    display: flex;
    padding: 0 0.6rem;
    justify-content: space-between;
    i {
      line-height: 1.8rem;
      color: #fff;
      font-size: 1.1rem;
    }
  }
  .top_main {
    margin: 0.8rem 0;
    display: flex;
    padding: 0 0.6rem;
    justify-content: flex-start;
    div {
      background-color: #fff;
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
      padding: 0.15rem;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    span {
      align-self: center;
      padding-left: 1.1rem;
      color: #fff;
      font-size: 0.9rem;
    }
  }
  .top_footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #368aea;
    li {
      width: 33.3333333333%;
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 0.9rem;
        padding-top: 0.15rem;
        line-height: 1.2rem;
      }
      b {
        font-size: 0.7rem;
        line-height: 1.1rem;
        padding-bottom: 0.15rem;
      }
    }
  }
}
.order {
  margin-top: 0.35rem;
  background-color: #fff;
  .order_top {
    display: flex;
    justify-content: space-between;
    height: 1.9rem;
    line-height: 1.9rem;
    padding: 0 0.6rem;
    border-bottom: 1px solid rgb(238, 238, 238);
    span {
      color: rgb(57, 57, 57);
      font-size: 0.8rem;
    }
    b {
      font-size: 0.6rem;
      color: rgb(153, 153, 153);
      vertical-align: middle;
      i {
        vertical-align: middle;
        font-size: 0.8rem;
      }
    }
  }
  .order_main {
    display: flex;
    flex-direction: row;
    li {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      padding: 0.6rem;
      i {
        position: absolute;
        right: 1.2rem;
        top: 0.4rem;
        height: 0.9rem;
        width: 0.9rem;
        text-align: center;
        border-radius: 50%;
        border: 2px solid #ff5252;
        color: #ff5252;
        background-color: #fff;
      }
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin-bottom: 0.4rem;
      }
      span {
        font-size: 0.6rem;
        color: rgb(102, 102, 102);
      }
    }
  }
}
.meau_list {
  > li {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 0.6rem;
    align-items: center;
    height: 2.25rem;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:nth-of-type(5) {
      margin-top: 0.35rem;
    }
    > div {
      img {
        height: 1.5rem;
        width: 1.5rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.75rem;
        vertical-align: middle;
        color: rgb(57, 57, 57);
        padding-left: 0.7rem;
      }
    }
    > i {
      font-size: 1rem;
      color: #999;
    }
  }
}
</style>
