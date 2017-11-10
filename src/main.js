// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'

Vue.use(MintUI)

Vue.component(MintUI.TabContainer.name, MintUI.TabContainer);
Vue.component(MintUI.TabContainerItem.name, MintUI.TabContainerItem);

Vue.config.debug = true
Vue.config.productionTip = false

/* eslint-disable no-new */
/*这里的<App />标签会替换Id为app的元素位置*/
/*这里实例话Vue又引用了子组件APP，即‘#app’会替换App.vue*/
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
