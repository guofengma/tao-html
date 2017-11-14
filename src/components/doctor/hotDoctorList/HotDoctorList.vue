<template>  
  <ul class="hot_list"> 
    <div class="doctor_list clearfix" v-for="item in list" :key="item.value">
      <router-link tag='li' to='/doctorDetail'>
        <div class="orders">接诊{{item.admissions}}单</div>
        <div class="avatar f_left"><img src="../../../../static/imgs/hospital/index/tdf_hospital_head.png" alt=""></div>
        <div class="doctor_info">
            <h2><span>{{item.doctorName}}</span><span>{{item.doctorTitle}}</span><span>{{item.departmentName}}</span></h2>
            <h4>{{item.hospitalName}}</h4>
            <p>擅长：{{item.diseaseName?item.diseaseName:'发育不完整、发育缓慢、呼吸道感染、支气管感染'}}</p>
        </div>
        <ul class="server_item clearfix">
            <li><img src='../../../../static/imgs/hospital/index/tdf_hospital_jkzx.png' ></li>
            <li><img src="../../../../static/imgs/hospital/index/tdf_hospital_jzhyy.png" alt=""></li>
            <li><img src="../../../../static/imgs/hospital/index/tdf_hospital_jtysh_pre.png" alt=""></li>
        </ul>
      </router-link>
    </div>
  </ul>
</template>
<script>
export default {
  name: "HotDoctorList",
  data() {
    return {};
  },
  props: ["list"],
  methods:{
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }
  },
  
};
</script>

<style scoped lang="less">
@import "../../../../static/less/globalVar.less";
.doctor_list {
  background: #fff;
  padding: 0.75rem 0;
  border-bottom: 1px solid @border;
  &:last-child{
    border-bottom:0;
  }
  position: relative;
  .orders {
    background-image: linear-gradient(90deg, #82bcff, #5da8fd);
    font-size: 0.6rem;
    color: #fff;
    position: absolute;
    padding: 0.2rem 0.5rem;
    right: 0.6rem;
    top: 0.8rem;
    border-radius: 0 0.8rem 0.8rem;
  }
  .avatar {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 100%;
    border: 1px solid #3794fe;
    margin-right: 0.8rem;
    img {
      width: 100%;
    }
  }
  .doctor_info {
    overflow: hidden;
    font-size: 0.7rem;
    color: @font1Color;
    h2 {
      font-size: 0.75rem;
      color: @fontColor;
      margin-bottom: 0.6rem;
      span {
        margin-right: 0.5rem;
      }
    }
    h4 {
      margin-bottom: 0.6rem;
    }
    p {
      line-height: 1.3rem;
      margin-bottom: 0.8rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .server_item {
    margin-left: 3.5rem;
    li {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 1.8rem;
      float: left;
      img {
        width: 100%;
      }
    }
  }
}
</style>
