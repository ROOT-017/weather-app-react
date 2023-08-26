import React from "react";
const SubHeader = (props) => {
  const { city, rainProbalilty } = props;
  const message = rainProbalilty > 50 ? "Bring an umbrella" : "No rain today";
  const chancesOfRainMessage = `Chances of rain: ${rainProbalilty}%`;
  return (
    <>
      <h1 className="text-center text-3xl px-4 font-bold font-Roboto text-white">
        {city}
      </h1>

      <h1 className="text-center text-md font-bold font-Roboto text-white">
        {chancesOfRainMessage}
      </h1>
      <h1 className="text-center text-md font-bold font-Roboto text-xs text-white">
        {message}
      </h1>
    </>
  );
};

export default SubHeader;
