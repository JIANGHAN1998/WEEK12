import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';
import ManagerView from '../views/Manager.vue';
import FeedbackView from '../views/Feedback.vue';
import FirebaseSigninView from '../views/FirebaseSigninView.vue';
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue';
import EventListings from '../views/EventListings.vue';
import ContactFormView from '../views/ContactForm.vue';
import WeatherView from '../views/WeatherView.vue';
import SendEmailView from '../views/send-email.vue';
import MapView from '../views/MapView.vue';  
import AdminAddEvent from '../views/AdminAddEvent.vue';
import AdminEditEvent from '../views/AdminEditEvent.vue';
import { getAuth } from 'firebase/auth';

const routes = [
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
    path: '/firebase-register',
    name: 'FireRegister',
    component: FirebaseRegisterView
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
    path: '/map',
    name: 'Map',
    component: MapView
  },
  {
    path: '/add-event',
    name: 'AddEvent',
    component: AdminAddEvent,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/edit-event',
    name: 'EditEvent',
    component: AdminEditEvent,
    meta: { requiresAuth: true, requiresAdmin: true } 
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
  } else if (to.meta.requiresAdmin) {
    if (user && user.email === 'admin@163.com') {
      next();
    } else {
      next({ name: 'AccessDenied' });
    }
  } else {
    next();
  }
});

export default router;
