import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../../MainLayOut';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import LoginPage from '../pages/Authentication/LoginPage/LoginPage';
import RegisterPage from '../pages/Authentication/RegisterPage/RegisterPage';
import Home from '../pages/Home/Home';
import FlowchartPage from '../pages/FlowchartPage/FlowchartPage';
import FlowchartPage2 from '../pages/FlowchartPage/FlowchartPage2/FlowchartPage2';
import FlowchartPage3 from '../pages/FlowchartPage/FlowchartPage2/flowchartPage3/FlowchartPage3';

// import { lazy } from "react";
// const Contact = lazy(() => import("../pages/Contact/Contact"));

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/flowchart",
        element: <FlowchartPage />,
      },
      {
        path: "/flowcharttwo",
        element: <FlowchartPage2 />,
      },
      {
        path: "/flowcharttree",
        element: <FlowchartPage3/>,
      },
    ],
  },
]);

export { AppRoutes };
