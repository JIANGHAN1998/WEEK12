import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import RegistrationPage from '../views/RegistrationPage.vue' 
import AdminView from '../views/AdminView.vue' 
import ManagerView from '../views/Manager.vue'
import FeedbackView from '../views/Feedback.vue'  // 导入Feedback视图

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/manager',
    name: 'Manager',
    component: ManagerView,
    meta: { requiresAuth: true }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: FeedbackView,
    meta: { requiresAuth: true } // 需要登录的页面
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫：检查用户是否已登录
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
