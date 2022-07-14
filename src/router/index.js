import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/index' // 首页
import Stock from '../pages/stock/index' // 股票大厅
import Transaction from '../pages/transaction/index' // 交易
import Product from '../pages/product/index' // 产品介绍
import Introduce from '../pages/introduce/index' // 公司简介
import Down from '../pages/down/index' // 产品介绍
import Notice from '../pages/notice/index' // 公告
import NoticeDetail from '../pages/notice/components/detail' // 公告详情
import User from '../pages/user/index' // 用户中心
import CashDetail from '../pages/user/components/list' // 资金记录
import DetailList from '../pages/user/components/table/detail' // 资金明细
import WithdrawList from '../pages/user/components/table/withdraw' // 提现记录
import RechargeList from '../pages/user/components/table/recharge' // 充值记录
import Recharge from '../pages/user/components/cash/recharge' // 提现
import Withdraw from '../pages/user/components/cash/withdraw' // 充值
import ChangeCash from '../pages/user/components/change' // 资产互转
import HoldPosition from '../pages/user/components/transform/holdposition' // 持仓单
import IndexHoldPosition from '../pages/user/components/transform/indexholdposition' // 持仓单 指数
import FuturesHoldPosition from '../pages/user/components/transform/futuresholdposition' // 持仓单 指数
import SellOrder from '../pages/user/components/transform/sellorder' // 卖出单
import WtList from '../pages/user/components/transform/wtList' // 卖出单
import IndexSellOrder from '../pages/user/components/transform/indexsellorder' // 卖出单 指数
import FuturesSellOrder from '../pages/user/components/transform/futuressellorder' // 卖出单 指数
import Bank from '../pages/user/components/save/bank' // 银行卡
import Auth from '../pages/user/components/save/auth' // 实名认证
import ChangePwd from '../pages/user/components/save/changepwd' // 修改银行卡
import Login from '../pages/login/login' // 登录
import Register from '../pages/login/register' // 注册
import Forget from '../pages/login/forget' // 忘记密码
import Message from '../pages/user/components/table/message' // 站内消息
import Xingu from '../pages/user/components/table/xingu' // 新股申购

//============================分仓配资-相关，2020年7月25日19:14:55=========================================
import Funds from '../pages/funds/index' // 分仓配资
import Days from '../pages/funds/components/days' // 按天配资
import Applyfund from '../pages/funds/components/table/applyfund' // 我的配资
import FundsHoldPosition from '../pages/user/components/transform/fundsholdposition' // 分仓持仓单
import FundsSellOrder from '../pages/user/components/transform/fundssellorder' // 分仓卖出单
import Funding from '../pages/funds/components/funding' // 配资详情
import Contract from '../pages/funds/components/contract' // 合同


import Enterprise from '../pages/enterprise/index' // 企业公告
import enterpriseDetails from '../pages/enterprise/enterprise-details' // 企业公告详情



// import HoldPositions from '@/pages/holdPositions/index'
// import CapitalDetail from '@/pages/capitalDetail/index'
// import Entry from '@/pages/entry/index'
// import Exit from '@/pages/exit/index'
// import Login from '@/pages/login/index'
Vue.use(Router)

