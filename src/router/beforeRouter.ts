import { message } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import routers from "./index";

const AuthRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const token:string = sessionStorage.getItem('TOKEN') || '';
  const mathchs = matchRoutes(routers, location);
  const isExist = mathchs?.some((item) => item.pathname == location.pathname);
  useEffect(() => {
    if (!token) {
      message.error("token 过期，请重新登录!");
      navigate("/login");
      return;
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isExist) {
      // 如果是其他路由就跳到其他的路由
      navigate(location.pathname);
    }
  }, []);

  return children;
};

export default AuthRoute;