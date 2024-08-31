import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.mount('#app')
