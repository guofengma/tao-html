<template>
  <div class="wrap">
      <div class="top_logo">
          <img src="../../../../static/imgs/personalCenterImgs/aboutUs/tdf_about_us_logo@2x.png" alt="">
          <p>2.2.0.11</p>
      </div>
      <ul class="main_list">
          <router-link tag="li" :to="{name: 'introTao'}">
              <span>涛大夫简介</span>
              <i class="iconfont icon-right"></i>
          </router-link>
          <router-link tag="li" :to="{name: 'introTao'}">
              <span>版本说明</span>
              <i class="iconfont icon-right"></i>
          </router-link>
          <router-link tag="li" :to="{name: 'userAgreement'}">
              <span>用户协议</span>
              <i class="iconfont icon-right"></i>
          </router-link>
          <router-link tag="li" :to="{name: 'officalAccount'}">
              <span>官方账号</span>
              <i class="iconfont icon-right"></i>
          </router-link>
      </ul>
      <div class="bottom_img">
          <img src="../../../../static/imgs/personalCenterImgs/aboutUs/tdf_about_us_copyright@2x.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name: 'aboutTao'
}
</script>

<style lang="less" scoped>
.wrap {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    background-color: rgb(239, 244, 250);
    min-height: 100%;
    position: relative;
    .top_logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1.5rem;
        img {
            width: 25%;
        }
        p{
            font-size: .8rem;
            color: rgb(82,163,255);
            padding-bottom: 1.5rem;
            margin-top: .6rem;
        }
    }
    .main_list {
        li {
            display: flex;
            padding: 0 .6rem;
            justify-content: space-between;
            height: 2.25rem;
            align-items: center;
            background-color: #fff;
            border-bottom: 1px solid rgb(238,238,238);
            &:last-of-type {
                border-bottom: 0;
            }
            span {
                font-size: .75rem;
                color: rgb(57,57,57);
            }
            i {
                font-size: 1rem;
                color: #999;
            }
        }
    }
    .bottom_img {
        position: absolute;
        bottom: 1.25rem;
        width: 100%;
        img {
            width: 70%;
            margin: 0 auto;
            display: block;
        }
    }
}
</style>
