import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import Contex from "../store/Contex";
import SendRequest from "../client/api";
import { NavLink } from "react-router-dom";
import Spinder from "./ui/Spinder";
import getSearchedHistory from "../util/getSearchHistory";
import cloud from "../pages/assets/storm.png";

var typeCount = false;

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
  const { searchResults, searchTerms, isTyping } = props;

  if (searchTerms.length > 0) {
    typeCount = true;
  } else {
    typeCount = false;
  }

  return (
    <div className="absolute top-0 right-0 w-full z-50 bg-primary-100">
      <Search setSearchTerm={props.setSearchTerm} />

      <ul className="px-4">
        {!typeCount && (
          <h1 className="text-xl text-center pb-2 font-Roboto">Search above</h1>
        )}
        {typeCount && !searchResults.length && (
          <h1 className="text-xl text-center pb-2 font-Roboto text-gray-400">
            No Result
          </h1>
        )}
        {typeCount && isTyping && <Spinder />}

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
                <span>{result.typeCountry}</span>
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
  const [isTyping, setIsTyping] = useState(false);

  const Contx = useContext(Contex);
  const modelState = Contx.isModalOpen;

  const searchHandler = useCallback(async () => {
    const endpoint = `/search.json`;
    const res = await SendRequest("GET", endpoint, null, { q: searchTerms });
    if (!res.length) return;
    const lastSearch = {
      name: res[0]?.name,
      lat: res[0]?.lat,
      lon: res[0]?.lon,
      temp_c: res[0]?.temp_c || 23,
      icon: cloud,
    };

    //if the last search is an empty object, return
    if (Object.keys(lastSearch).length === 0) return;
    localStorage.setItem("lastSearch", JSON.stringify(lastSearch));
    getSearchedHistory(lastSearch);

    setResults([...res]);
  }, [searchTerms]);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      if (searchTerms.length === 0) return;
      setIsTyping(false);
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
          <Modal
            setSearchTerm={setSearchTerm}
            searchTerms={searchTerms}
            searchResults={result}
            isTyping={isTyping}
          />,
          modal
        )}
    </>
  );
};

export default ModalOverlay;
