import QRSetting1 from "@admin/pages/home/components/setting1";
import QRSetting2 from "@admin/pages/home/components/setting2";
import QRSetting3 from "@admin/pages/home/components/setting3";

import MessageSetting1 from "@admin/pages/message/components/setting1";
import MessageSetting2 from "@admin/pages/message/components/setting2";
import MessageSetting3 from "@admin/pages/message/components/setting3";
import MessageSetting4 from "@admin/pages/message/components/setting4";

import History from "@admin/pages/history/components/history";

import HistoryPage from "@admin/pages/history";
import HomePage from "@admin/pages/home";
import MessagePage from "@admin/pages/message";

import { Navigate, RouteObject } from "react-router-dom";

const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <Navigate to="/qr/create" replace />
    },
    {
        path: '/qr/history',
        element: <HistoryPage />,
        children: [
            {
                index: true,
                element: <History />
            }
        ]
    },
    {
        path: '/qr/create',
        element: <HomePage />,
        children: [
            {
                index: true,
                element: <QRSetting1 />,
            },
            {
                path: 'step2',
                element: <QRSetting2 />,
            },
            {
                path: 'step3',
                element: <QRSetting3 />,
            }
        ]
    },
    {
        path: '/message/create',
        element: <MessagePage />,
        children: [
            {
                index: true,
                element: <MessageSetting1 />,
            },
            {
                path: 'step2',
                element: <MessageSetting2 />,
            },
            {
                path: 'step3',
                element: <MessageSetting3 />,
            },
            {
                path: 'step4',
                element: <MessageSetting4 />,
            }
        ]
    },

];

export default routes;