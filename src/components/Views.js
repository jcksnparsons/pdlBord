import { Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import Pedalboard from "./board/Pedalboard";
import PresetList from "./presets/PresetList";
import Login from "./login/Login";

const Views = props => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const currentUser = props.currentUser;
  const setAsUser = props.setAsUser;

  return (
    <>
      <Route
        exact
        path="/"
        render={props => {
          return <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/login"
        render={props => {
          return <Login setAsUser={setAsUser} {...props} />;
        }}
      />
      <Route
        path="/board"
        render={props => {
          return (
            <Pedalboard
              selectedPreset={selectedPreset}
              currentUser={currentUser}
              {...props}
            />
          );
        }}
      />
      <Route
        path="/presets"
        render={props => {
          return (
            <PresetList
              onSelectPreset={setSelectedPreset}
              currentUser={currentUser}
              {...props}
            />
          );
        }}
      />
    </>
  );
};

export default Views;
