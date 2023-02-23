import Home from '../pages/index/index';
import Login from '../pages/login/index';
import User from '../pages/user/index';
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
const GetRouters = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/user',
            element: <User />,
        },
        {
            path: '/login',
            element: <Login />,
        }
    ]
    return useRoutes(routes);
}
export default GetRouters;

