import React from "react";
import cloud from "./assets/Group 23.png";
import Card from "../components/ui/Card";

const WeatherCard = (props) => {
  const { currentWeather } = props;
  const time = new Date();

  return (
    <Card style={`bg-primary-100`}>
      <div className="">
        <div className="flex w-full justify-between">
          <div className="w-1/3">
            <p className="text-gray-400">{currentWeather.location.region}</p>
            <p className="text-5xl font-bold flex h-full items-center justify-center w-full">
              <span className="text-font-100">
                {currentWeather.current.temp_c}&deg;
              </span>
            </p>
          </div>
          <div className="w-2/3 flex justify-center items-center h-full">
            <img
              src={`https:` + currentWeather.current.condition.icon}
              alt="sunny-cloud"
              className="w-32 h-32"
            />
          </div>
        </div>
        <div>
          <ul className="flex w-full justify-between rounded-lg bg-white p-4 text-font-100">
            <li className="flex flex-col">
              <span className="text-xl font-bold">
                {time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}
              </span>
              <span className="text-xs">Hour</span>
            </li>
            <li className="text-2xl">:</li>
            <li className="flex flex-col">
              <span className="text-xl font-bold">
                {time.getMinutes() < 10
                  ? "0" + time.getMinutes()
                  : time.getMinutes()}
              </span>
              <span className="text-xs">Min</span>
            </li>
            <li className="text-2xl">:</li>
            <li className="flex flex-col">
              <span className="text-xl font-bold">
                {" "}
                {time.getSeconds() < 10
                  ? "0" + time.getSeconds()
                  : time.getSeconds()}
              </span>
              <span className="text-xs">Sec</span>
            </li>
          </ul>
        </div>
      </div>{" "}
    </Card>
  );
};

export default WeatherCard;
