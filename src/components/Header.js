import React, { useContext } from "react";
import Profile from "./Profile";
import Contex from "../store/Contex";
import moment from "moment";

const Header = () => {
  const currentTime = new Date();
  const day = moment().format("LLLL").split(" ");

  //Constomize the greeting
  let greeting;
  if (currentTime.getHours() < 12) {
    greeting = "Good Morning";
  } else if (currentTime.getHours() < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }
  return (
    <div className="flex w-full justify-between p-4 font-Popins">
      <div>
        <p className=" font-bold text-3xl">
          {greeting.split(" ")[0]} <br />
          {greeting.split(" ")[1]}
        </p>
        <h1 className="text-gray-400 text-sm">
          {day[2]} {day[1]} {day[0]}
        </h1>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};

export default Header;
