import Home from '../pages/index/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import Product from '../pages/product/index';
import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
import Layout from '../components/Layout';
// type routerType = {
//     path?: string,
//     element: any,
//     children?: Array<routerType>,
//     index?: boolean,
//     icon?: any,
//     name?: string,
//     component?:string
// }
const routers:any = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path:'/',
                index: true,
                name: '轮播部分',
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
                path: '/product',
                name: '产品',
                icon: <ChromeFilled />,
                element: <Product />,
                component: './product',
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
];
export default routers;

