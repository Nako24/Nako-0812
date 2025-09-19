//ログイン後のページ遷移

import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginRegister from '@/components/LoginRegister.vue'//Vue コンポーネントをインポート
import ProductList from '@/components/ProductList.vue'

Vue.use(VueRouter)

//ルート定義
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginRegister
  },
  {
    path: '/home',
    name: 'home',
    component: ProductList
  },
  //購入ルートの追加
  {
    path: '/purchase',
    name: 'purchase',
    component: () => import('../views/PurchaseView.vue')
  },

  // 出品ページのルートを追加
  {
    path: '/sell',
    name: 'sell',
    component: () => import('../views/SellView.vue')
  },

  // AIページのルートを追加
  {
    path: '/readAI',
    name: 'readAI',
    component: () => import('../views/ReadAIView.vue')
  }

]

//ルーターインスタンスの作成
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//ルーターをエクスポート
export default router