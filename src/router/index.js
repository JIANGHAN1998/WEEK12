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
import EventListings from '../views/EventListings.vue';
import ContactFormView from '../views/ContactForm.vue';  // 使用 ContactForm 组件
import WeatherView from '../views/WeatherView.vue';
import SendEmailView from '../views/send-email.vue';  // 正确引用 send-email.vue
import GetAllBookAPI from '../views/GetAllBookAPI.vue';  // 导入 GetAllBookAPI 组件

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
    component: EventListings,
    meta: { requiresAuth: true }  // 需要身份验证
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: ContactFormView,  // 替换 GetBookCountView
    meta: { requiresAuth: true }  // 需要身份验证
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView  // WeatherCheck 页面的路由
  },
  {
    path: '/send-email',  // 正确路径为 send-email
    name: 'SendEmail',
    component: SendEmailView  // send-email.vue 对应的路由
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

// 导航守卫结合 Firebase 身份验证检查
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next({ name: 'AccessDenied' });  // 如果未认证，则重定向到 AccessDenied
  } else if (to.name === 'Login' && user) {
    next({ name: 'Home' });  // 已登录用户访问 Login 路由时重定向到 Home
  } else {
    next();  // 继续导航
  }
});

export default router;
