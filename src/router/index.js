import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import HelloWorld from '@/components/HelloWorld'
import CategoryList from '@/components/category/List'
import GoodsShow from '@/components/goods/Show'
import CartShow from '@/components/cart/Show'
import MyHome from '@/components/my/Home'
import WalletWithdraw from '@/components/wallet/Withdraw'

import '../assets/app.css'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/category',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/goods/:id',
      name: 'GoodsShow',
      component: GoodsShow
    },
    {
      path: '/cart',
      name: 'CartShow',
      component: CartShow
    },
    {
      path: '/my',
      name: 'MyHome',
      component: MyHome
    },
    {
      path: '/wallet/withdraw/:token?',
      name: 'WalletWithdraw',
      component: WalletWithdraw
    }
  ]
})
