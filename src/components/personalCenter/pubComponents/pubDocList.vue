<template>
  <div class="wrap">
      <ul>
          <li v-for="(item, index) in list" :key="index">
              <img src="../../../../static/imgs/personalCenterImgs/index/tdf_my_set_nickname@3x.png" alt="">
              <div class="hosptail">
                  <p>徐亮&nbsp;&nbsp;&nbsp;&nbsp;主任医师&nbsp;&nbsp;&nbsp;&nbsp;儿科</p>
                  <p>北京大学第三附属医院</p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'pubDocList',
    props: {
        list: {
            type: Array,
            default: []
        }
    }
}
</script>

<style lang="less" scoped>
.wrap {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    height: 100%;
    background-color: rgb(239, 244, 250);
    ul {
        padding-top: .6rem;
        li {
            display: flex;
            justify-content: flex-start;
            padding: 0 .6rem;
            background-color: #fff;
            border-bottom: 1px solid rgb(238,238,238);
            &:last-of-type {
                border-bottom: 0;
            }
            img {
                height: 2.25rem;
                width: 2.25rem;
                border-radius: 50%;
                margin: .75rem 0;
                margin-right: .8rem;
            }
            .hosptail {
                p:nth-of-type(1) {
                    font-size: .75rem;
                    color: rgb(57,57,57);
                    margin-top: .8rem;
                }
                p:nth-of-type(2) {
                    font-size: .7rem;
                    color: rgb(102,102,102);
                    margin-top: .3rem;
                }
            }
        }
    }
}
</style>
