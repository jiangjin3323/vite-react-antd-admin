import Home from '../pages/index/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import Product from '../pages/product/index';
import Header from '../pages/header/index';
import { AreaChartOutlined, UserOutlined,AppstoreFilled,MedicineBoxOutlined } from '@ant-design/icons';
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
                icon: <AreaChartOutlined />,
                element: <Home />
            },
            {
                path: '/user',
                name: '用户',
                icon: <UserOutlined />,
                element: <User />,
                component: './user',
            },
            {
                path: '/product',
                name: '产品',
                icon: <AppstoreFilled />,
                element: <Product />,
                component: './product',
            },
            {
                path: '/header',
                name: '头部信息',
                icon: <MedicineBoxOutlined />,
                element: <Header />,
                component: './header',
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
];
export default routers;

