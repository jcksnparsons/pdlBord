import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const Distortion = ({ signal, isLast, onUpdate, settings }) => {
  const [distortionParams, setDistortionParams] = useState({
    pedalType: "Distortion",
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
    onUpdate(distortionParams)
  }, [distortionParams]);

  signal.chain(distortion);

  return (
    <>
      <h2>Distortion</h2>
      <label>
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
        Gain
      </label>
    </>
  );
};

export default Distortion;
