import { createApp } from "vue";
import { createRouter, createWebHashHistory } from 'vue-router';

import HomeLayout from "./pages/home/layout.vue";
import Setting1 from "./pages/home/components/Setting1.vue";
import Setting2 from "./pages/home/components/Setting2.vue";
import Setting3 from "./pages/home/components/Setting3.vue";
import Setting4 from "./pages/home/components/Setting4.vue";
import HistoryVue from "./pages/history/History.vue";

import App from "./App.vue";

import '../index.css';

const routes = [
    {
        path: '/history',
        name: "history",
        component: HistoryVue
    },
    {
        path: "/",
        redirect: "/create"
    },
    {
        path: '/create',
        component: HomeLayout,
        children: [
            {
                path: '',
                name: "create.step1",
                component: Setting1,
            },
            {
                path: 'step2',
                name: "create.step2",
                component: Setting2,
            },
            {
                path: 'step3',
                name: "create.step3",
                component: Setting3,
            },
            {
                path: 'step4',
                name: "create.step4",
                component: Setting4,
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.config.globalProperties.window = window;
app.use(router);
console.log(router);
app.mount('#wplk-admin-app');
