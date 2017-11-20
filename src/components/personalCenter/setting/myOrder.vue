  <template>
    <div class="container">
        <ul class="top_header">
          <li>
            <span data-show-id="1" data-show-value="全部" :class="{'activeTab': showid==1}" @click="showNew">全部</span>
          </li>
          <li>
            <span data-show-id="2" data-show-value="待付款" :class="{'activeTab': showid==2}" @click="showNew">待付款</span>
          </li>
          <li>
            <span data-show-id="3" data-show-value="待服务" :class="{'activeTab': showid==3}" @click="showNew">待服务</span>
          </li>
          <li>
            <span data-show-id="4" data-show-value="服务中" :class="{'activeTab': showid==4}" @click="showNew">服务中</span>
          </li>
          <li>
            <span data-show-id="5" data-show-value="待评价" :class="{'activeTab': showid==5}" @click="showNew">待评价</span>
          </li>
        </ul>
        <pubOrderList :category="showValue" :myKey="sortText" :showI="showid"/>
    </div>
</template>

<script>
//引入公用医生列表子组件
import pubOrderList from "../pubComponents/pubOrderList";
export default {
  name: "myOrder",
  data() {
    return {
      showid: 1,
      showValue: '',
      myOrderChooseShow: false,
      sortText: '我的订单'
    };
  },
  created() {
    let id = this.$route.params.id;
    switch (id) {
      case '1': this.showValue = '全部'
      break;
      case '2': this.showValue = '待付款'
      break;
      case '3': this.showValue = '待服务'
      break;
      case '4': this.showValue = '服务中'
      break;
      case '5': this.showValue = '待评价'
      break;
    }
    this.showid = id;
  },
  components: {
    pubOrderList
  },
  methods: {
    showNew(e) {
      let showId = e.target.dataset.showId
      let showValue = e.target.dataset.showValue
      this.showid = showId
      this.showValue = showValue
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: #eff4fa;
  height: 100%;
}
.top_header {
  display: flex;
  align-items: center;
  height: 2rem;
  border-bottom: 1px solid rgb(231, 231, 231);
  background-color: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1001;
  li {
    width: 20%;
    color: rgb(57, 57, 57);
    text-align: center;
    border: 0;
    background-color: #fff;
    span {
      font-size: 0.65rem;
      padding-bottom: 0.5rem;
      &.activeTab {
        color: rgb(86, 163, 255);
        border-bottom: 1.5px solid rgb(86, 163, 255);
      }
    }
  }
  .mint-button--default {
    box-shadow: none;
  }
}
</style>
