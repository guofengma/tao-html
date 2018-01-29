<template>
  <div class="wrap">
      <ul class="time_count">
          <li class="order_status">
              <img src="../../../../static/imgs/aboutOrder/tdf_order_time.png" alt="">
              <span>{{orderInfo.status}}</span>
          </li>
          <li v-if="countTrue">剩余{{countTimer}}自动取消</li>
      </ul>
      <div :is="comShow" :orderInfo="orderInfo" :imgUrl="imgUrl"></div>
      <ul class="money_box">
          <li>
              <span>{{orderInfo.servertype}}</span>
              <span>{{orderInfo.totalMoney}}元</span>
          </li>
          <li>
              <span>优惠券</span>
              <span>{{orderInfo.couponName}}</span>
          </li>
          <li>
              <span>账户零钱</span>
              <span>-{{orderInfo.accountMoney}}</span>
          </li>
          <li>
              <span>需要支付： <i>{{orderInfo.servermoney}}元</i></span>
          </li>
          <li>
              <span>支付方式</span>
              <span>{{orderInfo.payType}}</span>
          </li>
      </ul>
      <ul class="order_code">
          <li>
              <span>订单编码：{{orderInfo.orderid}}</span>
          </li>
          <li>
              <span>下单时间：{{orderInfo.createtime}}</span>
          </li>
      </ul>
      <div class="pay_box">
          <span class="pay_money">{{orderInfo.status=='待付款' ? orderInfo.servermoney+'元' : ''}}</span>
          <div class="btn_box">
              <a v-if="orderInfo.status=='待付款'" @click="cancelOrder(orderInfo.orderid,orderInfo.servertype)" href="javascritp:;">取消订单</a>
              <a v-if="orderInfo.status=='待付款'" href="javascript:;" class="go_pay" @click="nowPay(orderInfo.diseaseId,orderInfo.servertype)">去支付</a>
              <a v-else-if="orderInfo.status=='待服务'" href="javascritp:;" class="go_pay">去交流</a>
              <a v-else-if="orderInfo.status=='服务中'" href="javascritp:;" class="go_pay">去交流</a>
              <a v-else-if="orderInfo.status=='待评价'" href="javascritp:;" class="go_pay" @click.stop="goEva(orderInfo.doctorid,orderInfo.customerid,orderInfo.orderid,orderInfo.servertype=='健康咨询'?'010002':'010001')">去评价</a>
              <a v-else-if="orderInfo.status=='已完成'" href="javascritp:;" class="go_pay">已完成</a>
              <a v-else-if="orderInfo.status=='已取消'" href="javascritp:;" class="go_pay">已取消</a>
          </div>
      </div>
  </div>
</template>

