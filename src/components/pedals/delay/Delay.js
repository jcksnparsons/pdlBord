import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const Delay = ({ signal, isLast }) => {
  const [delayParams, setDelayParams] = useState({
    delayTime: 0.25,
    wet: 0.5,
    feedback: 0.5
  });

  const [delay] = useState(
    new Tone.FeedbackDelay(delayParams.delayTime, delayParams.feedback)
  );

  useEffect(() => {
    if (isLast) {
        delay.toMaster()
    }
}, [isLast])

  useEffect(() => {
    delay.delayTime.value = delayParams.delayTime;
    delay.wet.value = delayParams.wet;
    delay.feedback.value = delayParams.feedback;
  }, [delayParams]);

  signal.chain(delay);

  return (
    <>
      <h2>Delay</h2>
      <label>
        <input
          type="number"
          step=".01"
          value={delayParams.delayTime}
          onChange={event =>
            setDelayParams({ ...delayParams, delayTime: event.target.value })
          }
        />
        Delay Time
      </label>
      <label>
        <input
          type="number"
          step=".01"
          value={delayParams.wet}
          onChange={event =>
            setDelayParams({ ...delayParams, wet: event.target.value })
          }
        />
        Mix
      </label>
      <label>
        <input
          type="number"
          step=".01"
          value={delayParams.feedback}
          onChange={event =>
            setDelayParams({ ...delayParams, feedback: event.target.value })
          }
        />
        Feedback
      </label>
    </>
  );
};

export default Delay;
