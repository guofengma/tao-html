<template>
  <div class="wrap">
      <div class="top">
          <p>真实完善的健康信息，让医生更懂你</p>
      </div>
      <ul class="base_list">
          <li>
              <span>姓名</span>
              <input v-if="patientInfo.name == ''" v-model.trim="userName" placeholder="请输入真实姓名">
              <b v-else>{{patientInfo.name}}</b>
          </li>
          <li>
              <span>身份证号</span>
              <input v-if="patientInfo.cardId == ''" v-model.trim="userSCode" placeholder="请输入真实的身份证号">
              <b v-else>{{patientInfo.cardId}}</b>
          </li>
          <li>
              <span>性别</span>
              <b v-if="patientInfo.sex==''">{{patientInfo.sex}}</b>
              <b v-else>{{patientInfo.sex== '001001' ? '男' : '女'}}</b>
          </li>
          <li>
              <span>出生年月</span>
              <b v-if="patientInfo.birthday2 == ''">{{patientInfo.birthday2}}</b>
              <b v-else>{{patientInfo.birthday2}}</b>
          </li>
          <li class="choose_sort" @click.stop="chooseZu">
              <span>民族</span>
              <b v-if="patientInfo.nation==''">{{popSelectedZu}}</b>
              <b v-else>{{patientInfo.nation}}</b>
              <i class="iconfont icon-right"></i>
          </li>
          <li class="choose_sort" @click.stop="chooseHun">
              <span>婚姻状况</span>
              <b v-if="patientInfo.maritalStatus==''">{{popSelectedHun}}</b>
              <b v-else>{{patientInfo.maritalStatus=='0'?'未婚':'已婚'}}</b>
              <i class="iconfont icon-right"></i>
          </li>
          <li>
              <span>住址</span>
              <input v-if="patientInfo.homeAddress == ''" v-model.trim="userAdress" placeholder="请输入详细的家庭住址">
              <b v-else>{{patientInfo.homeAddress}}</b>
          </li>
          <li>
              <span>手机号码</span>
              <input v-if="patientInfo.mobilephone == ''" v-model.trim="userTel" placeholder="请输入真实的手机号码">
              <b v-else>{{patientInfo.mobilephone}}</b>
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
      <a href="javascript:;" class="new_patient" v-if="onlyYou&&hadNoData" @click="uploadPatient">更新就诊人信息</a>
     <mt-popup v-model="popupVisible" position="bottom">
        <ul class="choose_win">
            <li v-for="(item,index) in popText" :key="index" @click.stop="getResult(index)">{{item}}</li>
        </ul>
      </mt-popup>
     <mt-popup v-model="popupVisibleZu" position="bottom">
        <ul class="choose_win">
            <li v-for="(item,index) in popTextZu" :key="index" @click.stop="getResultZu(index)">{{item}}</li>
        </ul>
      </mt-popup>
     <mt-popup v-model="popupVisibleHun" position="bottom">
        <ul class="choose_win">
            <li v-for="(item,index) in popTextHun" :key="index" @click.stop="getResultHun(index)">{{item}}</li>
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
      //本人的信息完善
      userName: "",
      userSCode: "",
      userAdress: "",
      userTel: "",
      //就诊人的id，用于更新用户的基本信息
      patientId: '',

      popupVisible: false, //设为默认就诊人弹框显隐的变量
      popText: ["设为默认就诊人", "删除", "取消"],
      popupVisibleZu: false,
      popTextZu: ["汉族", "少数民族"],
      popSelectedZu: "",
      popupVisibleHun: false,
      popTextHun: ["未婚", "已婚"],
      popSelectedHun: "",

      defaultCustomerTrue: "0", //是否为默认就诊人
      patienterId: "", //就诊人的id
      patientInfo: {},

      onlyYou: false, //判断是否为本人
      hadNoData: false //判断用户还缺少基本信息
    };
  },
  created() {
    let userInfoId = JSON.parse(localStorage.getItem("userInfo")).id;
    let patienterId = this.$route.params.id;
    userInfoId == patienterId ? (this.onlyYou = true) : (this.onlyYou = false);
    let defaultCustomer = this.$route.params.defaultCustomer;
    this.defaultCustomerTrue = defaultCustomer;
    this.patienterId = patienterId;
    this.$http
      .post(this.baseUrl + "allorder/getCustomerDetail", {
        customerId: patienterId
      })
      .then(
        res => {
          this.patientId = res.body.obj.id;
          this.patientInfo = res.body.obj;
          let peoData = res.body.obj;
          if (
            !peoData.name ||
            !peoData.sex ||
            !peoData.birthday2 ||
            !peoData.mobilephone ||
            !peoData.cardId ||
            !peoData.nation ||
            !peoData.maritalStatus ||
            !peoData.homeAddress
          ) {
            this.hadNoData = true;
          }
        },
        res => {
          console.log(res);
        }
      );
  },
  watch: {
    userSCode(newV, old) {
      if (newV.length == 15) {
        this.patientInfo.birthday2 =
          newV.substring(6, 10) +
          "年" +
          newV.substring(10, 12) +
          "月" +
          newV.substring(12, 14) +
          "日";
        this.patientInfo.sex =
          parseInt(newV.substr(16, 1)) % 2 == 1 ? "001001" : "001002";
      } else if (newV.length == 18) {
        this.patientInfo.birthday2 =
          newV.substring(6, 10) +
          "年" +
          newV.substring(10, 12) +
          "月" +
          newV.substring(12, 14) +
          "日";
        this.patientInfo.sex =
          parseInt(newV.substr(16, 1)) % 2 == 1 ? "001001" : "001002";
      }
    }
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
              setTimeout(() => {
                this.$router.push({ name: "patienterIndex" });
              }, 1000);
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
    chooseZu() {
      this.popupVisibleZu = true;
    },
    getResultZu(index) {
      this.popSelectedZu = this.popTextZu[index];
      this.popupVisibleZu = false;
    },
    chooseHun() {
      this.popupVisibleHun = true;
    },
    getResultHun(index) {
      this.popSelectedHun = this.popTextHun[index];
      this.popupVisibleHun = false;
    },
    //跳转到实名认证页面
    realName() {
      this.$router.push({
        name: "fillInfomation",
        params: { customerId: this.patienterId }
      });
    },
    /**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    //更新本人的基本信息
    uploadPatient() {
      let patientInfo = this.patientInfo;
      let userName = !patientInfo.name ? this.userName : patientInfo.name;
      let userSCode = !patientInfo.cardId ? this.userSCode : patientInfo.cardId;
      let sex = patientInfo.sex;
      let birthday2 = patientInfo.birthday2;
      let nation = !patientInfo.nation
        ? this.popSelectedZu
        : patientInfo.nation;
      let maritalStatus = !patientInfo.maritalStatus
        ? this.popSelectedHun
        : patientInfo.maritalStatus;
      let homeAddress = !patientInfo.homeAddress
        ? this.userAdress
        : patientInfo.homeAddress;
      let mobilephone = !patientInfo.mobilephone
        ? this.userTel
        : patientInfo.mobilephone;
      if (!userName) {
        Toast("请输入就诊人的真实姓名");
      } else if (!this.regSCode.test(userSCode)) {
        Toast("请输入就诊人的真实身份证号");
      } else if (!nation) {
        Toast("请选择就诊人的民族");
      } else if (!maritalStatus) {
        Toast("请选择就诊人的婚姻状态");
      } else if (!homeAddress) {
        Toast("请输入就诊人的详细地址");
      } else if (!mobilephone) {
        Toast("请输入就诊人的真实手机号");
      } else {
        //更新本人（就诊人）的基本信息
        this.$http
          .post(this.baseUrl + "customer/updatePatienInfo", {
            mobilephone: mobilephone,
            patientId: this.patientId,
            name: userName,
            cardId: userSCode,
            sex: sex == "001001" ? "1" : "2",
            birthday: birthday2,
            nation: nation,
            maritalStatus: maritalStatus,
            homeAddress: homeAddress
          })
          .then(
            res => {
              console.log(res);
              Toast(res.body.message);
            },
            res => {
              console.log(res);
            }
          );
      }
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
    &.choose_sort {
      b {
        flex: 7;
      }
      i {
        flex: 1;
        color: rgb(153, 153, 153);
        font-size: 1rem;
      }
    }
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
    input {
      flex: 8;
      font-size: 0.75rem;
      color: #393939;
      line-height: 2.25rem;
    }
    &:nth-of-type(3) {
      span,
      b {
        color: rgb(153, 153, 153);
      }
    }
    &:nth-of-type(4) {
      span,
      b {
        color: rgb(153, 153, 153);
      }
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
.new_patient {
  display: block;
  width: 80%;
  margin: 0 auto;
  line-height: 2rem;
  color: #fff;
  background-color: #459bff;
  text-align: center;
  margin-top: 1rem;
  border-radius: 0.4rem;
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
