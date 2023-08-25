import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import Contex from "../store/Contex";
import SendRequest from "../client/api";
import { NavLink } from "react-router-dom";

const Backdrop = (props) => {
  const Contx = useContext(Contex);

  const HandleClick = () => {
    props.clearResult([]);
    props.clearSearch("");
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
  const { closeModal } = useContext(Contex);
  const { searchResults } = props;
  return (
    <div className="absolute top-0 right-0 w-full z-50 bg-primary-100">
      <Search setSearchTerm={props.setSearchTerm} />
      <ul className="px-4">
        {!searchResults.length && (
          <h1 className="text-xl text-center pb-2 font-Roboto">No Result</h1>
        )}
        {searchResults.length > 0 &&
          searchResults.map((result) => (
            <NavLink
              to={`/detail/${result.name.toLowerCase()}?lat=${result.lat}&lon=${
                result.lon
              }`}
              key={result.id}
              onClick={closeModal}
            >
              <li
                key={result.id}
                className="justify-between border-b flex w-full items-center py-4"
              >
                <span>
                  <img src={`https://` + result.url} alt={result.id} />
                </span>
                <span>{result.name}</span>
                <span>{result.country}</span>
              </li>
            </NavLink>
          ))}
      </ul>
    </div>
  );
};

const ModalOverlay = (props) => {
  const [searchTerms, setSearchTerm] = useState("");
  const [result, setResults] = useState([]);

  const Contx = useContext(Contex);
  const modelState = Contx.isModalOpen;

  const searchHandler = useCallback(async () => {
    const endpoint = `/search.json`;
    const res = await SendRequest("GET", endpoint, null, searchTerms);
    setResults([...res]);
  }, [searchTerms]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerms === "") return;
      searchHandler();
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerms, searchHandler]);

  const backdrop = document.getElementById("backdrop-root");
  const modal = document.getElementById("modal-root");

  return (
    <>
      {modelState &&
        ReactDOM.createPortal(
          <Backdrop clearSearch={setSearchTerm} clearResult={setResults} />,
          backdrop
        )}
      {modelState &&
        ReactDOM.createPortal(
          <Modal setSearchTerm={setSearchTerm} searchResults={result} />,
          modal
        )}
    </>
  );
};

export default ModalOverlay;
