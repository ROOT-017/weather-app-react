import React from "react";
import SubHeader from "../components/SubHeader";
import cloud from "./assets/storm.png";
import FurtherWeather from "../components/FurtherWeather";
import Contex from "../store/Contex";
import { useContext } from "react";

const WeatherDetail = (props) => {
  const { currentWeather } = useContext(Contex);
  return (
    <div className="w-full px-4">
      <SubHeader city={currentWeather.location.region} rainProbalilty={30} />
      <div className="flex justify-around items-center">
        <div>
          <img src={cloud} alt="cloud" className="h-28 w-28  " />
        </div>
        <div>
          <span className="text-[6em] font-bold text-white">
            {currentWeather.current.temp_c}&deg;
          </span>
        </div>
      </div>
      <div className="rounded-3xl bg-white h-full">
        <div className="flex justify-center pt-2">
          <div className="bg-primary-300 h-3 rounded-full w-1/3"></div>
        </div>
        <h1 className="text-xl font-Roboto py-4 pl-4 font-bold">
          Further Weather
        </h1>
        <ul className="px-4 fle x flex-col gap-3">
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
          </li>
          ;
        </ul>
      </div>
    </div>
  );
};

export default WeatherDetail;
