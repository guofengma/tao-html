// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import VueResource from 'vue-resource'
import VueTitle from 'vue-wechat-title'
//全局引入默认样式
import '../static/css/base.css'
//全局引入字体文件
import '../static/css/iconfont.css'
//使用mint-ui框架
Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(VueTitle)


//开发模式（true）
Vue.config.debug = true
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
/*全局的baseUrl*/
//https://www.tdaifu.cn:8443  11111111111
Vue.prototype.baseUrl = 'http://120.26.107.233:8080/taodoctor/rest/'
Vue.prototype.baseImgUrl = 'https://www.tdaifu.cn:8443/taodoctor' 
//暂定的微信授权链接(暂定) 接口
Vue.prototype.baseAuthonUrl = 'http://120.26.107.233:8080/taodoctor/rest/'
//服务器上的回调路径
Vue.prototype.baseUpUrl = 'https://www.tdaifu.cn:8443/'
//正则匹配
Vue.prototype.regTel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/
Vue.prototype.regCode = /^\d{4}$/
Vue.prototype.regSCode = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
/* eslint-disable no-new */
/*这里的<App />标签会替换Id为app的元素位置*/
/*这里实例话Vue又引用了子组件APP，即‘#app’会替换App.vue*/
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
  // render: h=>h(App)
})
