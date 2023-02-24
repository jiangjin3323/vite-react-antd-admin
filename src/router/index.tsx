import Home from '../pages/index/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import { Navigate } from 'react-router-dom';
import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
import Layout from '../components/Layout';
type routerType = {
    path?: string,
    element: any,
    children?: Array<routerType>,
    index?: boolean,
    icon?:any,
    name?: string,
}
const routers: routerType[] = [
    {
        path: '/',
        element: <Layout />,
        icon: <SmileFilled />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/user',
                element: <User />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
];
export default routers;

