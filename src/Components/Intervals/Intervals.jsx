import React, { useState } from "react";

import "./Intervals.scss";

function Intervals({ intervals, simplified, canChangeChord }) {
  const [isSimplified, setIsSimplified] = useState(simplified);
  // add a way to hover on an interval and it will light up that note on the fretboard

  function renderIntervalButton(interval, index) {
    if (isSimplified && !interval) {
      return null;
    } else {
      const handleClick = canChangeChord
        ? () => toggleInterval(interval)
        : undefined;
      return (
        <button
          className={`intervalButton ${
            interval.length > 0 ? "interval_" + index : ""
          }`}
          key={index + interval}
          onClick={handleClick}
        >
          {interval}
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
