import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

const SideBar = props => {
  return (
    <>
      <Menu>
        <a className="menu-item" href="/board">
          Pedalboard
        </a>
        <a className="menu-item" href="/presets">
          Presets
        </a>
        <a className="menu-item" href="/login">
          Logout
        </a>
      </Menu>
    </>
  );
};

export default SideBar;
