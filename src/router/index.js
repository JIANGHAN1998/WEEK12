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
import ContactFormView from '../views/ContactForm.vue';
import WeatherView from '../views/WeatherView.vue';
import SendEmailView from '../views/send-email.vue';
import GetAllBookAPI from '../views/GetAllBookAPI.vue';
import MapView from '../views/MapView.vue';  // 新增地图页面

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
    path: '/firebase-register',
    name: 'FireRegister',
    component: FirebaseRegisterView
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
    meta: { requiresAuth: true }
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
    meta: { requiresAuth: true }
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: ContactFormView,
    meta: { requiresAuth: true }
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/send-email',
    name: 'SendEmail',
    component: SendEmailView
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/map',  // 新增的地图路由
    name: 'Map',
    component: MapView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next({ name: 'AccessDenied' });
  } else if (to.name === 'Login' && user) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
