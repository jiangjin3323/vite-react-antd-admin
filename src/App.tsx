import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Routes,
} from "react-router-dom";
import routers from "./router";
import AuthRoute from "./router/beforeRouter";

const App = () => {
//   const loginState = useSelector((state: any) => state.token);
  // 处理我们的routers
  const RouteAuthFun = (
    (routeList: any[]) => {
      return routeList.map(
        (item: {
          path: string;
          element: ReactNode;
          children?: any;
        }) => {
          return (
            <Route
              path={item.path}
              element={
                <AuthRoute key={item.path}>
                  {item.element}
                </AuthRoute>
              }
              key={item.path}
            >
              {/* 递归调用，因为可能存在多级的路由 */}
              {item?.children && RouteAuthFun(item.children)}
            </Route>
          );
        }
      );
    }
  );
  return <Routes>{RouteAuthFun(routers)}</Routes>;
};

export default App;