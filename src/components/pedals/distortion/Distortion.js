import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "./Distortion.css";

const Distortion = ({ signal, isLast, onUpdate, settings }) => {
  const [distortionParams, setDistortionParams] = useState({
    pedalType: "Distortion",
    id: settings.id || "",
    distortion: settings.distortion || 0.4,
    oversample: settings.oversample || "4x"
  });

  const [distortion] = useState(
    new Tone.Distortion(
      distortionParams.distortion,
      distortionParams.oversample
    )
  );

  useEffect(() => {
    if (isLast) {
      distortion.toMaster();
    }
  }, [isLast]);

  useEffect(() => {
    distortion.distortion = distortionParams.distortion;
    distortion.oversample = distortionParams.oversample;
    onUpdate(distortionParams);
  }, [distortionParams]);

  signal.connect(distortion);

  return (
    <>
      <div class="distortionPedal">
        {/* This is where you will find the id of this pedal */}
        <input type="hidden" value={settings.id}></input>
        <label>
          <div>
            <input
              type="range"
              step=".01"
              min="0"
              max="1"
              value={distortionParams.distortion}
              onChange={event =>
                setDistortionParams({
                  ...distortionParams,
                  distortion: event.target.value
                })
              }
            />
          </div>
          Gain
        </label>
        <h2>Distortion</h2>
      </div>
    </>
  );
};

export default Distortion;
