import Vue from 'vue'
import Router from 'vue-router'

/*********************************wang***********************************************/
import personalCenterIndex from '@/components/personalCenter/personalCenterIndex'
import personalData from '@/components/personalCenter/personalData'
import myOrder from '@/components/personalCenter/myOrder'


/**********************************xu************************************************/
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //xu
    {
      path: '/home',
      name: 'home',
      component: Home
    },

    //wang
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
