import React, { Suspense, useCallback } from "react";
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
import SendRequest from "../client/api";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import LoadingUi from "../components/LoadingUi";

const Export = (props) => {
  const day = moment().format("LLLL").split(" ");

  const { data } = useRouteLoaderData("weather-explore");
  const { toggleLoading } = useContext(Contex);

  useCallback(() => {
    toggleLoading();
  }, [toggleLoading]);

  return (
    <Suspense fallback={<LoadingUi loading={true} />}>
      <Await resolve={data}>
        {(data) => (
          <div className=" text-white font-Roboto">
            <SubHeader city={data.location.region} rainProbalilty={55} />
            <div className="flex items-center h-fit flex-col w-full">
              <div className=" font-bold">
                <span className="text-[6em]">{data.current.temp_c}&deg;</span>
              </div>
              <div className="flex justify-between items-baseline font-Roboto">
                <div>
                  <h2 className="text-center text-sm">Wind</h2>
                  <h2 className="text-center">{data.current.wind_kph}km/h</h2>
                </div>
                <di>
                  <img src={cloud} alt="storm-cloud" className="h-48 w-48" />
                </di>
                <div>
                  <h2 className="text-center text-sm">Humidity</h2>
                  <h2 className="text-center">{data.current.humidity}%</h2>
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
        )}
      </Await>
    </Suspense>
  );
};

export default Export;

export const currentWeatherLoader = async (props) => {
  const coords = {
    lat: localStorage.getItem("lat"),
    lon: localStorage.getItem("lon"),
  };
  // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const endpoint = "/current.json";
  const response = await SendRequest("GET", endpoint, null, {
    q: `${coords.lat},${coords.lon}`,
  });
  return defer({
    data: response,
  });
};
