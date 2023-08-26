import React from "react";
import cloud from "../pages/assets/rain-drops.png";
import moment from "moment";

const HistoryItem = (props) => {
  const { data } = props;
  const day = moment(data.date).format("LLLL").split(" ");

  return (
    <li className="flex justify-between">
      <img
        src={`https://` + data.day.condition.icon}
        alt="cloud"
        className="h-16 w-16 rounded-full bg-primary-300"
      />
      <div className=" flex w-2/3 px-4  items-center justify-between datas-center rounded-[4em] border border-gray-100">
        <p className="text-font-100 font-semibold text-xl">
          {data.day.avgtemp_c} &deg;
        </p>
        <p className="flex items-end p-2 flex-col ">
          <span className=" text-md font-semibold">{day[0]}</span>
          <span className="text-sm">{`${day[2]} ${day[1]}`}</span>
        </p>
      </div>
    </li>
  );
};

export default HistoryItem;
