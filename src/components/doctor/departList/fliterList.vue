<template>
  <div class="home">
    <div class="fliter_item">
    <h2 class="fliter_top">服务类型</h2>
    <ul class="fliter_list">
      <li v-for="(item,index) in service_type" :key="index" @click="serviceId($event,item,index)" :class="{'active':service_id == 'service'+index}">{{item.serviceName}}</li>
    </ul>
    <h2 class="fliter_top">医生职称</h2>
    <ul class="fliter_list">
      <li v-for="(item,index) in doctor_job" :key="index" @click="doctorJobId($event,item,index)" :class="{'active':doctor_id == 'doctor' + index}">{{item}}</li>
    </ul>
    </div>
    
    <ul class="btn_box">
      <li @click="Reset">重置</li>
      <li @click="Finished">完成</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      service_id: "service0", // 服务类型默认选中
      doctor_id: 'doctor0', // 医生职称默认选中
      service_type: [
        { serviceName: "不限", serviceKey: "" },
        { serviceName: "健康咨询", serviceKey: "healthPhone" },
        { serviceName: "准时预约", serviceKey: "punctualBespeak" },
        { serviceName: "家庭医生", serviceKey: "houseDoctor" }
      ],
      doctor_job: ["不限","医师","主治医师","副主任医师","主任医师"],
      serviceType:'', // 服务类型(后台字段)
      doctorTitle:'', // 医生职称(后台字段)
      doctorTitleArr:[], // 医生职称数组
    };
  },
  computed:{
    monitor(){
      if(this.doctorTitleArr.length <= 0){
        this.doctor_id = 'doctor0';
      }
    }
  },
  methods: {
    serviceId(e,item, index) {
      this.service_id = "service" + index;
      if(e.target.className.indexOf('active') == -1){
        e.target.className = "active";
        // this.serviceType = item.serviceKey;
      }else{
        e.target.className = '';
        this.service_id = "service0";
      }
      this.serviceType = item.serviceKey;
      // console.log(e.target.className,item, index);
    },
    doctorJobId(e,item, index) {
      if(index == 0){
        this.doctor_id = 'doctor0';
        this.doctorTitleArr.splice(0);
        var siblings = e.target.parentNode.children;
        for(let i = 0;i < siblings.length;i++){
          if(e.target !== siblings[i]){
            siblings[i].classList.remove("active");
          }
        }
      }else{
        if(e.target.className.indexOf('active') == -1){
          e.target.className = "active"; 
          this.doctor_id = 'index';
        }else{
          e.target.className = "";
          if(this.doctorTitleArr.length <= 1){
            this.doctor_id = 'doctor0';
          }
        }
        if(this.doctorTitleArr.indexOf(item) == -1 && index != 0){
          this.doctorTitleArr.push(item);
          this.doctor_id = 'index';
        }else{
          this.doctorTitleArr.splice(this.doctorTitleArr.indexOf(item),1)
        }
      }
      this.doctorTitle = this.doctorTitleArr.join(","); // 医生职称
      // console.log(this.doctorTitleArr.join(","))
    },
    // 重置
    Reset() {
      this.service_id = "service0";
      this.doctor_id = "doctor0";
    },
    // 完成
    Finished() {
      // console.log(this.serviceType,this.doctorTitle)
      this.$emit("searchFliter",this.serviceType,this.doctorTitle);
    }
  }
};
</script>

<style lang="less" scoped>
.fliter_item{
  margin-top:0.5rem;
}
.fliter_top {
  line-height: 2rem;
  font-size: 0.75rem;
  color: rgb(57, 57, 57);
  border-bottom: 1px solid rgb(229, 229, 229);
  padding-left: 1rem;
  position: relative;
  background: #fff;
  &::after {
    content: "";
    display: block;
    width: 0.2rem;
    height: 0.9rem;
    position: absolute;
    background: #ff5252;
    left: 0;
    top: 50%;
    margin-top: -0.45rem;
  }
}
.fliter_item {
  .fliter_list {
    padding: 0.75rem 0.6rem 1.3rem;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    li {
      padding: 0.3rem 0.5rem;
      border-radius: 0.3rem;
      border: 1px solid rgb(229, 229, 229);
      color: rgb(102, 102, 102);
      font-size: 0.75rem;
      margin: 0 0.7rem 0.7rem 0;
      position: relative;
      &.active {
        color: rgb(43, 140, 255);
      }
      &.active::after {
        content: "";
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 0.3rem;
        border: 1px solid rgb(82, 163, 255);
        background: rgba(82, 163, 255, 0.3);
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

.btn_box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 1.8rem 1.2rem 1rem;
  li {
    margin-left: 2rem;
    color: rgb(82, 163, 255);
    font-size: 0.75rem;
  }
}
</style>
