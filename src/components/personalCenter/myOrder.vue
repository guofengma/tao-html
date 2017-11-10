<template>
    <div class="container">
        <div class="top_header">
            <mt-button @click.native.prevent="active = 'tab-container1'"><span :class="{'activeTab':active == 'tab-container1'}">全部</span></mt-button>
            <mt-button @click.native.prevent="active = 'tab-container2'"><span :class="{'activeTab':active =='tab-container2'}">代付款</span></mt-button>
            <mt-button @click.native.prevent="active = 'tab-container3'"><span :class="{'activeTab':active == 'tab-container3'}">待服务</span></mt-button>
            <mt-button @click.native.prevent="active = 'tab-container4'"><span :class="{'activeTab':active == 'tab-container4'}">服务中</span></mt-button>
            <mt-button @click.native.prevent="active = 'tab-container5'"><span :class="{'activeTab':active == 'tab-container5'}">待评价</span></mt-button>
        </div>
        <mt-tab-container v-model="active" swipeable>
            <mt-tab-container-item id="tab-container1">
                <pubOrderList />
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <mt-cell v-for="n in 2" :key="n" title="tab-container2"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container3">
                <mt-cell v-for="n in 3" :key="n" title="tab-container3"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container4">
                <mt-cell v-for="n in 4" :key="n" title="tab-container4"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container5">
                <mt-cell v-for="n in 5" :key="n" title="tab-container5"></mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import pubOrderList from '../personalCenter/pubComponents/pubOrderList'
// import test from '../hotDoctorList/hotDoctorList'
export default {
  name: "myOrder",
  data() {
    return {
      active: "tab-container1"
    };
  },
  methods: {
      showTab(e) {
          console.log(e);
      }
  },
  components: {
      pubOrderList
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
    border-bottom: 1px solid rgb(231,231,231);
    background-color: #fff;
    button {
        width: 20%;
        color: rgb(57,57,57);
        text-align: center;
        border: 0;
        background-color: #fff;
        span {
            font-size: .65rem;
            padding-bottom: .5rem;
            &.activeTab {
                color: rgb(86,163,255);
                border-bottom: 1.5px solid rgb(86,163,255);
            }
        }
    }
    .mint-button--default {
        box-shadow: none;
    }
}
</style>
