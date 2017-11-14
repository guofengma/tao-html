<template>
  <div id="app">
    <div class="dask" v-if="isLoading"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      isLoading:false
    }
  }
}
</script>

<style>
html,body {
  height: 100vh;
  background:#ececec;
}
h1,h2,h3,h4,h5,h6{
  font-weight: normal;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.dask{
  width:100%;
  height:100vh;
  position: fixed;
  top:0;
  left: 0;
  z-index: 100000000;
  background:rgba(0,0,0,0.3);
}
</style>
