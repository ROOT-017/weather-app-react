import { Await, createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/layout/RootLayout";
import { Suspense, lazy } from "react";
import Home from "../pages/Home";
import SendRequest from "../client/api";
import { currentWeather } from "../pages/Home";
import { EventLoader } from "../pages/Detail";
import LoadingUi from "../components/LoadingUi";

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
          <Suspense fallback={<LoadingUi loading={true} />}>
            <Await>
              <Explore />
            </Await>
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: <div>Profile</div>,
      },
      {
        path: "/detail/:id",
        loader: EventLoader,
        id: "weather-detail",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <Await>
              <Detail />
            </Await>
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
