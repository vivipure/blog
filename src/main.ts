import { createApp } from 'vue'
import App from './App.vue'
import './style/main.less'
import router from './router/index'
import directives from './directives'


const app = createApp(App)

app.use(router)
app.use(directives)
app.mount('#app')
