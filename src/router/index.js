import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import AdminView from '../views/AdminView.vue';
import ManagerView from '../views/Manager.vue';
import FeedbackView from '../views/Feedback.vue';
import FirebaseSigninView from '../views/FirebaseSigninView.vue';
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue';
import AddBookView from '../views/AddBookView.vue';
import GetBookCountView from '../views/GetBookCountView.vue';
import WeatherView from '../views/WeatherView.vue';
import CountBookAPI from '../views/CountBookAPI.vue';  
import GetAllBookAPI from '../views/GetAllBookAPI.vue';  // 新增 GetAllBookAPI 导入
import { getAuth } from 'firebase/auth';

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
    meta: { requiresAuth: true }  // 需要身份验证
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
    path: '/firebase-register',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminView,
    meta: { requiresAuth: true }  // 需要身份验证
  },
  {
    path: '/manager',
    name: 'Manager',
    component: ManagerView,
    meta: { requiresAuth: true }  // 需要身份验证
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: FeedbackView,
    meta: { requiresAuth: true }  // 需要身份验证
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
    meta: { requiresAuth: true }  // 需要身份验证
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
    meta: { requiresAuth: true }  // 需要身份验证
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView  // WeatherCheck 页面的路由
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI  // CountBookAPI 页面的路由
  },
  {
    path: '/GetAllBookAPI',  // 新增 GetAllBookAPI 路由
    name: 'GetAllBookAPI',
    component: GetAllBookAPI  // 对应 GetAllBookAPI.vue 组件
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫结合 Firebase 身份验证检查
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;  // 使用 currentUser 同步获取当前用户

  if (to.meta.requiresAuth && !user) {
    next({ name: 'AccessDenied' });  // 如果需要验证但用户未登录，重定向到拒绝访问页面
  } else if (to.name === 'Login' && user) {
    next({ name: 'Home' });  // 如果用户已登录，重定向到首页
  } else {
    next();  // 继续导航
  }
});

export default router;
