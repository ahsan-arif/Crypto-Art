import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="ui pointing  menu">
      <NavLink className = "item"
      exact to="/"
      >
        <h4>Gallery</h4>
      </NavLink>
      <div className="right menu">
      <NavLink className = "item"
      exact to="/create/art"
      >
        <h4>Create Artwork</h4>
      </NavLink>
      </div>
    </div>
  );
};

export default Header;
