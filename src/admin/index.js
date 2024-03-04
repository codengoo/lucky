import { createApp } from "vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import { createStore } from 'vuex'

import routes from "./routes";
import mutations from "./store/mutation";
import actions from "./store/action";
import getters from "./store/getter";
import App from "./App.vue";

// Css
import '../index.css';
import 'vue-ionicons/ionicons.css';

const store = createStore({
    state() {
        return {
            account: {
                bank: "0",
                acc_number: "0",
                acc_name: "0"
            },
            wish: "Chúc mừng bạn",
            password: ""
        }
    },
    mutations,
    actions,
    getters
})

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.config.globalProperties.window = window;
app.use(router);
app.use(store);
app.mount('#wplk-admin-app');
