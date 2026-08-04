import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/IndexPage.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/AboutPage.vue')
    },
    {
      path: '/services',
      name: 'Services',
      component: () => import('../pages/ServicesPage.vue')
    },
  ],
})

export default router
