<template>
  <div>
    <div class="topbar">
      添加就诊人
      <span @click="addCustomer">保存</span>
    </div>
    <div class="tips">真实完善的健康信息，让医生更懂你</div>  
    <ul class="user_info">
      <li>
        <label for="">姓名</label>
        <input type="text" name="name" placeholder="请输入真实姓名" @change="saveInfo($event)">
      </li>
      <li>
        <label for="">身份证号</label>
        <input type="text" name="idCard" placeholder="请输入真实的身份证号" @change="saveInfo($event)">
      </li>
      <li>
        <label for="">手机号码</label>
        <input type="text" name="telephone" placeholder="请输入真实的手机号码" @change="saveInfo($event)">
      </li>
    </ul>
    <!-- 设为默认就诊人 -->
    <div class="set_default">
      <label for="">设为默认就诊人</label>
      <span @click="defaultCustomer = defaultCustomer == 1 ? 0 : 1"><img :src="defaultCustomer ? default_img2 : default_img1" alt=""></span>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      defaultCustomer:0, // 是否设为默认就诊人 0不默认 1默认
      default_img1:"../../../../static/imgs/hospital/order/tdf_share_weixuanze.png", //未选中的状态
      default_img2:"../../../../static/imgs/hospital/order/tdf_share_xuanze.png", // 选中的状态
      telephone:'', // 电话
      customerId:this.$route.params.customerId, // 主账号id
      name:'', // 姓名
      idCard:'', // 身份证号
    };
  },
  created(){
    console.log(this.$route.params.customerId)
  },
  methods:{
    // 
    saveInfo(e){
      var attr = e.target.name;
      var val = e.target.value;
      if(attr == 'name'){
        this.name = val;
      }else if(attr == 'telephone'){
        this.telephone = val;
      }else if(attr == 'idCard'){
        this.idCard = val;
      }
    },
    // 添加就诊人
    addCustomer(){
      var data = {
        name:this.name,
        telephone:this.telephone,
        idCard:this.idCard,
        defaultCustomer:this.defaultCustomer,
        customerId:this.customerId
      }
      // console.log(data)
      var url = this.baseUrl + 'allorder/addCustomer';
      if(data.name == ''){
        Toast({
          message: '就诊人姓名不能为空',
          // position: 'bottom',
          duration: 3000
        });
        return false;
      }else if(data.idCard == ''){
        Toast({
          message: '身份证号不能为空',
          duration: 3000
        });
        return false;
      }else if(data.telephone == ''){
        Toast({
          message: '手机号码不能为空',
          duration: 3000
        });
        return false;
      }
      this.$http.post(url,data).then(res => {
        console.log(res.data)
      },res => {
        console.log("error")
      })
    }
  }
};
</script>

<style lang="less" scoped>
@tipColor: rgb(255, 82, 82);
@fontColor: rgb(57, 57, 57);
@font1Color: rgb(153, 153, 153);
@partbgColor: rgb(239, 244, 250);
.topbar{
  height: 2rem;
  padding:0 0.6rem;
  line-height:2rem;
  background:#3794fe;
  color:#fff;
  font-size:0.75rem;
  text-align:center;
  span{
    font-size:0.6rem;
    float: right;
  }
}
.tips {
  padding: 0.3rem 0.6rem;
  background: @partbgColor;
  color: @tipColor;
}
// 填写信息
.user_info {
  background: #fff;
  margin-bottom: 0.5rem;
  li {
    height: 2rem;
    padding: 0 0.6rem;
    color: @fontColor;
    display: flex;
    align-items: center;
    label {
      width: 4.5rem;
    }
    input {
      flex-grow: 1;
      &::-webkit-input-placeholder {
        color: rgb(176, 176, 176);
      } /* 使用webkit内核的浏览器 */
      &:-moz-placeholder {
        color: rgb(176, 176, 176);
      } /* Firefox版本4-18 */
      &::-moz-placeholder {
        color: rgb(176, 176, 176);
      } /* Firefox版本19+ */
      &:-ms-input-placeholder {
        color: rgb(176, 176, 176);
      }
    }
  }
}
// 设为默认就诊人
.set_default {
  display: flex;
  height: 2rem;
  padding: 0 0.6rem;
  background: #fff;
  color: @fontColor;
  align-items: center;
  justify-content: space-between;
  span {
    display: block;
    width:1rem;
    height: 1rem;
    img{
      width:100%;
      height:100%;
    }
  }
}
</style>