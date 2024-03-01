import { createApp } from "vue";
import App from "./App.vue"

import './index.css'

const app = createApp(App)
app.config.globalProperties.window = window;
app.mount('#wplk-admin-app');
