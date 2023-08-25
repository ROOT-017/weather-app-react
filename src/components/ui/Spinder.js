import React from "react";
import classes from "./../LoadingUi.module.css";
import Card from "./Card";

const Spinder = () => {
  return (
    <Card style={`bg-primary-100 flex justify-center  items-center`}>
      <svg className={classes.spinder} viewBox="25 25 50 50">
        <circle className={classes.circle} cx="50" cy="50" r="20"></circle>
      </svg>
    </Card>
  );
};

export default Spinder;
