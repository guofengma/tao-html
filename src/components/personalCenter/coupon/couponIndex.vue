<template>
 <div class="wrap">
    <div class="fill_box">
      <input type="text" v-model.trim="couponNum" placeholder="请输入兑换码">
      <a href="javascript:;" :class="{'had_input':couponNumTrue}" @click="exChangeCoupon">兑换</a>
    </div>
    <ul class="coupon_list">
      <li v-if="item.dicValue == '004002'" @click="useDiscount(item)" v-for="(item,index) in couponList" :key="index" :data-coupon-id="item.couponEntityId" :data-id="item.id">
        <div class="cou_left">
          <span>{{item.couponMoney}}</span>
          <b>元</b>
        </div>
        <ul class="cou_right">
          <li>
            <p>电话问答/精准预约</p>
          </li>
          <li>
            <p>满{{item.maxMoney}}元可以使用</p>
          </li>
          <li>
            <p>有效期：{{item.startTime | formatTime}}-{{item.endTime | formatTime}}</p>
          </li>
        </ul>
      </li>
      <li v-if="item.dicValue == '004001'" @click="useDiscount(item)" class="discount" v-for="(item,index) in couponList" :key="index" :data-coupon-id="item.couponEntityId" :data-id="item.id">
        <div class="cou_left">
          <span>{{item.couponMoney | discount}}</span>
          <b>折</b>
        </div>
        <ul class="cou_right">
          <li>
            <p>电话问答/精准预约</p>
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
import { Tool } from '../../doctor/floatTool';
import { Indicator } from "mint-ui";
import { Toast } from 'mint-ui';
export default {
  name: "couponIndex",
  data() {
    return {
      couponNum: "",
      couponNumTrue: false,
      couponList: [],
      cost:0, // 需要支付金额
      customerId:'', // 用户id
      isClick:false, // 是否可以点击
    };
  },
  created() {
    var cost = this.$route.query.cost;
    var type = this.$route.query.type;

    if(cost != undefined){
      this.cost = cost;
      this.isClick = true;
    }else{
      this.isClick = false;
      this.cost = this.cost;
    }
    // 获取优惠券
    var customerId = JSON.parse(localStorage.getItem("userInfo")).id;
    this.customerId = customerId;
    console.log(type)
    if(type == "health"){
      console.log("直呼")
      this.getCoupon(customerId,"008001");
    }else if(type == "punctual"){
      console.log("准时预约")
      this.getCoupon(customerId,"008002");
    }else{
      console.log("other")
      this.getCoupon(customerId);
    }
  },
  filters: {
    discount(num){
      var n = num * 10;
      return parseFloat(n).toFixed(1);
    },
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
    // 点击优惠券
    useDiscount(item){
      // console.log(item)
      var isClick = this.isClick; // 是否可以点击
      console.log(isClick)
      if(isClick){
        var endTime = +new Date();
        var expired = endTime < item.endTime; // 是否过期
        var isEnable = item.enable == 1 ? true : false; // 是否已使用 enable->1 (未使用) 0->已使用
        var couponId = item.couponEntityId; // 优惠券id
        if(expired && isEnable){
          if(item.dicValue == '004001'){
            // 折扣券
            // 折扣券需要判断最高折扣
            var dis3 = Tool('multiply',this.cost,item.couponMoney).toFixed(3); // 保留三位
            var dis = dis3.toString().substring(0,dis3.toString().length - 1);                     
            var isMax = Tool('subtract',dis,item.maxMoney);
            console.log(dis3,dis) // 这里硬性截取小数点后两位，不进行四舍五入
            if(dis <= item.maxMoney){
              Toast("可以使用");
              this.$router.replace({name:'buyService',params:{couponId:couponId,discount:dis,couponMoney:item.couponMoney,dicValue:item.dicValue}});
            }else{
              this.$router.replace({name:'buyService',params:{couponId:couponId,discount:item.maxMoney,couponMoney:item.couponMoney,dicValue:item.dicValue}});
              Toast("可以使用");
            }
          }else if(item.dicValue == "004002"){
            // 代金券
            // 代金券需要判断满多少可以使用
            var isMax = Tool('subtract',this.cost,item.maxMoney);
            // console.log(isMax)
            if(isMax >= 0){
              this.$router.replace({name:'buyService',params:{couponId:couponId,discount:item.couponMoney,couponMoney:item.couponMoney,dicValue:item.dicValue}});
              Toast("可以使用")
            }else {
              Toast("该优惠券不能正常使用");
            }
          }
        }else{
          Toast("该优惠券不能正常使用");
          return false;
        }
      }else{
        return false;
      }
    },
    // 兑换优惠券
    exChangeCoupon() {
      if (this.couponNum) {
        this.$http.post(this.baseUrl + "coupon/getCouponByCode", {
          customerId: this.customerId,
          chargeCode: this.couponNum
        }).then(
          res => {
            let data = res.body;
            if(data.statusCode==0) {
              Toast(data.message);
            }else if(data.statusCode==1) {
              Toast(data.message);
              this.getCoupon(this.customerId)
              setTimeout(function(){
                // window.history.go(0);
              },1000);
            }
            console.log(res);
          },
          res => {
            console.loh(res);
          }
        );
      }
    },
    // 获取优惠券
    getCoupon(customerId,useType){
      useType = useType || "";
      this.$http.post(this.baseUrl + "diseasedescription/getCustomerCoupons", {
        customerId: customerId,
        useType:useType
      }).then(
        res => {
          this.couponList = res.body.data;
          console.log(JSON.stringify(res));
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
    background: url("../../../../static/imgs/coupon/couponbg1.png") no-repeat
      center / 100% 100%;
    &.discount {
      background: url("../../../../static/imgs/coupon/couponbg.png") no-repeat
        center / 100% 100%;
    }
    .cou_left {
      position: relative;
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: center;
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
        padding-right: 1.3rem;
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
