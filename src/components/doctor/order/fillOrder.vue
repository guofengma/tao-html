<template>
  <div>
    <div class="tips">温馨提示：急重病患者不适合在线咨询 / 诊疗，请立即前往当地医院就医。</div>  
    <div class="fill_order">
        <!-- 选择就诊人 -->
        <div class="add_personal">
            <h2>选择就诊人</h2>
            <ul class="patient_list">
                <li>张大王</li>
                <li>＋</li>
            </ul>
        </div>
        <div class="phone">
            <h2>接听者电话</h2>
            <div class="phone_num">18404984908</div>
        </div>
        <div class="patient_info">
            <h2>请填写患者性别、年龄及症状等详细信息</h2>
            <div class="patient_print">
                <textarea name="" id="" placeholder="例：我今年40岁了，男。前一段时间出现了眩晕的症状，到医院诊断为高血压，希望进一步咨询专家，后续预防措施。"></textarea>
                <ul class="patient_pic">
                    <li></li>   
                    <li></li>   
                    <li>+</li>   
                </ul>
                <p>可传患处照片、检查单等相关信息</p>
                <p><span class='help_icon'><img src="../../../../static/imgs/hospital/order/tdf_order_why.png" alt=""></span> 如何拍照X光、CT等影像资料<span class="link_more">“点击了解”</span></p>
            </div>
        </div>
        <!-- 提交 -->
        <div class="order_btn">确认提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created(){
    // this.getCustomers(customerId);
  },
  methods: {
    // 获取就诊人信息
    getCustomers(customerId) {
      var url = this.baseUrl + "allorder/getCustomers";
      this.$http.post(url, { customerId: customerId }).then(
        res => {
          console.log(res.data);
        },
        res => {
          console.log("error");
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@tipColor: rgb(255, 82, 82);
@fontColor: rgb(57, 57, 57);
@font1Color: rgb(153, 153, 153);
@partbgColor: rgb(239, 244, 250);
.tips {
  padding: 0.35rem 0.6rem;
  font-size: 0.65rem;
  color: @tipColor;
  background: @partbgColor;
}
.fill_order {
  padding: 0.6rem;
  background: #fff;
  // 添加就诊人
  .add_personal {
    padding: 0 0rem 0.8rem;
    background: #ffffff;
    h2 {
      color: @fontColor;
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .patient_list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      li {
        padding: 0.3rem 0.6rem;
        font-size: 0.7rem;
        color: @font1Color;
        text-align: center;
        border: 1px solid rgb(204, 204, 204);
        border-radius: 0.3rem;
        margin-right: 0.6rem;
      }
    }
  }
  //   接听者电话
  .phone {
    margin-bottom: 0.4rem;
    h2 {
      color: @fontColor;
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .phone_num {
      padding: 0.6rem;
      background: @partbgColor;
      border-radius: 0.3rem;
      font-size: 0.75rem;
      color: @fontColor;
    }
  }
  // 填写症状等信息
  .patient_info {
    width: 100%;
    padding: 0.6rem 0;
    h2 {
      color: @fontColor;
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
    .patient_print {
      border-radius: 0.3rem;
      background: @partbgColor;
      padding: 0.6rem;
      margin-bottom: 2rem;
      textarea {
        width: 100%;
        height: 5rem;
        background: transparent;
        border-bottom: 1px solid rgb(216, 224, 234);
        font-size: 0.75rem;
        font-family: "Micorsoft YaHei";
        margin-bottom: 0.6rem;
        &::-webkit-input-placeholder {
          color: rgb(176, 176, 176);
        } /* 使用webkit内核的浏览器 */
        &:-moz-placeholder {
          color: rgb(176, 176, 176);
        } /* Firefox版本4-18 */
        &::-moz-placeholder {
          color: rgb(176, 176, 176);
        } /* Firefox版本19+ */
        &:-ms-input-placeholder {
          color: rgb(176, 176, 176);
        }
      }
      // 患者照片
      .patient_pic {
        display: flex;
        margin-bottom: 0.6rem;
        li {
          width: 3.75rem;
          height: 3.75rem;
          border-radius: 0.3rem;
          margin-right: 0.4rem;
          background: #ccc;
        }
      }
      p {
        font-size: 0.65rem;
        color: rgb(102, 102, 102);
        margin-bottom: 0.5rem;
        .help_icon {
          display: inline-block;
          width: 0.6rem;
          height: 0.6rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .link_more {
          color: #3794fe;
        }
      }
    }
  }
  // 提交
  .order_btn {
    width: 16.3rem;
    line-height: 2rem;
    color: #fff;
    border-radius: 1rem;
    background: #3794fe;
    font-size: 0.75rem;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1.25rem;
  }
}
</style>
