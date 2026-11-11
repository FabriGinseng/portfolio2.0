import { createApp } from 'vue'
import '@fontsource-variable/bricolage-grotesque/wdth.css'
import '@fontsource-variable/geist'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

document.documentElement.classList.add('js')

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
