<template>
  <div class="wrap">
      <mt-popup v-model="popupVisible" popup-transition="popup-fade">
          <slot>
              <div class="pop_box">
                  <ul>
                      <li>
                          <h3>欢迎进入涛大夫</h3>
                      </li>
                      <li>
                          <p>昵称</p>
                          <input type="text" placeholder="请输入昵称（不得超过10个字符）" v-model.trim="userName">
                      </li>
                      <li>
                          <p>选择头像</p>
                          <ul class="img_box1">
                            <li v-for="(item,index) in chooseImgList" :key="index" @click="chooseIcon(index)">
                                <img :src="item.path" alt="">
                                <div v-show="item.selected">
                                    <i class="iconfont icon-check"></i>
                                </div>
                            </li>
                            <li>
                                <img v-if="!uploadFile.upLoadImgTrue" src="../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_camera@2x.png" alt="">
                                <form v-if="!uploadFile.upLoadImgTrue" action="">
                                    <input type="file" @change="uploadImg">
                                </form>
                                <div v-if="uploadFile.upLoadImgTrue" class="img_upload">
                                  <img :src="uploadFile.headerImage" alt="">
                                </div>
                            </li>
                        </ul>
                      </li>
                      <li class="confirm_btn" @click="saveBtn">
                          <a href="javascript:;">确定</a>
                      </li>
                  </ul>
              </div>
          </slot>
      </mt-popup>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "settingNameLogo",
  data() {
    return {
      popupVisible: true,
      userName: "",
      upLoadList: [
        "\\uploads\\sys_image\\head\\tdf_my_set_head1@2x.png",
        "\\uploads\\sys_image\\head\\tdf_my_set_head2@2x.png",
        "\\uploads\\sys_image\\head\\tdf_my_set_head3@2x.png",
        "\\uploads\\sys_image\\head\\tdf_my_set_head4@2x.png",
        "\\uploads\\sys_image\\head\\tdf_my_set_head5@2x.png",
        "\\uploads\\sys_image\\head\\tdf_my_set_head6@2x.png"
      ],
      uploadFile: {
        upLoadImgTrue: false,
        headerImage: "",
        file: []
      },
      iconImg: require("../../../static/imgs/personalCenterImgs/index/tdf_my_set_nickname@3x.png"), //默认图像地址
      chooseImgList: [
        {
          path: require("../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head1@2x.png"),
          selected: false
        },
        {
          path: require("../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head2@2x.png"),
          selected: false
        },
        {
          path: require("../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head3@2x.png"),
          selected: false
        },
        {
          path: require("../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head4@2x.png"),
          selected: false
        },
        {
          path: require("../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head5@2x.png"),
          selected: false
        },
        {
          path: require("../../../static/imgs/personalCenterImgs/accountSecurity/tdf_my_set_head6@2x.png"),
          selected: false
        }
      ]
    };
  },
  methods: {
    chooseIcon(index) {
      //进行data里面赋值
      this.uploadFile.upLoadImgTrue = false;
      this.uploadFile.file = {};
      this.uploadFile.headerImage = this.upLoadList[index];
      let imgBox = this.chooseImgList;
      for (let value of imgBox) {
        this.$set(value, "selected", false);
      }
      this.iconImg = imgBox[index].path;
      this.$set(imgBox[index], "selected", true);
    },
    uploadImg(e) {
      let imgBox = this.chooseImgList;
      for (let value of imgBox) {
        this.$set(value, "selected", false);
      }
      let that = this;
      this.uploadFile.upLoadImgTrue = true;
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append(
        "customerId",
        JSON.parse(localStorage.getItem("userInfo")).id
      );
      formData.append("file", file);
      this.uploadFile.file = formData;

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        that.uploadFile.headerImage = this.result;
      };
    },
    //点击确定按钮
    saveBtn() {
      if (!this.uploadFile.headerImage || !this.userName) {
        this.popupVisible = false;
        setTimeout(() => {
          this.popupVisible = true;
        }, 2000);
        Toast({
          message: "您还有信息未完善,请完善相关信息"
        });
        return false;
      }
      this.popupVisible = false;
      Indicator.open({
        text: "信息上传中...",
        spinnerType: "fading-circle"
      });
      if (this.uploadFile.upLoadImgTrue) {
        //上传本地文件
        let file = this.uploadFile.file;
        file.append("customerName", this.userName);
        this.$http
          .post(this.baseUrl + "customer/updateCustomerHeader", file)
          .then(
            res => {
              Indicator.close();
              Toast("您的信息已更新成功");
              this.$router.push({name: 'navPage'});
              console.log(res);
            },
            res => {
              console.log(res);
            }
          );
      } else {
        this.$http
          .post(this.baseUrl + "customer/updateCustomerHeader", {
            customerId: JSON.parse(localStorage.getItem("userInfo")).id,
            headerImage: this.uploadFile.headerImage,
            customerName: this.userName
          })
          .then(
            res => {
              Indicator.close();
              Toast("您的信息已更新成功");
              this.$router.push({name: 'navPage'});
              console.log(res);
            },
            res => {
              console.log(res);
            }
          );
      }
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  color: rgb(153, 163, 153);
  font-size: 0.75rem;
}
.wrap {
  height: 100%;
  .mint-popup {
    height: 75%;
    width: 90%;
    border-radius: 0.3rem;
    .pop_box {
      ul {
        li:nth-of-type(1) {
          h3 {
            font-size: 0.9rem;
            color: rgb(82, 163, 254);
            text-align: center;
            margin: 1.5rem 0;
          }
        }
        li:nth-of-type(2) {
          p {
            font-size: 0.75rem;
            color: rgb(57, 57, 57);
            text-align: center;
            margin-bottom: 0.8rem;
          }
          input {
            display: block;
            width: 13.5rem;
            margin: 0 auto;
            height: 1.9rem;
            line-height: 1.9rem;
            text-align: center;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 0.8rem;
          }
        }
        li:nth-of-type(3) {
          p {
            font-size: 0.75rem;
            color: rgb(57, 57, 57);
            text-align: center;
            margin-top: 0.8rem;
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
              height: 3rem;
              width: 3rem;
              @media screen and (max-width: 330px) {
                & {
                  margin-right: 2%;
                  height: 2.5rem;
                  width: 2.5rem;
                }
              }
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
              img {
                height: 100%;
                width: 100%;
                display: block;
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
                .img_upload {
                  position: absolute;
                  height: 100%;
                  width: 100%;
                  img {
                    height: 100%;
                    width: 100%;
                    display: block;
                    border-radius: 50%;
                  }
                }
              }
            }
          }
        }
        .confirm_btn {
          width: 80%;
          line-height: 2.15rem;
          margin: 0 auto;
          margin-top: 1.5rem;
          text-align: center;
          background-color: #2c8dfe;
          border-radius: 0.8rem;
          @media screen and (max-width: 330px) {
            & {
              margin-top: 0.5rem;
            }
          }
          a {
            color: #fff;
            font-size: 0.75rem;
          }
        }
      }
    }
  }
}
</style>
