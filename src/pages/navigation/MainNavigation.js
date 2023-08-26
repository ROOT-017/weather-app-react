import React, { useContext } from "react";
import Card from "../../components/ui/Card";
import Profile from "../../components/Profile";
import Contex from "../../store/Contex";
import "./MainNavigation.module.css";

import { IconContext } from "react-icons";

import { CgHome } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";

import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  const Contx = useContext(Contex);
  // const activePath = useLocation().pathname;
  const handlerSearch = () => {
    //Togle the modal
    if (Contx.isModalOpen) {
      Contx.closeModal();
    } else {
      Contx.openModal();
    }
  };
  return (
    <IconContext.Provider
      value={{ className: "text-font-100", size: "1.5em", color: "black" }}
    >
      <Card style={`bg-white`}>
        <nav>
          <ul className="w-full items-center flex justify-between">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "active" : "not-active";
              }}
              end
            >
              <li className="icon">
                <CgHome />
              </li>
            </NavLink>
            <li onClick={handlerSearch}>
              <FiSearch />
            </li>
            <NavLink
              to="/explore"
              className={({ isActive }) => {
                return isActive ? "active" : "not-active";
              }}
            >
              <li>
                <MdOutlineExplore />
              </li>
            </NavLink>
            <li>
              <Profile style={`w-[1.5em] h-[1.5em]`} />
            </li>
          </ul>
        </nav>
      </Card>
    </IconContext.Provider>
  );
};

export default MainNavigation;
