<template>
  <div class="wrap">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="autoFill">
      <ul>
          <router-link tag="li" :to="{path: '/doctorDetail',query:{dotorId: item.id}}" v-for="(item, index) in list" :key="index">
              <img :src="item.header" alt="">
              <div class="hosptail">
                  <p>{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.departmentName}}</p>
                  <p>{{item.hospitalName}}</p>
              </div>
          </router-link>
      </ul>
      </mt-loadmore>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "pubDocList",
  data() {
    return {
      index: 0,
      allLoaded: false,
      autoFill: false,
      list: []
    };
  },
  props: {
    customerId: {
      type: String,
      default: ""
    }
  },
  created() {
      this.loadBottom();
  },
  methods: {
    loadBottom() {
      Indicator.open();
      this.index += 1;
      this.$http
        .post(this.baseUrl + "health/customerDoctorList", {
            customerId: this.customerId,
            pageNo: this.index,
            pageSize: 10
        })
        .then(res => {
          let dataJson = res.body;
          if (dataJson.statusCode == 1001) {
            if (dataJson.data.length > 0) {
              let objList = dataJson.data;
              for (let value of objList) {
                value.header = this.baseImgUrl + value.header;
                this.list.push(value);
              }
            } else {
              this.allLoaded = true;
              Toast("暂无更多数据");
            }
            // if (this.list.length <= 0) {
            //   this.noOrderShow = true;
            // }
          }
          console.log(this.list);
          Indicator.close();
          this.$refs.loadmore.onBottomLoaded();
        });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  background-color: rgb(239, 244, 250);
  ul {
    padding-top: 0.6rem;
    li {
      display: flex;
      justify-content: flex-start;
      padding: 0 0.6rem;
      background-color: #fff;
      border-bottom: 1px solid rgb(238, 238, 238);
      &:last-of-type {
        border-bottom: 0;
      }
      img {
        height: 2.25rem;
        width: 2.25rem;
        border-radius: 50%;
        margin: 0.75rem 0;
        margin-right: 0.8rem;
      }
      .hosptail {
        p:nth-of-type(1) {
          font-size: 0.75rem;
          color: rgb(57, 57, 57);
          margin-top: 0.8rem;
        }
        p:nth-of-type(2) {
          font-size: 0.7rem;
          color: rgb(102, 102, 102);
          margin-top: 0.3rem;
        }
      }
    }
  }
}
</style>
