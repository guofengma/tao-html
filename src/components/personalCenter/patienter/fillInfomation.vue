<template>
  <div class="wrap">
      <div class="top_msg">
          <p>通过实名认证可预约更多专家服务，可享受签约家庭医生服务</p>
      </div>
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
        <div class="choose_img">
            <img src="../../../../static/imgs/patienter/tdf_family_shchzj.png" alt="">
            <p>请上传清晰的身份证或者户口本照片</p>
            <input type="file">
        </div>
      </li>
    </ul>
    <ul class="show_model">
        <li>示例</li>
        <li>
            <img src="../../../../static/imgs/patienter/tdf_family_shfzh.png" alt="">
        </li>
        <li>
            <img src="../../../../static/imgs/patienter/tdf_family_shfzh.png" alt="">
        </li>
        <span class="msg_tip">(未满16周岁的患者，可上传户口本信息)</span>
    </ul>
  </div>      
</template>

<script>
export default {
  name: "fillInfomation"
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100vh;
  background-color: #f2f2f2;
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
.top_msg {
  color: rgb(255, 82, 82);
  background-color: rgb(239, 244, 250);
  height: 1.3rem;
  display: flex;
  align-items: center;
  font-size: 0.65rem;
  padding: 0 0.6rem;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.show_base {
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
      .choose_img {
          height: 8rem;
          flex: 7.5;
          margin-top: .6rem;
        //   width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content:center;
          background-color: #eeeeee;
          position: relative;
          img {
              width: 2rem;
              height: 1.7rem;
          }
          p {
                font-size: .7rem;
                color: #999;
          }
          input {
              position: absolute;
              height: 100%;
              width: 100%;
              opacity: 0;
          }
      }
    }
  }
}
.show_model {
    margin-top: .5rem;
    display: flex;
    justify-content: flex-start;
    position: relative;
    padding-bottom: 1rem;
    li {
        flex: 4;
        &:first-of-type {
            flex: 2;
            font-size: .75rem;
            color: rgb(57,57,57);
            padding-left: .8rem;
        }
        img {
            width: 90%;
        }
    }
    .msg_tip {
        position: absolute;
        bottom: 0;
        right: 1.5rem;
        font-size: .7rem;
        color: #999;
    }
}
</style>
