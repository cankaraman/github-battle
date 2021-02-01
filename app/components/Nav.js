import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import themeContext from "../contexts/theme";

const activeStyle = {
  color: "rgb(187, 46, 31)",
};

export default function Nav() {
  const { theme, toggleTheme } = useContext(themeContext);

  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink exact activeStyle={activeStyle} to="/" className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/battle" className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🔦" : "💡"}
      </button>
    </nav>
  );
}
