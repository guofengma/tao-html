<template>
  <div class="container">
        <main class="content">
            <p>
                <span>涛大夫</span>是国内第一个在脑心同治理论指导下防治
                心脑血管疾病等慢性病领域权威的互联网医院平台，
                已拥有超过20万的专业医生在线，且是银川脑心同治
                互联网医院唯一指定的多点执业互联网医疗服务平台。
                目前已在线开设内科、外科、妇产科、儿科、皮肤科、
                口腔科等六大一级科室，合作的医院已覆盖多个省、
                直辖市及一二线核心城市。通过银川脑心同治互联网
                医院平台，把知名专家的医事服务能力覆盖到全国基
                层地区。签约家庭医生，助力分级诊疗，为广大用户
                提供优质的医疗服务。
            </p>
            <div>
                <p>功能介绍</p>  
                <p>1.健康咨询：一键直达电话咨询服务，3分钟内极速
                    响应，全国知名专家优先为您服务。</p>
                <p>2.准时预约：在线预约专家名医，已覆盖北、上、
                    广及核心省会城市的千余家医院的万名专家，方便快
                    捷省时省心。</p> 
                <p>3.预约诊疗：下级医生帮助用户找上级医生，平台
                    按照大数据分析后精准推送给上级医生、下级医生</p>
            </div>
            <div>
                <p style="text-indent:2em;">
                    核心理念 涛大夫秉承“尊重、尊严、尊享”的理念，
                    通过高效专业的平台服务来真正帮助用户健康
                </p>
            </div>
        </main>
    </div>
</template>

<script>
export default {
  name: "introTao"
};
</script>

<style lang="less" scoped>
.container {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
  background-color: #fff;
  height: 100%;
  .top {
    background-color: #2f8fff;
    h3 {
      text-align: center;
      color: #fff;
      font-weight: 400;
      line-height: 2.5rem;
    }
  }
  .content {
    padding: 0 0.6rem;
    padding-top: 1.2rem;
    p {
      color: #393939;
      font-size: 0.75rem;
      text-indent: 2em;
      span {
        font-size: 0.85rem;
      }
    }
    div {
      margin-top: 1.5rem;
      p:first-of-type {
        text-indent: 0;
      }
    }
  }
}
</style>
