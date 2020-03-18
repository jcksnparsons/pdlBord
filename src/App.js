import React from "react";
import { BrowserRouter } from "react-router-dom"
import "./App.css";
import Views from "./components/Views"
import SideBar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <SideBar />
      <Views />
      </BrowserRouter>
    </div>
  );
}

export default App;
