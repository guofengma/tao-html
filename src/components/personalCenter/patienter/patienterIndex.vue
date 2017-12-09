<template>
 <div class="wrap">
     <div v-if="noPatient" class="no_patient">
         <img src="../../../../static/imgs/patienter/tdf_family_add.png" alt="" @click.stop="addPatienter">
         <p>您还未添加就诊人</p>
     </div>
     <ul v-else-if="!noPatient" class="patient_list">
         <router-link tag="li" :to="{name: 'patienterInfo',params: {id: item.id,defaultCustomer: item.defaultCustomer}}" v-for="(item,index) in patienters" :key="index">
             <div class="left_box">
                 <p>{{item.name}}</p>
                 <img v-if="item.status==101" src="../../../../static/imgs/patienter/tdf_family_line3.png" alt="">
                 <img v-else-if="item.status==102" src="../../../../static/imgs/patienter/tdf_family_line2.png" alt="">
                 <img v-else-if="item.status==103" src="../../../../static/imgs/patienter/tdf_family_line1.png" alt="">
                 <p>{{item.mobilephone}}</p>
             </div>
             <div class="right_box">
                 <span v-if="item.defaultCustomer==1">默认</span>
                 <img v-if="item.status==101" src="../../../../static/imgs/patienter/tdf_family_wshm.png" alt="">
                 <img v-else-if="item.status==102" src="../../../../static/imgs/patienter/tdf_family_shhzh.png" alt="">
                 <img v-else-if="item.status==103" src="../../../../static/imgs/patienter/tdf_family_yshm.png" alt="">
             </div>
         </router-link>
     </ul>
     <div v-if="addBtnShow.show" class="add_patient">
         <img src="../../../../static/imgs/patienter/tdf_family_add.png" alt="" @click.stop="addPatienter">
         <p>您已添加{{addBtnShow.hadNum}}人，还能再添加{{addBtnShow.addNum}}人</p>
     </div>
 </div>
</template>

<script>
export default {
  name: "patienter",
  data() {
    return {
      noPatient: false,
      patienters: [],
      addBtnShow: {
        show: true,
        hadNum: 0,
        addNum: 6
      },
    };
  },
  created() {
    this.$http
      .post(this.baseUrl + "allorder/getCustomers", {
        customerId: JSON.parse(localStorage.getItem('userInfo')).id
      })
      .then(
        
        res => {
          let patienters = res.body.obj;
          let patientersNum = patienters.length;
          this.noPatient = patientersNum > 0 ? false : true;
          this.patienters = patienters;
          this.addBtnShow = {
            show: patientersNum >= 6 ? false : true,
            hadNum: patientersNum,
            addNum: 6 - patientersNum
          };
        },
        res => {
          console.log(res);
        }
      );
  },
  methods: {
    addPatienter() {//点击添加就诊人
      this.$router.push({name: 'addPatienter'});
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: #eff4fa;
  min-height: 100%;
}
.no_patient,
.add_patient {
  padding-top: 5.45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 4.15rem;
    width: 4.15rem;
  }
  p {
    margin-top: 0.5rem;
    color: #393939;
    font-size: 0.65rem;
  }
}
.add_patient {
  margin-top: 1.3rem;
  padding-top: 0;
}
.patient_list {
  padding-top: 0.6rem;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    width: 94%;
    height: 4.5rem;
    margin: 0 auto;
    border-radius: 0.5rem;
    margin-bottom: 0.6rem;
    padding: 0.9rem 0 0.9rem 0.9rem;
    .left_box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p:first-of-type {
        color: #393939;
        font-size: 0.9rem;
      }
      img {
        width: 0.6rem;
        margin: 0.3rem 0;
      }
      p:last-of-type {
        font-size: 0.9rem;
        color: #393939;
      }
    }
    .right_box {
      display: flex;
      justify-content: space-between;
      span {
        color: rgb(255, 82, 82);
        font-size: 0.7rem;
        margin-right: 0.3rem;
      }
      img {
        height: 1rem;
        width: 3rem;
      }
    }
  }
}
</style>
