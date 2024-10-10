import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCdjP9tnwV8kTwj9af_ORPqEgurt0WqD7E",
  authDomain: "week7-jianghan.firebaseapp.com",
  projectId: "week7-jianghan",
  storageBucket: "week7-jianghan.appspot.com",
  messagingSenderId: "1041747581161",
  appId: "1:1041747581161:web:0533d824e9be7d69797878",
  measurementId: "G-61J28XJ6YZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.mount('#app')
