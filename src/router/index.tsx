import { useRoutes,RouteObject,Navigate } from 'react-router-dom';
import Home from '../pages/index/index';  
const GetRouters = () =>{
    const routes:RouteObject[] = useRoutes([
        {
            path: '/',
            element: <Home />
        }
    ]);
    return routes;
}
export default GetRouters;