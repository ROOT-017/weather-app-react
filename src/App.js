import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import "primereact/resources/primereact.min.css";
import { ContexProvider } from "./store/Contex";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css"; //core

// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <ContexProvider>
      <RouterProvider router={Router} />
    </ContexProvider>
  );
};

export default App;
