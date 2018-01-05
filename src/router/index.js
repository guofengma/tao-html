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
/********************************wang就诊人*******************************************************/
import patienterIndex from '@/components/personalCenter/patienter/patienterIndex.vue'
import patienterInfo from '@/components/personalCenter/patienter/patienterInfo.vue'
import addPatienter from '@/components/personalCenter/patienter/addPatienter.vue'
import realNameAuthentication from '@/components/personalCenter/patienter/realNameAuthentication.vue'
import fillInfomation from '@/components/personalCenter/patienter/fillInfomation.vue'
/********************************wang登录页面*******************************************************/
import loginIndex from '@/components/login/loginIndex'
import settingNameLogo from '@/components/login/settingNameLogo'
import navPage from '@/components/login/navPage'
/********************************订单详情（支付提醒）**********************************************************/
import orderDetail from '@/components/personalCenter/aboutOrder/orderDetail.vue'
import orderPay from '@/components/personalCenter/aboutOrder/orderPay.vue'
/*************************************零钱查询************************************************/
import changeIndex from '@/components/personalCenter/change/changeIndex.vue'
import changeLog from '@/components/personalCenter/change/changeLog.vue'
/************************************评价******************************************************************/
import evaluate from '@/components/personalCenter/evaluate/evaluate.vue'
/************************************优惠券******************************************************************/
// import couponIndex from '@/components/personalCenter/coupon/couponIndex.vue'
/**********************************xu************************************************/
import Home from '@/components/Home'
import doctorDetail from '@/components/doctor/doctorDetail/doctorDetail'
import doctor from '@/components/doctor/doctor'
import departList from '@/components/doctor/departList/departList'
import departListPage from '@/components/doctor/departList/departListPage'
import doctorList from '@/components/doctor/departList/doctorList'
import searchPage from '@/components/doctor/searchPage/searchPage'
import searchDoctorList from '@/components/doctor/searchPage/searchDoctorList'
import addPatient from '@/components/doctor/order/addPatient'
import fillOrder from '@/components/doctor/order/fillOrder'
import buyService from '@/components/doctor/order/buyService'
import coupon from '@/components/doctor/order/coupon'

Vue.use(Router)

export default new Router({
  mode: 'history',//使用html5
  base: '/taodoctor/dist',
  routes: [
    //重定向
    {
      path: '/',
      redirect: '/loginIndex'
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
        title: '医生详情',
        keepAlive: true
      }
    },
    {
      path: '/departListPage',
      name: 'departListPage',
      component: departListPage,
      meta: {
        title: '科室列表'
      }
    },
    {
      path: '/doctorList',
      name: 'doctorList',
      component: doctorList,
      meta: {
        title: '医生列表',
        keepAlive: true
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
    {
      path: '/searchDoctorList',
      name: 'searchDoctorList',
      component: searchDoctorList,
      meta: {
        title: '搜索医生列表',
        keepAlive:true
      }
    },
    {
      path: '/fillOrder',
      name: 'fillOrder',
      component: fillOrder,
      meta: {
        title: '填写订单'
      }
    },
    {
      path: '/addPatient',
      name: 'addPatient',
      component: addPatient,
      meta: {
        title: '添加就诊人',
        // keepAlive: true
      }
    },
    {
      path: '/buyService',
      name: 'buyService',
      component: buyService,
      meta: {
        title: '购买服务'
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon,
      meta: {
        title: '优惠券'
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
    },
    //订单详情展示及支付页面（离开提醒）
    {
      path: '/orderDetail/:orderId/:category',
      name: 'orderDetail',
      component: orderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/orderPay',
      name: 'orderPay',
      component: orderPay,
      meta: {
        title: '购买服务'
      }
    },
    //就诊人页面展示
    {
      path: '/patienterIndex',
      name: 'patienterIndex',
      component: patienterIndex,
      meta: {
        title: '就诊人'
      }
    },
    {
      path: '/patienterInfo/:id/:defaultCustomer',
      name: 'patienterInfo',
      component: patienterInfo,
      meta: {
        title: '就诊人信息'
      }
    },
    {
      path: '/addPatienter',
      name: 'addPatienter',
      component: addPatienter,
      meta: {
        title: '添加就诊人'
      }
    },
    {
      path: '/realNameAuthentication',
      name: 'realNameAuthentication',
      component: realNameAuthentication,
      meta: {
        title: '实名认证'
      }
    },
    {
      path: '/fillInfomation/:customerId',
      name: 'fillInfomation',
      component: fillInfomation,
      meta: {
        title: '填写资料'
      }
    },
    //零钱查询
    {
      path: '/changeIndex',
      name: 'changeIndex',
      component: changeIndex,
      meta: {
        title: '零钱'
      }
    },
    {
      path: '/changeLog',
      name: 'changeLog',
      component: changeLog,
      meta: {
        title: '零钱明细'
      }
    },
    //去评价页面
    {
      path: '/evaluate/:doctorId/:customerId/:orderId/:orderType',
      name: 'evaluate',
      component: evaluate,
      meta: {
        title: '评价医生'
      }
    },
    //优惠券页面
    {
      path: '/couponIndex',
      name: 'couponIndex',
      component: resolve => require(['@/components/personalCenter/coupon/couponIndex.vue'], resolve),
      meta: {
        title: '优惠券'
      }
    }
  ]
})
