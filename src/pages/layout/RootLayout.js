import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../navigation/MainNavigation";

import ModalOverlay from "../../components/Modal";
import { useLocation } from "react-router-dom";
import LoadingUi from "../../components/LoadingUi";

const RootLayout = () => {
  const location = useLocation();
  let styles =
    "h-screen md:items-center md:w-full flex flex-col justify-between ";
  const isHome = location.pathname === "/";

  if (!isHome) {
    styles =
      "h-screen bg-gradient-to-b from-primary-300 to-primary-400 md:items-center md:w-full flex flex-col justify-between ";
  }
  return (
    <div className={styles}>
      <LoadingUi />
      <ModalOverlay />
      <Outlet />
      <MainNavigation />
    </div>
  );
};

export default RootLayout;
