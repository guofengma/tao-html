<template>
  <div>
      <div class="coupon">
          <input type="text" placeholder="请输入兑换码" @keyup="exchang($event)">
          <button>兑换</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    exchang(e) {
      e.target.parentNode.children[1].style.background = "rgb(255, 82, 82)";
      if (e.target.value) {
        console.log(e.target.value);
      } else {
        console.log(null);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.coupon {
  padding: 0.6rem;
  display: flex;
  align-items: center;
  input {
    flex-grow: 1;
    height: 2rem;
    border-radius: 0.3rem 0 0 0.3rem;
    padding: 0 0.6rem;
    &::-webkit-input-placeholder {
      color: rgb(176, 176, 176);
    } /* 使用webkit内核的浏览器 */
    &:-moz-placeholder {
      color: rgb(176, 176, 176);
    } /* Firefox版本4-18 */
    &::-moz-placeholder {
      color: rgb(176, 176, 176);
    } /* Firefox版本19+ */
    &:-ms-input-placeholder {
      color: rgb(176, 176, 176);
    }
  }
  button {
    height: 2rem;
    padding: 0 1.5rem;
    font-size: 0.7rem;
    color: #fff;
    background: #ccc;
    border-radius: 0 0.3rem 0.3rem 0;
  }
}
</style>
