import React, { useState } from "react";
import * as Tone from "tone";
import Delay from "../pedals/delay/Delay";
import Chorus from "../pedals/chorus/Chorus"

const Pedalboard = () => {
  const sourceInput = new Tone.UserMedia([3])
  const [selectedPedal, setSelectedPedal] = useState("");
  const [pedals, setPedals] = useState([]);

  const pedalLabels = {
      "Delay": Delay,
      "Chorus": Chorus
  }

  const addPedalToChain = () => {
    if (selectedPedal) {
        setPedals([...pedals, pedalLabels[selectedPedal]])
    }
  };

  const routeToMaster = () => {
      sourceInput.toMaster()
  }

  return (
    <>
      <button onClick={() => sourceInput.open()}>Connect to Input</button>
      <select onChange={event => setSelectedPedal(event.target.value)}>
        <option>Select a Pedal</option>
        <option value="Delay">Delay</option>
        <option value="Chorus">Chorus</option>
      </select>
      <button onClick={addPedalToChain}>Add to Chain</button>
      <button onClick={routeToMaster}>Route To Master</button>
      {pedals.map((Component, index) => <Component isLast={index===pedals.length - 1}signal={sourceInput} key={index}/>)}
    </>
  );
};

export default Pedalboard