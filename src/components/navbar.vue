<template>
  <ul class="nav">
    <li v-for="(item,index) in tabData" :key="index" @click="goPage(index)">
      <div class="nav_icon"><img :src="item.hadTrue?item.hadActive:item.noActive" alt=""></div>
      <p>{{item.textShow}}</p>
    </li>
</ul>
</template>

<script>
export default {
  name: 'navvar',
  data(){
    return {
      active:"activeTab",
      tabData: [
        {
          hadTrue: false,
          textShow: '首页',
          noActive: require('../../static/imgs/hospital/index/tdf_home.png'),
          hadActive: require('../../static/imgs/hospital/index/tdf_home_pre.png'),
          goPage: ''
        },
        {
          hadTrue: false,
          textShow: '医院',
          noActive: require('../../static/imgs/hospital/index/tdf_hospital.png'),
          hadActive: require('../../static/imgs/hospital/index/tdf_hospital_pre.png'),
          goPage: 'home'
        },
        {
          hadTrue: false,
          textShow: '健康',
          noActive: require('../../static/imgs/hospital/index/tdf_health.png'),
          hadActive: require('../../static/imgs/hospital/index/tdf_health_pre.png'),
          goPage: ''
        },
        {
          hadTrue: false,
          textShow: '我的',
          noActive: require('../../static/imgs/hospital/index/tdf_me.png'),
          hadActive: require('../../static/imgs/hospital/index/tdf_me_pre.png'),
          goPage: 'personalCenterIndex'
        },
      ]
    }
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    //组件加载完毕执行
    this.showImg();
  },
  methods: {
    goPage(clicltab) {
      this.$router.push({name: this.tabData[clicltab].goPage});
    },
    showImg() {
      let index = this.index;
      for(let value of this.tabData) {
        value.hadTrue = false;
      }
      this.tabData[index].hadTrue = true;
    }
  }
};
</script>

<style lang='less'>
// 底部tab栏
.nav {
  position: fixed;
  width: 100%;
  height: 3rem;
  border-top: 1px solid #ececec;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  li {
    width: 25%;
    text-align: center;
    &.activeTab{
      color:#3794fe;
    }
    .nav_icon{
      width:1.2rem;
      height: 1.2rem;
      margin:0 auto;
      margin-bottom:0.1rem;
      img{
        max-width:100%;
        max-height:100%;
      }
    }
  }
}
</style>
