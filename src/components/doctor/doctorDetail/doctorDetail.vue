<template>
  <div class="home">
      <div class="doctor_top">
        <!-- <div class="doctor_title  clearfix">
          <a href="#" class="f_left"><img src="../../../../static/imgs/hospital/index/tdf_back.png" alt=""></a>
          <a href="#" class="f_right"><img src="../../../../static/imgs/hospital/index/tdf_doctor_share.png" alt=""></a>
          <a href="#" class="f_right"><img src="../../../../static/imgs/hospital/index/tdf_doctor_gzh.png" alt=""></a>
        </div> -->
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
                <img src="" alt="">
              </div>
            </div>
            <div class="expert_right">
              <ul class="expert_info">
                <li><h2>{{item.newsTitle}}</h2></li>
                <li><p>{{item.description}}</p></li>
                <li class="expert_sign">
                  <div><img :src="item.newsCoverimage" alt="">{{item.newsTage}}</div>
                  <p>{{item.createTime | formatDate}}</p>
                </li>
              </ul>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
  </div>
</template>

<script>
import pubOrderList from "../../personalCenter/pubComponents/pubOrderList";
import {formatDate} from "../formdate";
export default {
  data() {
    return {
      active: "activeTab",
      showid: "tab1",
      doctorInfo: {}, // 医生详情
      customerAppraisal:[], // 用户评价 
      expertArticle:[], // 专家文章
      imgUrl: "", // 图片路径
      doctorId: "", // 医生ID
      customerImpression: [], // 患者印象
      simpleContent:[], // 用户评价中患者印象
    };
  },
  components: {
    pubOrderList
  },
  created() {
    var item = this.$route.params;
    this.doctorInfo = item;
    this.doctorId = item.doctorId;
    this.getDoctorDetail(); // 获取用户详细信息
  },
  filters:{
    formatDate(time){
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
      //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
    }
  },
  methods: {
    getDoctorDetail() {
      var url = this.baseUrl + "newDoctorBaseInfo/getDoctorDetail";
      var data = {
        doctorId: this.doctorId
      };
      this.$http.post(url, data).then(
        response => {
          // console.log("doctorDetail", response.data);
          if (response.data.statusCode == 1) {
            this.doctorInfo = response.data.obj;
            var customerImpression = response.data.obj.customerImpression;
            var imgUrl = response.data.obj.photo;
            if (customerImpression) {
              this.customerImpression = customerImpression.split(",");
            }
            this.imgUrl = imgUrl ? this.baseImgUrl + imgUrl : "../../../../static/imgs/hospital/index/tdf_hospital_head.png";
            // console.log(this.customerImpression);
          }
        },
        response => {
          console.log("error");
        }
      );
    },
    getCustomerImpression() {
      this.showid = 'tab2';
      var url = this.baseUrl + "newDoctorBaseInfo/getCustomerImpression";
      var data = {
        doctorId: this.doctorId,
        index:1
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
    getExpertArticle(){
      this.showid = "tab3";
      var _this = this;
      var url = this.baseUrl + "orderList/getExpertArticle";
      var data = {
        doctorId: this.doctorId,
        index:1,
        pageSize:10
      };
      this.$http.post(url, data).then(
        response => {
          console.log("doctorDetail", response.data);
          if (response.data.statusCode == 1) {
            var expertArticle = response.data.obj;
            this.expertArticle = expertArticle;
            console.log(expertArticle)
            this.expertArticle.forEach(function(v,i){
              v.newsCoverimage = _this.baseImgUrl + v.newsCoverimage;
            });
            // this.customerAppraisal = response.data.obj;
            // var simpleContent = response.data.obj.simpleContent;
            // var photo = response.data.obj.photo;
            // if (simpleContent) {
            //   this.simpleContent = simpleContent.split(",");
            // }
            // response.data.obj.photo = photo ? this.baseImgUrl + photo : "../../../../static/imgs/hospital/index/tdf_hospital_head.png";
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
        max-width: 100%;
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
      max-width: 100%;
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
      margin-bottom: 0.6rem;
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
</style>