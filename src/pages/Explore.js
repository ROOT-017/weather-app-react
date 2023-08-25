import React from "react";
import cloud from "./assets/storm.png";
import SubHeader from "../components/SubHeader";

import { GiBrainstorm } from "react-icons/gi";
import { WiDayThunderstorm } from "react-icons/wi";
import { PiWindLight } from "react-icons/pi";
import { TbSunWind } from "react-icons/tb";
import { IconContext } from "react-icons";

import Contex from "../store/Contex";
import { useContext } from "react";

import Graph from "../components/Graph";

import moment from "moment";

const Export = (props) => {
  const { currentWeather } = useContext(Contex);
  const day = moment().format("LLLL").split(" ");

  return (
    <div className=" h-max text-white font-Roboto">
      <SubHeader city={currentWeather.location.region} rainProbalilty={30} />
      <div className="flex items-center flex-col w-full">
        <div className=" font-bold">
          <span className="text-[6em] font-bold">
            {currentWeather.current.temp_c}&deg;
          </span>
        </div>
        <div className="flex justify-between items-baseline font-Roboto">
          <div className="">
            <h2 className="text-center text-sm">wind</h2>
            <h2 className="text-center">
              {currentWeather.current.wind_kph}km/h
            </h2>
          </div>
          <div>
            <img src={cloud} alt="storm-cloud" className="h-48 w-48" />
          </div>
          <div>
            <h2 className="text-center text-sm">Humidity</h2>
            <h2 className="text-center">{currentWeather.current.humidity}</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Graph />
      </div>
      <div>
        <IconContext.Provider value={{ size: "1.5em" }}>
          <ul className="flex justify-between w-full px-4">
            <li>
              <GiBrainstorm />
            </li>
            <li>
              <TbSunWind />
            </li>
            <li>
              {day[0]} {day[2]} {day[1]}
            </li>
            <li>
              <WiDayThunderstorm />
            </li>
            <li>
              <PiWindLight />
            </li>
          </ul>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Export;
