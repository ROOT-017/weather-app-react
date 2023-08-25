import React from "react";
import cloud from "./assets/storm.png";

const FurtherWeather = (props) => {
  <li className="flex justify-between">
    <>
    <img
        src={cloud}
        alt="cloud"
        className="h-16 w-16 rounded-full bg-primary-300"
      />
    </>
    <div className=" flex w-1/2 px-4 justify-between items-center rounded-[4em] border border-gray-100">
      <p className="text-font-100 font-semibold text-xl">15 &deg;</p>
      <p>
        <span className=" text-md font-semibold">Monday</span>
        <br />
        <span className="text-sm">17 August</span>
      </p>
    </div>
  </li>;
};

export default FurtherWeather;
