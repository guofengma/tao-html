<template>
  <div class="wrap">
      <div class="top">
          <p>真实完善的健康信息，让医生更懂你</p>
      </div>
      <ul class="base_list">
          <li>
              <span>姓名</span>
              <b>徐亮</b>
          </li>
          <li>
              <span>身份证号</span>
              <b>411502199209078049</b>
          </li>
          <li>
              <span>性别</span>
              <b>男</b>
          </li>
          <li>
              <span>出生年月</span>
              <b>1993年09月</b>
          </li>
          <li>
              <span>民族</span>
              <b>汉族</b>
          </li>
          <li>
              <span>婚姻状况</span>
              <b>未婚</b>
          </li>
          <li>
              <span>住址</span>
              <b>北京市天安门广场</b>
          </li>
          <li>
              <span>手机号码</span>
              <b>170718926267</b>
          </li>
          <li>
              <span>设为默认就诊人</span>
              <b class="iconfont icon-roundcheck"></b>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'patienterInfo'
}
</script>

<style lang="less" scoped>
.wrap {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    background-color: #eff4fa;
    height: 100%;
}
.top {
  background-color: transparent;
  padding-left: 0.6rem;
  line-height: 1.75rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  p {
    font-size: 0.65rem;
    color: #f38590;
    line-height: 1.75rem;
  }
}
.base_list {
    padding-top: 2rem;
    li {
        height: 2.45rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid rgb(238,238,238);
        span {
            flex: 2;
            padding-left: .6rem;
            font-size: .75rem;
            color: #393939;
        }
        b {
            flex: 8;
            font-size: .75rem;
            color: #393939;
        }
        &:last-of-type {
            margin-top: .6rem;
            span {
                flex: 3.5;
            }
            b {
                flex: 6.5;
                font-size: 1.2rem;
                text-align: right;
                padding-right: .6rem;
                color: #2a8cff;
            }
        }
    }
}
</style>
