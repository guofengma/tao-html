<template>
  <div>
    <ul class="service_type">
      <li><span class="service_icon"><img src="" alt=""></span>{{visitType == "punctual" ? "准时预约" : "健康咨询"}}</li>
      <li><span class="service_price">{{yusheprice}} 元</span></li>
    </ul>
    <div class="service_bg">
      <ul class="service_obj">
        <li><span><img src="../../../../static/imgs/hospital/order/tdf_order_touxiang.png" alt=""></span> {{visitInfo.name}}</li>
        <li><img src="../../../../static/imgs/hospital/order/tdf_order_xintiao.png" alt=""></li>
        <li><span><img src="../../../../static/imgs/hospital/order/tdf_order_touxiang.png" alt=""></span> {{doctorInfo.name}}</li>
      </ul>
      <div class="symptom">
        <h2>症状描述：</h2>
        <p>{{description}}</p>
      </div>
      <ul class="service_list">
        <li>
          <span>健康咨询</span><span>{{yusheprice}} 元</span>
        </li>
        <router-link tag="li" :to="{name:'couponIndex'}">
          <span>优惠券</span> 
          <div class="coupon">使用优惠券<span class="coupon_icon"><img src="../../../../static/imgs/hospital/order/tdf_back_r.png" alt=""></span></div>
        </router-link>
        <li @click="useBalance($event)">
          <span>账户零钱</span>
          <div class="coupon">{{accountMoney | fen2yuan}}<span class="dib_icon" :class="{'active':useSmall}"></span></div>
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
        <li>已优惠 {{calDiscount}} 元</li>
        <li>待支付<span> {{paid}} 元</span></li>
      </ul>
      <div class="bottom_right" @click="saveOrder">立即支付</div>
    </div>
  </div>
</template>

<script>
import { Tool } from '../floatTool.js';
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      discount:0, // 优惠
      paid:0, // 支付
      useSmall:false,
      accountMoney:'', // 用户余额
      doctorInfo:{}, // 医师详情
      visitInfo:{}, // 就诊人信息
      description:'',
      visitType:'',
      siviTypeIcon:{
        img1:require("../../../../static/imgs/hospital/index/tdf_hospital_jzhyy.png"),
        img2:require("../../../../static/imgs/hospital/index/tdf_hospital_jkzx.png"),
      },
      uid:'',
    };
  },
  created() {
    var data = this.$route.params;
    console.log(this.$route.params)
    this.doctorInfo = data.doctorInfo;
    this.yusheprice = this.transferUnit(data.doctorInfo.yusheprice);
    this.visitInfo = data.visitInfo;
    this.visitType = data.visitType;
    this.description = data.description;
    this.uid = data.uid;
    this.getCoupon(); // 获取优惠券
    this.getBalances(); // 获取余额
  },
  filters:{
    // 分转元
    fen2yuan(num){
      if ( typeof num !== "number" || isNaN( num ) ) return null;
      return ( num / 100 ).toFixed( 2 ) + " 元";
    }
  },
  computed:{
    calDiscount(){
      if(this.useSmall){
        var price = Tool("subtract",this.yusheprice,this.accountMoney / 100);
        console.log(price)
        
        if(price >= 0){
          this.discount = this.accountMoney / 100;
          this.paid = price;
        }else{
          this.discount = this.yusheprice;
          this.paid = 0;
        }
      }else{
        this.discount = 0;
        this.paid = this.yusheprice;
      }
      return this.discount;
    }
  },
  methods: {
    // 保存订单
    saveOrder(){
      Indicator.open({ text:'加载中...'});
      var url = this.baseUrl + 'allorder/saveOrder';
      var id = '8D2E514AABBC4ADBA1088B610D74CDCF'
      var data = {
        diseaseId:this.uid,
        // priceId:this.yusheprice,
        payType:'005001',
        payMoney:this.paid.toFixed(2),
        serviceType:'visitTime',
        accountPay:this.yusheprice
      }
      this.$http.post(url,data).then(res => {
        console.log(res.data);
        Indicator.close();
        Toast(res.data.message);
      },res => {
        console.log("error");
      });
    },
    // 转换单位
    transferUnit(num){
      var result = parseFloat(num) / 100 + '';
      var n = result.substr(result.indexOf(".")+3,1);
      if(n == 0){
        result = parseFloat(result);
      }else{
        result = parseFloat(result) + 0.01;
      }
      return result.toFixed(2);
    },
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
        customerId:'CB14FA9A70004326964EDE9ED41C4D8F'
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
      this.useSmall = !this.useSmall;
      
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
