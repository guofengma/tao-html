<template>
  <div class="box">
    <div class="name_box">
      <input type="text" v-model.trim="nameText">
      <i class="iconfont icon-close" @click="emptyValue"></i>
    </div>
    <div class="button_box">
        <button @click.stop="saveName">保存</button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "editName",
  data() {
    return {
      nameText: ""
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.nameText = userInfo.name;
  },
  methods: {
    emptyValue() {
      this.nameText = "";
    },
    saveName() {
      //调取用户保存按钮
      if (!this.nameText) {
        Toast("修改昵称不能为空");
        return false;
      }
      this.$http
        .post(this.baseUrl + "customer/updateCustomerName", {
          customerId: localStorage.getItem("customerId"),
          name: this.nameText
        })
        .then(
          res => {
            res.body.object.headerImage =
              this.baseImgUrl + res.body.object.headerImage;
            localStorage.setItem("userInfo", JSON.stringify(res.body.object));
            Toast("成功修改昵称");
          },
          res => {
            console.log(res);
          }
        );
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  .name_box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.6rem;
    background-color: #fff;
    padding: 0 0.6rem;
    height: 2.25rem;
    input {
      font-size: 0.75rem;
      color: rgb(57, 57, 57);
    }
  }
  .button_box {
    width: 80%;
    margin: 0 auto;
    margin-top: 0.6rem;
    button {
      width: 100%;
      background-color: #2f8fff;
      color: #fff;
      line-height: 1.8rem;
      border-radius: 0.3rem;
    }
  }
}
</style>
