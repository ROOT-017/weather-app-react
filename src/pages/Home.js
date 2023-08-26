import React, { useEffect, useState, useContext, useCallback } from "react";
import Header from "../components/Header";
import WeatherCard from "../components/WeatherCard";

import SendRequest from "../client/api";

import Card from "../components/ui/Card";

import cloud from "./assets/storm.png";
import { NavLink, defer } from "react-router-dom";
import Contex from "../store/Contex";

import Spinder from "../components/ui/Spinder";


const Home = () => {
  const {
    setPositionHandler,
    position,
    setCurrentWeather,
    currentWeather,
    isFavorite,
  } = useContext(Contex);

  const [lastSearch, setLastSearch] = useState(null);
  const getPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (e) => {
      try {
        localStorage.setItem("lat", e.coords.latitude);
        localStorage.setItem("lon", e.coords.longitude);
        setPositionHandler(e.coords.latitude, e.coords.longitude);
      } catch (e) {
        console.log(e);
      }
    });
  }, [setPositionHandler]);

  const fetchData = useCallback(async () => {
    if (position.lat === 0 || position.lon === 0) return;
    const endpoint = `/current.json`;
    try {
      const response = await SendRequest("GET", endpoint, null, {
        q: `${position.lat},${position.lon}`,
      });
      // console.log(response);
      setCurrentWeather(response);
    } catch (e) {
      console.log(e);
    }
  }, [position.lat, position.lon, setCurrentWeather]);

  // const { data, error } = useRouteLoaderData("home");

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("lastSearch"));
    if (data) {
      setLastSearch(data);
    }
  }, []);


  return (
    <div>
      <Header />
      <div className="carousel md:w-[390px]">
        {!currentWeather && <Spinder />}
        {currentWeather && (
          <NavLink
            to={
              `detail/` +
              currentWeather.location.region.toLowerCase() +
              "?" +
              `lat=` +
              currentWeather.location.lat +
              `&` +
              `lon=` +
              currentWeather.location.lon
            }
            params={{
              lat: currentWeather.location.lat,
              lon: currentWeather.location.lon,
            }}
          >
            <WeatherCard currentWeather={currentWeather} />
          </NavLink>
        )}
      </div>
      {isFavorite !== null && (
        <NavLink
          to={
            `detail/` +
            isFavorite.name.toLowerCase() +
            "?" +
            `lat=` +
            isFavorite.lat +
            `&` +
            `lon=` +
            isFavorite.lon
          }
        >
          <h1 className="px-4 font-Roboto text-xl font-bold">Your Favourite</h1>
          <Card style={`bg-primary-100`}>
            <div className="flex w-full justify-between">
              <div className="w-1/3">
                <p className="text-gray-400">{isFavorite.name}</p>
                <p className="text-5xl font-bold flex h-full items-center justify-center w-full">
                  <span className="text-font-100">{isFavorite.temp}&deg;</span>
                </p>
              </div>
              <div className="w-2/3 flex justify-center items-center h-full">
                <img
                  src={`https:` + isFavorite.icon}
                  alt="sunny-cloud"
                  className="w-32 h-32"
                />
              </div>
            </div>
          </Card>
        </NavLink>
      )}

      {lastSearch && (
        <>
          <h1 className="px-4 font-Roboto text-xl font-bold">Last Search</h1>
          <NavLink
            to={
              `detail/` +
              lastSearch.name.toLowerCase() +
              "?" +
              `lat=` +
              lastSearch.lat +
              `&` +
              `lon=` +
              lastSearch.lon
            }
          >
            <Card style={`bg-primary-100`}>
              <div className="flex w-full justify-between">
                <div className="w-1/3">
                  <p className="text-gray-400">
                    {lastSearch.name.split(" ")[0]}
                  </p>
                  <p className="text-5xl font-bold flex h-full items-center justify-center w-full">
                    <span className="text-font-100">
                      {lastSearch.temp_c}&deg;
                    </span>
                  </p>
                </div>
                <div className="w-2/3 flex justify-center items-center h-full">
                  <img src={cloud} alt="sunny-cloud" className="w-32 h-32" />
                </div>
              </div>
            </Card>
          </NavLink>
        </>
      )}
    </div>
  );
};
export default Home;

export const lastSearchLoader = async (props) => {
  const defaultSearch = {
    lat: 0,
    lon: 0,
  };

  try {
    const lastSearch =
      JSON.parse(localStorage.getItem("lastSearch")) || defaultSearch;

    const coords = {
      lat: lastSearch.lat,
      lon: lastSearch.lon,
    };
    const response = await SendRequest("GET", "/current.json", null, {
      q: `${coords.lat},${coords.lon}`,
    });
    return defer({
      data: response,
    });
  } catch (e) {
    return defer({
      data: null,
      error: e,
    });
  }
};
