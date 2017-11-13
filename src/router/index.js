import Vue from 'vue'
import Router from 'vue-router'

/*********************************wang***********************************************/
import personalCenterIndex from '@/components/personalCenter/personalCenterIndex'

import personalData from '@/components/personalCenter/setting/personalData'
import myOrder from '@/components/personalCenter/setting/myOrder'
import editName from '@/components/personalCenter/setting/editName'
import feedBack from '@/components/personalCenter/setting/feedBack'
import accountSecurity from '@/components/personalCenter/setting/accountSecurity'

import settingIndex from '@/components/personalCenter/setting/settingIndex'
import myDoc from '@/components/personalCenter/setting/myDoc'
import aboutTao from '@/components/personalCenter/setting/aboutTao'
import imprint from '@/components/personalCenter/setting/aboutTao/imprint'
import officalAccount from '@/components/personalCenter/setting/aboutTao/officalAccount'
import introTao from '@/components/personalCenter/setting/aboutTao/introTao'
import userAgreement from '@/components/personalCenter/setting/aboutTao/userAgreement'


/**********************************xu************************************************/
import Home from '@/components/Home'
import doctorDetail from '@/components/doctorDetail/doctorDetail'

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
    {
      path: '/doctorDetail',
      name: 'doctorDetail',
      component: doctorDetail
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
      path: '/myOrder/:id',
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
      path: '/aboutTao',
      name: 'aboutTao',
      component: aboutTao
    },
    {
      path: '/aboutTao/imprint',
      name: 'imprint',
      component: imprint
    },
    {
      path: '/aboutTao/introTao',
      name: 'introTao',
      component: introTao
    },
    {
      path: '/aboutTao/officalAccount',
      name: 'officalAccount',
      component: officalAccount
    },
    {
      path: '/aboutTao/userAgreement',
      name: 'userAgreement',
      component: userAgreement
    },
    {
      path: '/myDoc',
      name: 'myDoc',
      component: myDoc
    }
  ]
})
