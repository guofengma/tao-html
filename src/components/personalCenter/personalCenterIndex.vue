<template>
  <div class="container">
    <!-- 头部背景 -->
    <div class="top">
      <div class="top_header">
        <i class="iconfont icon-settings"></i>
        <i class="iconfont icon-mark"></i>
      </div>
      <div class="top_main">
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_set_nickname@3x.png" alt="">
        </div>
        <span>世界是你们的</span>
      </div>
      <ul class="top_footer">
        <li>
          <span>2000.00元</span>
          <b>零钱</b>
        </li>
        <li>
          <span>2000个</span>
          <b>健康过</b>
        </li>
        <li>
          <span>17张</span>
          <b>优惠券</b>
        </li>
      </ul>
    </div>
    <!-- 查看订单部分 -->
    <div class="order">
      <div class="order_top">
        <span>我的订单</span>
        <b>查看更多订单&nbsp;&nbsp;&nbsp;<i class="iconfont icon-right"></i></b>
      </div>
      <ul class="order_main">
        <li>
          <i>5</i>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_obligation@2x.png" alt="">
          <span>代付款</span>
        </li>
        <li>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_serve@2x.png" alt="">
          <span>代付款</span>
        </li>
        <li>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_in_service@2x.png" alt="">
          <span>代付款</span>
        </li>
        <li>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_evaluate@2x.png" alt="">
          <span>代付款</span>
        </li>
      </ul>
    </div>
    <!-- 列表展示部分 -->
    <ul class="meau_list">
      <li>
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_see_a_doctor@2x.png" alt="">
          <span>就诊人</span>
        </div>
        <i class="iconfont icon-right"></i>
      </li>
      <li>
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_doctor@2x.png" alt="">
          <span>我的医生</span>
        </div>
        <i class="iconfont icon-right"></i>
      </li>
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
          <span>需求订单</span>
        </div>
        <i class="iconfont icon-right"></i>
      </li>
      <li>
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_collect@2x.png" alt="">
          <span>我的收藏</span>
        </div>
        <i class="iconfont icon-right"></i>
      </li>
      <li>
        <div>
          <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_invite@2x.png" alt="">
          <span>邀好友&nbsp;&nbsp;&nbsp;得奖励</span>
        </div>
        <i class="iconfont icon-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "personalCenterIndex"
};
</script>

<style lang="less" scoped>
.container {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: rgb(239,244,250);
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
    margin: 1.5rem 0;
    display: flex;
    padding: 0 0.6rem;
    justify-content: flex-start;
    div {
      background-color: #fff;
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
      padding: 0.15rem;
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
        line-height: 1.4rem;
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
  margin-top: .35rem;
  background-color: #fff;
  .order_top {
    display: flex;
    justify-content: space-between;
    height: 1.9rem;
    line-height: 1.9rem;
    padding: 0 .6rem;
    border-bottom: 1px solid rgb(238,238,238); 
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
        font-size: .8rem;
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
      padding: .6rem;
      i {
        position: absolute;
        right: 1.2rem;
        top: .4rem;
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
        margin-bottom: .4rem;
      }
      span {
        font-size: .6rem;
        color: rgb(102,102,102);
      }
    }
  }
}
.meau_list {
  >li {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 .6rem;
    align-items: center;
    height: 2.25rem;
    border-bottom: 1px solid rgb(238,238,238); 
    &:nth-of-type(5) {
      margin-top: .35rem;
    } 
    >div {
      img {
        height: 1.5rem;
        width: 1.5rem;
        vertical-align: middle;
      }
      span {
        font-size: .75rem;
        vertical-align: middle;
        color: rgb(57,57,57);
        padding-left: .7rem;
      }
    }
    >i {
      font-size: 1rem;
      color: #999;
    }
  }
}
</style>
