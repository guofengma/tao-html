import Vue from 'vue'
import Router from 'vue-router'

/*********************************wang***********************************************/
import personalCenterIndex from '@/components/personalCenter/personalCenterIndex'
import personalData from '@/components/personalCenter/personalData'
import myOrder from '@/components/personalCenter/myOrder'
import editName from '@/components/personalCenter/editName'
import feedBack from '@/components/personalCenter/feedBack'
import accountSecurity from '@/components/personalCenter/accountSecurity'
import settingIndex from '@/components/personalCenter/setting/settingIndex'
import imprint from '@/components/personalCenter/setting/imprint'
import aboutTao from '@/components/personalCenter/setting/aboutTao'
import officalAccount from '@/components/personalCenter/setting/officalAccount'
import introTao from '@/components/personalCenter/setting/introTao'
import pubDocList from '@/components/personalCenter/pubComponents/pubDocList'


/**********************************xu************************************************/
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',//使用html5
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
    },
    {
      path: '/editName',
      name: 'editName',
      component: editName
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      component: feedBack
    },
    {
      path: '/accountSecurity',
      name: 'accountSecurity',
      component: accountSecurity   
    },
    {
      path: '/settingIndex',
      name: 'settingIndex',
      component: settingIndex
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: imprint
    },
    {
      path: '/aboutTao',
      name: 'aboutTao',
      component: aboutTao
    },
    {
      path: '/officalAccount',
      name: 'officalAccount',
      component: officalAccount
    },
    {
      path: '/introTao',
      name: 'introTao',
      component: introTao
    },
    {
      path: '/pubDocList',
      name: 'pubDocList',
      component: pubDocList
    }
  ]
})
