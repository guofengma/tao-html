<template>
  <div class="wrap">
      <div class="top_msg">
          <p>通过实名认证可预约更多专家服务，可享受签约家庭医生服务</p>
      </div>
    <ul class="show_base">
      <li>
        <span>姓名</span>
        <input type="text" v-model="cardObj.name"></input>
      </li>
      <li>
        <span>身份证号</span>
        <input type="text" v-model="cardObj.cardId"></input>
      </li>
      <li>
        <span>证件照片</span>
        <div class="choose_img">
            <img v-if="!cardObj.cardImage" src="../../../../static/imgs/patienter/tdf_family_shchzj.png" alt="">
            <p v-if="!cardObj.cardImage">请上传清晰的身份证或者户口本照片</p>
            <input v-if="!cardObj.cardImage" type="file" @change="chooseCardImg">
            <div v-if="cardObj.cardImage" class="card_img">
              <img :src="cardObj.cardImage" alt="">
              <i class="iconfont icon-close" @click="cancelImg"></i>
            </div>
        </div>
      </li>
    </ul>
    <ul class="show_model">
        <li>示例</li>
        <li>
            <img src="../../../../static/imgs/patienter/tdf_family_shfzh.png" alt="">
        </li>
        <li>
            <img src="../../../../static/imgs/patienter/tdf_family_shfzh.png" alt="">
        </li>
        <span class="msg_tip">(未满16周岁的患者，可上传户口本信息)</span>
    </ul>
    <a href="javascript:;" class="saveBtn" @click="saveBtn">提交审核</a>
    <a href="javascript:;" class="cancelBtn" @click="cancelBtn">取消实名认证</a>
  </div>      
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "fillInfomation",
  data() {
    return {
      customerId: "",
      cardObj: {},
      file: {} //暂存的上传图片文件
    };
  },
  created() {
    this.customerId = this.$route.params.customerId;
    this.$http
      .post(this.baseUrl + "allorder/ getCustomerInfo", {
        customerId: this.customerId
      })
      .then(
        res => {
          res.body.obj.cardImage = this.baseImgUrl + res.body.obj.cardImage;
          this.cardObj = res.body.obj;
        },
        res => {
          console.log(res);
        }
      );
  },
  methods: {
    chooseCardImg(e) {
      let file = e.target.files[0];
      this.file = file;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        that.cardObj.cardImage = this.result;
      };
    },
    //取消上传图片
    cancelImg() {
      this.cardObj.cardImage = "";
    },
    //点击提交审核按钮
    saveBtn() {
      let customerId = this.customerId;
      let name = this.cardObj.name;
      let cardId = this.cardObj.cardId;
      if (!name || !cardId || !this.cardObj.cardImage) {
        Toast("您还有信息未完善");
      } else {
        Indicator.open({
          text: "证件上传中...",
          spinnerType: "fading-circle"
        });
        let formData = new FormData();
        formData.append('customerId', customerId);
        formData.append('name', name);
        formData.append('cardId', cardId);
        formData.append('file', this.file);
        this.$http
          .post(this.baseUrl + "allorder/updateCustomerInfo", formData)
          .then(
            res => {
              console.log(res);
              Indicator.close();
              Toast('证件已成功上传，请等待审核');
            },
            res => {
              console.log(res);
            }
          );
      }
    },
    //点击取消实名认证
    cancelBtn() {
      let customerId = this.customerId;
      // this.$http.post(this)
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100vh;
  background-color: #f2f2f2;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
.top_msg {
  color: rgb(255, 82, 82);
  background-color: rgb(239, 244, 250);
  height: 1.3rem;
  display: flex;
  align-items: center;
  font-size: 0.65rem;
  padding: 0 0.6rem;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.show_base {
  background-color: #fff;
  li {
    height: 2.25rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(238, 238, 238);
    span {
      padding-left: 0.8rem;
      flex: 2.5;
      font-size: 0.75rem;
      color: rgb(57, 57, 57);
    }
    input {
      font-size: 0.75rem;
      color: rgb(57, 57, 57);
      flex: 7.5;
    }
    &:last-of-type {
      height: auto;
      border-bottom: 0;
      padding-right: 1rem;
      padding-bottom: 0.8rem;
      span {
        align-self: flex-start;
        line-height: 2.25rem;
      }
      .choose_img {
        position: relative;
        > .card_img {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          > img {
            width: 100%;
            height: 100%;
            display: block;
          }
          > i {
            position: absolute;
            top: -0.3rem;
            right: -0.3rem;
            font-size: 1rem;
            background-color: #e64340;
            color: #fff;
          }
        }
        height: 8rem;
        flex: 7.5;
        margin-top: 0.6rem;
        //   width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #eeeeee;
        position: relative;
        img {
          width: 2rem;
          height: 1.7rem;
        }
        p {
          font-size: 0.7rem;
          color: #999;
        }
        input {
          position: absolute;
          height: 100%;
          width: 100%;
          opacity: 0;
        }
      }
    }
  }
}
.show_model {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-start;
  position: relative;
  padding-bottom: 1rem;
  li {
    flex: 4;
    &:first-of-type {
      flex: 2;
      font-size: 0.75rem;
      color: rgb(57, 57, 57);
      padding-left: 0.8rem;
    }
    img {
      width: 90%;
    }
  }
  .msg_tip {
    position: absolute;
    bottom: 0;
    right: 1.5rem;
    font-size: 0.7rem;
    color: #999;
  }
}
.saveBtn,
.cancelBtn {
  margin: 0 auto;
  margin-top: 1rem;
  display: block;
  width: 70%;
  line-height: 2rem;
  text-align: center;
  background-color: #3391ff;
  color: #fff;
  font-size: 0.75rem;
  border-radius: 0.3rem;
}
</style>
