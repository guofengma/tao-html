<template>
    <div class="container">
        <div class="top_header">
            <mt-button data-show-id="tab-container1" @click.native.prevent="showNew"><span :class="{'activeTab':showid == 'tab-container1'}">全部</span></mt-button>
            <mt-button data-show-id="tab-container2" @click.native.prevent="showNew"><span :class="{'activeTab':showid == 'tab-container2'}">待付款</span></mt-button>
            <mt-button data-show-id="tab-container3" @click.native.prevent="showNew"><span :class="{'activeTab':showid == 'tab-container3'}">待服务</span></mt-button>
            <mt-button data-show-id="tab-container4" @click.native.prevent="showNew"><span :class="{'activeTab':showid == 'tab-container4'}">服务中</span></mt-button>
            <mt-button data-show-id="tab-container5" @click.native.prevent="showNew"><span :class="{'activeTab':showid == 'tab-container5'}">待评价</span></mt-button>
        </div>
        <mt-tab-container v-model="showid">
            <mt-tab-container-item id="tab-container1">
                <!-- 全部订单列表展示 -->
                <pubOrderList :showList="showid"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <pubOrderList :showList="showid"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container3">
                <pubOrderList :showList="showid"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container4">
                <pubOrderList :showList="showid"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container5">
                <pubOrderList :showList="showid"/>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
//引入公用医生列表子组件
import pubOrderList from "../pubComponents/pubOrderList";
export default {
  name: "myOrder",
  data() {
    return {
      showid: "tab-container1"
    };
  },
  created() {
    let id = this.$route.params.id;
    this.showid = id;
  },
  components: {
    pubOrderList
  },
  methods: {
    showNew(e) {
      let showId = e.target.dataset.showId;
      this.showid = showId
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
  button {
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
