<template>
  <div class="home">
      <div class="doctor_top">
        <div class="doctor_title  clearfix">
            <a href="#" class="f_left"><img src="../../../../static/imgs/hospital/index/tdf_back.png" alt=""></a>
            <a href="#" class="f_right"><img src="../../../../static/imgs/hospital/index/tdf_doctor_share.png" alt=""></a>
            <a href="#" class="f_right"><img src="../../../../static/imgs/hospital/index/tdf_doctor_gzh.png" alt=""></a>
        </div>
        <div class="doctor_avatar"><img src="../../../../static/imgs/hospital/index/tdf_hospital_head.png" alt=""></div>
      </div>
      <div class="doctor_info">
        <div class="doctor_main">
          <h2>徐亮</h2>
          <p>北京安贞医院</p>
        </div>
        <ul class="doctor_minor">
          <li>
            <h2>儿科</h2>
            <p>所属科室</p>
          </li>
          <li>
            <h2>主任</h2>
            <p>医生职称</p>
          </li>
          <li>
            <h2>19年</h2>
            <p>临床经验</p>
          </li>
        </ul>
      </div>
      <div class="patient">
        <h2>患者印象</h2>
        <ul>
          <li>非常耐心</li>
          <li>非常专业</li>
          <li>解答非常及时</li>
          <li>很好</li>
          <li>解答非常及时</li>
          <li>解答非常及时</li>
          <li>解答非常及时</li>
        </ul>
      </div>
      <div class="tab">
        <mt-button @click.native.prevent="showid = 'tab1'"><span :class="{'activeTab':showid == 'tab1'}">医生介绍</span></mt-button>
        <mt-button @click.native.prevent="showid = 'tab2'"><span :class="{'activeTab':showid == 'tab2'}">用户评价</span></mt-button>
        <mt-button @click.native.prevent="showid = 'tab3'"><span :class="{'activeTab':showid == 'tab3'}">专家文章</span></mt-button>
      </div>

      <mt-tab-container v-model="showid">
        <mt-tab-container-item id="tab1">
          <ul class="doctor_introduce">
            <li>
              <h2>职业点</h2>
              <p>宁夏医学院附属医院&nbsp;&nbsp;全科</p>
            </li>
            <li>
              <h2>简介</h2>
              <p>现就任于宁夏医学院附属医院，从医儿科19年。发表的关于儿科类文章获得多个医学院奖项，威尔克病症做出了重要的贡献。发表的有关儿科的恶人张获得了多个重要共享。</p>
            </li>
            <li>
              <h2>擅长</h2>
              <p>发育不完整、发育缓慢、呼吸道感染、支气管感染发育不完整、发育缓慢、呼吸道感染、支气管感染</p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <div class="user_rating" v-for="n in 4" :key="n">
            <div class="user_left">
              <div class="user_avatar">
                <img src="../../../../static/imgs/hospital/index/tdf_hospital_head.png" alt="">
              </div>
            </div>
            <div class="user_right">
              <ul class="user_info">
                <li><h2>乐乐</h2></li>
                <li><span>2017-09-09</span></li>
                <li><p>医生很专业，有内心，回答的也很详细，问题得到了很快的额回答，非常感谢！</p></li>
              </ul>
              <ul class="user_img">
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
              </ul>
              <ul class="user_sign">
                <li>非常耐心</li>
                <li>非常专业</li>
                <li>解答非常及时</li>
              </ul>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab3">
          <div class="expert_article" v-for="n in 4" :key="n">
            <div class="expert_left">
              <div class="expert_img">
                <img src="" alt="">
              </div>
            </div>
            <div class="expert_right">
              <ul class="expert_info">
                <li><h2>如何科学防止慢性病</h2></li>
                <li><p>易患病，乃一种页数鲸鱼，无论肉体、一直、灵魂解释已改常貌而坠入一种鼓励、。。。</p></li>
                <li class="expert_sign">
                  <div><img src="../../../../static/imgs/hospital/index/tdf_doctor_tab.png" alt=""> 医学科普</div>
                  <p>2017-06-30 15:03</p>
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
export default {
  data() {
    return {
      active: "activeTab",
      showid: "tab1"
    };
  },
  components: {
    pubOrderList
  }
};
</script>

