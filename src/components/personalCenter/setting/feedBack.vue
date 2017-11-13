<template>
  <ul class="wrap">
      <li>
          <p>问题与意见</p>
      </li>
      <li>
          <textarea name="" rows="6" placeholder="请输入不少于10个字的描述"></textarea>
          <span>10/200</span>
      </li>
      <li class="up_img">
          <div>
              <span>请提供相关文字的截图或者照片</span>
              <i>0/4</i>
          </div>
          <ul>
              <li>
                <input type="file">
                <i class="iconfont icon-camera"></i>
              </li>
              <li>
                <input type="file">
                <i class="iconfont icon-camera"></i>
              </li>
              <li>
                <input type="file">
                <i class="iconfont icon-camera"></i>
              </li>
              <li>
                <input type="file">
                <i class="iconfont icon-camera"></i>
              </li>
          </ul>
      </li>
      <li class="btn_feed">
        <button>确认提交</button>
      </li>
  </ul>
</template>

<script>
export default {
  name: "feedBack"
};
</script>

<style lang="less" scoped>
::-webkit-input-placeholder{
  color: rgb(176,176,176);
  font-size: .75rem;
}
.wrap {
  background-color: #fff;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  li:nth-of-type(1) {
    padding: .6rem 1.2rem;
    p {
      font-size: .75rem;
      color: rgb(57,57,57);
    }
  }
  li:nth-of-type(2) {
    padding: 0 .6rem;
    position: relative;
    textarea {
      padding: .6rem;
      width: 100%;
      background-color: rgb(239,244,250);
      border-radius: .3rem;
      font-size: .75rem;
    }
    span {
      position: absolute;
      right: 1.2rem;
      bottom: 0.8rem;
      color: rgb(57,57,57);
      font-size: .75rem;
    }
  }
  .up_img {
    margin: .6rem .6rem 0 .6rem;
    background-color: rgb(239,244,250);
    padding-bottom: .8rem;
    >div {
      display: flex;
      justify-content: space-between;
      padding: .6rem;
      span {
        font-size: .75rem;
        color: rgb(57,57,57);
      }
      i {
        font-size: .75rem;
        color: rgb(57,57,57);
      }
    }
    >ul {
      display: flex;
      justify-content: space-between;
      padding: 0 .6rem;
      >li {
        margin: 0;
        padding: 0;
        margin-right: 2%;
        height: 3.5rem;
        width: 24%;
        position: relative;
        background-color: #cee1f6;
        border-radius: .3rem;
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          color: #abcbef;
        }
      }
    }
  }
  .btn_feed {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2rem;
    width: 80%;
    margin: 0 auto;
    button {
      width: 100%;
      background-color: #2d8dff;
      color: #fff;
      line-height: 2rem;
      border-radius: 1rem;
      font-size: .75rem;
    }
  }
}
</style>
