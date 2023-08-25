import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import Contex from "../store/Contex";

const Backdrop = (props) => {
  const Contx = useContext(Contex);

  const HandleClick = () => {
    Contx.closeModal();
  };

  return (
    <div
      onClick={HandleClick}
      className="fixed top-0 right-0 h-screen w-full z-10 bg-[#000000b6]"
    ></div>
  );
};
const Modal = (props) => {
  return (
    <div className="absolute top-0 right-0 w-full z-50 bg-primary-100">
      <Search setSearchTerm={props.setSearchTerm} />
      <div className="px-4">Results Here</div>
    </div>
  );
};

const ModalOverlay = (props) => {
  const [searchTerms, setSearchTerm] = useState("");
  const Contx = useContext(Contex);
  const modelState = Contx.isModalOpen;

  const backdrop = document.getElementById("backdrop-root");
  const modal = document.getElementById("modal-root");

  return (
    <>
      {modelState && ReactDOM.createPortal(<Backdrop />, backdrop)}
      {modelState &&
        ReactDOM.createPortal(<Modal setSearchTerm={setSearchTerm} />, modal)}
    </>
  );
};

export default ModalOverlay;
