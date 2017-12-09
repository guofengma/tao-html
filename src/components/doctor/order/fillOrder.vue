<template>
  <div>
    <div class="tips">温馨提示：急重病患者不适合在线咨询 / 诊疗，请立即前往当地医院就医。</div>  
    <div class="fill_order">
      <!-- 选择就诊人 -->
      <div class="add_personal">
        <h2>选择就诊人</h2>
        <ul class="patient_list">
          <li v-for="(item,index) in userInfo" :key="index" @click="choiceVisit($event,item,index)" :class="{'active':isVisit == 'visit' + index}">{{item.name}}</li>
          <router-link tag="li" :to="{name:'addPatient',params:{customerId:customerId}}">＋</router-link>
        </ul>
      </div>
      <div class="phone">
        <h2>接听者电话</h2>
        <div class="phone_num"><input type="text" value="18404984908" v-model="phone"></div>
      </div>
      <div class="patient_info">
        <h2>请填写患者性别、年龄及症状等详细信息</h2>
        <div class="patient_print">
          <textarea v-model="description" name="" id="" placeholder="例：我今年40岁了，男。前一段时间出现了眩晕的症状，到医院诊断为高血压，希望进一步咨询专家，后续预防措施。"></textarea>
          <ul class="patient_pic">
            <li v-for="(item,index) in viewImg" :key="index" @click="cancelFile(item,index)">
              <img :src="item | preview" alt="">
            </li>
            <li class="control" v-if="isShowControl">
              <label for="file"><img src="../../../../static/imgs/hospital/order/tdf_order_pic.png" alt=""></label>
              <input name="file" type="file" id="file" accept="image/*" @change="addImgs($event)">
            </li>
          </ul>
          <p>可传患处照片、检查单等相关信息</p>
          <p><span class='help_icon'><img src="../../../../static/imgs/hospital/order/tdf_order_why.png" alt=""></span> 如何拍照X光、CT等影像资料<a href='http://www.tdaifu.cn:8090/taodoctor/statichtml/upImageTip.html' class="link_more">“点击了解”</a></p>
        </div>
      </div>
      <!-- 提交 -->
      <div class="order_btn" @click="confirmSub">确认提交</div>
    </div>
  </div>
</template>

