import "./ChordScaleIdentifier.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getPossibleChordsFrom } from "../../Helpers/MusicTheoryHelper";
import { Chord, Scale } from "tonal";
import { toggleAssumePerfectFifth } from "../../Features/MusicTheory/MusicTheorySlice";

function ChordScaleIdentifier() {
  const dispatch = useDispatch();
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const assumePerfectFifth = useSelector(
    (store) => store.musicTheory.assumePerfectFifth
  );

  const [chords, setChords] = useState([]);
  const [scales, setScales] = useState([]);
  console.log("chord: " + Chord.get(["C", "E", "G"]));

  useEffect(() => {
    // let selectedNotes = allNotes.filter((note) => note.selected);
    let selectedNotes = allNotes.reduce((sum, note) => {
      if (note.selected && !sum.includes(note.pc)) {
        console.log("pushing: " + note.pc);
        sum.push(note.pc);
      }
      return sum;
    }, []);

    console.log(selectedNotes);
    let possibleChords = getPossibleChordsFrom(
      selectedNotes,
      assumePerfectFifth
    );
    console.log(possibleChords);
    setChords(possibleChords);

    setScales(Scale.detect(selectedNotes));
    console.log("effecting");
  }, [allNotes, assumePerfectFifth]);

  return (
    <div id="ChordScaleIdentifier">
      there should be 3 tabs: Identify - Chords & Scales - Chord progression
      <div className="toolbar">
        <label htmlFor="AssumePerfectFifth">Assume perfect fifth</label>
        <input
          id="AssumePerfectFifth"
          type="checkbox"
          onChange={() => dispatch(toggleAssumePerfectFifth())}
        />
      </div>
      <div className="chords">
        <div className="chord">
          <p>Chord:</p>
          <button>{chords[0]}</button>
        </div>
        <div className="possibleChords">
          <p>Possible Chords:</p>
          {chords.map((chord, index) => {
            if (index === 0) return null;
            return <button key={chord + index}>{chord}</button>;
          })}
        </div>
        <div className="chordInversions">
          <p>Inversions:</p>
          {chords.map((chord, index) => {
            return <button key={"inversion" + index}>{index}</button>;
          })}
        </div>
      </div>
      <div className="scales">
        <div className="scale">
          <p>Scale:</p>
          <button>{scales[0]}</button>
        </div>
        <div className="possibleScales">
          <p>Possible Scale:</p>
          {scales.map((scale, index) => {
            if (index === 0) return null;
            return <button key={scale + index}>{scale}</button>;
          })}
        </div>
        <div className="scaleInversions">
          <p>Scale inversions:</p>
        </div>
      </div>
    </div>
  );
}

export default ChordScaleIdentifier;
