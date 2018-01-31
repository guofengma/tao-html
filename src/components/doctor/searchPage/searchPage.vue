<template>
  <div class="home">
    <div class="search_box">
      <ul class="search_top">
        <li class="search">
          <div class="search_icon"><img src="../../../../static/imgs/hospital/index/tdf_hospital_search.png" alt=""></div>
          <input type="text" placeholder="医生 医院 科室 疾病" @keydown="Enter($event)">
        </li>
        <router-link tag="li" to="/home">取消</router-link>
      </ul>
      <div class="history_search" v-if="isHistory">
        <div class="item_top">
          <h2>历史搜索</h2>
          <div class="del" @click="Delhistory"><img src="../../../../static/imgs/hospital/index/tdf_search_clean.png" alt="del"></div>
        </div>
        <ul>
          <li v-for="(item,index) in historySearch" :key="index" @click="clickOption(item)">{{item}}</li>
        </ul>
      </div>
      <div class="hot_search">
        <div class="item_top">
          <h2>热门搜索</h2>
        </div>
        <ul>
          <li v-for="(item,index) in hotSearch" :key="index" @click="clickOption(item.keyWord)">{{item.keyWord}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHistory: true,
      historySearch:[], // 历史搜索
      hotSearch:['感冒','胸闷喘不过气','嗓子疼','135','感冒发烧','感冒发烧','腰背酸痛'], // 热门搜索
    };
  },
  computed: {
  },
  created(){
    this.historySearch = this.getSearchHistory();
    this.getHotHistor(); // 获取热门搜索历史
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 doctorDetail 不缓存，即刷新
    next();
  },
  methods: {
    Delhistory: function() {
      this.isHistory = !this.isHistory;
    },
    // 读取本地存储的数据
    getSearchHistory(){
      var arr = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : [];
      return arr;
    },
    // 保存本地存储的数据
    saveSearchHistory(data){
      localStorage.searchHistory = JSON.stringify(data);
    },
    // 点击查询
    clickOption(key){
      this.$router.push({path:'/searchDoctorList',query:{key:key}});
    },
     // 获取热门搜索历史
    getHotHistor(){
      var url = this.baseUrl + "doc/getHotSearchHistory";
      this.$http.post(url).then(res => {
        console.log(res.data)
        this.hotSearch = res.data.data.slice(0,7);
      },res => {
        console.log('error')
      })
    },
    // 回车查询
    Enter(e) {
      var _this = this;
      if (e.keyCode == 13) {
        var keywords = e.target.value;
        // 添加到历史搜索中
        if(_this.historySearch.indexOf(keywords) == -1){
          _this.historySearch.push(keywords); 
          _this.saveSearchHistory(_this.historySearch);
        }
        // window.location.href = "searchDoctorList?keywords=" + encodeURI(encodeURI(keywords));
        this.$router.push({path:'/searchDoctorList',query:{key:keywords}});
        // this.$router.replace({name:'searchDoctorList',params:{key:keywords}})
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../static/less/globalVar.less";
@bgColor: rgb(239, 244, 250);
@borderColor: rgb(220, 220, 220);
.home {
  padding-top: 0.3rem;
}
.search_box {
  padding: 0 0.6rem;
  background: #fff;
}
.search_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  li {
    color: @fontColor;
    font-size: 0.65rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.search {
      width: 75%;
      height: 1.6rem;
      border-radius: 1rem;
      background: @bgColor;
      padding: 0.2rem 0.8rem;
      margin-right: 0.6rem;
      flex-grow: 1;

      .search_icon {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      input {
        height: 100%;
        width: 13rem;
        font-size: 0.8rem;
        background: transparent;
        &:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: @placeholder;
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: @placeholder;
        }
        &:-ms-input-placeholder {
          color: @placeholder;
        }
        &::-webkit-input-placeholder {
          color: @placeholder;
        }
      }
    }
  }
}
.item_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  h2 {
    font-size: 0.75rem;
    color: @fontColor;
  }
  .del {
    width: 0.8rem;
    height: 0.8rem;
    img {
      width: 100%;
    }
  }
}
.history_search,
.hot_search {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 0.3rem 0.5rem;
      border-radius: 0.3rem;
      border: 1px solid @borderColor;
      color: rgb(102, 102, 102);
      margin: 0 0.8rem 0.8rem 0;
      background: rgb(239, 244, 250);
    }
  }
}
</style>
