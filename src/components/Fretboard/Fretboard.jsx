import { useDispatch, useSelector } from "react-redux";
import FretboardTheme from "./FretboardTheme";
import "./Fretboard.scss";
import String from "./String";
import { soundEngine } from "../../Helpers/SoundEngine";
import {
  animateStringPlayed,
  initFretboardScroll,
} from "../../Helpers/FretboardHelper";
import { Note } from "tonal";
import { toggleNoteSelected } from "../../Features/MusicTheory/MusicTheorySlice";
import { useEffect } from "react";
import { scrollToNearestFret } from "../../Features/Fretboard/FretboardSlice";
import Nut from "./Nut";
import { useMemo } from "react";
import Strings from "./Strings";
import { useState } from "react";

function Fretboard() {
  const [isScrolling, setIsScrolling] = useState(false);
  const dispatch = useDispatch();
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const markNotesSetting = useSelector(
    (store) => store.musicTheory.markNotesSetting
  );
  const tuning = useSelector((store) => store.fretboard.tuning);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const nutIsFixed = useSelector((store) => store.fretboard.nutIsFixed);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretboardStyle = useSelector((store) => store.fretboard.fretboardStyle);
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);

  useEffect(() => {
    initFretboardScroll(dispatch, scrollToNearestFret, setIsScrolling);
  }, []);

  function handleFretboardClicked(e) {
    if (isScrolling) {
      // Dont play a note if we're scrolling
      setIsScrolling(false);
    } else {
      // Todo: optionally add notes while mouse is held down and hovered over notes
      let noteElem = e.target;
      if (noteElem.parentNode.classList.contains("note"))
        noteElem = noteElem.parentNode;
      if (noteElem.classList.contains("note")) {
        let string = noteElem.parentNode;
        let octave = noteElem.getAttribute("data-octave");
        let notePitchClass = noteElem.getAttribute("data-pitchclass");
        let stringNumber = parseInt(noteElem.getAttribute("data-stringnumber"));
        let stringIndex = tuning.length - stringNumber;
        let notesOnString = string.querySelectorAll(".note");
        let noteIndex = Array.from(notesOnString).indexOf(noteElem);
        let note = Note.get(notePitchClass + octave);
        let wasSelected = noteElem.classList.contains("selected");

        if (markNotesSetting !== "None") {
          dispatch(toggleNoteSelected({ note, stringNumber, wasSelected }));
        }
        soundEngine.playNote(notePitchClass + octave, stringNumber);
        animateStringPlayed(stringIndex, fretboardWidth, noteIndex, fretWidths);
      }
    }
  }
  return (
    <div
      id="Fretboard"
      className={nutIsFixed ? "nutIsFixed" : ""}
      style={{ width: fretboardWidth, height: 145 }}
      onClick={handleFretboardClicked}
      // onMouseDown={handleFretboardClicked}
    >
      {nutIsFixed ? (
        <Nut tuning={tuning} allNotes={allNotes} nutIsFixed={nutIsFixed} />
      ) : null}
      <Strings
        tuning={tuning}
        nutIsFixed={nutIsFixed}
        allNotes={allNotes}
        fretWidths={fretWidths}
        width={fretboardWidth - fretWidths[0]}
      />
      <FretboardTheme
        style={fretboardStyle}
        theme={fretboardTheme}
        tuning={tuning}
        fretWidths={fretWidths}
        fretboardWidth={fretboardWidth}
        nutIsFixed={nutIsFixed}
        width={fretboardWidth - fretWidths[0]}
      />
    </div>
  );
}

export default Fretboard;
