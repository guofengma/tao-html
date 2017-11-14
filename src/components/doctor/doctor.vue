<template>
  <div class="home">
    <div class="doctor">
        <HotDoctorList :list='arr'/>
    </div>
  </div>
</template>

<script>
import HotDoctorList from "../hotDoctorList/HotDoctorList";
export default {
  name: "doctor",
  data() {
    return {
      arr: [1, 2, 3, 4]
    };
  },
  components: {
    HotDoctorList
  },
  methods: {
      
  }
};
</script>

<style lang="less" scoped>
@import "../../../static/less/globalVar.less";
.home {
  padding-top: 2rem;
  .doctor {
    background: #fff;
    padding: 0 0.6rem;
  }
}
</style>
