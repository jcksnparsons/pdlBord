import React from "react";
import { BrowserRouter } from "react-router-dom"
import logo from "./logo.svg";
import * as Tone from "tone";
import "./App.css";
import Views from "./components/Views"
import SideBar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <SideBar />
      <Views />
      </BrowserRouter>
    </div>
  );
}

export default App;
