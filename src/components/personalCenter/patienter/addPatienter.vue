<template>
  <div class="wrap">
      <div class="top">
          <p>真实完善的健康信息，让医生更懂你</p>
      </div>
      <ul class="base_list">
          <li>
              <span>姓名</span>
              <input type="text" v-model="userName" placeholder="请输入真实姓名">
          </li>
          <li>
              <span>身份证号</span>
              <input type="text" v-model="userSNum" placeholder="请输入真实的手机号">
          </li>
          <li class="no_open">
              <span>性别</span>
              <b></b>
          </li>
          <li class="no_open">
              <span>出生年月</span>
              <b></b>
          </li>
          <li class="choose_sort" @click.stop="popWin('zu')">
              <span>民族</span>
              <b>{{popChooseTextZu}}</b>
              <i class="iconfont icon-right"></i>
          </li>
          <li class="choose_sort" @click.stop="popWin('hun')">
              <span>婚姻状况</span>
              <b>{{popChooseTextHun}}</b>
              <i class="iconfont icon-right"></i>
          </li>
          <li>
              <span>住址</span>
              <input type="text" v-model="userAdress" placeholder="请输入详细的家庭住址">
          </li>
          <li>
              <span>手机号码</span>
              <input type="text" v-model="userTel" placeholder="请输入真实的手机号码">
          </li>
          <li>
              <span>设为默认就诊人</span>
              <b class="iconfont icon-roundcheck"></b>
          </li>
      </ul>
      <mt-popup v-model="popupVisibleZu" position="bottom">
        <ul class="choose_win">
            <li v-for="(item,index) in popText" :key="index" @click.stop="getResult(item)">{{item}}</li>
        </ul>
      </mt-popup>
  </div>
</template>

<script>
export default {
  name: "addPatienter",
  data() {
    return {
      userName: "",
      userSNum: "",
      userZu: "",
      userAdress: "",
      userTel: "",
      popText: [],
      popChooseTextZu: '',
      popChooseTextHun: '',
      chooseDiff: false,
      popupVisibleZu: false,//弹出民族选择
      popupVisibleZuText: ['汉族','少数民族'],
      popupVisibleHunText: ['未婚', '已婚']
    };
  },
  methods: {
      popWin(tepm) {//弹出选择框
            if(tepm == 'zu') {//弹出民族选择
                this.popupVisibleZu = true;
                this.chooseDiff = false;
                this.popText = this.popupVisibleZuText;
            }else if(tepm == 'hun') {
                this.popupVisibleZu = true;
                this.chooseDiff = true;
                this.popText = this.popupVisibleHunText;
            }
      },
      getResult(item) {
          if(this.chooseDiff) {
              this.popChooseTextHun = item;
          }else {
              this.popChooseTextZu = item;
          }
          this.popupVisibleZu = false;
      }
  }
};
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  font-size: 0.75rem;
  color: rgb(153, 153, 153);
}
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: #eff4fa;
  height: 100%;
}
.top {
  background-color: transparent;
  padding-left: 0.6rem;
  line-height: 1.75rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  p {
    font-size: 0.65rem;
    color: #f38590;
    line-height: 1.75rem;
  }
}
.base_list {
  padding-top: 2rem;
  .no_open {
    span {
      color: rgb(153, 153, 153);
    }
  }
  .choose_sort {
    b {
      flex: 7;
    }
    i {
      flex: 1;
      color: rgb(153, 153, 153);
      font-size: 1rem;
    }
  }
  li {
    height: 2.45rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgb(238, 238, 238);
    span {
      flex: 2;
      padding-left: 0.6rem;
      font-size: 0.75rem;
      color: #393939;
    }
    b {
      flex: 8;
      font-size: 0.75rem;
      color: #393939;
    }
    input {
      flex: 8;
    }
    &:last-of-type {
      margin-top: 0.6rem;
      span {
        flex: 3.5;
      }
      b {
        flex: 6.5;
        font-size: 1.2rem;
        text-align: right;
        padding-right: 0.6rem;
        color: #2a8cff;
      }
    }
  }
}
//弹出框样式
.mint-popup {
    width: 100%;
    .choose_win {
        width: 100%;
        li {
            line-height: 2.25rem;
            color: #393939;
            font-size: .75rem;
            text-align: center;
        }
    }
}
</style>
