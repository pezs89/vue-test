import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product',
      component: ProductsView
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
})

export default router;
