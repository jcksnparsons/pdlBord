import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Views from "./components/Views";
import SideBar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";

function App() {
  const isLoggedIn = () => sessionStorage.getItem("userCredentials") !== null;

  const [currentUser, setCurrentUser] = useState(isLoggedIn());

  const setAsUser = user => {
    sessionStorage.setItem("userCredentials", JSON.stringify(user));
    setCurrentUser(isLoggedIn());
  };

  const clearAsUser = () => {
    sessionStorage.clear();
    setCurrentUser(isLoggedIn());
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <SideBar currentUser={currentUser} clearAsUser={clearAsUser} />
        <Views currentUser={currentUser} setAsUser={setAsUser} />
      </BrowserRouter>
    </div>
  );
}

export default App;
