import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "./Reverb.css";

const Reverb = ({ signal, isLast, onUpdate, settings }) => {
  const [reverbParams, setReverbParams] = useState({
    pedalType: "Reverb",
    id: settings.id || "",
    roomSize: settings.roomSize || 0.7,
    dampening: settings.dampening || 3000
  });

  const [reverb] = useState(
    new Tone.Freeverb(reverbParams.roomSize, reverbParams.dampening)
  );

  useEffect(() => {
    if (isLast) {
      reverb.toMaster();
    }
  }, [isLast]);

  useEffect(() => {
    reverb.roomSize.value = reverbParams.roomSize;
    reverb.dampening.value = reverbParams.dampening;
    onUpdate(reverbParams);
  }, [reverbParams]);

  signal.connect(reverb);

  return (
    <>
      <div class="reverbPedal">
        <input type="hidden" value={settings.id}></input>
        <label>
          <input
            type="range"
            step=".01"
            min="0"
            max="1"
            value={reverbParams.roomSize}
            onChange={event =>
              setReverbParams({ ...reverbParams, roomSize: event.target.value })
            }
          />
          <div>Room Size</div>
        </label>
        <label>
          <input
            type="range"
            step=".01"
            min="0"
            max="10000"
            value={reverbParams.dampening}
            onChange={event =>
              setReverbParams({
                ...reverbParams,
                dampening: event.target.value
              })
            }
          />
          <div>Dampening</div>
        </label>
        <h2>Reverb</h2>
      </div>
    </>
  );
};

export default Reverb;
