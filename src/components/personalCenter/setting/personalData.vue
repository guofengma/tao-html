<template>
  <div class="container">
      <ul class="personal_data">
          <li @click="pop">
              <span>头像</span>
              <div>
                  <img :src="iconImg" alt="">
                  <i class="iconfont icon-right"></i>
              </div>
          </li>
          <router-link tag="li" :to="{name: 'editName'}">
              <span>昵称</span>
              <div>
                  <b>从你的全世界路过</b>
                  <i class="iconfont icon-right"></i>
              </div>
          </router-link>
          <router-link tag="li" :to="{name:'myErweima'}">
              <span>我的二维码</span>
              <div>
                  <em class="iconfont icon-qrcode"></em>
                  <i class="iconfont icon-right"></i>
              </div>
          </router-link>
          <li>
              <span>我的地址</span>
              <div>
                  <i class="iconfont icon-right"></i>
              </div>
          </li>
      </ul>
      <mt-popup v-model="popupVisible" position="bottom">
        <slot>
            <div class="popup">
                <div class="top_head">
                    <p>设置头像</p>
                </div>
                <ul class="img_box1">
                    <li v-for="(item,index) in chooseImgList" :key="index" @click="chooseIcon(index)">
                        <img :src="item.path" alt="">
                        <div v-show="item.selected">
                            <i class="iconfont icon-check"></i>
                        </div>
                    </li>
                    <li>
                        <img src="../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_camera@2x.png" alt="">
                        <form action="">
                            <input type="file" >
                        </form>
                    </li>
                </ul>
                <div class="calcel_btn">
                    <p>取消</p>
                </div>
            </div>
        </slot>
     </mt-popup>  
  </div>
</template>

<script>
export default {
  name: "personalData",
  data() {
    return {
      iconImg: require("../../../../static/imgs/personalCenterImgs/index/tdf_my_set_nickname@3x.png"), //默认图像地址
      chooseImgList: [
        {
          path: require("../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head1@2x.png"),
          selected: false
        },
        {
          path: require("../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head2@2x.png"),
          selected: false
        },
        {
          path: require("../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head3@2x.png"),
          selected: false
        },
        {
          path: require("../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head4@2x.png"),
          selected: false
        },
        {
          path: require("../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head5@2x.png"),
          selected: false
        },
        {
          path: require("../../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head6@2x.png"),
          selected: false
        }
      ], //选择图片的地址
      popupVisible: false //控制底部弹出框的显示隐藏
    };
  },
  methods: {
    pop() {
      this.popupVisible = true; //pop的显隐
    },
    chooseIcon(index) {
      let imgBox = this.chooseImgList;
      for (let value of imgBox) {
        this.$set(value, "selected", false);
      }
      this.iconImg = imgBox[index].path;
      this.$set(imgBox[index], "selected", true);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #eff4fa;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  padding-top: 0.6rem;
  height: 100%;
}
.personal_data {
  li {
    background-color: #fff;
    height: 2.25rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.6rem;
    align-items: center;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:nth-of-type(4) {
      margin-top: 0.4rem;
    }
    span {
      color: rgb(57, 57, 57);
      font-size: 0.75rem;
    }
    > div {
      display: flex;
      align-items: center;
      img {
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 0.6rem;
      }
      b {
        font-size: 0.75rem;
        color: rgb(102, 102, 102);
        margin-right: 0.6rem;
      }
      em {
        font-size: 1.5rem;
        color: rgb(102, 102, 102);
        margin-right: 0.6rem;
      }
      i {
        color: #999;
        font-size: 1rem;
      }
    }
  }
}
//底部弹出的样式
.mint-popup {
  width: 100%;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  background-color: rgb(239, 244, 250);
}
.popup {
  width: 100%;
  .top_head {
    text-align: center;
    background-color: #fff;
    padding: 0.8rem 0;
    p {
      font-size: 0.85rem;
      color: rgb(57, 57, 57);
    }
  }
  .img_box1 {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 0.8rem;
    justify-content: space-between;
    li {
      margin-right: 5.3%;
      border-radius: 50%;
      position: relative;
      > div {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.58);
        i {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 1rem;
          color: #fff;
        }
      }
      &.active {
        background-color: rgba(0, 0, 0, 0.58);
      }
      @media screen and (max-width: 330px) {
        & {
          margin-right: 2%;
        }
        img {
          height: 2.8rem;
          width: 2.8rem;
        }
      }
      img {
        height: 3rem;
        width: 3rem;
      }
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
      &:nth-of-type(n + 5) {
        margin-top: 0.8rem;
      }
      &:last-of-type {
        position: relative;
        form {
          input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      }
    }
  }
  .calcel_btn {
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.4rem;
    background-color: #fff;
    p {
      font-size: 0.8rem;
      color: rgb(82, 163, 255);
    }
  }
}
</style>
