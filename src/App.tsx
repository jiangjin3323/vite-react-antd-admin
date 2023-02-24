import React from 'react';
import GetRouters from './router';
import { HashRouter,Link,useRoutes } from 'react-router-dom';
import './App.scss';
const App = () => <>{useRoutes(GetRouters)}</>
export default App;