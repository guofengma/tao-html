<template>
  <div>
    <ul class="service_type">
      <li><span class="service_icon"><img src="../../../../static/imgs/hospital/index/tdf_hospital_jkzx.png" alt=""></span>健康咨询</li>
      <li><span class="service_price">19.90元</span></li>
    </ul>
    <div class="service_bg">
      <ul class="service_obj">
        <li><span><img src="../../../../static/imgs/hospital/order/tdf_order_touxiang.png" alt=""></span> 徐亮</li>
        <li><img src="../../../../static/imgs/hospital/order/tdf_order_xintiao.png" alt=""></li>
        <li><span><img src="../../../../static/imgs/hospital/order/tdf_order_touxiang.png" alt=""></span> 儿科医生</li>
      </ul>
      <div class="symptom">
        <h2>症状描述：</h2>
        <p>例：我今年40岁了，男。前一段时间出现了眩晕的症状，到医院诊断为高血压，希望进一步咨询专家，后续预防措施。</p>
      </div>
      <ul class="service_list">
        <li>
          <span>健康咨询</span><span>29.90元</span>
        </li>
        <router-link tag="li" :to="{name:'coupon'}">
          <span>优惠券</span> 
          <div class="coupon">使用优惠券<span class="coupon_icon"><img src="../../../../static/imgs/hospital/order/tdf_back_r.png" alt=""></span></div>
        </router-link>
        <li>
          <span>账户零钱</span>
          <div class="coupon">29.90元<span class="dib_icon active"></span></div>
        </li>
      </ul>
      <div class="payment_method">
        <h2>选择支付方式</h2>
        <ul class="payment_list">
          <li class="active">
            <span class="pay_icon"><img src="../../../../static/imgs/hospital/order/tdf_order_zhfb.png" alt=""></span>  
            支付宝支付
          </li>
          <li>
            <span class="pay_icon"><img src="../../../../static/imgs/hospital/order/tdf_order_wexin.png" alt=""></span>  
            微信支付
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom_bar">
      <ul class="bottom_left">
        <li>已优惠9.90元</li>
        <li>待支付<span>20.00元</span></li>
      </ul>
      <div class="bottom_right">立即支付</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.takeOver(18));
  },
  methods: {
    takeOver(obj) {
      var a = "";
      var optime = parseInt(obj);
      var i = optime % 4;
      var j = parseInt(optime / 4);
      if (i == 0) {
        a = j + ":00-" + j + ":15";
      } else if (i == 1) {
        a = j + ":15-" + j + ":30";
      } else if (i == 2) {
        a = j + ":30-" + j + ":45";
      } else if (i == 3) {
        a = j + ":45-" + (j + 1) + ":00";
      }
      return a;
    }
  }
};
</script>

<style lang="less" scoped>
@fontColor: rgb(57, 57, 57);
@font1Color: rgb(102, 102, 102);
.service_type {
  height: 2.25rem;
  padding: 0 0.6rem;
  background: #fff;
  font-size: 0.75rem;
  color: @fontColor;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .service_icon {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.5rem;
    img {
      width: 100%;
    }
  }
  .service_price {
    font-size: 0.8rem;
    color: rgb(82, 162, 255);
  }
}
.service_bg {
  background: rgb(248, 248, 248);
  .service_obj {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 2rem;
    margin-bottom: 0.8rem;
    li {
      font-size: 0.75rem;
      color: @fontColor;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin-right: 0.6rem;
        img {
          width: 100%;
          max-height: 100%;
        }
      }
      img {
        width: 4rem;
      }
    }
  }
  .symptom {
    padding: 0 0.6rem;
    padding-bottom: 0.75rem;
    h2 {
      font-size: 0.7rem;
      color: @font1Color;
      margin-bottom: 0.35rem;
    }
    p {
      font-size: 0.65rem;
      color: rgb(152, 152, 152);
    }
  }
  .service_list {
    padding: 0 0.6rem;
    margin-bottom: 0.35rem;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 2.25rem;
      border-bottom: 1px solid rgb(238, 238, 238);
      .coupon {
        display: flex;
        align-items: center;
        .coupon_icon {
          display: inline-block;
          width: 0.4rem;
          height: 0.8rem;
          margin-left:0.5rem;
          img {
            height: 100%;
          }
        }
        .dib_icon{
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          margin-left:0.5rem;
          border: 1px solid #3494fe;
          border-radius:100%;
          position: relative;
          &.active::after{
            content:'';
            display: block;
            width:0.5rem;
            height: 0.5rem;
            background:#3794fe;
            border-radius:100%;
            position: absolute;
            left: 0.1rem;
            top:0.1rem;
          }
        }
      }
    }
  }
  .payment_method {
    padding: 0 0.6rem;
    h2 {
      height: 2.25rem;
      font-size: 0.75rem;
      color: @fontColor;
    }
    .payment_list {
      li {
        display: flex;
        align-items: center;
        height: 2.25rem;
        border-bottom: 1px solid rgb(238, 238, 238);
        position: relative;
        &.active::after {
          content: "";
          display: block;
          width: 1rem;
          height: 1rem;
          background: url("../../../../static/imgs/hospital/order/tdf_order_zuanzh.png")
            no-repeat;
          background-size: 100%;
          position: absolute;
          right: 0.6rem;
          top: 0.8rem;
        }
        .pay_icon {
          display: inline-block;
          margin-right: 0.6rem;
          width: 1rem;
          height: 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.bottom_bar {
  width: 100%;
  height: 2.25rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottom_left {
    flex-grow: 1;
    padding: 0 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      color:#3494fe;
    }
  }
  .bottom_right {
    width: 5.5rem;
    height: 100%;
    text-align: center;
    line-height: 2.5rem;
    background: #3794fe;
    color: #fff;
    font-size: 0.75rem;
  }
}
</style>
