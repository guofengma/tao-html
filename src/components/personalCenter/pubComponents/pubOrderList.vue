<template>
<div>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
  <ul v-if="!noOrderShow" class="order_list">
        <li v-for='(item, index) in list' :key='index' >
            <div class="order_top">
                <div>
                    <img :src="item.heardimage" alt="">
                    <span>{{item.doctorname}}</span>
                    <b>{{item.departmentname}}</b>
                </div>
                <span>{{item.status}}</span>
            </div>
            <div class="order_main">
                <p>症状描述：</p>
                <p>{{item.description}}</p>
            </div>
            <div class="order_money">
                <span>{{item.servertype}}</span>
                <span>￥{{item.servermoney}}</span>
            </div>
            <div class="order_foot">
                <div>
                    <span>预约复诊</span>
                </div>
            </div>
        </li>
    </ul>
  </mt-loadmore>
  <div v-if="noOrderShow" class="no_order">
        <div>
          <img :src="noOrderList[showI-1].url" alt="">
          <p>{{noOrderList[showI-1].name}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "pubOrderList",
  data() {
    return {
      list: [],
      index: 0,
      allLoaded: false,
      autoFill: false,
      noOrderShow: false,
      noOrderList: [
        {
          name: "暂无订单哦！",
          url: require("../../../../static/imgs/aboutOrder/tdf_default-page_chufnag.png")
        },
        {
          name: "暂无待付款订单哦~",
          url: require("../../../../static/imgs/aboutOrder/tdf_default-page_dfk.png")
        },
        {
          name: "暂无待服务订单哦~",
          url: require("../../../../static/imgs/aboutOrder/tdf_default-page_dfw.png")
        },
        {
          name: "暂无服务中订单哦~",
          url: require("../../../../static/imgs/aboutOrder/tdf_default-page_dfw.png")
        },
        {
          name: "暂无待评价订单哦~",
          url: require("../../../../static/imgs/aboutOrder/tdf_default-page_dpj.png")
        }
      ]
    };
  },
  props: {
    category: {
      type: String,
      default: ""
    },
    myKey: {
      type: String,
      default: ""
    },
    showI: {
      type: String,
      default: 0
    }
  },
  watch: {
    category() {
      this.noOrderShow = false;
      this.allLoaded = false;
      this.index = 0;
      this.list = [];
      this.showMore();
    },
    myKey() {
      this.allLoaded = false;
      this.index = 0;
      this.list = [];
      this.showMore();
    }
  },
  created() {
    this.showMore();
  },
  methods: {
    loadBottom() {
      this.showMore();
    },
    showMore() {
      Indicator.open();
      this.index += 1;
      let data = {};
      if (this.category == "全部" && this.myKey == "我的订单") {
        data = {
          customerId: "880631824E9A482DBA94B6138A5F91B2",
          index: this.index,
          pageSize: 10
        };
      } else if (this.category == "全部" && this.myKey != "我的订单") {
        data = {
          customerId: "880631824E9A482DBA94B6138A5F91B2",
          index: this.index,
          pageSize: 10,
          key: this.myKey
        };
      } else if (this.category != "全部" && this.myKey == "我的订单") {
        data = {
          customerId: "880631824E9A482DBA94B6138A5F91B2",
          index: this.index,
          pageSize: 10,
          category: this.category
        };
      } else {
        data = {
          customerId: "880631824E9A482DBA94B6138A5F91B2",
          index: this.index,
          pageSize: 10,
          key: this.myKey,
          category: this.category
        };
      }
      this.$http
        .post(this.baseUrl + "orderList/getOrderList", data)
        .then(res => {
          let dataJson = res.body;
          if (dataJson.statusCode == 1) {
            console.log(dataJson);
            if (dataJson.obj.length > 0) {
              let objList = dataJson.obj;
              for (let value of objList) {
                value.heardimage = this.baseImgUrl + value.heardimage;
                this.list.push(value);
              }
              this.list.concat(dataJson);
            } else {
              this.allLoaded = true;
              Toast("暂无更多数据");
            }
            if (this.list.length <= 0) {
              this.noOrderShow = true;
            }
          }
          Indicator.close();
          this.$refs.loadmore.onBottomLoaded();
        });
    }
  }
};
</script>

<style lang='less' scoped>
.order_list {
  height: 100%;
  li {
    &:first-of-type {
      padding-top: 2rem;
    }
    margin-bottom: 0.4rem;
    .order_top {
      display: flex;
      justify-content: space-between;
      padding: 0 0.6rem;
      background-color: #fff;
      height: 2.3rem;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        img {
          height: 1.5rem;
          width: 1.5rem;
        }
        span {
          color: rgb(57, 57, 57);
          font-size: 0.75rem;
          padding-left: 0.6rem;
        }
        b {
          padding-left: 1.2rem;
          color: rgb(57, 57, 57);
          font-size: 0.75rem;
        }
      }
      > span {
        font-size: 0.75rem;
        color: rgb(82, 163, 255);
      }
    }
    .order_main {
      background-color: #f8f8f8;
      padding: 0 0.6rem;
      padding-bottom: 0.5rem;
      p:nth-of-type(1) {
        font-size: 0.7rem;
        color: rgb(102, 102, 102);
        padding-top: 0.5rem;
        padding-bottom: 0.3rem;
      }
      p:nth-of-type(2) {
        font-size: 0.65rem;
        color: rgb(153, 153, 153);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .order_money {
      display: flex;
      justify-content: space-between;
      padding: 0 0.6rem;
      background-color: #fff;
      height: 2.25rem;
      align-items: center;
      border-bottom: 1px solid rgb(231, 231, 231);
      span:first-of-type {
        font-size: 0.75rem;
        color: rgb(57, 57, 57);
      }
      span:last-of-type {
        font-size: 1rem;
        color: rgb(57, 57, 57);
      }
    }
    .order_foot {
      display: flex;
      justify-content: flex-end;
      padding-right: 0.6rem;
      height: 2.25rem;
      align-items: center;
      background-color: #fff;
      > div {
        height: 1.4rem;
        width: 3.75rem;
        border: 1px solid rgb(255, 82, 82);
        border-radius: 0.2rem;
        line-height: 1.4rem;
        text-align: center;
        span {
          color: rgb(255, 82, 82);
          font-size: 0.7rem;
        }
      }
    }
  }
}

.no_order {
  width: 100%;
  margin-top: 7.5rem;
  div {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    img {
      width: 60%;
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.65rem;
      color: rgb(177, 177, 177);
    }
  }
}
</style>
