import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/layout/RootLayout";
import { Suspense, lazy } from "react";
import Home from "../pages/Home";
import SendRequest from "../client/api";
import { currentWeather } from "../pages/Home";

const Explore = lazy(() => import("../pages/Explore"));
const Detail = lazy(() => import("../pages/Detail"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        id: "home",
        // loader: currentWeather,
      },
      {
        path: "/explore",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <Explore />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: <div>Profile</div>,
      },
      {
        path: "/detail/:id",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <Detail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
