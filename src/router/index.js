import Vue from 'vue'
import Router from 'vue-router'

/*********************************wang个人中心展示***********************************************/
import personalCenterIndex from '@/components/personalCenter/personalCenterIndex'
import personalData from '@/components/personalCenter/setting/personalData'
import myOrder from '@/components/personalCenter/setting/myOrder'
import editName from '@/components/personalCenter/setting/editName'
import feedBack from '@/components/personalCenter/setting/feedBack'
import accountSecurity from '@/components/personalCenter/setting/accountSecurity'
import myErweima from '@/components/personalCenter/setting/myErweima'
import InviteFriends from '@/components/personalCenter/setting/InviteFriends'
import settingIndex from '@/components/personalCenter/setting/settingIndex'
import myDoc from '@/components/personalCenter/setting/myDoc'
import aboutTao from '@/components/personalCenter/setting/aboutTao'
import myCollect from '@/components/personalCenter/setting/myCollect'
import imprint from '@/components/personalCenter/setting/aboutTao/imprint'
import officalAccount from '@/components/personalCenter/setting/aboutTao/officalAccount'
import introTao from '@/components/personalCenter/setting/aboutTao/introTao'
import userAgreement from '@/components/personalCenter/setting/aboutTao/userAgreement'
/********************************wang登录页面*******************************************************/
import loginIndex from '@/components/login/loginIndex'
import settingNameLogo from '@/components/login/settingNameLogo'
import navPage from '@/components/login/navPage'

/**********************************xu************************************************/
import Home from '@/components/Home'
import doctorDetail from '@/components/doctor/doctorDetail/doctorDetail'
import doctor from '@/components/doctor/doctor'
import departList from '@/components/doctor/departList/departList'
import doctorList from '@/components/doctor/departList/doctorList'
import searchPage from '@/components/doctor/searchPage/searchPage'

Vue.use(Router)

export default new Router({
  mode: 'history',//使用html5
  base: '/dist/',
  routes: [
    //重定向
    {
      path: '/',
      redirect: '/personalCenterIndex'
    },
    //xu
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '互联网医院'
      }
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: doctor,
      meta: {
        title: '医生'
      }
    },
    {
      path: '/doctorDetail',
      name: 'doctorDetail',
      component: doctorDetail,
      meta: {
        title: '医生详情'
      }
    },
    {
      path: '/departList',
      name: 'departList',
      component: departList,
      meta: {
        title: '科室列表'
      }
    },
    {
      path: '/doctorList',
      name: 'doctorList',
      component: doctorList,
      meta: {
        title: '医生列表'
      }
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage,
      meta: {
        title: '搜索页面'
      }
    },
    //wang(个人中心)
    {
      path: '/personalCenterIndex',
      name: 'personalCenterIndex',
      component: personalCenterIndex,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/personalData',
      name: 'personalData',
      component: personalData,
      meta: {
        title: '个人资料'
      }
    },
    {
      path: '/myOrder/:id',
      name: 'myOrder',
      component: myOrder,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/editName',
      name: 'editName',
      component: editName,
      meta: {
        title: '修改姓名'
      }
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      component: feedBack,
      meta: {
        title: '意见反馈'
      }
    },
    {
      path: '/accountSecurity',
      name: 'accountSecurity',
      component: accountSecurity,
      meta: {
        title: '账号安全'
      }   
    },
    {
      path: '/settingIndex',
      name: 'settingIndex',
      component: settingIndex,
      meta: {
        title: '设置'
      }
    },
    {
      path: '/aboutTao',
      name: 'aboutTao',
      component: aboutTao,
      meta: {
        title: '关于涛大夫'
      }
    },
    {
      path: '/aboutTao/imprint',
      name: 'imprint',
      component: imprint,
      meta: {
        title: '版本说明'
      }
    },
    {
      path: '/aboutTao/introTao',
      name: 'introTao',
      component: introTao,
      meta: {
        title: '涛大夫简介'
      }
    },
    {
      path: '/aboutTao/officalAccount',
      name: 'officalAccount',
      component: officalAccount,
      meta: {
        title: '官方账号'
      }
    },
    {
      path: '/aboutTao/userAgreement',
      name: 'userAgreement',
      component: userAgreement,
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/myDoc',
      name: 'myDoc',
      component: myDoc,
      meta: {
        title: '我的医生'
      }
    },
    {
      path: '/myCollect',
      name: 'myCollect',
      component: myCollect,
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: '/myErweima',
      name: 'myErweima',
      component: myErweima,
      meta: {
        title: '我的二维码'
      }
    },
    {
      path: '/InviteFriends',
      name: 'InviteFriends',
      component: InviteFriends,
      meta: {
        title: '邀请好友'
      }
    },
    //登录
    {
      path: '/loginIndex',
      name: 'loginIndex',
      component: loginIndex,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/settingNameLogo',
      name: 'settingNameLogo',
      component: settingNameLogo,
      meta: {
        title: '欢迎进入涛大夫'
      }
    },
    {
      path: '/navPage',
      name: 'navPage',
      component: navPage,
      meta: {
        title: '欢迎进入涛大夫'
      }
    }
  ]
})
