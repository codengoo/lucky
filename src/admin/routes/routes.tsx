import Setting1 from "@admin/pages/home/components/setting1";
import Setting2 from "@admin/pages/home/components/setting2";
import Setting3 from "@admin/pages/home/components/setting3";

import History from "@admin/pages/history/components/history";

import { Navigate, RouteObject } from "react-router-dom";
import HistoryPage from "@admin/pages/history";
import HomePage from "@admin/pages/home";

const routes: Array<RouteObject> = [
    {
        path: '/history',
        element: <HistoryPage />,
        children: [
            {
                index: true,
                element: <History />
            }
        ]
    },
    {
        path: "/",
        element: <Navigate to="/create" replace />
    },
    {
        path: '/create',
        element: <HomePage />,
        children: [
            {
                index: true,
                element: <Setting1 />,
            },
            {
                path: 'step2',
                element: <Setting2 />,
            },
            {
                path: 'step3',
                element: <Setting3 />,
            }
        ]
    }
];

export default routes;