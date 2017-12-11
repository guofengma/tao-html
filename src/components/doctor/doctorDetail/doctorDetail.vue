<template>
  <div class="home">
    <div class="doctor_top">
      <div class="doctor_avatar"><img :src="imgUrl" alt=""></div>
    </div>
    <div class="doctor_info">
      <div class="doctor_main">
        <h2>{{doctorInfo.name}} <div class="order">接诊{{doctorInfo.orderCount}}例</div></h2>
        <p>{{doctorInfo.hospitalName}}</p>
      </div>
      <ul class="doctor_minor">
        <li>
          <h2>{{doctorInfo.department}}</h2>
          <p>所属科室</p>
        </li>
        <li>
          <h2>{{doctorInfo.JobTitle}}</h2>
          <p>医生职称</p>
        </li>
        <li>
          <h2>{{doctorInfo.workTime}}</h2>
          <p>临床经验</p>
        </li>
      </ul>
    </div>
    <div class="patient">
      <h2>患者印象</h2>
      <ul>
        <li v-for="(item,index) in customerImpression" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="tab">
      <mt-button @click.native.prevent="showid = 'tab1'"><span :class="{'activeTab':showid == 'tab1'}">医生介绍</span></mt-button>
      <mt-button @click.native.prevent="getCustomerImpression"><span :class="{'activeTab':showid == 'tab2'}">用户评价</span></mt-button>
      <mt-button @click.native.prevent="getExpertArticle"><span :class="{'activeTab':showid == 'tab3'}">专家文章</span></mt-button>
    </div>

    <div class="tab_container">
      <mt-tab-container v-model="showid">
        <mt-tab-container-item id="tab1">
          <ul class="doctor_introduce">
            <li>
              <h2>职业点</h2>
              <p>{{doctorInfo.hospitalName}}&nbsp;&nbsp;{{doctorInfo.department}}</p>
            </li>
            <li>
              <h2>简介</h2>
              <p>{{doctorInfo.aboutDoctor}}</p>
            </li>
            <li>
              <h2>擅长</h2>
              <p>{{doctorInfo.beGoodAtAsDoctor}}</p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <div class="user_rating" v-for="(item,index) in customerAppraisal" :key="index">
            <div class="user_left">
              <div class="user_avatar">
                <img src="../../../../static/imgs/hospital/index/tdf_hospital_head.png" alt="">
              </div>
            </div>
            <div class="user_right">
              <ul class="user_info">
                <li><h2>{{item.customName}}</h2></li>
                <li><span>{{item.createTime}}</span></li>
                <li><p>{{item.content}}</p></li>
              </ul>
              <ul class="user_img">
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
              </ul>
              <ul class="user_sign">
                <li v-for="(item,index) in simpleContent" :key="index">{{item}}</li>
              </ul>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab3">
          <div class="expert_article" v-for="(item,index) in expertArticle" :key="index">
            <div class="expert_left">
              <div class="expert_img">
                <img :src="item.newsCoverimage" alt="">
              </div>
            </div>
            <div class="expert_right">
              <ul class="expert_info">
                <li><h2>{{item.newsTitle}}</h2></li>
                <li><p>{{item.description}}</p></li>
                <li class="expert_sign">
                  <div><img src="../../../../static/imgs/hospital/index/tdf_doctor_tab.png" alt="">{{item.newsTage}}</div>
                  <p>{{item.createTime | formatDate}}</p>
                </li>
              </ul>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <ul class="service">
      <li v-for="(item,index) in service" :key="index" @click="choiceService(index)">
        <div class="service_icon"><img :src="item.img" alt=""></div>
        <p>{{item.text}}</p>
      </li>
    </ul>
    <div class="service_page" v-if="isService" @click.stop="closeService('close')">
      <div class="service_inner" @click.stop="closeService('open')">
        <!-- 服务tab切换栏 -->
        <ul class="service_tab">
          <li v-for="(item,index) in service" :key="index" @click="switchService(item,index)" :class="{'active':serviceid == 'service' + index}">
            <div class="service_icon"><img :src="item.img" alt=""></div>
            <p>{{item.text}}</p>
          </li>
        </ul>
        <!-- 服务类型 -->
        <ul class="server_container">
          <li v-if="serviceid == 'service0'">
            <h2 class="service_top">选择咨询方式</h2>
            <ol class="service_item">
              <li @click="choiceConsultation(item,index)" :class="{'active':isConsultation == 'consultation' + index && item.enable != 0}" v-for="(item,index) in consultation" :key="index">
                <p>{{item.title}}</p>
                <p>{{item.enable == 0 ? '暂无服务' : item.servicePrice}}</p>
              </li>
            </ol>
          </li>
          <li v-if="serviceid == 'service1'">
            <ol class="service_sort service_week">
              <li v-for="(item,index) in punctualBespeak" :key="index">{{item.subName | formatWeek}}</li>
            </ol>
            <ol class="service_sort service_date">
              <li v-for="(item,index) in punctualBespeak" :key="index"><span @click="choiceServiceDate($event,item,index)" :class="[{'active':today == 'today' + index},{'open':item.item.length != 0}]" >{{item.subName | formatDay}}</span></li>
            </ol>
            <ol class="service_time">
              <li v-for="(item,index) in serviceTime" :key="index" @click="choiceVisitTime($event,item,index)" :class="{'active':visit == 'visit' + index}">{{item.num | takeOver}}</li>
              <div class='service_no' v-if='serviceTime.length == 0'>暂未开放时间</div>
            </ol>
            <div class="address" v-if="isAddress">
              <h2><span></span>详细地址</h2>
              <p>{{address}}</p>
            </div>
          </li>
          <li v-if="serviceid == 'service'">
            功能开发中...
          </li>
        </ul>
        <!-- 立即就诊 -->
        <div class="go_visit" @click="goVisit(visitType)">立即就诊</div>
      </div>
    </div>  
  </div>
