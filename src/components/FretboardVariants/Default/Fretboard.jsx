import { useDispatch, useSelector } from "react-redux";
import Fret from "./Fret";
import "./Fretboard.scss";
import FretNumbers from "./FretNumbers";
import { useEffect } from "react";
import { animateStringPlayed } from "../../../Helpers/FretboardHelper";
import StringVisual from "./StringVisual";
import { toggleNoteSelected } from "../../../Features/MusicTheory/MusicTheorySlice";
import { useState } from "react";
import { getFretsWithNotes } from "../../../Helpers/InstrumentHelper";
import { Chord, interval, note, transpose } from "tonal";
import { soundEngine } from "../../../Helpers/SoundEngine";

function Fretboard() {
  const dispatch = useDispatch();
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const tuning = useSelector((store) => store.fretboard.tuning);
  const fretCount = useSelector((store) => store.fretboard.fretCount);
  let fretsWithNotes = getFretsWithNotes(tuning, allNotes);

  const [allStringsAnimationState, setAllStringsAnimationState] = useState(
    new Array(tuning.length).fill(null).map(() => ({
      animationResetTimeout: null,
      animating: false,
    }))
  );

  // useEffect(() => {
  //   initSoundEngineFor("defaultFretboard", tuning);
  // }, [tuning]);

  useEffect(() => {
    let fretboard = document.getElementById("DefaultFretboard");
    function handleNoteClicked(e) {
      let note = e.target;
      if (note.parentNode.classList.contains("note")) note = note.parentNode;
      console.log(note);
      let noteOctave = note.getAttribute("data-octave");
      let noteName = note.innerText;
      // SoundEngine.playNote(noteName + noteOctave);
      let fret = note.parentNode;
      let fretNumber = fret.getAttribute("data-fret");
      let fretNotes = Array.from(fret.children).filter((note) =>
        note.classList.contains("note")
      );
      let strings = fretNotes.length;
      let noteToPlay = noteName + noteOctave;
      let stringNumber = fretNotes.indexOf(note);
      // soundEngine.play(noteToPlay, stringNumber);
      soundEngine.playNote(noteToPlay, strings - stringNumber);

      animateStringPlayed(
        note,
        fretboardWidth,
        fretWidths,
        fretCount,
        allStringsAnimationState,
        setAllStringsAnimationState
      );
    }
    fretboard.addEventListener("mousedown", handleNoteClicked);
    return () => {
      fretboard.removeEventListener("mousedown", handleNoteClicked);
    };
  }, [
    fretboardWidth,
    fretWidths,
    fretCount,
    allStringsAnimationState,
    setAllStringsAnimationState,
    dispatch,
    allNotes,
  ]);

  return (
    <div
      id="DefaultFretboard"
      className={`${fretboardTheme} ${coloredNotes ? "coloredNotes" : ""}`}
      style={{
        width: fretboardWidth,
      }}
    >
      <div className="frets">
        <div className="stringVisuals">
          {/* These stringVisuals' thickness should be calculated based on octave of the rootNote */}
          {tuning.map((tuning, index) => {
            return (
              <StringVisual
                key={`stringVisual${index}`}
                stringNumber={index + 1}
              />
            );
          })}
        </div>
        {fretsWithNotes.map((notesArr, index) => {
          return (
            <Fret
              key={`fret${index}`}
              notes={notesArr}
              fretNumber={index}
              notesWidth={notesWidth}
              fretWidth={fretWidths?.[index]}
            />
          );
        })}
      </div>
      <FretNumbers frets={fretsWithNotes} fretWidths={fretWidths} />
    </div>
  );
}

export default Fretboard;