<script>
import conJiankangCom from "./conJiankangCom";
import conYuyueCom from "./conYuyueCom";
import { Toast } from "mint-ui";
export default {
  name: "orderDetail",
  data() {
    return {
      countTrue: false, //倒计时
      countTimer: 0,
      comShow: "conYuyueCom",
      orderInfo: {},
      imgUrl: []
    };
  },
  created() {
    let orderId = this.$route.params.orderId;
    let category = this.$route.params.category;
    category = category == "jiankang" ? "健康咨询" : "准时预约";
    category == "健康咨询"
      ? (this.comShow = "conJiankangCom")
      : (this.comShow = "conYuyueCom");
    //请求订单详情
    this.$http
      .post(this.baseUrl + "orderList/getOrderDetail", { orderId, category })
      .then(
        res => {
          console.log(JSON.stringify(res));
          let orderDetail = res.body.obj;
          if (orderDetail.patientPhoto) {
            orderDetail.patientPhoto =
              this.baseImgUrl + orderDetail.patientPhoto;
          }
          if (orderDetail.heardimage) {
            orderDetail.heardimage = this.baseImgUrl + orderDetail.heardimage;
          }
          this.imgUrl = orderDetail.diseaseImg;
          this.orderInfo = orderDetail;
          if (orderDetail.status == "待付款") {
            this.showCount(
              orderDetail.servertype,
              +new Date(orderDetail.createtime)
            );
          }
        },
        res => {
          console.log(res);
        }
      );
  },
  components: {
    conJiankangCom,
    conYuyueCom
  },
  methods: {
    goEva(doctorId, customerId, orderId, orderType) {
      this.$router.push({
        name: "evaluate",
        params: { doctorId, customerId, orderId, orderType }
      });
    },
    showCount(text, creattime) {
      this.$http.post(this.baseUrl + "orderList/getServiceTimeOut").then(
        res => {
          this.countTrue = true;
          let dataJson = res.body.obj;
          let timer = 0;
          for (let value of dataJson) {
            if (value.serviceName == text) {
              timer = value.serviceTimeOut;
              this.timerLess(timer);
            }
          }
          let hadTime = +new Date() - creattime;
          setInterval(() => {
            if (+new Date() - creattime - hadTime > 2 * 60 * 1000) {
              this.$router.push({ name: "myOrder", params: { id: "1" } });
            }
          }, 50000);
        },
        res => {
          console.log(res);
        }
      );
    },
    timerLess(time) {
      var newTime = time * 60;
      let that = this;
      var timer = setInterval(function() {
        newTime--;
        var hA = Math.floor(newTime / 3600);
        var mA = Math.floor((newTime % 3600) / 60);
        var sA = Math.floor(newTime % 60);
        //时
        var hs = Math.floor(hA / 10);
        var hg = Math.floor(hA % 10);
        //分
        var ms = Math.floor(mA / 10);
        var mg = Math.floor(mA % 10);
        //秒
        var ss = Math.floor(sA / 10);
        var sg = Math.floor(sA % 10);
        that.countTimer = hs + hg + "小时" + ms + mg + "分" + ss + sg;
      }, 1000);
    },
    //点击取消订单
    cancelOrder(orderId, orderType) {
      this.$http
        .post(this.baseUrl + "orderList/cancelOrder", {
          orderId,
          orderType,
          userType: "Customer"
        })
        .then(
          res => {
            Toast('取消订单成功');
            this.$router.push({name: 'myOrder',id: 2})
            console.log(res);
          },
          res => {
            console.log(res);
          }
        );
    },
    nowPay(diseaseId,servertype) {
      let openid = localStorage.getItem('taoOpenid');
      let that = this;
      this.$http
        .post(
          "https://www.tdaifu.cn:8443/taodoctor-pay-server/wx/app/old/doWXPAYRequest",
          {
            diseaseId: diseaseId,
            clentType: "PATIENT",
            payType: "005001",
            osType: "WEB",
            openId: openid,
            serviceType: servertype == "健康咨询" ? '010002' : '010001'
          }
        )
        .then(
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
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: #eff4fa;
  padding-bottom: 2.5rem;
  min-height: 100%;
}
.time_count {
  padding: 0 0.6rem;
  height: 2.25rem;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  li:first-of-type {
    display: flex;
    height: 100%;
    align-items: center;
    img {
      height: 0.8rem;
      width: 0.8rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 0.35rem;
      color: #fd5153;
      font-size: 0.75rem;
    }
  }
  li:last-of-type {
    color: #fd5153;
    font-size: 0.75rem;
  }
}
.money_box {
  padding: 0 0.6rem;
  background-color: #fff;
  margin-top: 0.35rem;
  li {
    height: 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: rgb(102, 102, 102);
    align-items: center;
    &:nth-of-type(4) {
      border-bottom: 1px solid rgb(238, 238, 238);
      border-top: 1px solid rgb(238, 238, 238);
      display: flex;
      justify-content: flex-end;
      height: 2.5rem;
      align-items: center;
      span {
        i {
          color: #51a3ff;
        }
      }
    }
  }
}
.order_code {
  margin-top: 0.35rem;
  background-color: #fff;
  padding: 0 0.6rem;
  li {
    height: 1.8rem;
    overflow: hidden;
    span {
      display: inline-block;
      flex: 1;
      line-height: 1.8rem;
      color: rgb(102, 102, 102);
      font-size: 0.7rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.pay_box {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 0.6rem;
  background-color: #fff;
  height: 2.25rem;
  align-items: center;
  > span {
    color: rgb(82, 163, 253);
    font-size: 0.75rem;
  }
  .btn_box {
    a {
      display: inline-block;
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 0.5rem;
      border-radius: 0.3rem;
      border: 1px solid rgb(153, 153, 153);
      color: rgb(153, 153, 153);
      font-size: 0.75rem;
      &:first-of-type {
        margin-right: 0.5rem;
      }
    }
    .go_pay {
      color: #52a3ff;
      border: 1px solid #52a3ff;
    }
  }
}
</style>
