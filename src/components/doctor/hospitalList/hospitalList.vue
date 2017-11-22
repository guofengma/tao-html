<template>
  <div>
      <div class="hospital" v-for="(item,index) in list" :key="index">
        <div class="hospital_left">
            <div class="hospital_img">
                <img src="../../../../static/imgs/hospital/search/tdf_search_hosptial.png" alt="">
            </div>
        </div>
        <ul class="hospital_right">
            <li><h2>{{item.hospitalName}}</h2></li>
            <li>{{item.hospitalType}}</li>
            <li>{{item.hospitalAddress}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:['list'],
};
</script>

<style lang="less" scoped>
@borderColor:rgb(238, 238, 238);
.hospital {
  background: #fff;
  padding:0.8rem 0rem;
  border-bottom:1px solid @borderColor;
  display: flex;
  &:last-child{
      border-bottom:0;
  }
  .hospital_left {
    width: 3.25rem;
    margin-right: 0.8rem;
    .hospital_img {
      width: 100%;
      height: 3.25rem;
      border-radius: 0.3rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .hospital_right {
    flex-grow: 1;
    li {
      color: rgb(102, 102, 102);
      font-size: 0.7rem;
      margin-bottom:0.3rem;
      h2 {
        font-size: 0.75rem;
        color: rgb(57, 57, 57);
      }
    }
  }
}
</style>
