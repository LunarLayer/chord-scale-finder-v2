import "./ChordScaleIdentifier.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  getChord,
  getIntervalsArray,
  getInvertedChords,
  getPossibleChords,
  getScale,
  getSelectedNotes,
} from "../../Helpers/MusicTheoryHelper";
import { Chord, Scale } from "tonal";
import { toggleAssumePerfectFifth } from "../../Features/MusicTheory/MusicTheorySlice";
import ChordDetails from "./ChordDetails";
import CollapsibleText from "../Collapsibles/CollapsibleText";
import Collapsible from "./Collapsible";
import ChordIntervals from "./ChordIntervals";
import ChordInversions from "./ChordInversions";

function ChordScaleIdentifier() {
  const dispatch = useDispatch();
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const assumePerfectFifth = useSelector(
    (store) => store.musicTheory.assumePerfectFifth
  );

  let chord, invertedChords, selectedNotes, chordIntervals, scale;

  // let detectedChords = Chord.detect(["D", "A", "C", "F"]);
  // console.log(detectedChords);
  // let testChord = Chord.get(detectedChords[0]);
  // console.log(testChord);

  selectedNotes = getSelectedNotes(allNotes);
  chord = getChord(selectedNotes);
  scale = getScale(selectedNotes);

  function toggleSettingsMenu() {
    console.log("toggline settings menu");
  }

  // console.log(scale);

  if (chord.empty === false) {
    invertedChords = getInvertedChords(chord);
    chordIntervals = getIntervalsArray(chord.intervals);
  }

  return (
    <div id="ChordScaleIdentifier">
      <Collapsible title="Chord" modal="identifyChordFilters">
        <ChordDetails chord={chord} />
      </Collapsible>

      <Collapsible title="Inversions">
        <ChordInversions invertedChords={invertedChords} />
      </Collapsible>

      <Collapsible title="Intervals">
        <ChordIntervals intervals={chordIntervals} />
      </Collapsible>

      <Collapsible title="Possible chords">
        <ChordDetails chord={chord} />
      </Collapsible>

      <Collapsible title={`Scales containing ${chord?.symbol}`}>
        <ChordDetails chord={chord} />
      </Collapsible>
    </div>
  );
}

export default ChordScaleIdentifier;

// return (
//   <div id="ChordScaleIdentifier">
//     there should be 3 tabs: Identify - Chords & Scales - Chord progression
//     <div className="toolbar">
//       <label htmlFor="AssumePerfectFifth">Assume perfect fifth</label>
//       <input
//         id="AssumePerfectFifth"
//         type="checkbox"
//         onChange={() => dispatch(toggleAssumePerfectFifth())}
//       />
//     </div>
//     <div className="chords">
//       <div className="chord">
//         <p>Chord:</p>
//         <button>{chords[0]}</button>
//       </div>
//       <div className="possibleChords">
//         <p>Possible Chords:</p>
//         {chords.map((chord, index) => {
//           if (index === 0) return null;
//           return <button key={chord + index}>{chord}</button>;
//         })}
//       </div>
//       <div className="chordInversions">
//         <p>Inversions:</p>
//         {chords.map((chord, index) => {
//           return <button key={"inversion" + index}>{index}</button>;
//         })}
//       </div>
//     </div>
//     <div className="scales">
//       <div className="scale">
//         <p>Scale:</p>
//         <button>{scales[0]}</button>
//       </div>
//       <div className="possibleScales">
//         <p>Possible Scale:</p>
//         {scales.map((scale, index) => {
//           if (index === 0) return null;
//           return <button key={scale + index}>{scale}</button>;
//         })}
//       </div>
//       <div className="scaleInversions">
//         <p>Scale inversions:</p>
//       </div>
//     </div>
//   </div>
// );
