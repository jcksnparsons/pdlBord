import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import Delay from "../pedals/delay/Delay";
import Chorus from "../pedals/chorus/Chorus";
import Distortion from "../pedals/distortion/Distortion";
import APIHandler from "../../modules/APIHandler";

const Pedalboard = props => {
  const sourceInput = new Tone.UserMedia([0]);
  const [selectedPedal, setSelectedPedal] = useState("");
  const [pedals, setPedals] = useState([]);
  const [pedalSettings, setPedalSettings] = useState([]);
  const [presetToSave, setPreset] = useState({
    name: "",
    chain: null
  });

  const pedalLabels = {
    Delay: Delay,
    Chorus: Chorus,
    Distortion: Distortion
  };

  useEffect(() => {
    if (props.selectedPreset) {
      const UIpedals = props.selectedPreset.chain.map(pedal => {
        return pedalLabels[pedal.pedalType];
      });
      setPedals(UIpedals);
    }
  }, [props.selectedPreset]);

  const getPedalSettings = index => {
    if (props.selectedPreset) {
      return props.selectedPreset.chain[index];
    }
    return {};
  };

  const addPedalToChain = () => {
    if (selectedPedal) {
      setPedals([...pedals, pedalLabels[selectedPedal]]);
    }
  };

  const routeToMaster = () => {
    sourceInput.toMaster();
  };

  const updateSinglePedalSettings = (newSettings, index) => {
    const pedalSettingsSnapshot = [...pedalSettings];
    pedalSettingsSnapshot[index] = newSettings;
    setPedalSettings(pedalSettingsSnapshot);
    setPreset({name: presetToSave.name, chain: pedalSettings})
  };

  const saveSettings = presetObject => {
    APIHandler.post(presetObject);
    setPedals([]);
  };

  return (
    <>
      <button onClick={() => sourceInput.open()}>Connect to Input</button>
      <select onChange={event => setSelectedPedal(event.target.value)}>
        <option>Select a Pedal</option>
        <option value="Delay">Delay</option>
        <option value="Chorus">Chorus</option>
        <option value="Distortion">Distortion</option>
      </select>
      <button onClick={addPedalToChain}>Add to Chain</button>
      <button onClick={routeToMaster}>Route To Master</button>
      {pedals.map((Component, index) => (
        <Component
          isLast={index === pedals.length - 1}
          signal={sourceInput}
          key={index}
          onUpdate={ev => updateSinglePedalSettings(ev, index)}
          settings={getPedalSettings(index)}
        />
      ))}
      <div>
        <button onClick={() => saveSettings(presetToSave)}>Save preset</button>
      </div>
    </>
  );
};

export default Pedalboard;
