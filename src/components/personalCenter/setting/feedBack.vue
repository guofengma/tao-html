<template>
  <ul class="wrap">
      <li>
          <p>问题与意见</p>
      </li>
      <li>
          <textarea name="" rows="6" placeholder="请输入不少于10个字的描述" v-model.trim="description"></textarea>
          <!-- <span>10/200</span> -->
      </li>
      <li class="up_img">
          <div>
              <span>请提供相关文字的截图或者照片</span>
              <!-- <i>0/4</i> -->
          </div>
          <ul>
              <li v-for="(item, index) in forLoop" :key="index">
                <input v-if="!item.imgTrue" :data-index="index" type="file" @change="getFiles">
                <i v-if="!item.imgTrue" class="iconfont icon-camera"></i>
                <div v-if="item.imgTrue" class="img_box">
                  <img :src="item.imgUrl" alt="">
                  <i :data-index="index" class="iconfont icon-close" @click="cancelImg"></i>
                </div>
              </li>
          </ul>
      </li>
      <li class="btn_feed">
        <button @click="feedBackBtn">确认提交</button>
      </li>
  </ul>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "feedBack",
  data() {
    return {
      description: "",
      suggerstionId: "",
      i: 0, //判断
      forLoop: [
        {
          imgTrue: false,
          imgUrl: "",
          file: []
        },
        {
          imgTrue: false,
          imgUrl: "",
          file: []
        },
        {
          imgTrue: false,
          imgUrl: "",
          file: []
        },
        {
          imgTrue: false,
          imgUrl: "",
          file: []
        }
      ]
    };
  },
  methods: {
    feedBackBtn() {
      //点击确认提交按钮
      Indicator.open({
        text: "文件上传中...",
        spinnerType: "fading-circle"
      });
      if (!this.description) {
        Toast("反馈信息不能为空！");
        return false;
      }
      this.$http
        .post(this.baseUrl + "allorder/addSuggestions", {
          userId: localStorage.getItem("customerId"),
          userType: "c",
          deviceType: "w",
          phoneType: "web",
          version: "2.2.0",
          description: this.description
        })
        .then(res => {
          console.log(res);
          this.suggerstionId = res.body.obj;
          let j = 0;
          for (let value of this.forLoop) {
            if (value.imgTrue) {
              j++;
              console.log(this.suggerstionId);
              value.file.append("suggerstionId", this.suggerstionId);
              this.$http
                .post(this.baseUrl + "allorder/addSuggestionsFiles", value.file)
                .then(
                  res => {
                    console.log(this.i, j);
                    if (this.i == j) {
                      Indicator.close();
                      Toast("感谢你的反馈");
                    }
                    console.log(res);
                  },
                  res => {
                    console.log(res);
                  }
                );
            }
          }
          setTimeout(function() {
            Indicator.close();
            Toast("感谢你的反馈");
          }, 18000);
        });
    },
    //得到图片的路径
    getFiles(e) {
      //给图片对应的索引
      let that = this;
      let index = e.target.dataset.index;
      let formFile = new FormData();
      let file = e.target.files[0];
      //预览照片
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        that.forLoop[index].imgUrl = this.result;
        that.forLoop[index].imgTrue = true;
      };
      this.i++;
      formFile.append("file", file);
      this.forLoop[index].file = formFile;
    },
    cancelImg(e) {
      let index = e.target.dataset.index;
      this.forLoop[index].imgUrl = "";
      this.forLoop[index].file = [];
      this.i--;
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  color: rgb(176, 176, 176);
  font-size: 0.75rem;
}
.wrap {
  background-color: #fff;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  li:nth-of-type(1) {
    padding: 0.6rem 1.2rem;
    p {
      font-size: 0.75rem;
      color: rgb(57, 57, 57);
    }
  }
  li:nth-of-type(2) {
    padding: 0 0.6rem;
    position: relative;
    textarea {
      padding: 0.6rem;
      width: 100%;
      background-color: rgb(239, 244, 250);
      border-radius: 0.3rem;
      font-size: 0.75rem;
    }
    span {
      position: absolute;
      right: 1.2rem;
      bottom: 0.8rem;
      color: rgb(57, 57, 57);
      font-size: 0.75rem;
    }
  }
  .up_img {
    margin: 0.6rem 0.6rem 0 0.6rem;
    background-color: rgb(239, 244, 250);
    padding-bottom: 0.8rem;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0.6rem;
      span {
        font-size: 0.75rem;
        color: rgb(57, 57, 57);
      }
      i {
        font-size: 0.75rem;
        color: rgb(57, 57, 57);
      }
    }
    > ul {
      display: flex;
      justify-content: space-between;
      padding: 0 0.6rem;
      > li {
        margin: 0;
        padding: 0;
        margin-right: 2%;
        height: 3.5rem;
        width: 24%;
        position: relative;
        background-color: #cee1f6;
        border-radius: 0.3rem;
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
        .icon-camera {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          color: #abcbef;
        }
        > .img_box {
          position: absolute;
          height: 100%;
          width: 100%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .icon-close {
            position: absolute;
            right: -0.2rem;
            font-size: 0.8rem;
            top: -0.2rem;
            background-color: #e64340;
            color: #fff;
          }
        }
      }
    }
  }
  .btn_feed {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2rem;
    width: 80%;
    margin: 0 auto;
    button {
      width: 100%;
      background-color: #2d8dff;
      color: #fff;
      line-height: 2rem;
      border-radius: 1rem;
      font-size: 0.75rem;
    }
  }
}
</style>
