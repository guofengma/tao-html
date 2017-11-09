import Vue from 'vue'
import Router from 'vue-router'
import personalCenterIndex from '@/components/personalCenter/personalCenterIndex'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'personalCenterIndex',
      component: personalCenterIndex
    }
  ]
})
