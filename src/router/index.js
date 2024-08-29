import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import RegistrationPage from '../views/RegistrationPage.vue' // 导入注册页面组件
import AdminView from '../views/AdminView.vue' // 导入管理员界面组件
import ManagerView from '../views/Manager.vue'; // 导入管理员页面组件


const routes = [
  { path: '/Login', name: 'Login', component: LoginView }, // 默认指向Login页面
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/access-denied', name: 'AccessDenied', component: AccessDeniedView },
  { path: '/register', name: 'Register', component: RegistrationPage }, // 新增注册页面路由
  { path: '/adminLogin', name: 'Admin Login', component: AdminView, meta: { requiresAuth: true } }, // 添加管理员页面路由
  { path: '/manager', name: 'Manager', component: ManagerView, meta: { requiresAuth: true } }, // 管理员页面路由

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
