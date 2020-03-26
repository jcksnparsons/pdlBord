import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

const SideBar = props => {
  const manageLogout = () => {
    props.clearAsUser();
    props.history.push("/login");
  };

  return (
    <>
      <Menu>
        <a className="menu-item" href="/board">
          Pedalboard
        </a>
        <a className="menu-item" href="/presets">
          Presets
        </a>
        {props.currentUser ? (
          <a className="menu-item" href="/login" onClick={() => manageLogout()}>
            Logout
          </a>
        ) : null}
      </Menu>
    </>
  );
};

export default SideBar;
