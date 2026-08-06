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
      path: '/offers',
      name: 'Offers',
      component: () => import('../pages/ServicesPage.vue')
    },
    {
      path: '/methodology',
      name: 'Methodology',
      component: () => import('../pages/MethodPage.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../pages/ContactPage.vue')
    }
  ],
})

export default router
