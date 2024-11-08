import "./Chord.scss";

import { v4 as uuidv4 } from "uuid";
import ChordIntervalButton from "./ChordIntervalButton";
import { useDispatch } from "react-redux";
import {
  focusNotes,
  unfocusNotes,
} from "../../Features/MusicTheory/MusicTheorySlice";

import { PlayButton, PauseButton } from "../../../public/svgs/SvgIcons";
import { useState } from "react";

// TODO:
// - Highlight intervals/notes when hovered.
// - Highlight (all) chord notes when chord is hovered.

function Chord({ chord, showNotes, showIntervals, intervalSettings }) {
  const dispatch = useDispatch();
  const [playIcon, setPlayIcon] = useState("play");

  const {
    isExactMatch,
    intervals,
    no3,
    no5,
    notes,
    missingChordIntervals,
    root,
    shortenedQuality,
    extension,
    additionalQuality,
    suspension,
    alteration,
  } = chord;

  function handleIntervalClicked() {
    console.log("handling click");
  }

  function playButtonClicked() {
    // change play icon
    console.log("playButtonClicked()");
    if (playIcon === "play") {
      setPlayIcon("pause");
    } else if (playIcon === "pause") {
      setPlayIcon("play");
    }
    // play chord (handle with settings somewhere - strum - chord - same time)
  }

  return (
    <div className={`chord ${isExactMatch ? "exactMatch" : ""}`}>
      <div className="header">
        <p className="symbol">
          {root + shortenedQuality}
          {extension && <span className="extension">{extension}</span>}
          {additionalQuality && (
            <span className="additionalQuality">{additionalQuality}</span>
          )}
          {suspension && <span className="suspension">{suspension}</span>}
          {alteration && <span className="alteration">({alteration})</span>}
        </p>
        <button className="playButton" onClick={playButtonClicked}>
          {playIcon === "play" ? <PlayButton /> : <PauseButton />}
        </button>
      </div>
      <div className="notes">
        {notes.map((note, index) => {
          return <p key={uuidv4()}>{note}</p>;
        })}
      </div>
      <div className="intervals">
        {intervals.map((interval, index) => {
          return (
            <button
              key={uuidv4()}
              className={`chordIntervalButton ${
                (interval.number === 3 && no3) || (interval.number === 4 && no3)
                  ? "no3"
                  : (interval.number === 6 && no5) ||
                    (interval.number === 7 && no5) ||
                    (interval.number === 8 && no5)
                  ? "no5"
                  : missingChordIntervals.includes(interval.number)
                  ? "missing"
                  : ""
              }`}
            >
              {interval.type}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Chord;
