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
    name: null,
    userId: 1,
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
    setPreset({
      name: presetToSave.name,
      userId: presetToSave.userId,
      chain: pedalSettings
    });
  };

  const saveSettings = presetToSave => {
    const presetName = prompt("Name your preset");

    if (presetName !== null) {
      const presetObject = { name: presetName, userId: presetToSave.userId };

      APIHandler.post(presetObject);

      const presetChainArray = presetToSave.chain;
      // 4. Change those settings into objects(distortionSettings, delaySettings, chorusSettings) INCLUDING the spot in which they exist in the array(order) && the id of the preset to which they belong (fetch call to grab that data?)
      presetChainArray.forEach(presetPedal => {
        if (presetPedal.pedalType === "Distortion") {
          const distortionObject = {
            presetId: null /* I have no idea how to get this info yet */,
            distortion: presetPedal.distortion,
            oversample: presetPedal.oversample,
            order: presetChainArray[presetPedal]
          };
        }

        if (presetPedal.pedalType === "Chorus") {
          const chorusObject = {
            presetId: null /* Samesies here */,
            frequency: presetPedal.frequency,
            delayTime: presetPedal.delayTime,
            depth: presetPedal.depth,
            order: presetChainArray[presetPedal]
          };
        }

        if (presetPedal.pedalType === "Delay") {
          const delayObject = {
            presetId: null /* Do I need to say it again? */,
            delayTime: presetPedal.delayTime,
            wet: presetPedal.wet,
            feedback: presetPedal.feedback,
            order: presetChainArray[presetPedal]
          };
        }
      });
      // 5. Save each of those settings objects to each of their respective resources
      // promise.all()

      /* setPreset({ name: presetName, chain: pedalSettings }); */

      // TODO: Function that will change presetToSave into format that is accepted by new database ("name": string, "userId": num, "distortionSettings": object, "chorusSettings": object, "delaySettings": object)

      //APIHandler.post(presetToSave);
      setPedals([]);
    } else {
      alert("Please enter a valid name for your preset");
    }
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
