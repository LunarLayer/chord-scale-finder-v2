import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Intervals.scss";
import { useDispatch } from "react-redux";
import {
  focusNotes,
  unfocusNotes,
} from "../../Features/MusicTheory/MusicTheorySlice";

function Intervals({ chord, simplified, canChangeChord }) {
  const dispatch = useDispatch();
  const [isSimplified, setIsSimplified] = useState(simplified);

  const {
    no3,
    no5,
    missingChordIntervals,
    additionalQuality,
    notes,
    intervals,
  } = chord;

  function renderIntervalButton(interval, index) {
    let intervalType = "";

    if (isSimplified && !interval) {
      console.log("nulling");
      return null;
    } else {
      const handleClick = canChangeChord
        ? () => toggleInterval(interval.number)
        : undefined;
      return (
        <button
          className={`intervalButton ${intervalType}`}
          key={uuidv4()}
          onClick={handleClick}
          onMouseEnter={() => dispatch(focusNotes(notes[index]))}
          onMouseLeave={() => dispatch(unfocusNotes(notes[index]))}
        >
          {interval.number}
        </button>
      );
    }
  }

  function toggleInterval(interval) {
    // console.log("toggling interval: " + interval);
  }

  return (
    <div className={`intervals  ${isSimplified ? "simplified" : ""}`}>
      <div className="row">
        {intervals
          .slice(0, 12)
          .map((interval, index) => renderIntervalButton(interval, index))}
      </div>
    </div>
  );
}

export default Intervals;
