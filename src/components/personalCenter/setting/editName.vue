<template>
  <div class="box">
    <div class="name_box">
      <input type="text" v-model="nameText">
      <i class="iconfont icon-close" @click="emptyValue"></i>
    </div>
    <div class="button_box">
        <button>保存</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'editName',
    data() {
        return {
            nameText: '从你的全世界路过'
        }
    },
    methods: {
        emptyValue() {
            this.nameText = ''
        }
    }
}
</script>

<style lang="less" scoped>
    .box {
        .name_box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: .6rem;
            background-color: #fff;
            padding: 0 .6rem;
            height: 2.25rem;
            input {
                font-size: .75rem;
                color: rgb(57,57,57);
            }
        }
        .button_box {
            width: 80%;
            margin: 0 auto;
            margin-top: .6rem;
            button {
                width: 100%;
                background-color: #2f8fff;
                color: #fff;
                line-height: 1.8rem;
                border-radius: .3rem;
            }
        }
    }
</style>
