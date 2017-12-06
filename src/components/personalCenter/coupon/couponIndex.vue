<template>
 <div class="wrap">
     <div class="fill_box">
         <input type="text" v-model.trim="couponNum" placeholder="请输入兑换码">
         <a href="javascript:;" :class="{'had_input':couponNumTrue}" @click="getCoupon">兑换</a>
     </div>
     <ul class="coupon_list">
         <li v-for="(item,index) in couponList" :key="index" :data-coupon-id="item.couponEntityId" :data-id="item.id">
             <div class="cou_left">
                 <span>{{item.couponMoney}}</span>
                 <b>元</b>
             </div>
             <ul class="cou_right">
                 <li>
                     <p>适用类型：电话问答/精准预约</p>
                 </li>
                 <li>
                     <p>最高折扣：{{item.maxMoney}}元</p>
                 </li>
                 <li>
                     <p>有效期：{{item.startTime | formatTime}}-{{item.endTime | formatTime}}</p>
                 </li>
             </ul>
         </li>
     </ul>
 </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: "couponIndex",
  data() {
    return {
      couponNum: "",
      couponNumTrue: false,
      couponList: []
    };
  },
  created() {
    this.$http
      .post(this.baseUrl + "diseasedescription/getCustomerCoupons", {
        customerId: JSON.parse(localStorage.getItem("userInfo")).id
      })
      .then(
        res => {
          this.couponList = res.body.data;
          console.log(JSON.stringify(res));
        },
        res => {
          console.log(res);
        }
      );
  },
  filters: {
    formatTime(date) {
      if (date != null && date != "") {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = "" + d.getFullYear(),
          hour = "" + d.getHours(),
          minute = "" + d.getMinutes(),
          second = "" + d.getSeconds();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        if (hour.length < 2) hour = "0" + hour;
        if (minute.length < 2) minute = "0" + minute;
        if (second.length < 2) second = "0" + second;
        return [year, month, day].join(" ");
      } else {
        return null;
      }
    }
  },
  watch: {
    couponNum(newV, oldV) {
      if (newV != "") {
        this.couponNumTrue = true;
      } else {
        this.couponNumTrue = false;
      }
    }
  },
  methods: {
    getCoupon() {
      if (this.couponNum) {
        this.$http
          .post(this.baseUrl + "coupon/getCouponByCode", {
            customerId: JSON.parse(localStorage.getItem("userInfo")).id,
            chargeCode: this.couponNum
          })
          .then(
            res => {
              let data = res.body;
              if(data.statusCode==0) {
                Toast(data.message);
              }else if(data.statusCode==1) {
                Toast(data.message);
                setImmediate(function(){
                  window.history.go(0);
                },1000);
              }
              console.log(res);
            },
            res => {
              console.loh(res);
            }
          );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-height: 100%;
  background-color: #eff4fa;
}
.fill_box {
  display: flex;
  justify-content: center;
  padding: 0 0.6rem;
  padding-top: 0.6rem;
  input {
    flex: 8;
    height: 2.25rem;
    padding-left: 0.7rem;
    color: #393939;
    font-size: 0.75rem;
  }
  a {
    flex: 2;
    line-height: 2.25rem;
    text-align: center;
    background-color: #999999;
    color: #fff;
    &.had_input {
      background-color: #479dff;
    }
  }
}
.coupon_list {
  margin: 0 0.6rem;
  > li {
    display: flex;
    height: 5.5rem;
    align-items: center;
    margin-top: 0.7rem;
    background-color: #fff;
    border-radius: 0.4rem;
    overflow: hidden;
    background: url("../../../../static/imgs/coupon/couponbg.png") no-repeat
      center / 100% 100%;
    &:nth-of-type(2n) {
      background: url("../../../../static/imgs/coupon/couponbg1.png") no-repeat
        center / 100% 100%;
    }
    .cou_left {
      position: relative;
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      //   border-right: 8px dotted #eff4fa;
      height: 100%;
      //   &::before {
      //     position: absolute;
      //     right: -0.7rem;
      //     top: -0.5rem;
      //     height: 1rem;
      //     width: 1rem;
      //     border-radius: 50%;
      //     background-color: #eff4fa;
      //     content: "";
      //   }
      //   &::after {
      //     position: absolute;
      //     right: -0.7rem;
      //     bottom: -0.5rem;
      //     height: 1rem;
      //     width: 1rem;
      //     border-radius: 50%;
      //     background-color: #eff4fa;
      //     content: "";
      //   }
      > span {
        color: #ff5252;
        font-size: 1rem;
      }
      > b {
        color: #ff5252;
        font-size: 0.8rem;
        padding-right: 2.3rem;
      }
    }
    .cou_right {
      flex: 6;
      margin-left: -1rem;
      > li:nth-of-type(1) {
        font-size: 0.7rem;
        color: #393939;
      }
      > li:nth-of-type(2) {
        font-size: 0.6rem;
        color: #666;
        margin-top: 0.4rem;
      }
      > li:nth-of-type(3) {
        margin-top: 0.5rem;
        font-size: 0.55rem;
        color: #999;
      }
    }
  }
}
</style>
