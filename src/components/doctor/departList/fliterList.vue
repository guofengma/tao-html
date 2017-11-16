<template>
  <div class="home">
      <div class="fliter_item">
          
      </div>
      <h2 class="fliter_top">服务类型</h2>
      <ul class="fliter_list">
          <li>健康咨询</li>
          <li>准时预约</li>
          <li>家庭医生</li>
      </ul>
      <h2 class="fliter_top">服务类型</h2>
      <ul class="fliter_list">
          <li>健康咨询</li>
          <li>准时预约</li>
          <li>家庭医生</li>
      </ul>
      <ul class="btn_box">
          <li>重置</li>
          <li>完成</li>
      </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.fliter_top {
  line-height: 2rem;
  border-bottom: 1px solid #ccc;
  padding-left: 1rem;
  position: relative;
  background: #fff;
  &::after {
    content: "";
    display: block;
    width: 0.2rem;
    height: 0.9rem;
    position: absolute;
    background: #ff5252;
    left: 0;
    top: 50%;
    margin-top: -0.45rem;
  }
}
.fliter_list {
  padding: 0.75rem 0.6rem 1.3rem;
  display: flex;
  background: #fff;
  li {
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
    border: 1px solid #ccc;
    color: #999;
    font-size: 0.75rem;
    margin: 0 0.7rem 0.7rem 0;
  }
}
.btn_box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 1.8rem 1.2rem 1rem;
  li {
    margin-left: 2rem;
    color: rgb(82, 163, 255);
    font-size: 0.75rem;
  }
}
</style>
