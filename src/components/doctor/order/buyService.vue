<template>
  <div>
    <!-- 准时预约 -->
    <div v-if="visitType == 'punctual'">
      <ul class="service_type">
        <li><span class="service_icon"><img src="../../../../static/imgs/hospital/index/tdf_hospital_jzhyy.png" alt=""></span>准时预约</li>
        <li><span class="service_price">{{cost}} 元</span></li>
      </ul>
      <ul class="visitInfo">
        <li>预约时间：<span>{{visitTime.workday}}</span> <span>{{visitTime.num | takeOver}}</span></li>
        <li>预约地点：{{visitTime.address}}</li>
      </ul>
    </div>
    <!-- 健康咨询 -->
    <ul class="service_type" v-else>
      <li><span class="service_icon"><img src="../../../../static/imgs/hospital/index/tdf_hospital_jkzx.png" alt=""></span>健康咨询</li>
      <li><span class="service_price">{{cost}} 元</span></li>
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
          <span>健康咨询</span><span>{{cost}} 元</span>
        </li>
        <router-link tag="li" :to="{name:'couponIndex',query:{cost:cost,type:visitType}}">
          <span>优惠券</span> 
          <div class="coupon">{{userCouponText}}<span class="coupon_icon"><img src="../../../../static/imgs/hospital/order/tdf_back_r.png" alt=""></span></div>
        </router-link>
        <li @click="useBalance($event)">
          <span>账户零钱</span>
          <div class="coupon">{{accountMoney}} 元<span class="dib_icon" :class="{'active':useSmall}"></span></div>
        </li>
      </ul>
      <div class="payment_method">
        <h2>选择支付方式</h2>
        <ul class="payment_list">
          <li class="active">
            <span class="pay_icon"><img src="../../../../static/imgs/hospital/order/tdf_order_wexin.png" alt=""></span>  
            微信支付
          </li>
          <!-- <li>
            <span class="pay_icon"><img src="../../../../static/imgs/hospital/order/tdf_order_zhfb.png" alt=""></span>  
            支付宝支付
          </li> -->
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
      cost:0,// 费用
      discount:0, // 优惠(零钱)
      coupon:0, // 优惠(优惠券)
      couponId:'', // 优惠券id
      paid:0, // 支付
      useSmall:false, 
      useConpon:false, 
      userId:'',
      userCouponText:'使用优惠券',
      doctorRelServiceId:'', // 健康咨询的priceId
      accountMoney:'', // 用户余额(显示)
      balance:'', // 用户余额(计算)
      accountPay:0, // 余额支付
      doctorInfo:{}, // 医师详情
      visitInfo:{}, // 就诊人信息
      description:'', // 病情描述
      visitType:'', // 服务类型
      uid:'', // Uuid
      visitTime:{}, // 准时预约信息
      siviTypeIcon:{
        img1:require("../../../../static/imgs/hospital/index/tdf_hospital_jzhyy.png"),
        img2:require("../../../../static/imgs/hospital/index/tdf_hospital_jkzx.png"),
      },
     
    };
  },
  created() {
    // var data = this.$route.params;
    var couponInfo = this.$route.params; // 使用优惠券时的信息
    if(couponInfo.dicValue != undefined){
      // 使用优惠券
      this.useConpon = true;
      this.couponId = couponInfo.couponId; // 优惠券id
      if(couponInfo.dicValue == '004001'){
        this.userCouponText = (couponInfo.couponMoney * 10).toFixed(1) + "折折扣券";
        this.coupon = couponInfo.discount;
      }else if(couponInfo.dicValue == '004002'){
        this.userCouponText = couponInfo.couponMoney + "元优惠券";
        this.coupon = couponInfo.discount;
      }
    }else{
      // 不使用优惠券
      this.useConpon = false;
      this.userCouponText = this.userCouponText;
    }
    var data = JSON.parse(localStorage.getItem('orderInfo'));
    console.log(this.$route.params,data)

    this.visitTime = JSON.parse(localStorage.getItem('visitTime')); // 准时预约服务信息
    this.visitType = localStorage.getItem('visitType'); // 服务类型
    var userInfo = JSON.parse(localStorage.getItem('userInfo')); // 用户信息
    this.doctorInfo = JSON.parse(localStorage.getItem('doctorInfo')); // 医生详情
    var healthInfo = JSON.parse(localStorage.getItem('healthInfo')); // 健康咨询服务信息
    // console.log(healthInfo)
    this.userId = userInfo.id;
    
    console.log("服务类型",this.visitType)
    if(this.visitType == "health"){
      this.doctorRelServiceId = healthInfo.doctorRelServiceId;
      var healthPrice = healthInfo.servicePrice.split("/")[0];
      this.cost = parseFloat(healthPrice).toFixed(2);
    }else if(this.visitType == "punctual"){
      this.cost = this.transferUnit(this.doctorInfo.yusheprice); // 服务价格
    }
    
    this.visitInfo = data.visitInfo; // 就诊人信息
    this.description = data.description; // 病情描述
    this.uid = data.uid; // Uuid
    this.getCoupon(); // 获取优惠券
    this.getBalances(); // 获取余额
  },
  filters:{
    // 分转元
    fen2yuan(num){
      if ( typeof num !== "number" || isNaN( num ) ) return null;
      return ( num / 100 ).toFixed( 2 ) + " 元";
    },
    // 格式化时间间隔
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
  },
  computed:{
    calDiscount(){
      // 费用(cost) - 优惠(discount) = 第三方(paid)
      if(this.useSmall && this.useConpon){ // 同时使用零钱、优惠券支付
        var couponPayment = Tool("subtract",this.cost,this.coupon); // 优先使用优惠券
        var discountPayment = Tool("subtract",couponPayment,this.balance); // 再使用零钱
        console.log('同时使用零钱、优惠券支付',couponPayment,discountPayment);
        if(discountPayment >= 0){
          this.discount = Tool("add",couponPayment,this.balance);
          // this.accountMoney = Tool("subtract",this.balance,this.discount);
          this.accountMoney = parseFloat(0).toFixed(2);
          this.paid = discountPayment;
          this.accountPay = this.balance; // 余额支付
          console.log(1)
        }else{
          this.discount = this.cost;
          this.accountMoney = Tool("subtract",this.balance,couponPayment);
          this.paid = parseFloat(0).toFixed(2);
          this.accountPay = Tool("subtract",this.cost,couponPayment) // 余额支付
          console.log(this.accountMoney)
        }
      }else if(this.useConpon){ // 使用优惠券支付
        console.log('使用优惠券支付');
        var price = Tool("subtract",this.cost,this.coupon);
        this.discount = this.coupon;
        this.accountMoney = this.balance;
        this.paid = price;
        this.accountPay = parseFloat(0).toFixed(2); // 余额支付
      }else if(this.useSmall){ // 使用零钱支付
        console.log('使用零钱支付');
        var price = Tool("subtract",this.cost,this.balance);
        console.log(price)
        if(price >= 0){
          this.discount = this.balance;
          this.accountMoney = Tool("subtract",this.balance,this.discount);
          this.paid = price;
          this.accountPay = this.discount; // 余额支付
        }else{
          this.discount = this.cost;
          this.accountMoney = Tool("subtract",this.balance,this.discount);
          this.paid = parseFloat(0).toFixed(2);
          this.accountPay = this.discount; // 余额支付
        }
      }else{
        this.discount = parseFloat(0).toFixed(2);
        this.accountMoney = this.balance;
        this.paid = this.cost;
        this.accountPay = this.discount; // 余额支付
      }
      return this.discount;
    }
  },
  methods: {
    // 保存订单
    saveOrder(){
      Indicator.open({ text:'加载中...'});
      var url = this.baseUrl + 'allorder/saveOrder';
      var serviceType = this.visitType == "punctual" ? "visitTime" : "phone";
      var data = {
        diseaseId:this.uid,
        payType:'005001',
        payMoney:this.paid, // 第三方
        serviceType:serviceType, 
        accountPay:this.accountPay, // 余额
      };
      console.log(this.doctorRelServiceId)
      if(serviceType == 'visitTime'){
        // data = {
        //   diseaseId:this.uid,
        //   payType:'005001',
        //   payMoney:this.paid, // 第三方
        //   serviceType:serviceType, 
        //   accountPay:this.discount, // 余额
        // }
        if(this.couponId){
          data.couponId = this.couponId;
        }
      }else if(serviceType == 'phone'){
        data.doctorId = this.doctorInfo.id;
        data.priceId = this.doctorRelServiceId;
        console.log(this.couponId)
        if(this.couponId){
          data.couponId = this.couponId;
        }
        // data = {
        //   diseaseId:this.uid,
        //   payType:'005001',
        //   payMoney:this.paid, // 第三方
        //   serviceType:serviceType, 
        //   accountPay:this.discount, // 余额
        //   doctorId:this.doctorInfo.id,
        //   priceId:this.doctorRelServiceId,
        //   // couponId:this.couponId // 优惠券id
        // }
      }
      this.$http.post(url,data).then(res => {
        console.log('2222222222222'+res.data);
        Indicator.close();
        if(res.data.statusCode == 1){
          this.nowPay(res.data.obj,serviceType);
        }else{
          alert('1111111111111');
          Toast(res.data.message);
        }
      },res => {
        console.log("error");
      });
    },
    nowPay(diseaseId,servertype) {
      let openid = localStorage.getItem('taoOpenid');
      let that = this;
      this.$http.post("https://www.tdaifu.cn:8443/taodoctor-pay-server/wx/app/old/doWXPAYRequest",
          {
            diseaseId: diseaseId,
            clentType: "PATIENT",
            payType: "005001",
            osType: "WEB",
            openId: openid,
            serviceType: servertype == "phone" ? '010002' : '010001'
          }
        ).then(
          res => {
            console.log(JSON.stringify(res));
            let objJson = res.body.object;
            wx.ready(function() {
              wx.chooseWXPay({
                timestamp: objJson.timetamp,
                nonceStr: objJson.noncestr, // 支付签名随机串，不长于 32 位
                package: objJson.packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: objJson.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: objJson.sign, // 支付签名
                success: function(res) {
                  // 支付成功后的回调函数
                  console.log(JSON.stringify(res));
                  if (res.errMsg == "chooseWXPay:ok") {
                    //支付成功
                    that.$router.push({name: 'myOrder', params: { id: '3' }});
                  } else {
                    console.log(res.errMsg);
                  }
                },
                cancel: function(res) {
                  //支付取消
                  console.log("支付取消");
                }
              });
            });
          },
          res => {
            console.log(res);
          }
        );
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
    // 分转元
    fen2yuan(num){
      if ( typeof num !== "number" || isNaN( num ) ) return null;
      return ( num / 100 ).toFixed( 2 );
    },
    // 获取优惠券
    getCoupon(){
      var url = this.baseUrl + 'diseasedescription/getCustomerCoupons';
      var data = {
        customerId:this.userId,
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
        customerId:this.userId
      }
      this.$http.post(url,data).then(res => {
        console.log(res.data);
        if(res.data.statusCode == 1){
          console.log(res.data.object.accountMoney);
          // 余额
          this.balance = this.fen2yuan(res.data.object.accountMoney); // 后台返回余额
          this.accountMoney = this.fen2yuan(res.data.object.accountMoney); // 前端显示
        }
      },res => {
        console.log("error");
      });
    },
    useBalance(e){
      if(this.accountMoney == 0){
        return false;
      }else{
        this.useSmall = !this.useSmall;
      }
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
  border-bottom:1px solid #f1f1f1;
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
.visitInfo{
  padding:0.3rem 0.6rem;
  background:#fff;
  li{
    font-size: 0.65rem;
    color: @fontColor;
    line-height:1.2rem;
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
