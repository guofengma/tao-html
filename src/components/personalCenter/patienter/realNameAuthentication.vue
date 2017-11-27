<template>
  <div class="wrap">
    <ul class="wait_box">
      <li>
        <i class="iconfont icon-roundcheck"></i>
      </li>
      <li>
        <p>提交成功</p>
      </li>
      <li>
        <p>1~3个工作日完成审核</p>
      </li>
    </ul>
    <ul class="show_base">
      <li>
        <span>姓名</span>
        <b>徐亮</b>
      </li>
      <li>
        <span>身份证号</span>
        <b>411502199209078019</b>
      </li>
      <li>
        <span>证件照片</span>
        <img src="../../../../static/imgs/patienter/tdf_family_shfzh.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "realNameAuthentication"
};
</script>

<style lang="less" scoped>
.wrap {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
.wait_box {
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  li:first-of-type {
    padding-top: 2rem;
    i {
      font-size: 2rem;
      color: rgb(82,163,255);
    }
  }
  li:nth-of-type(2) {
    p {
      margin-top: .4rem;
    color: rgb(57,57,57);
    font-size: .9rem;
    }
  }
  li:last-of-type {
    margin: .4rem 0 2rem 0;
    p {
      font-size: .65rem;
      color: rgb(102,102,102);
    }
  }
}
.show_base {
  margin-top: .35rem;
  background-color: #fff;
  li {
    height: 2.25rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(238,238,238);
    span {
      padding-left: .8rem;
      flex: 2.5;
      font-size: .75rem;
      color: rgb(57,57,57);
    } 
    b {
      font-size: .75rem;
      color: rgb(57,57,57);
      flex: 7.5;
    }
    &:last-of-type {
      height: auto;
      border-bottom: 0;
      padding-right: 1rem;
      padding-bottom: .8rem;
      span {
        align-self: flex-start;
        line-height: 2.25rem;
      }
      img {
        margin-top: .7rem;
        display: block;
        flex: 7.5;
      }
    }
  }
}
</style>
