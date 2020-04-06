import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "./Delay.css";

const Delay = ({ signal, isLast, onUpdate, settings = {} }) => {
  const [delayParams, setDelayParams] = useState({
    pedalType: "Delay",
    id: settings.id || "",
    delayTime: settings.delayTime || 0.25,
    wet: settings.wet || 0.5,
    feedback: settings.feedback || 0.5
  });

  const [delay] = useState(
    new Tone.FeedbackDelay(delayParams.delayTime, delayParams.feedback)
  );

  useEffect(() => {
    if (isLast) {
      delay.toMaster();
    }
  }, [isLast]);

  useEffect(() => {
    delay.delayTime.value = delayParams.delayTime;
    delay.wet.value = delayParams.wet;
    delay.feedback.value = delayParams.feedback;
    onUpdate(delayParams);
  }, [delayParams]);

  signal.connect(delay);

  return (
    <>
      <div class="delayPedal">
        {/* This is where you will find the id of this pedal */}
        <input type="hidden" value={settings.id}></input>
        <label>
          <input
            type="range"
            step=".01"
            min="0"
            max="1"
            value={delayParams.delayTime}
            onChange={event =>
              setDelayParams({ ...delayParams, delayTime: event.target.value })
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
            value={delayParams.wet}
            onChange={event =>
              setDelayParams({ ...delayParams, wet: event.target.value })
            }
          />
          <div>Mix</div>
        </label>
        <label>
          <input
            type="range"
            step=".01"
            min="0"
            max="1"
            value={delayParams.feedback}
            onChange={event =>
              setDelayParams({ ...delayParams, feedback: event.target.value })
            }
          />
          <div>Feedback</div>
        </label>
        <h2>Delay</h2>
      </div>
    </>
  );
};

export default Delay;
