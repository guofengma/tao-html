<template>
  <div class="container">
        <main class="content">
            <p>官方微信公众号</p>
            <img src="../../../../../static/imgs/personalCenterImgs/aboutUs/tdf_tishi_erweima.png" alt="">
            <p>官方网站</p>
            <a href="http://www.taodaifu.net">www.taodaifu.net</a>
        </main>
        <footer>

        </footer>
    </div>
</template>

<script>
export default {
  name: "officalAccount"
};
</script>

<style lang="less" scoped>
.container {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  background-color: rgb(239, 244, 250);
  .top {
    background-color: #2f8fff;
    h3 {
      text-align: center;
      color: #fff;
      font-weight: 400;
      line-height: 2.5rem;
    }
  }
  .content {
    padding-top: 3.7rem;
    p {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      color: #393939;
    }
    img {
      display: block;
      width: 40%;
      margin: 0 auto;
      margin-bottom: 3.7rem;
    }
    a {
      color: #52a3ff;
      font-size: 0.9rem;
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
