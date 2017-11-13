<template>
  <div class="wrap">
      <ul>
          <li>
              <div class="ico_left">
                  <img src="../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_cellphone@2x.png" alt="">
                    <span>手机号</span>
              </div>
              <div class="ico_right">
                  <b>17071892627</b>
                    <i class="iconfont icon-right"></i>
              </div>
          </li>
          <li>
              <div class="ico_left">
                  <img src="../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_weixin@2x.png" alt="">
                <span>微信</span>
              </div>
              <div class="ico_right">
                  <b class="no_active">未关联</b>
                    <i class="iconfont icon-right"></i>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "accountSecurity"
};
</script>

<style lang="less" scoped>
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: rgb(239, 244, 250);
  > ul {
    margin-top: 0.6rem;
    background-color: #fff;
    > li {
      height: 2.25rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 .6rem;
      .ico_left {
          display: flex;
          align-items: center;
          img {
              height: 1.5rem;
              width: 1.5rem;
          }
          span {
              font-size: .75rem;
              color: rgb(57,57,57);
              padding-left: .6rem;
          }
      }
      .ico_right {
          display: flex;
          align-items: center;
          b {
              font-size: .75rem;
              padding-right: .2rem;
              color: rgb(57,57,57);
              &.active {
                  color: rgb(82,163,255);
              }
              &.no_active {  
                color: rgb(255,82,82);
              }
          }
          i {
              font-size: 1rem;
              color: #999;
              margin-top: .1rem;
          }
      }
      &:first-of-type {
          border-bottom: 1px solid rgb(238,238,238);
      }
    }
  }
}
</style>
