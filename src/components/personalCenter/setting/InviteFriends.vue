<template>
<div class="wrap">
    <mt-swipe :show-indicators="false">
        <mt-swipe-item>
            <img src="../../../../static/imgs/personalCenterImgs/inviteFrient/1.png" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
            <img src="../../../../static/imgs/personalCenterImgs/inviteFrient/2.png" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
            <img src="../../../../static/imgs/personalCenterImgs/inviteFrient/3.png" alt="">
        </mt-swipe-item>
    </mt-swipe>
    <div class="login_btn">
        <a href="http://www.tdaifu.cn:8090/taodoctor/statichtml/registr.html">立即注册</a>
    </div>
</div>
</template>

<script>
export default {
    name: 'InviteFriends'
}
</script>

<style lang="less" scoped>
.wrap {
    min-height: 100%;
    width: 100%;
    position: relative;
    img {
        width: 100%;
        display: block;
    }
    .login_btn {
        @media screen and (max-width: 330px) {
            bottom: 1rem;
        }
        position: absolute;
        bottom: 1.6rem;
        left: 50%;
        width: 30%;
        background-color: #308eff;
        transform: translateX(-50%);
        line-height: 1.5rem;
        border-radius: 1rem; 
        text-align: center;
        a {
            color: #fff;
        }
    }
}
</style>
