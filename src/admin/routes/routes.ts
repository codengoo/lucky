import { RouteRecordRaw } from "vue-router";

import HomeLayout from "@admin/pages/home/layout.vue";
import Setting1 from "@admin/pages/home/components/Setting1.vue";
import Setting2 from "@admin/pages/home/components/Setting2.vue";
import Setting3 from "@admin/pages/home/components/Setting3.vue";
import Setting4 from "@admin/pages/home/components/Setting4.vue";
import HistoryVue from "@admin/pages/history/History.vue";


const routes: Array<RouteRecordRaw> = [
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

export default routes;