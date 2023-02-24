import Home from '../pages/index/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import Calendar from '../pages/product/detail';
import { Navigate } from 'react-router-dom';
import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
import Layout from '../components/Layout';
type routerType = {
    path?: string,
    element: any,
    children?: Array<routerType>,
    index?: boolean,
    icon?: any,
    name?: string,
    component?:string
}
const routers: routerType[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                name: '欢迎',
                icon: <SmileFilled />,
                element: <Home />
            },
            {
                path: '/user',
                name: '用户',
                icon: <ChromeFilled />,
                element: <User />,
                component: './user',
            },
            {
                path: '/calendar',
                name: '日历',
                icon: <ChromeFilled />,
                element: <Calendar />,
                component: './user',
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
];
export default routers;

