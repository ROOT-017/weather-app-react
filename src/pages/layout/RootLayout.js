import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../navigation/MainNavigation";

import ModalOverlay from "../../components/Modal";
import { useLocation } from "react-router-dom";
import LoadingUi from "../../components/LoadingUi";
import { Toast } from "primereact/toast";
import Contex from "../../store/Contex";

const RootLayout = () => {
  const location = useLocation();
  const { toast } = useContext(Contex);
  let styles =
    "h-screen md:items-center md:w-full flex flex-col justify-between ";
  const isHome = location.pathname === "/";

  if (!isHome) {
    styles =
      "h-screen bg-gradient-to-b from-primary-300 to-primary-400 md:items-center md:w-full flex flex-col justify-between ";
  }
  return (
    <div className={styles}>
      <Toast ref={toast} />
      <LoadingUi />
      <ModalOverlay />
      <Outlet />
      <MainNavigation />
    </div>
  );
};

export default RootLayout;
