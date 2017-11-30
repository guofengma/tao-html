<template>
  <div class="wrap">
      <ul class="time_count">
          <li class="order_status">
              <img src="../../../../static/imgs/aboutOrder/tdf_order_time.png" alt="">
              <span>{{orderInfo.status}}</span>
          </li>
          <!-- <li>剩余4天23小时自动取消</li> -->
      </ul>
      <div :is="comShow" :orderInfo="orderInfo"></div>
      <ul class="money_box">
          <li>
              <span>{{orderInfo.servertype}}</span>
              <span>{{orderInfo.totalMoney}}元</span>
          </li>
          <li>
              <span>优惠券</span>
              <span>{{orderInfo.couponMoney}}元抵扣券</span>
          </li>
          <li>
              <span>账户零钱</span>
              <span>-10.00元</span>
          </li>
          <li>
              <span>需要支付： <i>{{orderInfo.threeMoney}}元</i></span>
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
          <span class="pay_money">10.00元</span>
          <div class="btn_box">
              <a href="javascritp:;">取消订单</a>
              <a href="javascritp:;" class="go_pay">去支付</a>
          </div>
      </div>
  </div>
</template>

<script>
import conJiankangCom from "./conJiankangCom";
import conYuyueCom from "./conYuyueCom";
export default {
  name: "orderDetail",
  data() {
    return {
      comShow: "conYuyueCom",
      orderInfo: ""
    };
  },
  created() {
    let orderId = this.$route.params.orderId;
    let category = this.$route.params.category;
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
          orderDetail.patientPhoto = this.baseImgUrl + orderDetail.patientPhoto;
          orderDetail.heardimage = this.baseImgUrl + orderDetail.heardimage;
          this.orderInfo = orderDetail;
        },
        res => {
          console.log(res);
        }
      );
  },
  components: {
    conJiankangCom,
    conYuyueCom
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
