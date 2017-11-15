<template>
  <div class="wrap">
      <ul>
          <li>
              <img src="../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_nickname@2x.png" alt="">
              <span>从你的世界路过</span>
          </li>
          <li>
              <img src="../../../../static/imgs/personalCenterImgs/aboutUs/tdf_tishi_erweima.png" alt="">
          </li>
          <li>
              <p>医生扫描你的二维码</p>
              <p>快速成为你的专属医生</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'myErweima'
}
</script>

<style lang="less" scoped>
    .wrap {
        width: 90%;
        margin: 0 auto;
        padding-top: 1rem; 
        ul {
            background-color: #fff;
            border-radius: .3rem;
            li {
                &:first-of-type {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 4.5rem;
                    img {
                        width: 3rem;
                        margin-right: .5rem;
                        height: 3rem;
                    }
                    span {
                        font-size: .8rem;
                        color: rgb(57,57,57);
                    }
                }
                &:nth-of-type(2) {
                    img {
                        width: 75%;
                        display: block;
                        margin: 0 auto;
                    }
                }
                &:last-of-type {
                    margin-top: .5rem;
                    padding-bottom: .3rem; 
                    p {
                        text-align: center;
                        font-size: .75rem;
                        color: rgb(57,57,57);
                    }
                }
            }
        }
    }
</style>
