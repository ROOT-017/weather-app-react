import React from "react";
import profile_img from "../assets/TERENCE.png";

const Profile = (props) => {
  const style = props.style
    ? ` rounded-full overflow-hidden ${props.style}`
    : `h-16 w-16 rounded-full overflow-hidden`;
  const img = props.img ? props.img : profile_img;
  return (
    <div className={style}>
      <img src={img} alt="profile_img" />
    </div>
  );
};

export default Profile;
