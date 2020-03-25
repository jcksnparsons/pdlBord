import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const Chorus = ({ signal, isLast, onUpdate, settings = {} }) => {
  const [chorusParams, setChorusParams] = useState({
    pedalType: "Chorus",
    id: settings.id || "",
    frequency: settings.frequency || 1.5,
    delayTime: settings.delayTime || 3.5,
    depth: settings.depth || 0.7
  });

  const [chorus] = useState(
    new Tone.Chorus(
      chorusParams.frequency,
      chorusParams.delayTime,
      chorusParams.depth
    )
  );

  useEffect(() => {
    if (isLast) {
      chorus.toMaster();
    }
  }, [isLast]);

  useEffect(() => {
    chorus.frequency.value = chorusParams.frequency;
    chorus.delayTime = chorusParams.delayTime;
    chorus.depth = chorusParams.depth;
    onUpdate(chorusParams);
  }, [chorusParams]);

  signal.chain(chorus);

  return (
    <>
      <h2>Chorus</h2>
      <input type="hidden" value={settings.id}></input>
      <label>
        <input
          type="range"
          step=".01"
          min="0"
          max="5"
          value={chorusParams.frequency}
          onChange={event =>
            setChorusParams({ ...chorusParams, frequency: event.target.value })
          }
        />
        Frequency
      </label>
      <label>
        <input
          type="range"
          step=".01"
          min="2"
          max="20"
          value={chorusParams.delayTime}
          onChange={event =>
            setChorusParams({ ...chorusParams, delayTime: event.target.value })
          }
        />
        Delay Time
      </label>
      <label>
        <input
          type="range"
          step=".01"
          min="0"
          max="1"
          value={chorusParams.depth}
          onChange={event =>
            setChorusParams({ ...chorusParams, depth: event.target.value })
          }
        />
        Depth
      </label>
    </>
  );
};

export default Chorus;
