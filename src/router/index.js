import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginView }, // 默认指向Login页面
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/access-denied', name: 'AccessDenied', component: AccessDeniedView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'AccessDenied' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' })  // 如果已经登录，直接跳转到主页
  } else {
    next()
  }
})

export default router
