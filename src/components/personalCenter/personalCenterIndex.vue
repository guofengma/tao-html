<template>
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
</template>

<script>
export default {
    name: 'personalCenterIndex'
}
</script>

<style lang="less" scoped>
    @import '../../../static/css/iconfont.css';
    .top {
      background-color: #4da0ff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .top_header {
        width: 100%;
        display: flex;
         padding: 0 .6rem;
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
        padding: 0 .6rem;
        justify-content: flex-start;
        div {
          background-color: #fff;
          border-radius: 50%; 
          height: 4rem;
          width: 4rem;
          padding: .15rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
        span {
          align-self: center;
          padding-left: 1.1rem;
          color: #fff;
          font-size: .9rem;
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
            font-size: .9rem;
            padding-top: .15rem;
            line-height: 1.4rem;
          }
          b {
            font-size: .7rem;
            line-height: 1.1rem;
            padding-bottom: .15rem;
          }
        }
      }
    }
</style>
