import React from "react";
import logo from "./logo.svg";
import * as Tone from "tone";
import "./App.css";
import Pedalboard from "./components/board/Pedalboard";
import SideBar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <SideBar />
      <Pedalboard />
    </div>
  );
}

export default App;
