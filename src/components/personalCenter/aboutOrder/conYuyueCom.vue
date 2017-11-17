<template>
  <div class="health_box">
          <ul class="health_top">
              <li>
                  <img src="../../../../static/imgs/aboutOrder/tdf_order_jzhyy.png" alt="">
                  <span>预约诊疗</span>
              </li>
              <li>
                  <span>29.90元</span>
              </li>
          </ul>
          <ul class="timer_box">
                  <li>
                      <span>预约时间： 2017-11-12 08:09:09</span>
                  </li>
                  <li>
                      <span>预约地点： 北京市安贞医院</span>
                  </li>
              </ul>
          <div class="health_main">
              <div class="main_top">
                  <img class="icon_pic" src="../../../../static/imgs/aboutOrder/tdf_order_touxiang.png" alt="">
                  <span>徐亮</span>
                  <img src="../../../../static/imgs/aboutOrder/tdf_order_xintiao.png" alt="">
                  <img class="icon_pic" src="../../../../static/imgs/aboutOrder/tdf_order_touxiang.png" alt="">
                  <span>儿科医生</span>
              </div>
              <div class="main_text">
                  <h3>症状描述：</h3>
                  <p>我今年40了，男。前一段时间出现了眩晕的症状，到医院诊断为高血压，希望进一步咨询专家，后续预防措施我今年40了，男。前一段时间出现了眩晕的症状，到医院诊断为高血压，希望进一步咨询专家，后续预防措施</p>
              </div>
          </div>
      </div>
</template>

<script>
export default {
  name: "conYuyueCom"
};
</script>

<style lang="less" scoped>
.health_box {
  margin-top: 0.35rem;
  background-color: #fff;
  .health_top {
    padding: 0 0.6rem;
    display: flex;
    height: 2.25rem;
    justify-content: space-between;
    li:first-of-type {
      display: flex;
      height: 100%;
      align-items: center;
      img {
        height: 0.8rem;
        width: 0.8rem;
        margin-right: .3rem;
      }
      span {
        font-size: 0.75rem;
        color: #393939;
      }
    }
    li:last-of-type {
      span {
        line-height: 2.25rem;
        color: #52a3ff;
        font-size: 0.75rem;
      }
    }
  }
  .timer_box {
      padding: 0 .6rem;
    li {
      span {
        color: rgb(57, 57, 57);
        font-size: 0.7rem;
        line-height: 1.2rem;
      }
    }
  }
  .health_main {
    padding-bottom: 0.5rem;
    background-color: #f8f8f8;
    .main_top {
      display: flex;
      justify-content: center;
      height: 3rem;
      align-items: center;
      .icon_pic {
        width: 1.7rem;
        height: 1.7rem;
      }
      img {
        height: 1.4rem;
        margin-right: 0.4rem;
      }
      span {
        font-size: 0.75rem;
        color: #393939;
        margin-right: 0.4rem;
      }
    }
    .main_text {
      padding: 0 0.6rem;
      h3 {
        color: #555;
        font-size: 0.8rem;
      }
      p {
        color: #666;
        font-size: 0.7rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
