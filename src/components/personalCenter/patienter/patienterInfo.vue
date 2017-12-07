<template>
  <div class="wrap">
      <div class="top">
          <p>真实完善的健康信息，让医生更懂你</p>
      </div>
      <ul class="base_list">
          <li>
              <span>姓名</span>
              <b>{{patientInfo.name == '' ? '未知' : patientInfo.name}}</b>
          </li>
          <li>
              <span>身份证号</span>
              <b>{{patientInfo.cardId == '' ? '未知' : patientInfo.cardId}}</b>
          </li>
          <li>
              <span>性别</span>
              <b v-if="patientInfo.sex==''">未知</b>
              <b v-else>{{patientInfo.sex== '001001' ? '男' : '女'}}</b>
          </li>
          <li>
              <span>出生年月</span>
              <b>{{patientInfo.birthday2 == '' ? '未知' : patientInfo.birthday2}}</b>
          </li>
          <li>
              <span>民族</span>
              <b>{{patientInfo.nation == '' ? '未知' : patientInfo.nation}}</b>
          </li>
          <li>
              <span>婚姻状况</span>
              <b v-if="patientInfo.maritalStatus == ''">未知</b>
              <b v-else>{{patientInfo.maritalStatus == '1' ? '已婚' : '未婚'}}</b>
          </li>
          <li>
              <span>住址</span>
              <b>{{patientInfo.homeAddress == '' ? '未知' : patientInfo.homeAddress}}</b>
          </li>
          <li>
              <span>手机号码</span>
              <b>{{patientInfo.mobilephone == '' ? '未知' : patientInfo.mobilephone}}</b>
          </li>
          <li  @click.stop="showPopChoose">
              <span>设为默认就诊人</span>
              <b class="iconfont" :class="{'icon-roundcheck active':defaultCustomerTrue==1,'icon-round': defaultCustomerTrue==0}"></b>
          </li>
          <li  @click.stop="realName">
              <span>实名认证</span>
              <img v-if="patientInfo.status==101" src="../../../../static/imgs/patienter/tdf_family_wshm.png" alt="">
              <img v-if="patientInfo.status==102" src="../../../../static/imgs/patienter/tdf_family_shhzh.png" alt="">
              <img v-if="patientInfo.status==103" src="../../../../static/imgs/patienter/tdf_family_yshm.png" alt="">
          </li>
      </ul>
     <mt-popup v-model="popupVisible" position="bottom">
        <ul class="choose_win">
            <li v-for="(item,index) in popText" :key="index" @click.stop="getResult(index)">{{item}}</li>
        </ul>
      </mt-popup>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "patienterInfo",
  data() {
    return {
      popupVisible: false, //设为默认就诊人弹框显隐的变量
      defaultCustomerTrue: "0", //是否为默认就诊人
      patienterId: "", //就诊人的id
      patientInfo: {},
      popText: ["设为默认就诊人", "删除", "取消"]
    };
  },
  created() {
    let patienterId = this.$route.params.id;
    let defaultCustomer = this.$route.params.defaultCustomer;
    this.defaultCustomerTrue = defaultCustomer;
    this.patienterId = patienterId;
    this.$http
      .post(this.baseUrl + "allorder/getCustomerDetail", {
        customerId: patienterId
      })
      .then(
        res => {
          this.patientInfo = res.body.obj;
        },
        res => {
          console.log(res);
        }
      );
  },
  methods: {
    getResult(index) {
      if (index === 0) {
        //设为默认就诊人
        this.$http
          .post(this.baseUrl + "allorder/setCustomerStatus", {
            type: "default",
            customerId: this.patienterId
          })
          .then(
            res => {
              Toast("设为默认就诊人成功");
              this.defaultCustomerTrue = "1"; //设为默认就诊人成功
              this.popupVisible = false;
            },
            res => {
              console.log(res);
            }
          );
      } else if (index === 1) {
        //删除就诊人信息
        this.$http
          .post(this.baseUrl + "allorder/setCustomerStatus", {
            type: "del",
            customerId: this.patienterId
          })
          .then(
            res => {
              Toast("删除就诊人成功");
              this.patientInfo = {};
              setTimeout(()=>{
                this.$router.push({name: 'patienterIndex'});
              },1000);
            },
            res => {
              console.log(res);
            }
          );
      } else if (index === 2) {
        //取消
        this.popupVisible = false;
      }
    },
    showPopChoose() {
      this.popupVisible = true;
    },
    //跳转到实名认证页面
    realName() {
      this.$router.push({name: 'fillInfomation',params: {customerId: this.patienterId}})
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
  height: 100%;
}
.top {
  background-color: transparent;
  padding-left: 0.6rem;
  line-height: 1.75rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  p {
    font-size: 0.65rem;
    color: #f38590;
    line-height: 1.75rem;
  }
}
.base_list {
  padding-top: 2rem;
  li {
    height: 2.45rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgb(238, 238, 238);
    span {
      flex: 2;
      padding-left: 0.6rem;
      font-size: 0.75rem;
      color: #393939;
    }
    b {
      flex: 8;
      font-size: 0.75rem;
      color: #393939;
    }
    &:nth-last-of-type(2) {
      margin-top: 0.6rem;
      span {
        flex: 3.5;
      }
      b {
        flex: 6.5;
        font-size: 1.2rem;
        text-align: right;
        padding-right: 0.6rem;
        &.active {
          color: #2a8cff;
        }
      }
    }
    &:last-of-type {
      img {
        height: 1rem;
      }
    }
  }
}
//弹出框样式
.mint-popup {
  width: 100%;
  .choose_win {
    width: 100%;
    li {
      line-height: 2.25rem;
      color: #393939;
      font-size: 0.75rem;
      text-align: center;
    }
  }
}
</style>
