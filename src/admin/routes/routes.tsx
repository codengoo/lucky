import Setting1 from "@admin/pages/home/components/setting1";
import Setting2 from "@admin/pages/home/components/setting2";
import Setting3 from "@admin/pages/home/components/setting3";
import { Navigate, RouteObject } from "react-router-dom";
import HistoryPage from "@admin/pages/history/history";
import HomeLayout from "@admin/pages/home/layout";

const routes: Array<RouteObject> = [
    {
        path: '/history',
        element: <HistoryPage />
    },
    {
        path: "/",
        element: <Navigate to="/create" replace />
    },
    {
        path: '/create',
        element: <HomeLayout />,
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