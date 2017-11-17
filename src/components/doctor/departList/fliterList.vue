<template>
  <div class="home">
    <div class="fliter_item">
    <h2 class="fliter_top">服务类型</h2>
    <ul class="fliter_list">
        <li v-for="(item,index) in service_type" :key="index" @click="serviceId(item,index)" :class="{'active':service_id == 'service'+index}">{{item.serviceName}}</li>
    </ul>
    <h2 class="fliter_top">医生职称</h2>
    <ul class="fliter_list">
        <li v-for="(item,index) in doctor_job" :key="index" @click="doctorJobId(item,index)" :class="{'active':doctor_id == item.jobKey}">{{item.jobName}}</li>
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
      service_id: "service0",
      doctor_id: null,
      service_type: [
        { serviceName: "不限", serviceKey: "" },
        { serviceName: "健康咨询", serviceKey: "healthPhone" },
        { serviceName: "准时预约", serviceKey: "punctualBespeak" },
        { serviceName: "家庭医生", serviceKey: "houseDoctor" }
      ],
      doctor_job: [
        { jobName: "不限", jobKey: null },
        { jobName: "医师", jobKey: "multiple" },
        { jobName: "主治医师", jobKey: "multiple" },
        { jobName: "副主任医师", jobKey: "multiple" },
        { jobName: "主任医师", jobKey: "multiple" }
      ],
      serviceType:'', // 服务类型(后台字段)
      doctorTitle:'', // 医生职称(后台字段)
    };
  },
  methods: {
    serviceId(item, index) {
      this.service_id = "service" + index;
      this.serviceType = item.serviceKey;
      console.log(item, index);
    },
    doctorJobId(item, index) {
      this.doctor_id = item.jobKey;
      console.log(item, index);
    },
    // 重置
    Reset() {
      this.service_id = "service0";
      this.doctor_id = null;
    },
    // 完成
    Finished() {
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