</template>

<script>
import pubOrderList from "../../personalCenter/pubComponents/pubOrderList";
import { formatDate } from "../formdate";
import { Indicator } from "mint-ui";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      active: "activeTab",
      showid: "tab1",
      doctorInfo: {}, // 医生详情
      customerAppraisal: [], // 用户评价
      expertArticle: [], // 专家文章
      imgUrl: "", // 图片路径
      doctorId: "", // 医生ID
      customerImpression: [], // 患者印象
      simpleContent: [], // 用户评价中患者印象
      service:[
        {img:require('../../../../static/imgs/hospital/index/tdf_hospital_jkzx.png'),text:'健康咨询'},
        {img:require('../../../../static/imgs/hospital/index/tdf_hospital_jzhyy.png'),text:'准时预约'},
        {img:require('../../../../static/imgs/hospital/index/tdf_hospital_jtysh.png'),text:'家庭医生'},
      ], // 服务类型
      visitType:'forbid', // 就诊类型
      serviceid:"", // 切换服务类型id
      isService:false, // 是否显示服务详情页面
      consultation:[], // 咨询方式数据
      isConsultation:'consultation0', // 默认选择第一种咨询方式
      today:'today0', // 是否是今天
      visit:'', // 选择就诊时间
      address:'', // 就诊地址
      isAddress:false, // 默认不显示地址
      punctualBespeak:[], // 准时预约数据信息
      punctualBackstage:{}, // 准时预约后台字段信息
      serviceDate:['29','30','1','2','3','4','5'], 
      serviceTime:[], // 开放时间
      visitTime:{},
    };
  },
  components: {
    pubOrderList
  },
  created() {
    var item = this.$route.query;
    this.doctorId = item.dotorId;
    console.log(this.doctorId);
    this.getDoctorDetail(this.doctorId); //获取用户详细信息
  },
  activated(){
    // var item = this.$route.params;
    // this.doctorInfo = item;
    // this.doctorId = item.doctorId;
    // if(item.doctorId){
    //   this.doctorId = item.doctorId;
    //   this.getDoctorDetail(item.doctorId); //获取用户详细信息
      
    //   this.getHealthPrice(this.doctorId);
    //   this.getpunctualBespeak(this.doctorId);
    // }
  },
  deactivated(){
    this.isService = false; // 离开页面关闭服务选择弹窗
  },
  filters: {
    // 格式化时间戳
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    // 格式化星期
    formatWeek(str){
      let d = new Date(str);
      let week = ['日','一','二','三','四','五','六'];
      return week[d.getDay()];
    },
    // 格式化日期
    formatDay(str){
      let d = new Date(str);
      return d.getDate();
    },
    // 格式化时间间隔
    takeOver(obj) {
      var a = "";
      var optime = parseInt(obj);
      var i = optime % 4;
      var j = parseInt(optime / 4);
      if (i == 0) {
        a = j + ":00-" + j + ":15";
      } else if (i == 1) {
        a = j + ":15-" + j + ":30";
      } else if (i == 2) {
        a = j + ":30-" + j + ":45";
      } else if (i == 3) {
        a = j + ":45-" + (j + 1) + ":00";
      }
      return a;
    }
  },
  methods: {
    // 获取医生详细信息
    getDoctorDetail(doctorId) {
      var url = this.baseUrl + "newDoctorBaseInfo/getDoctorDetail";
      var data = {
        doctorId:doctorId
      };
      Indicator.open({
        text:"加载中..."
      });
      this.$http.post(url, data).then(
        response => {
          // console.log(response.data); 
          if (response.data.statusCode == 1) {
            this.doctorInfo = response.data.obj; // 医生详情
            var customerImpression = response.data.obj.customerImpression; // 患者印象
            var imgUrl = response.data.obj.photo; // 医生头像
            if (customerImpression) {
              this.customerImpression = customerImpression.split(",");
            }
            this.imgUrl = imgUrl ? this.baseImgUrl + imgUrl : "../../../../static/imgs/hospital/index/tdf_hospital_head.png"; // 没有头像时显示默认头像
            Indicator.close(); // 关闭loading动画  
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    // 选择服务
    choiceService(index){
      this.isService = true; // 选择服务弹窗显示、隐藏
      this.serviceid = "service" + index;
      if(index == 0){
        this.consultation.length ? '' : this.getHealthPrice(this.doctorId);
      }else if(index == 1){
        this.punctualBespeak.length ? '' : this.getpunctualBespeak(this.doctorId);
      }else if(index == 2){
        this.isService = false; // 选择服务弹窗显示、隐藏
        Toast({
          message: '功能开发中...',
          position: 'bottom',
          duration: 3000
        });
      }
    },
    // 关闭服务界面
    closeService(type){
     if(type == 'close'){
        this.isService = false;// 选择服务弹窗显示、隐藏
     }else{
        this.isService = true;// 选择服务弹窗显示、隐藏
     }
    },
    // 选择服务类型切换
    switchService(item,index){
      // this.serviceid = "service" + index;
      if(index == 0){
        this.serviceid = "service" + index;
        this.consultation.length ? '' : this.getHealthPrice(this.doctorId);
      }else if(index == 1){
        this.serviceid = "service" + index;
        this.punctualBespeak.length ? '' : this.getpunctualBespeak(this.doctorId);
      }else if(index == 2){
        this.serviceid = this.serviceid; // 家庭医生功能待开发
        Toast({
          message: '功能开发中...',
          position: 'bottom',
          duration: 3000
        });
      }
    },
    // 选择咨询方式
    choiceConsultation(item,index){
      // 判断是否开启健康咨询服务
      if(item.enable == 0){
        this.visitType = 'forbid';
      }else{
        this.visitType = 'health';
      }
    },
    // 选择服务时间
    choiceServiceDate(e,item,index){
      this.visitType = 'forbid'; // 切换时关闭立即就诊跳转
      this.visit = ''; // 切换时取消就诊时间选中状态
      this.today = 'today' + index; // 选中当前状态
      this.serviceTime = this.punctualBespeak[index].item;
    },
    // 选择就诊时间
    choiceVisitTime(e,item,index){
      this.visit = 'visit' + index;
      this.address = item.address;
      this.isAddress = true;
      this.visitType = 'punctual';
      // this.visitTime = item;
      // console.log(item)
      // 存储就诊时间对象
      localStorage.setItem('visitTime',JSON.stringify(item))
    },
    // 获取健康咨询医生定价
    getHealthPrice(doctorId){
      Indicator.open({text:'加载中...'});
      var url = this.baseUrl + "allorder/getPlatformPrice2";
      this.$http.post(url,{doctorId:doctorId}).then(res => {
        console.log(res.data);
        if(res.data.statusCode == 1){
          this.consultation = res.data.obj;
          Indicator.close(); // 关闭loading动画
        }
      },res => {
        console.log("error");
      })
    },
    // 获取准时预约开放时间
    getpunctualBespeak(doctorId){
      var url = this.baseUrl + 'doc/getDoctorOpenTime';
      Indicator.open({text:'加载中...'});
      this.$http.post(url,{docid:doctorId}).then(res => {
        // console.log(res.data);
        if(res.data.success){
          this.punctualBespeak = res.data.data;
          this.serviceTime = this.punctualBespeak[0].item;
          Indicator.close(); // 关闭loading动画
        }
      },res => {
        console.log("error");
      });
    },
    // 立即就诊
    goVisit(visitType){
      // 存储当前选择的就诊类型
      localStorage.setItem("visitType",visitType);
      // 存储医生信息
      localStorage.setItem('doctorInfo',JSON.stringify(this.doctorInfo));
      if(visitType == 'health'){
        this.$router.push({name:'fillOrder',params:this.visitTime});
      }else if(visitType == 'punctual'){
        this.$router.push({name:'fillOrder'});
      }else if(visitType == 'forbid'){
        // 没有选择服务是禁止页面跳转
        return false;
      }
    },
    // 获取用户评价
    getCustomerImpression() {
      this.showid = "tab2";
      var url = this.baseUrl + "newDoctorBaseInfo/getCustomerImpression";
      var data = {
        doctorId: this.doctorId,
        index: 1
      };
      this.$http.post(url, data).then(
        response => {
          console.log("doctorDetail", response.data);
          if (response.data.statusCode == 1) {
            this.customerAppraisal = response.data.obj;
            var simpleContent = response.data.obj.simpleContent;
            var photo = response.data.obj.photo;
            if (simpleContent) {
              this.simpleContent = simpleContent.split(",");
            }
            response.data.obj.photo = photo ? this.baseImgUrl + photo : "../../../../static/imgs/hospital/index/tdf_hospital_head.png";
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    // 获取专家文章
    getExpertArticle() {
      this.showid = "tab3";
      var _this = this;
      var url = this.baseUrl + "orderList/getExpertArticle";
      var data = {
        doctorId: this.doctorId,
        index: 1,
        pageSize: 10
      };
      this.$http.post(url, data).then(
        response => {
          console.log("专家文章", response.data);
          if (response.data.statusCode == 1) {
            var expertArticle = response.data.obj;
            this.expertArticle = expertArticle;
            this.expertArticle.forEach(function(v, i) {
              v.newsCoverimage = _this.baseImgUrl + v.newsCoverimage;
            });
          }
        },
        response => {
          console.log("error");
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../static/less/globalVar.less";
.doctor_top {
  background: #fff
    url("../../../../static/imgs/hospital/index/tdf_doctor_bg.png") no-repeat;
  background-size: 100%;
  padding: 0.6rem;
  height: 6.5rem;
  position: relative;
  .doctor_title {
    a {
      width: 1rem;
      height: 1rem;
      &:last-child {
        margin-right: 0.5rem;
      }
      img {
        width: 100%;
        max-height: 100%;
      }
    }
  }
  .doctor_avatar {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 100%;
    border: 1px solid #fff;
    position: absolute;
    bottom: -2.1rem;
    left: 50%;
    margin-left: -2.1rem;
    overflow: hidden;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
}
.doctor_info {
  padding: 2.5rem 0 0rem;
  background: #fff;
  margin-bottom: 0.35rem;
  .doctor_main {
    text-align: center;
    h2 {
      color: @fontColor;
      font-size: 0.9rem;
      margin-bottom: 0.6rem;
      position: relative;
      .order {
        background-image: linear-gradient(90deg, #82bcff, #5da8fd);
        font-size: 0.6rem;
        color: #fff;
        position: absolute;
        padding: 0.2rem 0.5rem;
        right: 0.6rem;
        top: 0rem;
        border-radius: 0 0.8rem 0.8rem;
      }
    }
    p {
      color: @font1Color;
      font-size: 0.7rem;
    }
  }
  .doctor_minor {
    padding: 0.6rem 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      text-align: center;
      h2 {
        font-size: 0.75rem;
        color: @fontColor;
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 0.65rem;
        color: @font1Color;
      }
    }
  }
}
.patient {
  background: #fff;
  h2 {
    font-size: 0.7rem;
    color: @fontColor;
    padding: 0.6rem;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0 0.6rem;
    li {
      background: #82bcff;
      padding: 0.2rem 0.6rem;
      color: #fff;
      border-radius: 0.3rem;
      font-size: 0.6rem;
      margin-right: 1.1rem;
      margin-bottom: 0.6rem;
    }
  }
}
.tab {
  display: flex;
  align-items: center;
  height: 2.1rem;
  border-bottom: 1px solid rgb(238, 238, 238);
  background-color: #fff;
  button {
    width: 33.33%;
    color: rgb(57, 57, 57);
    text-align: center;
    border: 0;
    background-color: #fff;
    span {
      font-size: 0.7rem;
      padding-bottom: 0.5rem;
      &.activeTab {
        color: rgb(86, 163, 255);
        border-bottom: 1.5px solid rgb(42, 140, 250);
      }
    }
  }
  .mint-button--default {
    box-shadow: none;
  }
}
.tab_container{
  padding-bottom:3.6rem;
}
// 医生介绍
.doctor_introduce {
  padding: 0.6rem;
  background: #fff;
  li {
    margin-bottom: 1rem;
    h2 {
      font-size: 0.75rem;
      color: @fontColor;
      margin-bottom: 0.5rem;
      padding-left: 1rem;
      position: relative;
      &::after {
        content: "";
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        background: @primary;
        border-radius: 100%;
        position: absolute;
        top: 0.4rem;
        left: 0;
      }
    }
    p {
      color: @font1Color;
      padding-left: 1rem;
      font-size: 0.65rem;
      line-height: 1.2rem;
    }
  }
}
// 用户评价
.user_rating {
  padding: 1rem 0.6rem 0.5rem;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  .user_left {
    width: 1.5rem;
    margin-right: 0.6rem;
    .user_avatar {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 100%;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .user_right {
    flex-grow: 1;
    .user_info > li {
      h2 {
        color: @fontColor;
        font-size: 0.75rem;
        margin-bottom: 0.4rem;
      }
      span {
        color: rgb(153, 153, 153);
        font-size: 0.6rem;
        margin-bottom: 0.6rem;
      }
      p {
        color: @fontColor;
        font-size: 0.65rem;
        line-height: 1.2rem;
      }
    }
    .user_sign {
      display: flex;
      li {
        padding: 0.3rem 0.5rem;
        border-radius: 0.4rem;
        border: 1px solid #82bcff;
        font-size: 0.6rem;
        color: rgb(102, 102, 102);
        margin-right: 0.5rem;
      }
    }
    .user_img {
      display: flex;

      li {
        width: 3.5rem;
        height: 3.5rem;
        background: #ccc;
        margin: 0.6rem 0.6rem 0.6rem 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
// 专家文章
.expert_article {
  display: flex;
  padding: 1rem 0.6rem;
  background: #fff;
  .expert_left {
    width: 2.6rem;
    margin-right: 0.75rem;
    .expert_img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.3rem;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .expert_right {
    flex-grow: 1;
    .expert_info > li {
      margin-bottom: 0.4rem;
      h2 {
        font-size: 0.7rem;
        color: @fontColor;
      }
      p {
        font-size: 0.65rem;
        color: @font1Color;
        line-height: 1.2rem;
      }
      &.expert_sign {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.6rem;
        div {
          color: rgb(82, 163, 255);
          display: flex;
          align-items: center;
          img {
            width: 0.6rem;
            margin-right: 0.35rem;
          }
        }
        p {
          font-size: 0.6rem;
          color: @font1Color;
        }
      }
    }
  }
}
// 服务类型
.service{
  width:100%;
  height:3.5rem;
  background:rgb(239,244,250);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom:0;
  left: 0;
  li{
    width:33.33%;
    text-align:center;
    .service_icon{
      width:1.6rem;
      height:1.6rem;
      margin:0 auto;
      margin-bottom:0.45rem;
      img{
        width:100%;
      }
    }
    p{
      font-size:0.65rem;
      color:@font1Color;
    }
  }
}

// 服务类型选择页面
.service_page{
  width:100%;
  height:100vh;
  background:rgba(0,0,0,0.5);
  position: fixed;
  left: 0;
  top:0;
  .service_inner{
    width:100%;
    height: 26rem;
    background:#fff;
    border-radius:0.5rem 0.5rem 0 0;
    position: absolute;
    bottom:0;
    overflow: hidden;
    .service_tab{
      width:100%;
      height:4rem;
      background:rgb(239,244,250);
      display: flex;
      align-items: center;
      justify-content: space-between;
      li{
        width:33.33%;
        height:100%;
        padding:0.6rem 0;
        text-align:center;
        position: relative;
        &.active::after{
          content:'';
          display: block;
          width:0;
          height: 0;
          border-bottom:0;
          border-right:0.5rem solid transparent;
          border-left:0.5rem solid transparent;
          border-top:0.5rem solid rgb(239,244,250);
          position: absolute;
          bottom:-0.5rem;
          left:50%;
          margin-left:-0.5rem;
        }
        .service_icon{
          width:1.6rem;
          height:1.6rem;
          margin:0 auto;
          margin-bottom:0.45rem;
          img{
            width:100%;
          }
        }
        p{
          font-size:0.65rem;
          color:@font1Color;
        }
      }
    }
    .server_container{
      padding:1.2rem 0.6rem;
    }
  }
}
.service_top{
  margin-bottom: 0.8rem;
  font-size:0.75rem;
  color:@fontColor;
}
.service_item{
  display: flex;
  justify-content: space-between;
  align-items:center;
  flex-wrap:wrap;
  li{
    width:46%;
    padding:0.8rem;
    border:1px solid rgb(204,204,204);
    border-radius:0.3rem;
    margin-bottom: 0.8rem;
    text-align:center;
    &.active{
      background:rgb(218,234,253);
      border:1px solid rgb(82,163,255);
    }
    p{
      font-size:0.75rem;
      color:@fontColor;
      &:first-child{
        margin-bottom:0.4rem;
      }
    }
  }
}
// 星期、日期、开放时间
.service_sort{
  padding:0 0 1.5rem;
  font-size:0.75rem;
  color:@fontColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  li{
    width:14.2%;
    text-align:center;
  }
}
// 日期
.service_date{
  li>span{
    position: relative;
    padding:0.2rem;
    width:1.2rem;
    height: 1.2rem;
    display: block;
    margin:0 auto;
    border-radius:100%;
    &.open::before{
      content:'';
      display: block;
      width:0.3rem;
      height: 0.3rem;
      border-radius:100%;
      background:rgb(255,162,89);
      position: absolute;
      right: -0.2rem;
      top:0;
    }
    &.active{
      background:rgb(82,163,255);
      color:#fff;
    }
  }
}
// 开放时间
.service_time{
  height:10rem;
  overflow-y: scroll;
  overflow-x:hidden;
  font-size:0.75rem;
  color:@fontColor;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  // align-items: flex-start;
  li{
    width:30%;
    float: left;
    margin-right: 0.55rem;
    border:1px solid rgb(82,163,255);
    border-radius:0.3rem;
    padding:0.3rem;
    text-align:center;
    margin-bottom:0.8rem;
    font-size:0.7rem;
    color:rgb(82,163,255);
    &.active{
      background:rgb(218,234,253);
    }
  }
  .service_no{
    width:100%;
    height:5rem;
    line-height:5rem;
    background:#eee;
    text-align:center;
  }
}
.address{
  width:100%;
  font-size:0.75rem;
  padding:0.3rem 0.6rem;
  position: absolute;
  left: 0;
  bottom: 2.25rem;
  h2{
    font-size:0.7rem;
    color:@fontColor;
    margin-bottom:0.4rem;
    span{
      display:inline-block;
      width:0.8rem;
      height: 0.8rem;
      margin-right:0.3rem;
      img{
        width:100%;
      }
    }
  }
  p{
    font-size:0.65rem;
    color:@font1Color;
    padding-left:1.1rem;
  }
}
// 立即就诊
.go_visit{
  width:100%;
  height: 2.25rem;
  line-height: 2.25rem;
  text-align:center;
  color:#fff;
  font-size:0.75rem;
  background: #3794fe;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>