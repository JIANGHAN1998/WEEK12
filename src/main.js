import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

// 引入 PrimeVue 及其组件
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'


const app = createApp(App)

app.use(router)       // 使用 Vue Router
app.use(PrimeVue)     // 使用 PrimeVue

// 全局注册 PrimeVue 组件
app.component('DataTable', DataTable)
app.component('Column', Column)

app.mount('#app')    // 挂载 Vue 应用到 #app
