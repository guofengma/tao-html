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
        <router-link tag="li" :to="{name:'couponIndex'}">
          <span>优惠券</span> 
          <div class="coupon">使用优惠券<span class="coupon_icon"><img src="../../../../static/imgs/hospital/order/tdf_back_r.png" alt=""></span></div>
        </router-link>
        <li>
          <span>账户零钱</span>
          <div class="coupon">{{accountMoney | fen2yuan}}<span class="dib_icon" @click="useBalance($event)"></span></div>
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
    return {
      accountMoney:'', // 用户余额
    };
  },
  created() {
    console.log(this.$route.params)
    this.getCoupon();
    this.getBalances();
  },
  filters:{
    // 分转元
    fen2yuan(num){
      if ( typeof num !== "number" || isNaN( num ) ) return null;
      return ( num / 100 ).toFixed( 2 ) + " 元";
    }
  },
  methods: {
    // 获取优惠券
    getCoupon(){
      var url = this.baseUrl + 'diseasedescription/getCustomerCoupons';
      var data = {
        customerId:'880631824E9A482DBA94B6138A5F91B2',
        // useType:'088002' // 008001健康咨询优惠券  008002 准时预约优惠券 不传-获取所有
      }
      this.$http.post(url,data).then(res => {
        console.log(res.data);
      },res => {
        console.log("error");
      });
    },
    // 获取余额
    getBalances(){
      var url = this.baseUrl + 'DisplayTotalAccountController/DisplayTotalAccount';
      var data = {
        customerId:'880631824E9A482DBA94B6138A5F91B2'
      }
      this.$http.post(url,data).then(res => {
        console.log(res.data);
        if(res.data.statusCode == 1){
          console.log(res.data.object.accountMoney)
          this.accountMoney = res.data.object.accountMoney;
        }
      },res => {
        console.log("error");
      });
    },
    useBalance(e){
      console.log(e.target.className)
      e.target.classList.toggle('active');
      // if(e.target.className.indexOf('active') == -1){
      //   e.target.classList.add('active');
      // }else{
      //   e.target.classList.remove('active');
      // }
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
