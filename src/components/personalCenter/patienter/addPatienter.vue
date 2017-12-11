<template>
  <div class="wrap">
      <div class="top">
          <p>真实完善的健康信息，让医生更懂你</p>
      </div>
      <ul class="base_list">
          <li>
              <span>姓名</span>
              <input type="text" v-model.trim="userName" placeholder="请输入真实姓名">
          </li>
          <li>
              <span>身份证号</span>
              <input type="text" v-model.trim="userSNum" placeholder="请输入真实的身份证号">
          </li>
          <li class="no_open">
              <span>性别</span>
              <b>{{sex}}</b>
          </li>
          <li class="no_open">
              <span>出生年月</span>
              <b>{{birthDay}}</b>
          </li>
          <li class="choose_sort" @click.stop="popWin('zu')">
              <span>民族</span>
              <b>{{popChooseTextZu}}</b>
              <i class="iconfont icon-right"></i>
          </li>
          <li class="choose_sort" @click.stop="popWin('hun')">
              <span>婚姻状况</span>
              <b>{{popChooseTextHun}}</b>
              <i class="iconfont icon-right"></i>
          </li>
          <li>
              <span>住址</span>
              <input type="text" v-model.trim="userAdress" placeholder="请输入详细的家庭住址">
          </li>
          <li>
              <span>手机号码</span>
              <input type="text" v-model.trim="userTel" placeholder="请输入真实的手机号码">
          </li>
          <li @click.stop="popDefalut">
              <span>设为默认就诊人</span>
              <b class="iconfont" :class="{'icon-roundcheck active':defaultCustomerTrue==1,'icon-round': defaultCustomerTrue==0}"></b>
          </li>
      </ul>
      <a href="javascript:;" class="save_patienter" @click="saveInfo">保存</a>
      <mt-popup v-model="popupVisibleZu" position="bottom">
        <ul class="choose_win">
            <li v-for="(item,index) in popText" :key="index" @click.stop="getResult(item)">{{item}}</li>
        </ul>
      </mt-popup>
      <!-- 设为默认就诊人和保存弹出框 -->
      <mt-popup v-model="popupVisible" position="bottom">
        <ul class="choose_win">
            <li v-for="(item,index) in popTextDefault" :key="index" @click.stop="getResultDefalt(index)">{{item}}</li>
        </ul>
      </mt-popup>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "addPatienter",
  data() {
    return {
      sex: "",
      birthDay: "",
      userName: "",
      userSNum: "",
      userAdress: "",
      userTel: "",
      popText: [],
      popChooseTextZu: "",
      popChooseTextHun: "",
      chooseDiff: false,
      popupVisibleZu: false, //弹出民族选择
      popupVisibleZuText: ["汉族", "少数民族"],
      popupVisibleHunText: ["未婚", "已婚"],
      //默认就诊人选择按钮
      defaultCustomerTrue: 0,
      popupVisible: false,
      popTextDefault: ["设为默认就诊人", "取消"]
    };
  },
  watch: {
    userSNum(newV, old) {
      if (newV.length == 15) {
        this.birthDay =
          newV.substring(6, 10) +
          "年" +
          newV.substring(10, 12) +
          "月" +
          newV.substring(12, 14) +
          "日";
        this.sex = parseInt(newV.substr(16, 1)) % 2 == 1 ? "男" : "女";
      } else if (newV.length == 18) {
        this.birthDay =
          newV.substring(6, 10) +
          "年" +
          newV.substring(10, 12) +
          "月" +
          newV.substring(12, 14) +
          "日";
        this.sex = parseInt(newV.substr(16, 1)) % 2 == 1 ? "男" : "女";
      }
    }
  },
  methods: {
    popWin(tepm) {
      //弹出选择框
      if (tepm == "zu") {
        //弹出民族选择
        this.popupVisibleZu = true;
        this.chooseDiff = false;
        this.popText = this.popupVisibleZuText;
      } else if (tepm == "hun") {
        this.popupVisibleZu = true;
        this.chooseDiff = true;
        this.popText = this.popupVisibleHunText;
      }
    },
    getResult(item) {
      if (this.chooseDiff) {
        this.popChooseTextHun = item;
      } else {
        this.popChooseTextZu = item;
      }
      this.popupVisibleZu = false;
    },

    //默认就诊人
    popDefalut() {
      this.popupVisible = true;
    },
    getResultDefalt(index) {
      if (index === 0) {
        //设为默认就诊人
        this.popupVisible = false;
        this.defaultCustomerTrue = 1;
      } else {
        this.popupVisible = false;
      }
    },
    //保存就诊人信息
    saveInfo() {
      let userName = this.userName;
      let userSNum = this.userSNum;
      let userAdress = this.userAdress;
      let userTel = this.userTel;
      let popChooseTextZu = this.popChooseTextZu;
      let popChooseTextHun = this.popChooseTextHun;
      let sex = this.sex;
      let birthDay = this.birthDay;
      if (!userName) {
        Toast("请填写您的真实姓名");
      } else if (!this.regSCode.test(userSNum)) {
        Toast("请填写您的真实身份证号");
      } else if (!userAdress) {
        Toast("请输入您的详细地址");
      } else if (!this.regTel.test(userTel)) {
        Toast("请输入您的正确手机号");
      } else if (!popChooseTextZu) {
        Toast("请选择您的民族");
      } else if (!popChooseTextHun) {
        Toast("请选择您的婚姻情况");
      } else {
        this.$http
          .post(this.baseUrl + "allorder/addCustomer", {
            telephone: userTel,
            customerId: JSON.parse(localStorage.getItem("userInfo")).id,
            name: userName,
            defaultCustomer: this.defaultCustomerTrue,
            idCard: userSNum,
            nation: popChooseTextZu,
            isMarried: popChooseTextHun == "已婚" ? "1" : "0",
            homeAddress: userAdress,
            sex: sex == "男" ? "1" : "0",
            birthday: birthDay
          })
          .then(
            res => {
              Toast("新增就诊人信息成功");
              this.$router.push({ name: "patienterIndex" });
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
::-webkit-input-placeholder {
  font-size: 0.75rem;
  color: rgb(153, 153, 153);
}
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
  .no_open {
    span {
      color: rgb(153, 153, 153);
    }
  }
  .choose_sort {
    b {
      flex: 7;
    }
    i {
      flex: 1;
      color: rgb(153, 153, 153);
      font-size: 1rem;
    }
  }
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
    input {
      flex: 8;
      font-size: 0.75rem;
      color: #393939;
      line-height: 2.25rem;
    }
    &:last-of-type {
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
  }
}
.save_patienter {
  display: block;
  width: 80%;
  margin: 0 auto;
  line-height: 2rem;
  color: #fff;
  background-color: #2a8cff;
  text-align: center;
  border-radius: 0.4rem;
  margin-top: 0.8rem;
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
