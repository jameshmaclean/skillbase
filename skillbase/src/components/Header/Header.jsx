import React from "react";
import logo from "../../assets/logo.svg";
import "./index.css";
const Header = () => {
  return (
    <div className="header">
      <img
        src={logo}
        alt="Logo BaseSkill"
        className="logo"
        style={{ fill: "white" }}
      />
    </div>
  );
};

export default Header;
