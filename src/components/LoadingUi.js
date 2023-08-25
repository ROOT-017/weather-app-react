import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Contex from "../store/Contex";
import classes from "./LoadingUi.module.css";

const LoadingUi = (props) => {
  const { isLoading } = useContext(Contex);

  const loadingElt = document.getElementById("loading-modal");

  //   return { isLoading && ReactDOM.createPortal(<div>{props.children}</div>}, loadingElt);

  return (
    <>
      {!isLoading &&
        props.loading &&
        ReactDOM.createPortal(
          <div className="absolute top-0 right-0 h-screen flex-col gap-2 flex justify-center items-center w-full z-50 bg-primary-100">
            <svg className={classes.spinder} viewBox="25 25 50 50">
              <circle
                className={classes.circle}
                cx="50"
                cy="50"
                r="20"
              ></circle>
            </svg>
            <h1 className="text-gray-400">Loading...Please Wait</h1>
          </div>,
          loadingElt
        )}
      {isLoading &&
        ReactDOM.createPortal(
          <div className="absolute top-0 right-0 h-screen flex-col gap-2 flex justify-center items-center w-full z-50 bg-primary-100">
            <svg className={classes.spinder} viewBox="25 25 50 50">
              <circle
                className={classes.circle}
                cx="50"
                cy="50"
                r="20"
              ></circle>
            </svg>
            <h1 className="text-gray-400">Loading...Please Wait</h1>
          </div>,
          loadingElt
        )}{" "}
    </>
  );
};

export default LoadingUi;
