import { createApp } from "vue";

import router from "./routes";
import store from "./store/";
import App from "./App.vue";

// Css
import '../index.css';
import 'vue-ionicons/ionicons.css';


const app = createApp(App)
app.config.globalProperties.window = window;
app.use(router);
app.use(store);
app.mount('#wplk-admin-app');
