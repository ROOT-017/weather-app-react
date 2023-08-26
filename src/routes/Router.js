import { Await, createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/layout/RootLayout";
import { Suspense, lazy } from "react";
import Home, { lastSearchLoader } from "../pages/Home";
import SendRequest from "../client/api";
import { currentWeather } from "../pages/Home";
import { EventLoader } from "../pages/Detail";
import LoadingUi from "../components/LoadingUi";
import { currentWeatherLoader } from "../pages/Explore";

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
        loader: lastSearchLoader,
      },
      {
        path: "/explore",
        loader: currentWeatherLoader,
        id: "weather-explore",
        element: <Explore />,
      },
      {
        path: "/profile",
        element: <div>Profile</div>,
      },
      {
        path: "/detail/:id",
        loader: EventLoader,
        id: "weather-detail",
        element: <Detail />,
      },
    ],
  },
]);

export default Router;
