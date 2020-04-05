import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "./Chorus.css";

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

  signal.connect(chorus);

  return (
    <>
      <div class="chorusPedal">
        {/* This is where you will find the id of this pedal */}
        <input type="hidden" value={settings.id}></input>
        <label>
          <input
            type="range"
            step=".01"
            min="0"
            max="5"
            value={chorusParams.frequency}
            onChange={event =>
              setChorusParams({
                ...chorusParams,
                frequency: event.target.value
              })
            }
          />
          <div>Frequency</div>
        </label>
        <label>
          <input
            type="range"
            step=".01"
            min="2"
            max="20"
            value={chorusParams.delayTime}
            onChange={event =>
              setChorusParams({
                ...chorusParams,
                delayTime: event.target.value
              })
            }
          />
          <div>Delay Time</div>
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
          <div>Depth</div>
        </label>
        <h2>Chorus</h2>
      </div>
    </>
  );
};

export default Chorus;
