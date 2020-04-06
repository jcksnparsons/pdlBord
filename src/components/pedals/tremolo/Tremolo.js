import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "./Tremolo.css";

const Tremolo = ({ signal, isLast, onUpdate, settings = {} }) => {
  const [tremParams, setTremParams] = useState({
    pedalType: "Tremolo",
    id: settings.id || "",
    frequency: settings.frequency || 10,
    depth: settings.depth || 0.5
  });

  const [tremolo] = useState(
    new Tone.Tremolo(tremParams.frequency, tremParams.depth)
  );

  useEffect(() => {
    if (isLast) {
      tremolo.toMaster();
    }
  }, [isLast]);

  useEffect(() => {
    tremolo.frequency.value = tremParams.frequency;
    tremolo.depth.value = tremParams.depth;
    onUpdate(tremParams);
  }, [tremParams]);

  signal.connect(tremolo).toMaster();

  return (
    <>
      <div class="tremoloPedal">
        <input type="hidden" value={settings.id}></input>
        <label>
          <input
            type="range"
            step=".1"
            min="0"
            max="1000"
            value={tremParams.frequency}
            onChange={event =>
              setTremParams({ ...tremParams, frequency: event.target.value })
            }
          />
          <div>Frequency</div>
        </label>
        <label>
          <input
            type="range"
            step=".01"
            min="0"
            max="1"
            value={tremParams.depth}
            onChange={event =>
              setTremParams({ ...tremParams, depth: event.target.value })
            }
          />
          <div>Depth</div>
        </label>
        <h2>Tremolo</h2>
      </div>
    </>
  );
};

export default Tremolo;
