<template>
  <div class="wrap">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
      <div class="for_box" v-for="(item, index) in changeDetail" :key="index">
          <p>{{item.key}}</p>
          <ul>
              <li v-for="(itemSon, indexSon) in item.value" :key="indexSon">
                  <div class="left_box">
                      <p>{{itemSon.moneyFrom}}</p>
                      <p>{{itemSon.createTime | formatTime}}</p>
                  </div>
                  <span>{{itemSon.transferAccountMoney}}</span>
              </li>
          </ul>
      </div>
      </mt-loadmore>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "changeLog",
  data() {
    return {
      changeDetail: [],
      allLoaded: false,
      index: -1
    };
  },
  filters: {
    formatTime(date) {
      if (date != null && date != "") {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = "" + d.getFullYear(),
          hour = "" + d.getHours(),
          minute = "" + d.getMinutes(),
          second = "" + d.getSeconds();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        if (hour.length < 2) hour = "0" + hour;
        if (minute.length < 2) minute = "0" + minute;
        if (second.length < 2) second = "0" + second;
        return (
          [year, month, day].join("-") + " " + [hour, minute, second].join(":")
        );
      } else {
        return null;
      }
    }
  },
  created() {
    this.loadBottom();
  },
  methods: {
    loadBottom() {
      this.showMore();
    },
    showMore() {
      Indicator.open();
      this.index++;
      this.$http
        .post(
          this.baseUrl + "DisplayAccountDetailController/displayAccountDetail",
          {
            customerId: JSON.parse(localStorage.getItem("userInfo")).id,
            pageSize: 10,
            pageIndex: this.index
          }
        )
        .then(
          res => {
            console.log(JSON.stringify(res));
            let dataJson = res.body;
            let listAll = this.changeDetail;
            if (dataJson.statusCode == 1) {
              if (listAll.length <= 0) {
                this.changeDetail = dataJson.data;
              } else {
                dataJson.data.forEach(function(nv, ni) {
                  if (nv.value.length > 0) {
                    nv.value.forEach(function(nnv, nni) {
                      listAll[ni].value.push(nnv);
                    });
                  }
                });
              }
              let temFlag = 1;
              for (let value of dataJson.data) {
                if (value.value.length > 0) {
                  temFlag = 0;
                }
              }
              if (temFlag) {
                this.allLoaded = true;
                Toast("暂无更多数据");
              }
            } else {
              this.allLoaded = true;
              Toast("暂无更多数据");
            }
            Indicator.close();
            this.$refs.loadmore.onBottomLoaded();
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
  .for_box {
    > p {
      font-size: 0.6rem;
      color: #666;
      line-height: 1.5rem;
      padding-left: 0.8rem;
    }
    > ul {
      background-color: #fff;
      li {
        padding: 0 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3rem;
        border-bottom: 1px solid #ccc;
        &:last-of-type {
          border-bottom: 0;
        }
        > .left_box {
          p:first-of-type {
            font-size: 0.75rem;
            line-height: 1.5rem;
            color: #4d4d4d;
          }
          p:last-of-type {
            line-height: 1.5rem;
            color: #999;
            font-size: 0.6rem;
          }
        }
        > span {
          font-size: 1.1rem;
          color: #4d4d4d;
        }
      }
    }
  }
}
</style>