export default new Router({
  // mode :'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: { title: '首页' },
      component: Home
    },
    {
      path: '/stock',
      name: 'stock',
      meta: { title: '股票大厅' },
      component: Stock
    },
    {
      path: '/transaction',
      name: 'transaction',
      meta: { title: '交易大厅' },
      component: Transaction
    },
    {
      path: '/product',
      name: 'product',
      meta: { title: '产品介绍' },
      component: Product
    },
    {
      path: '/introduce',
      name: 'introduce',
      meta: { title: '公司简介' },
      component: Introduce
    }, {
      path: '/down',
      name: 'down',
      meta: { title: '软件下载' },
      component: Down
    }, {
      path: '/notice',
      name: 'notice',
      meta: { title: '公告' },
      component: Notice
    }, {
      path: '/noticedetail',
      name: 'noticedetail',
      meta: { title: '公告详情' },
      component: NoticeDetail
    }, {
      path: '/user',
      name: 'user',
      meta: { title: '用户中心' },
      component: User
    }, {
      path: '/message',
      name: 'message',
      meta: { title: '站内消息' },
      component: Message
    }, {
      path: '/xingu',
      name: 'xingu',
      meta: { title: '新股申购' },
      component: Xingu
    },{
      path: '/cashdetail',
      name: 'cashdetail',
      meta: { title: '资金记录' },
      component: CashDetail
    }, {
      path: '/detaillist',
      name: 'detaillist',
      meta: { title: '资金明细' },
      component: DetailList
    }, {
      path: '/withdrawlist',
      name: 'withdrawlist',
      meta: { title: '提现记录' },
      component: WithdrawList
    }, {
      path: '/rechargelist',
      name: 'rechargelist',
      meta: { title: '充值记录' },
      component: RechargeList
    }, {
      path: '/recharge',
      name: 'recharge',
      meta: { title: '充值' },
      component: Recharge
    }, {
      path: '/withdraw',
      name: 'withdraw',
      meta: { title: '提现' },
      component: Withdraw
    }, {
      path: '/changeCash',
      name: 'changeCash',
      meta: { title: '资产户转' },
      component: ChangeCash
    }, {
      path: '/holdposition',
      name: 'holdposition',
      meta: { title: '账户持仓单' },
      component: HoldPosition
    }, {
      path: '/indexholdposition',
      name: 'indexholdposition',
      meta: { title: '指数持仓单' },
      component: IndexHoldPosition
    }, {
      path: '/futuressell',
      name: 'futuressell',
      meta: { title: '期货卖出' },
      component: FuturesSellOrder
    }, {
      path: '/futuresholdposition',
      name: 'futuresholdposition',
      meta: { title: '期货持仓单' },
      component: FuturesHoldPosition
    }, {
      path: '/sell',
      name: 'sell',
      meta: { title: '卖出单' },
      component: SellOrder
    }, {
      path: '/wtList',
      name: 'wtList',
      meta: { title: '卖出单' },
      component: WtList
    }, {
      path: '/indexsell',
      name: 'indexsell',
      meta: { title: '指数卖出单' },
      component: IndexSellOrder
    }, {
      path: '/bank',
      name: 'bank',
      meta: { title: '银行卡' },
      component: Bank
    }, {
      path: '/auth',
      name: 'auth',
      meta: { title: '实名认证' },
      component: Auth
    }, {
      path: '/changepwd',
      name: 'changepwd',
      meta: { title: '修改密码' },
      component: ChangePwd
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: '注册' },
      component: Register
    }, {
      path: '/forget',
      name: 'forget',
      meta: { title: '忘记密码' },
      component: Forget
    },
    //============================分仓配资-相关，2020年7月25日19:14:55=========================================
    {
      path: '/funds',
      name: 'funds',
      meta: { title: '配资主页' },
      component: Funds
    },
    {
      path: '/days',
      name: 'days',
      meta: { title: '按天配资' },
      component: Days
    },
    {
      path: '/applyfund',
      name: 'applyfund',
      meta: { title: '我的配资' },
      component: Applyfund
    }, {
      path: '/fundsholdposition',
      name: 'fundsholdposition',
      meta: { title: '配资持仓单' },
      component: FundsHoldPosition
    }, {
      path: '/fundssellorder',
      name: 'fundssellorder',
      meta: { title: '配资卖出单' },
      component: FundsSellOrder
    }, {
      path: '/funding',
      name: 'funding',
      meta: { title: '配资详情' },
      component: Funding
    }, {
      path: '/contract',
      name: 'contract',
      meta: { title: '合同' },
      component: Contract
    },


    {
      path: '/enterprise',
      name: 'enterprise',
      meta: { title: '企业公告' },
      component: Enterprise
    },
    {
      path: '/enterprise-details',
      name: 'enterprise-details',
      meta: { title: '企业公告详情' },
      component: enterpriseDetails
    }

  ]
})