<style lang="less" scoped>
@import "../../../../static/less/globalVar.less";
.doctor_top {
  background: #fff url("../../../../static/imgs/hospital/index/tdf_doctor_bg.png") no-repeat;
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
  border-bottom: 1px solid rgb(238,238,238);
  background-color: #fff;
  button {
    width: 33.33%;
    color: rgb(57,57,57);
    text-align: center;
    border: 0;
    background-color: #fff;
    span {
      font-size: .7rem;
      padding-bottom: .5rem;
      &.activeTab {
        color: rgb(86,163,255);
        border-bottom: 1.5px solid rgb(42,140,250);
      }
    }
  }
  .mint-button--default {
      box-shadow: none;
  }
}
// 医生介绍
.doctor_introduce{
  padding:0.6rem;
  background:#fff;
  li{
    margin-bottom:1rem;
    h2{
      font-size:0.75rem;
      color:@fontColor;
      margin-bottom:0.5rem;
      padding-left:1rem;
      position: relative;
      &::after{
        content:"";
        display: block;
        width:0.3rem;
        height: 0.3rem;
        background:@primary;
        border-radius:100%;
        position: absolute;
        top:0.4rem;
        left:0;
      }
    }
    p{
      color:@font1Color;
      padding-left:1rem;
      font-size:0.65rem;
      line-height:1.2rem;
    }
  }
}
// 用户评价
.user_rating{
  padding:1rem 0.6rem 0.5rem;
  background:#fff;
  border-bottom:1px solid #F0F0F0;
  display: flex;
  .user_left{
    width:1.5rem;
    flex-grow: 1;
    margin-right:0.6rem;
    .user_avatar{
      width:1.5rem;
      height:1.5rem;
      border-radius:100%;
      img{
        max-width:100%;
        max-height:100%;
      }
    }
  }
  .user_right{
    .user_info>li{
      h2{
        color:@fontColor;
        font-size:0.75rem;
        margin-bottom:0.4rem;
      }
      span{
        color:rgb(153,153,153);
        font-size:0.6rem;
        margin-bottom:0.6rem;
      }
      p{
        color:@fontColor;
        font-size:0.65rem;
        line-height:1.2rem;
      }
    }
    .user_sign{
      display: flex;
      li{
        padding:0.3rem 0.5rem;
        border-radius:0.4rem;
        border:1px solid #82BCFF;
        font-size:0.6rem;
        color:rgb(102,102,102);
        margin-right:0.5rem;
      }
    }
    .user_img{
      display: flex;
      
      li{
        width:3.5rem;
        height: 3.5rem;
        background:#ccc;
        margin:0.6rem 0.6rem 0.6rem 0;
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
}
// 专家文章
.expert_article{
  display: flex;
  padding:1rem 0.6rem;
  background:#fff;
  .expert_left{
    width:2.6rem;
    flex-grow:1;
    margin-right:0.75rem;
    .expert_img{
      width:2.6rem;
      height: 2.6rem;
      border-radius:0.3rem;
      background: #ccc;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .expert_right{
    .expert_info>li{
      margin-bottom:0.6rem;
      h2{
        font-size:0.7rem;
        color:@fontColor;
      }
      p{
        font-size:0.65rem;
        color:@font1Color;
        line-height:1.2rem;
      }
      &.expert_sign{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:0.6rem;
        div{
          color:rgb(82,163,255);
          img{
            width:0.6rem;
            margin-right:0.35rem;
          }
        }
        p{
          font-size:0.6rem;
          color:@font1Color;
        }
      }
    }
  }
}
</style>
