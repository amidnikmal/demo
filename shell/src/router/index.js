import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: 'MarketDepthTable'
  // },

  {
    path: '/depthTable',
    name: 'MarketDepthTable',
    component: () => import('market_depth_table/MarketDepthTable')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
