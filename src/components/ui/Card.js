import React from "react";

const Card = (props) => {
  const style = props.style
    ? props.style + " rounded-2xl  p-4 m-4 font-Popins"
    : "rounded-2xl  p-4 m-4 font-Popins";
  return <div className={style}>{props.children}</div>;
};

export default Card;
