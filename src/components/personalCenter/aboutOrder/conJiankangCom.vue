<template>
  <div class="health_box">
          <ul class="health_top">
              <li>
                  <img src="../../../../static/imgs/aboutOrder/tdf_order_jkzx.png" alt="">
                  <span>{{orderInfo.servertype}}</span>
              </li>
              <li>
                  <span>{{orderInfo.totalMoney}}元</span>
              </li>
          </ul>
          <div class="health_main">
              <div class="main_top">
                  <img class="icon_pic" :src="orderInfo.patientPhoto" alt="">
                  <span>{{orderInfo.patientName}}</span>
                  <img src="../../../../static/imgs/aboutOrder/tdf_order_xintiao.png" alt="">
                  <img class="icon_pic" :src="orderInfo.heardimage" alt="">
                  <span>{{orderInfo.doctorname}}</span>
              </div>
              <div class="main_text">
                  <h3>症状描述：</h3>
                  <p>{{orderInfo.description}}</p>
              </div>
          </div>
      </div>
</template>

<script>
export default {
  name: "conJiankangCom",
  props: ['orderInfo']
};
</script>

<style lang="less" scoped>
.health_box {
    margin-top: .35rem;
    background-color: #fff;
    .health_top {
        padding: 0 .6rem;
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
                font-size: .75rem;
                color: #393939;
            }
        }
        li:last-of-type {
            span {
                line-height: 2.25rem;
                color: #52a3ff;
                font-size: .75rem;
            }
        }
    }
    .health_main {
        padding-bottom: .5rem;
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
                margin-right: .4rem;
            }
            span {
                font-size: .75rem;
                color: #393939;
                margin-right: .4rem;
            }
        }
        .main_text {
            padding: 0 .6rem;
            h3 {
                color: #555;
                font-size: .8rem;
            }
            p {
                color: #666;
                font-size: .7rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
}
</style>
