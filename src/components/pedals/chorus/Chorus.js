import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const Chorus = ({ signal, isLast }) => {
  const [chorusParams, setChorusParams] = useState({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.7
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
    console.log(chorus)
    chorus.frequency.value = chorusParams.frequency;
    chorus.delayTime = chorusParams.delayTime;
    chorus.depth = chorusParams.depth;
  }, [chorusParams]);

  signal.chain(chorus);

  return (
    <>
      <h2>Chorus</h2>
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
