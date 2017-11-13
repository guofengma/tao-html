<template>
  <div class="container" style="max-width:640px;min-width:320px;margin:0 auto;background-color:#fff;padding: 0 .5rem">
        <header class="top">
            <h3>涛大夫更新内容</h3>
            <p>2017-09-30</p>
        </header>
        <main class="box">
            <ul>
                <li>
                    <p>1、首页改版，功能入口更清晰</p>
                    <img src="../../../../../static/imgs/personalCenterImgs/imprint/tdf_versions_one.png" alt="">
                </li>
                <li>
                    <p>2、新增健康咨询板块，权威健康咨询</p>
                    <img src="../../../../../static/imgs/personalCenterImgs/imprint/tdf_versions_two.png" alt="">
                </li>
                <li>
                    <p>3、互联网医院改版，银川脑心同治互联网医院唯一授权</p>
                    <img src="../../../../../static/imgs/personalCenterImgs/imprint/tdf_versions_three.png" alt="">
                </li>
                <li>
                    <p>4、个人健康档案改版，健康档案持续记录</p>
                    <img src="../../../../../static/imgs/personalCenterImgs/imprint/tdf_versions_four.png" alt="">
                </li>
                <li>
                    <p>5、指定医生健康咨询，服务更高效</p>
                    <img src="../../../../../static/imgs/personalCenterImgs/imprint/tdf_versions_five.png" alt="">
                </li>
                <li>
                    <p>6、医生个人主页改版</p>
                    <img src="../../../../../static/imgs/personalCenterImgs/imprint/tdf_versions_six.png" alt="">
                </li>
            </ul>
        </main>
    </div>
</template>

<script>
export default {
  name: "imprint"
};
</script>

<style lang="less" scoped>
.top {
  padding-top: 1.1rem;
  margin-bottom: 1.8rem;
  h3 {
    font-weight: 400;
    font-size: 0.9rem;
    color: #393939;
  }
  p {
    margin-top: 0.3rem;
    font-size: 0.65rem;
    color: #393939;
  }
}
.box {
  ul {
    li {
      margin-bottom: 1.8rem;
      p {
        color: #52a3ff;
        font-size: 0.8rem;
        margin-bottom: 1.2rem;
      }
      img {
        display: block;
        width: 80%;
        margin: 0 auto;
      }
    }
  }
}
</style>
