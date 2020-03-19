import { Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import Pedalboard from "./board/Pedalboard";
import PresetList from "./presets/PresetList"

const Views = props => {
  const [selectedPreset, setSelectedPreset] = useState(null)
  
  return (
    <>
      <Route
        path="/board"
        render={props => {
          return <Pedalboard selectedPreset={selectedPreset} {...props} />;
        }}
      />
      <Route
        path="/presets"
        render={props => {
          return <PresetList onSelectPreset={setSelectedPreset} {...props} />
        }}
        />
    </>
  );
};

export default Views