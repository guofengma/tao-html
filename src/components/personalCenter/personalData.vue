<template>
  <div class="container">
      <ul class="personal_data">
          <li>
              <span>头像</span>
              <div>
                  <img src="../../../static/imgs/personalCenterImgs/index/tdf_my_set_nickname@3x.png" alt="">
                  <i class="iconfont icon-right"></i>
              </div>
          </li>
          <li>
              <span>昵称</span>
              <div>
                  <b>从你的全世界路过</b>
                  <i class="iconfont icon-right"></i>
              </div>
          </li>
          <li>
              <span>我的二维码</span>
              <div>
                  <em class="iconfont icon-qrcode"></em>
                  <i class="iconfont icon-right"></i>
              </div>
          </li>
          <li>
              <span>我的地址</span>
              <div>
                  <i class="iconfont icon-right"></i>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'personalData'
}
</script>

<style lang="less" scoped>
    .container {
        background-color: #eff4fa;
        min-width: 320px;
        max-width: 640px;
        margin: 0 auto;
        padding-top: .6rem;
        height: 100%;
    }
    .personal_data {
        li {
            background-color: #fff;
            height: 2.25rem;;
            display: flex;
            justify-content: space-between;
            padding: 0 .6rem;
            align-items: center;
            border-bottom: 1px solid rgb(238,238,238);
            &:nth-of-type(4) {
                margin-top: .4rem;
            } 
            span {
                color: rgb(57,57,57);
                font-size: .75rem;
            }
            >div {
                display: flex;
                align-items: center;
                img {
                    height: 1.5rem;
                    width: 1.5rem;
                    margin-right: .6rem;
                }
                b {
                    font-size: .75rem;
                    color: rgb(102,102,102);
                    margin-right: .6rem;
                }
                em {
                    font-size: 1.5rem;
                    color: rgb(102,102,102);
                    margin-right: .6rem;
                }
                i {
                    color: #999;
                    font-size: 1rem;
                }
            }
        }
    }
</style>
