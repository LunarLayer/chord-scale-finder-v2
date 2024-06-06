import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Intervals.scss";

function Intervals({
  intervals,
  missingChordIntervals,
  simplified,
  canChangeChord,
}) {
  const [isSimplified, setIsSimplified] = useState(simplified);
  // add a way to hover on an interval and it will light up that note on the fretboard

  function renderIntervalButton(interval, index) {
    console.log(interval);
    console.log(interval.isMissing);
    if (isSimplified && !interval) {
      return null;
    } else {
      const handleClick = canChangeChord
        ? () => toggleInterval(interval.number)
        : undefined;
      return (
        <button
          className={`intervalButton ${
            missingChordIntervals.includes(interval.number) ? "missing" : ""
          }`}
          key={uuidv4()}
          onClick={handleClick}
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
      <div className="row">
        {intervals.includes("has intervals bigger than 7") &&
          intervals
            .slice(12)
            .map((interval, index) =>
              renderIntervalButton(interval, index + 12)
            )}
      </div>

      {/* <button onClick={() => setIsSimplified(!isSimplified)}>
        {isSimplified ? "☑" : "☐"} simplify
      </button> */}
    </div>
  );
}

export default Intervals;
