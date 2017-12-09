<template>
  <div class="wrap">
      <div class="eva_top">
          <div class="eva_top_left">
              <img :src="docBaseInfo.photo" alt="">
              <div class="top_left_text">
                  <p>{{docBaseInfo.name}}</p>
                  <p>{{docBaseInfo.JobTitle}}</p>
              </div>
          </div>
          <div class="eva_top_right" @click="focusDoc(docBaseInfo.id)">
              <img :src="focusDocImg" alt="">
              <span>关注该医生</span>
          </div>
      </div>
      <div class="eva_top_dis">
              <p>擅长： {{docBaseInfo.beGoodAtAsDoctor}}</p>
        </div>
        <div class="eav_box">
            <p>您对医生的评价满意吗？</p>
            <ul>
                <li data-index="0" @click="evaLevel" :class="{'active':evaLevelData[0].chooseTrue}">
                    <img :src="evaLevelData[0].url" alt="">
                    <span>满意</span>
                </li>
                <li data-index="1" @click="evaLevel" :class="{'active':evaLevelData[1].chooseTrue}">
                    <img :src="evaLevelData[1].url" alt="">
                    <span>一般</span>
                </li>
                <li data-index="2" @click="evaLevel" :class="{'active':evaLevelData[2].chooseTrue}">
                    <img :src="evaLevelData[2].url" alt="">
                    <span>不满意</span>
                </li>
            </ul>
        </div>
        <div class="modal_choose_box">
            <ul class="choose_box_top">
                <li v-for="(item,index) in evaModalData" :key="index" :class="{'active001':item.selected}" :data-index="index" :data-id="item.id" @click="chooseModal">{{item.content}}</li>
            </ul>
            <!-- <ul class="choose_box_bottom">
                <li data-index="3" @click="chooseModal">意见很有帮助</li>
                <li data-index="4" @click="chooseModal">态度非常好</li>
                <li data-index="5" @click="chooseModal">回复很及时</li>
            </ul> -->
        </div>
        <div class="eav_fill_box">
            <p>给医生一些评价或建议吧~</p>
            <textarea name="" cols="" rows="6" placeholder="写下您对医生的建议吧~" v-model.trim="upText"></textarea>
        </div>
        <div class="eva_end_doc">
            <img :src="endDocData" alt="" @click="endDoc">
            <span>屏蔽此医生，不再收到他的回答</span>
        </div>
        <a href="javascript:;" class="eva_btn" @click="evaBtn">提交评价</a>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "Evaluate",
  data() {
    return {
      paramsSrots: {}, //提交所需参数
      docBaseInfo: {},
      focusTrue: false,
      focusDocImg: require("../../../../static/imgs/evaluate/tdf_pingjia_gzh.png"),
      evaLevelData: [
        {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_my_pre.png"),
          chooseTrue: true
        },
        {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_yb.png"),
          chooseTrue: false
        },
        {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_bmy.png"),
          chooseTure: false
        }
      ],
      endDocTrue: false,
      endDocData: require("../../../../static/imgs/evaluate/tdf_pingjia_select.png"),
      evaModalDataAll: [],
      evaModalData: [],
      upModalId: [],
      upText: ""
    };
  },
  created() {
    let doctorId = this.$route.params.doctorId;
    let customerId = this.$route.params.customerId;
    let orderId = this.$route.params.orderId;
    let orderType = this.$route.params.orderType;
    this.paramsSrots = {
      doctorId,
      customerId,
      orderId,
      orderType
    };
    //请求医生基本信息
    this.$http
      .post(this.baseUrl + "newDoctorBaseInfo/getDoctorDetail", { doctorId })
      .then(
        res => {
          let docBaseInfo = res.body.obj;
          docBaseInfo.photo = this.baseImgUrl + docBaseInfo.photo;
          this.docBaseInfo = docBaseInfo;
        },
        res => {
          console.log(res);
        }
      );
    //检验用户是否已经关注该医生
    this.$http
      .post(this.baseUrl + "doc/checkDoctorAttention", {
        userId: JSON.parse(localStorage.getItem("userInfo")).id,
        doctorId
      })
      .then(
        res => {
          if (res.body.object == 1) {
            this.focusTrue = true;
            this.focusDocImg = require("../../../../static/imgs/evaluate/tdf_pingjia_gzh_pre.png");
          }
        },
        res => {
          console.log(res);
        }
      );
    //请求评价模板
    this.$http
      .post(this.baseUrl + "diseasedescription/getContentModelGroupByTagType")
      .then(
        res => {
          for (let value of res.body.data) {
            for (let valueSon of value) {
              valueSon.selected = false;
            }
          }
          this.evaModalDataAll = res.body.data;
          this.evaModalData = res.body.data[0];
        },
        res => {
          console.log(res);
        }
      );
  },
  methods: {
    focusDoc(docid) {
      //关注医生
      this.focusTrue = !this.focusTrue;
      if (this.focusTrue) {
        Toast('成功关注该医生');
        this.focusDocImg = require("../../../../static/imgs/evaluate/tdf_pingjia_gzh_pre.png");
      } else {
        Toast('已取消关注该医生');
        this.focusDocImg = require("../../../../static/imgs/evaluate/tdf_pingjia_gzh.png");
      }
      this.$http
        .post(this.baseUrl + "doc/attentionDoctor", {
          userid: JSON.parse(localStorage.getItem("userInfo")).id,
          docid,
          type: this.focusTrue ? 1 : 0
        })
        .then(
          res => {
            console.log(res);
          },
          res => {
            console.log(res);
          }
        );
    },
    evaLevel(e) {
      //评价是否满意
      let index = e.currentTarget.dataset.index;
      this.evaLevelData = [
        {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_my.png"),
          chooseTrue: false
        },
        {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_yb.png"),
          chooseTrue: false
        },
        {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_bmy.png"),
          chooseTure: false
        }
      ];
      for (let value of this.evaModalDataAll) {
        for (let valueSon of value) {
          valueSon.selected = false;
        }
      }
      if (index == 0) {
        this.$set(this.evaLevelData, 0, {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_my_pre.png"),
          chooseTrue: true
        });
        this.evaModalData = this.evaModalDataAll[0];
      } else if (index == 1) {
        this.$set(this.evaLevelData, 1, {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_yb_pre.png"),
          chooseTrue: true
        });
        this.evaModalData = this.evaModalDataAll[1];
      } else if (index == 2) {
        this.$set(this.evaLevelData, 2, {
          url: require("../../../../static/imgs/evaluate/tdf_pingjia_bmy_pre.png"),
          chooseTrue: true
        });
        this.evaModalData = this.evaModalDataAll[2];
      }
    },
    chooseModal(e) {
      let modalId = e.target.dataset.id;
      let index = e.target.dataset.index;
      this.evaModalData[index].selected = !this.evaModalData[index].selected;
    },
    endDoc() {
      this.endDocTrue = !this.endDocTrue;
      if (this.endDocTrue) {
        this.endDocData = require("../../../../static/imgs/evaluate/tdf_pingjia_select_pre.png");
      } else {
        this.endDocData = require("../../../../static/imgs/evaluate/tdf_pingjia_select.png");
      }
    },
    //提交评价
    evaBtn() {
      let params = this.paramsSrots;
      this.upModalId = [];
      for(let value of this.evaModalData) {
        if(value.selected) {
          this.upModalId.push(value.id);
        }
      }
      let upModalId = this.upModalId;
      if (upModalId.length <= 0) {
        Toast("请先选择您的满意度");
        return false;
      }
      params.contentModelId = upModalId.join(",");
      params.isShield = this.endDocTrue;
      params.contentComment = this.upText;
      this.$http
        .post(
          this.baseUrl + "diseasedescription/submitCustomerEvaluate",
          params
        )
        .then(
          res => {
            if(res.body.statusCode == 1) {
              Toast('评论成功');
              setTimeout(()=>{
                this.$router.push({name:'myOrder',params: {id: '1'}})
              },2000);
            }
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
.wrap {
  min-height: 100%;
  background-color: #fff;
}
.eva_top {
  display: flex;
  justify-content: space-between;
  padding-left: 0.6rem;
  padding-top: 1rem;
  .eva_top_left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    > .top_left_text {
      margin-left: 1rem;
      p:first-of-type {
        font-size: 0.8rem;
        color: #393939;
      }
      p:last-of-type {
        font-size: 0.7rem;
        color: #393939;
        margin-top: 0.4rem;
      }
    }
  }
  .eva_top_right {
    width: 5.6rem;
    height: 1.5rem;
    align-self: center;
    background: url("../../../../static/imgs/evaluate/tdf_pingjia_gzhbg.png")
      no-repeat center/100% 100%;
    display: flex;
    align-items: center;
    padding-left: 0.6rem;
    > img {
      width: 0.9rem;
    }
    > span {
      color: #fff;
      font-size: 0.65rem;
      padding-left: 0.5rem;
    }
  }
}
.eva_top_dis {
  margin: 0 0.6rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eeeeee;
  p {
    font-size: 0.65rem;
    margin-top: 0.6rem;
    color: #6c6c6c;
    margin-left: 3.5rem;
  }
}
.eav_box {
  padding: 0 0.6rem;
  margin-top: 1rem;
  > p {
    font-size: 0.75rem;
    color: #393939;
  }
  > ul {
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;
    li {
      display: flex;
      align-items: center;
      img {
        width: 1.9rem;
      }
      span {
        padding-left: 0.6rem;
        font-size: 0.7rem;
        color: #999;
      }
      &.active {
        span {
          color: #393939;
        }
      }
    }
  }
}
.modal_choose_box {
  padding: 0 0.6rem;
  > .choose_box_top {
    display: flex;
    flex-wrap: wrap;
    > li {
      margin-top: 0.8rem;
      line-height: 1.25rem;
      padding: 0 0.4rem;
      border: 1px solid #52a3ff;
      color: #666;
      border-radius: 0.3rem;
      font-size: 0.65rem;
      margin-right: 0.6rem;
      &.active001 {
        background-color: #52a3ff;
        color: #fff;
      }
    }
  }
  > .choose_box_bottom {
    display: flex;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    > li {
      margin-top: 0.8rem;
      line-height: 1.25rem;
      padding: 0 0.4rem;
      font-size: 0.65rem;
      border: 1px solid #52a3ff;
      color: #666;
      border-radius: 0.3rem;
      &:nth-of-type(n + 2) {
        margin-left: 0.8rem;
      }
    }
  }
}
.eav_fill_box {
  padding: 1rem 0.6rem 0 0.6rem;
  > p {
    font-size: 0.75rem;
    color: #393939;
    padding-bottom: 0.8rem;
  }
  > textarea {
    padding: 0.5rem;
    border: 1px solid #d6d6d6;
    border-radius: 0.4rem;
    width: 100%;
    height: 6.25rem;
  }
}
.eva_end_doc {
  margin-top: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 0.8rem;
    margin-right: 0.4rem;
  }
  p {
    font-size: 0.65rem;
    color: #666;
  }
}
.eva_btn {
  display: block;
  width: 80%;
  margin: 0 auto;
  margin-top: 1rem;
  line-height: 2rem;
  background-color: #52a3ff;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
}
</style>
