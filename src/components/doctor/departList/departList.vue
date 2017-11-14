<template>
  <div class="home">
    <div class="department">
    <router-link tag="h2" to="/doctorList">科室列表</router-link>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  },
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: [
            "北京",
            "上海",
            "杭州",
            "湖南",
            "湖北",
            "浙江"
          ],
          className: "slot1",
          textAlign: "center"
        },
        // {
        //   divider: true,
        //   content: "--",
        //   className: "slot2"
        // },
        {
          flex: 2,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot3",
          textAlign: "center"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 2rem;
}
.department {
  padding: 0 0.6rem;
  background: #fff;
}
</style>
