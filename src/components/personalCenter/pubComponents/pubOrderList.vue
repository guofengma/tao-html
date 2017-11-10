<template>
    <ul class="order_list">
        <li v-for='item in num' :key='item'>
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
                <span>健康咨询</span>
                <span>￥20.00</span>
            </div>
            <div class="order_foot">
                <div>
                    <span>预约复诊</span>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'pubOrderList',
    props: ['num']
}
</script>

<style lang='less' scoped>
    .order_list {
        li {
            margin-bottom: .4rem;
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
                padding-bottom: .5rem;
                p:nth-of-type(1) {
                    font-size: .7rem;
                    color: rgb(102,102,102);
                    padding-top: .5rem;
                    padding-bottom: .3rem;
                }
                p:nth-of-type(2) {
                    font-size: .65rem;
                    color: rgb(153,153,153);
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
            .order_money {
                display: flex;
                justify-content: space-between;
                padding: 0 .6rem;
                background-color: #fff;
                height: 2.25rem;
                align-items: center;
                border-bottom: 1px solid rgb(231,231,231);
                span:first-of-type {
                    font-size: .75rem;
                    color: rgb(57,57,57);
                }
                span:last-of-type {
                    font-size: 1rem;
                    color: rgb(57,57,57);
                }
            }
            .order_foot {
                display: flex;
                justify-content: flex-end;
                padding-right: .6rem;
                height: 2.25rem;
                align-items: center;
                background-color: #fff;
                >div {
                    height: 1.4rem;
                    width: 3.75rem;
                    border: 1px solid rgb(255,82,82);
                    border-radius: .2rem;
                    line-height: 1.4rem;
                    text-align: center;
                    span {
                        color: rgb(255,82,82);
                        font-size: .7rem;
                    }
                }
            }
        }
    }
</style>