<script>
import { Tool } from '../floatTool.js';
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      isVisit:'visit0',
      isControl:true,
      viewImg:[], // 预览图片
      userInfo: [],
      customerId:'',
      uid:'',
      phone:'18404984908',
      description:'',
      visitData:{},
      visitType:'',
      doctorInfo:{}, // 医生信息
      visitInfo:{}, // 用户信息
      isTel:false,
    };
  },
  created() {
    var item = JSON.parse(localStorage.userInfo); // 从本地中读取用户id
    this.customerId = item.id;
    this.visitInfo = item; // 默认就诊人
    this.phone = item.mobilephone; // 默认就诊人电话
    this.getCustomers(item.id); // 获取就诊人信息
    this.getUuid(); // 获取Uuid
    // 获取到表单填写的必要信息
    this.visitData = JSON.parse(localStorage.getItem('visitTime'));
    this.visitType = localStorage.getItem('visitType'); 
    this.doctorInfo = JSON.parse(localStorage.getItem('doctorInfo'));
  },
  computed:{
    isShowControl(){
      return this.viewImg.length >= 4 ? false : true;
    }
  },
  filters:{
    // 解析预览地址
    preview(src){
      return window.URL.createObjectURL(src);
    }
  },
  methods: {
    // 获取就诊人信息
    getCustomers(customerId) {
      Indicator.open({
        text: "加载中..."
      });
      var url = this.baseUrl + "allorder/getCustomers";
      this.$http.post(url, { customerId: customerId }).then(
        res => {
          // console.log(res.data);
          if (res.data.statusCode == 1) {
            this.userInfo = res.data.obj; // 就诊人信息
            console.log(this.userInfo)
            Indicator.close(); // 关闭loading动画
          }
        },
        res => {
          console.log("error");
        }
      );
    },
    // 获取UID
    getUuid(){
      var url = this.baseUrl + "diseasedescription/getUUID";
      this.$http.post(url).then(res => {
        console.log(res.data)
        if(res.data.statusCode == 1){
          this.uid = res.data.message;
        }
      },res => {
        console.log("error")
      })
    },
    // 选择就诊人
    choiceVisit(e,item,index){
      this.isVisit = 'visit' + index;
      this.phone = item.mobilephone;
      this.visitInfo = item; // 就诊人信息
    },
    // 选择图片
    addImgs(e){
      var type = e.target.files[0].type.split('/')[0];
      if(e.target.files[0]){
        if(type == 'image'){
          this.viewImg.push(e.target.files[0]);
        }else{
          Toast('图片格式有误！');
        }
      }
    },
    // 确认提交 进入购买服务页面
    confirmSub(){
      var regTel = /^1\d{10}$/; // 校验手机号码
      var regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 校验身份证号
      let isTel = regTel.test(this.phone);
      // let isCard = regCard.test(this.)
      let isDes = this.description.length;
      if(isTel && isDes >= 10){
        if(this.visitType == "health"){
          this.addHealth(); // 健康咨询
        }else if(this.visitType == "punctual"){
          this.addPunctual(); // 准时预约
        }
      }else if(!isTel){
        Toast({
          message: '联系人电话格式不正确',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }else if(isDes <= 0){
        Toast({
          message: '请填写病情描述',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }else if(isDes < 10){
         Toast({
          message: '病情描述少于10个字',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
    },
    // 健康咨询病情描述
    addHealth(){
      Indicator.open({
        text: "加载中..."
      });
      var url = this.baseUrl + "allorder/addDescriptionContent";
      var data = {
        id:this.uid,
        customerId:this.customerId,
        phone:this.phone,
        // departmentId:'',
        description:this.description,
        isHaveFile:this.viewImg.length > 0 ? 1 : 0,
        serviceType:'phone'
      };
      // console.log(data)
      this.$http.post(url,data).then(res => {
        console.log(res.data)
        if(res.data.statusCode == 1){
          Indicator.close();
          // 判断是否有附件
          if(data.isHaveFile == 1){
            this.addFile(); // 上传附件
          }else{
            // 没有附件直接跳转
            this.$router.push({name:'buyService',params:{uid:this.uid,description:this.description,visitInfo:this.visitInfo}});
          }
        }
      },res => {
        console.log("error")
      })
    },
    // 准时预约病情描述
    addPunctual(){
      Indicator.open({
        text: "加载中..."
      });
      var _this = this;
      var url = this.baseUrl + 'allorder/addVisitDescriptionContent';
      var data = {
        id:this.uid,
        customerId:this.customerId,
        phone:this.phone,
        description:this.description,
        isHaveFile:this.viewImg.length > 0 ? 1 : 0,
        doctorId:this.visitData.docId,
        visitDay:this.visitData.workday,
        opentimeId:this.visitData.id,
        num:this.visitData.num,
      };
      // console.log(data)
      this.$http.post(url,data).then(res => {
        console.log(res.data)
        if(res.data.statusCode == 1){
          Indicator.close();
          // 判断是否有附件
          if(data.isHaveFile == 1){
            this.addFile(); // 上传附件
          }else{
            // 没有附件直接跳转
            this.$router.push({name:'buyService',params:{uid:this.uid,description:this.description,visitInfo:this.visitInfo}});
          }
        }
      },res => {
        console.log("error")
      })
    },
    // 上传附件
    addFile(){
      var url = this.baseUrl + "allorder/addDescriptionFile";
      var data = {
        diseaseId:this.uid,
        isCancel:0,
        file:'',
        serviceType:'visitTime',
      }
      var formFile = new FormData();
      formFile.append('diseaseId',data.diseaseId);
      formFile.append('isCancel',data.isCancel);
      formFile.append('serviceType',data.serviceType);
      for(var i = 0;i<this.viewImg.length;i++){
        formFile.set('file',this.viewImg[i]);
        this.uploadImg(i,url,formFile); 
      }
    },
    uploadImg(n,url,formFile){
      this.$http.post(url,formFile).then(res => {
        console.log(res.data);
        if(res.data.statusCode == 1){
          if(n == this.viewImg.length - 1){
            this.$router.push({name:'buyService',params:{uid:this.uid,description:this.description,visitInfo:this.visitInfo}});
          }
        }
      },res => {
        console.log("error");
      }); 
    },
    // 删除图片
    cancelFile(item,index){
      MessageBox({
        title: '提示',
        message: '确定删除这张图片',
        showCancelButton: true
      }).then(action => {
        if(action == 'confirm'){
          this.viewImg.splice(index,1);
        }else if(action == "cancel"){
          console.log('cancel',item);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@tipColor: rgb(255, 82, 82);
@fontColor: rgb(57, 57, 57);
@font1Color: rgb(153, 153, 153);
@partbgColor: rgb(239, 244, 250);
.tips {
  padding: 0.35rem 0.6rem;
  font-size: 0.65rem;
  color: @tipColor;
  background: @partbgColor;
}
.fill_order {
  padding: 0.6rem;
  background: #fff;
  // 添加就诊人
  .add_personal {
    padding: 0 0rem 0.8rem;
    background: #ffffff;
    h2 {
      color: @fontColor;
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .patient_list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      li {
        padding: 0.3rem 0.6rem;
        font-size: 0.7rem;
        color: @font1Color;
        text-align: center;
        margin-bottom:0.6rem;
        border: 1px solid rgb(204, 204, 204);
        border-radius: 0.3rem;
        margin-right: 0.6rem;
        &.active{
          background:#3794fe;
          color:#fff;
          border: 1px solid #3794fe;
        }
      }
    }
  }
  //   接听者电话
  .phone {
    margin-bottom: 0.4rem;
    h2 {
      color: @fontColor;
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .phone_num {
      padding: 0.6rem;
      background: @partbgColor;
      border-radius: 0.3rem;
      input{
        width:90%;
        font-size: 0.75rem;
        color: @fontColor;
        background:transparent;
      }
    }
  }
  // 填写症状等信息
  .patient_info {
    width: 100%;
    padding: 0.6rem 0;
    h2 {
      color: @fontColor;
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .patient_print {
      border-radius: 0.3rem;
      background: @partbgColor;
      padding: 0.6rem;
      margin-bottom: 2rem;
      textarea {
        width: 100%;
        height: 5rem;
        background: transparent;
        border-bottom: 1px solid rgb(216, 224, 234);
        font-size: 0.75rem;
        font-family: "Micorsoft YaHei";
        margin-bottom: 0.6rem;
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
      // 患者照片
      .patient_pic {
        display: flex;
        flex-wrap:wrap;
        margin-bottom: 0.6rem;
        li {
          width: 22%;
          height: 3.5rem;
          border-radius: 0.3rem;
          margin-right: 0.4rem;
          margin-bottom: 0.4rem;
          background: #ccc;
          overflow:hidden;
          img{
            width:100%;
            height: 100%;
          }
        }
        .control{
          label{
            display: block;
            width:100%;
            height:100%;
            img{
              width:100%;
              height:100%;
            }
          }
          input{
            display:none;
          }
        }
      }
      p {
        font-size: 0.65rem;
        color: rgb(102, 102, 102);
        margin-bottom: 0.5rem;
        .help_icon {
          display: inline-block;
          width: 0.6rem;
          height: 0.6rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .link_more {
          color: #3794fe;
        }
      }
    }
  }
  // 提交
  .order_btn {
    width: 16.3rem;
    line-height: 2rem;
    color: #fff;
    border-radius: 1rem;
    background: #3794fe;
    font-size: 0.75rem;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1.25rem;
  }
}
</style>
