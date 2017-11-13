// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import VueResource from 'vue-resource'
//全局引入默认样式
import '../static/css/base.css'
//全局引入字体文件
import '../static/css/iconfont.css'

//使用mint-ui框架
Vue.use(MintUI)
Vue.use(VueResource)

//开发模式（true）
Vue.config.debug = true
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;

/* eslint-disable no-new */
/*这里的<App />标签会替换Id为app的元素位置*/
/*这里实例话Vue又引用了子组件APP，即‘#app’会替换App.vue*/
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
