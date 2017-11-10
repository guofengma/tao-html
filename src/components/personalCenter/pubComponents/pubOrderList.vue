<template>
    <ul class="order_list">
        <li>
            <div class="order_top">
                <div>
                    <img src="../../../../static/imgs/personalCenterImgs/index/tdf_my_set_nickname@3x.png" alt="">
                    <span>孙连浩</span>
                    <b>心脑血管科</b>
                </div>
                <span>已完成</span>
            </div>
            <div class="order_main">
                <p>症状描述：</p>
                <p>我今年30岁，男。前一段时间出现眩晕的症状，到医院诊断为高血压，希望进一步咨询专家，后续预防措施我今年40岁，男。前一段时间出现眩晕的症状，到医院诊断为高血压，希望进一步咨询专家，后续预防措施</p>
            </div>
            <div class="order_money">

            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'pubOrderList'
}
</script>

<style lang='less' scoped>
    .order_list {
        li {
            .order_top {
                display: flex;
                justify-content: space-between;
                padding: 0 .6rem;
                background-color: #fff;
                height: 2.3rem;
                align-items: center;
                >div {
                    display: flex;
                    align-items: center;
                    img {
                        height: 1.5rem;
                        width: 1.5rem;
                    }
                    span {
                        color: rgb(57,57,57);
                        font-size: .75rem;
                        padding-left: .6rem;
                    }
                    b {
                        padding-left: 1.2rem;
                        color: rgb(57,57,57);
                        font-size: .75rem;
                    }
                }
                >span {
                    font-size: .75rem;
                    color: rgb(82,163,255);
                }
            }
            .order_main {
                background-color: #f8f8f8;
                padding: 0 .6rem;
                p:nth-of-type(1) {
                    
                }
            }
        }
    }
</style>
