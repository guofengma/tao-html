<template>
  <div class="doctor_list clearfix">
        <div class="avatar f_left"><img src="../../static/imgs/hospital/index/tdf_hospital_head.png" alt=""></div>
        <div class="doctor_info">
            <h2><span>徐亮</span><span>主任</span><span>儿科</span></h2>
            <h4>北京安贞医院</h4>
            <p>擅长：发育不完整、发育缓慢、呼吸道感染、支气管感染</p>
        </div>
        <ul class="server_item clearfix">
            <li><img src="../../static/imgs/hospital/index/tdf_hospital_jkzx.png" alt=""></li>
            <li><img src="../../static/imgs/hospital/index/tdf_hospital_jzhyy.png" alt=""></li>
            <li><img src="../../static/imgs/hospital/index/tdf_hospital_jtysh_pre.png" alt=""></li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'HotDoctorList'
};
</script>

<style scoped lang="less">
@mainColor: #fff;
@fontColor: rgb(57, 57, 57);
@font1Color: rgb(102, 102, 102);
@assistColor: #666;
@primary: #0032a7;
@placeholder: #999;
@border: rgb(238, 238, 238); 
.doctor_list {
  background: #fff;
  padding: 0.75rem 0.6rem;
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
    font-size: 0.8rem;
    color: @font1Color;
    h2 {
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
    }
  }
  .server_item {
    margin-left: 3.5rem;
    li {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1.8rem;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
