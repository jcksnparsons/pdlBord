import React from "react";
import { slide as Menu } from "react-burger-menu";
import './Sidebar.css'

const SideBar = props => {

  return (
    <>
      <Menu>
        <a className="menu-item" href="/presets">
          Presets
        </a>
      </Menu>
    </>
  );
};

export default SideBar;
