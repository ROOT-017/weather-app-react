import React, { Suspense, useCallback, useEffect, useState } from "react";
import SubHeader from "../components/SubHeader";
import cloud from "./assets/storm.png";
import Contex from "../store/Contex";
import { useContext } from "react";
import queryString from "query-string";
import { Await, defer } from "react-router-dom";
import SendRequest from "../client/api";
import HistoryItem from "./HistoryItem";
import LoadingUi from "../components/LoadingUi";
import { useRouteLoaderData, useLocation } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import Spinder from "../components/ui/Spinder";

const getPastDate = () => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(pastDate.getDate() - 5);
  const pastDateFormated = pastDate.toISOString().split("T")[0];
  return {
    dt: pastDateFormated,
    end_dt: today.toISOString().split("T")[0],
  };
};
const WeatherDetail = (props) => {
  const { toggleLoading, isFavorite, addFavorite, removeFavorite } =
    useContext(Contex);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const location = useLocation().search.split("?")[1];
  const [color, setColor] = useState(undefined);

  const { lat, lon } = queryString.parse(location);

  const { data } = useRouteLoaderData("weather-detail");

  const getWeatherHistory = useCallback(async () => {
    const res = await SendRequest("GET", "/history.json", null, {
      q: `${lat},${lon}`,
      dt: getPastDate().dt,
      lang: "en",
      end_dt: getPastDate().end_dt,
    });
    setWeatherHistory([...res.forecast.forecastday]);
    return res;
  }, [lat, lon]);

  useCallback(() => {
    toggleLoading();
  }, [toggleLoading]);

  useEffect(() => {
    getWeatherHistory();
  }, [getWeatherHistory]);

  const handlerLike = () => {
    const fav = {
      name: data.location.name,
      lat: data.location.lat,
      lon: data.location.lon,
      temp: data.current.temp_c,
      icon: data.current.condition.icon,
    };

    if (isFavorite === null) {
      addFavorite(fav);
      return;
    }
    removeFavorite();
  };
  useEffect(() => {
    if (isFavorite === null) return;
    if (
      isFavorite.lat.toString() === lat &&
      isFavorite.lon.toString() === lon
    ) {
      setColor("#ed0000");
      return;
    }
  }, [isFavorite, lat, lon, color]);

  return (
    <div className="w-full flex flex-col justify-between h-[96vh] px-4">
      <div>
        <SubHeader city={data.location.region} rainProbalilty={30} />
        <Suspense fallback={<LoadingUi loading={true} />}>
          <Await resolve={data}>
            {(data) => (
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
            )}
          </Await>
        </Suspense>
      </div>
      <div className="rounded-3xl bg-white">
        <div className="flex justify-center pt-2">
          <div className="bg-primary-300 h-3 rounded-full w-1/3"></div>
        </div>
        <p className="flex justify-between items-center px-4">
          <span className="text-xl font-Roboto py-4 text-gray-500  font-semibold">
            Weather History
          </span>
          <span>
            <BsFillHeartFill
              size={`1.5em`}
              onClick={handlerLike}
              color={color}
            />
          </span>
        </p>
        <ul className="px-4 pb-4 flex flex-col gap-3">
          {!weatherHistory.length > 0 && (
            <div className="h-full w-full flex justify-center items-center">
              <Spinder />
            </div>
          )}
          {weatherHistory.map((weather) => (
            <HistoryItem data={weather} key={weather.date} />
          ))}
        </ul>
      </div>
    </div>
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

  const res = await SendRequest("GET", "/current.json", null, {
    q: `${q.lat},${q.lon}`,
  });
  return defer({
    data: res,
  });
};
