<template>
  <div class="wrap">
      <div :is="componentName" :orderInfo="orderInfo" :imgUrl="imgUrl" />
      <ul class="money_list">
          <li>
              <span>健康咨询</span>
              <b>29.90元</b>
          </li>
          <li>
              <span>优惠券</span>
              <b>两张可用<i class="iconfont icon-right"></i></b>
          </li>
          <li>
              <span>账户零钱</span>
              <b>共10.00元<i class="iconfont icon-radiobox"></i></b>
          </li>
      </ul>
      <ul class="pay_way">
          <li>
              <span>选择支付方式</span>
          </li>
          <li>
              <div>
                  <img src="../../../../static/imgs/aboutOrder/tdf_order_zhfb.png" alt="">
                  <span>支付宝支付</span>
              </div>
              <i class="iconfont icon-check"></i>
          </li>
          <li>
              <div>
                  <img src="../../../../static/imgs/aboutOrder/tdf_order_wexin.png" alt="">
                  <span>微信钱包支付</span>
              </div>
              <i class="iconfont icon-check"></i>
          </li>
          <li>
              <div>
                  <img src="../../../../static/imgs/aboutOrder/tdf_order_yl.png" alt="">
                  <span>银联支付</span>
              </div>
              <i class="iconfont icon-check"></i>
          </li>
      </ul>
      <ul class="fixed_money_box">
          <li>
              <span>已优惠9.90元</span>
          </li>
          <li>
              <b>待支付<em>20.00元</em></b>
              <a href="javascript:;">立即支付</a>
          </li>
      </ul>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
        <div class="leave_msg">
            <h3>提示</h3>
            <p>您的订单已生成，请在15分钟内完成支付否则系统将为您自动取消订单</p>
            <div class="btn_box">
                <a class="pay">继续支付</a>
                <a class="no_pay" @click.prevent="historyGo">确认离开</a>
            </div>
        </div>
    </mt-popup>
  </div>
</template>

<script>
import conJiankangCom from "./conJiankangCom";
import conYuyueCom from "./conYuyueCom";
export default {
  name: "orderPay",
  data() {
    return {
      popupVisible: false,
      componentName: "",
      orderInfo: {},
      imgUrl: []
    };
  },
  created() {
    let orderId = this.$route.params.orderId;
    let category = this.$route.params.category;
    category == "健康咨询"
      ? (this.componentName = conJiankangCom)
      : (this.componentName = conYuyueCom);
    this.$http
      .post(this.baseUrl + "orderList/getOrderDetail", {
        orderId,
        category
      })
      .then(
        res => {
          let orderDetail = res.body.obj;
          if(orderDetail.patientPhoto){
            orderDetail.patientPhoto = this.baseImgUrl + orderDetail.patientPhoto;
          }
          if(orderDetail.heardimage) {
            orderDetail.heardimage = this.baseImgUrl + orderDetail.heardimage;
          }
          this.imgUrl = orderDetail.diseaseImg;
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
  },
  mounted() {
    this.pushHistory();
    let that = this;
    window.addEventListener(
      "popstate",
      function(e) {
        that.popupVisible = true;
      },
      false
    );
  },
  methods: {
    pushHistory() {
      var state = {
        title: "",
        url: ""
      };
      window.history.pushState(state, state.title, state.url);
    },
    historyGo() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
.money_list {
  background-color: #fff;
  padding: 0 0.6rem;
  li {
    display: flex;
    justify-content: space-between;
    height: 2.25rem;
    align-items: center;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:last-of-type {
      border-bottom: 0;
      b {
        color: rgb(82, 163, 255);
        i {
          color: rgb(82, 163, 255);
        }
      }
    }
    span {
      font-size: 0.75rem;
      color: #393939;
    }
    b {
      font-size: 0.8rem;
      color: #393939;
      line-height: 2.25rem;
      i {
        font-size: 1rem;
        color: #999;
        vertical-align: middle;
        margin-left: 0.45rem;
      }
    }
  }
}
.pay_way {
  background-color: #fff;
  padding: 0 0.6rem;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.25rem;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:last-of-type {
      border-bottom: 0;
    }
    div {
      display: flex;
      align-items: center;
      img {
        width: 1.4rem;
        height: 1.4rem;
        margin-right: 0.7rem;
      }
      span {
        font-size: 0.75rem;
        color: #393939;
      }
    }
    i {
      font-size: 1rem;
      color: rgb(82, 163, 255);
    }
  }
}
.fixed_money_box {
  display: flex;
  justify-content: space-between;
  height: 2.25rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  align-items: center;
  padding-left: 0.6rem;
  li:first-of-type {
    font-size: 0.75rem;
    color: #393939;
  }
  li:last-of-type {
    display: flex;
    height: 2.25rem;
    align-items: center;
    justify-content: space-between;
    b {
      font-size: 0.75rem;
      color: #393939;
      em {
        color: rgb(82, 163, 255);
      }
      margin-right: 0.6rem;
    }
    a {
      line-height: 2.25rem;
      background-color: rgb(82, 163, 255);
      color: #fff;
      width: 5.5rem;
      text-align: center;
      font-size: 0.75rem;
    }
  }
}
.mint-popup {
  border-radius: 0.3rem;
}
.leave_msg {
  background-color: #fff;
  width: 15rem;
  border-radius: 0.3rem;
  padding: 0 0.6rem;
  h3 {
    line-height: 2.8rem;
    text-align: center;
    color: rgb(82, 163, 255);
    font-size: 0.8rem;
  }
  p {
    font-size: 0.75rem;
    color: #393939;
    padding-bottom: 0.5rem;
  }
  .btn_box {
    border-top: 1px solid rgb(238, 238, 238);
    display: flex;
    width: 100%;
    justify-content: space-between;
    a {
      width: 100%;
      text-align: center;
      line-height: 2rem;
      font-size: 0.75rem;
      color: #393939;
      &:first-of-type {
        color: rgb(82, 163, 255);
        border-right: 1px solid rgb(238, 238, 238);
      }
    }
  }
}
</style>
