import React, { Suspense, useCallback, useEffect } from "react";
import SubHeader from "../components/SubHeader";
import cloud from "./assets/storm.png";
import FurtherWeather from "../components/FurtherWeather";
import Contex from "../store/Contex";
import { useContext } from "react";
import queryString from "query-string";
import { Await, defer } from "react-router-dom";
import SendRequest from "../client/api";

import LoadingUi from "../components/LoadingUi";

import { useRouteLoaderData } from "react-router-dom";

const WeatherDetail = (props) => {
  const { setIsLoading, openModal, toggleLoading } = useContext(Contex);

  const { data } = useRouteLoaderData("weather-detail");

  useCallback(() => {
    toggleLoading();
  }, [toggleLoading]);

  return (
    <Suspense fallback={<LoadingUi loading={true} />}>
      <Await resolve={data}>
        {(data) => (
          <div className="w-full px-4">
            <SubHeader city={data.location.region} rainProbalilty={30} />
            <div className="flex justify-around items-center">
              <div>
                <img src={cloud} alt="cloud" className="h-28 w-28  " />
              </div>
              <div>
                <span className="text-[6em] font-bold text-white">
                  {data.current.temp_c}&deg;
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
                    <p className="text-font-100 font-semibold text-xl">
                      15 &deg;
                    </p>
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
        )}
      </Await>
    </Suspense>
  );
};

export default WeatherDetail;

export const EventLoader = async (props) => {
  const url = props.request.url;
  const q = queryString.parse(props.request.url);
  var coords = {
    lat: q.lat,
    lon: q.lon,
  };
  url
    .split("?")[1]
    .split("&")
    .map((e) => {
      const [key, value] = e.split("=");
      q[key] = value;
      coords[key] = value;
      return q;
    });

  const res = await SendRequest(
    "GET",
    "/current.json",
    null,
    `${q.lat},${q.lon}`
  );
  return defer({
    data: res,
  });
};
