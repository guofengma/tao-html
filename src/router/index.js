import Vue from 'vue'
import Router from 'vue-router'
import personalCenterIndex from '@/components/personalCenter/personalCenterIndex'
import personalData from '@/components/personalCenter/personalData'
import myOrder from '@/components/personalCenter/myOrder'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/personalCenterIndex',
      name: 'personalCenterIndex',
      component: personalCenterIndex
    },
    {
      path: '/personalData',
      name: 'personalData',
      component: personalData
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    }
  ]
})