import { useSelector } from "react-redux";
import Fret from "./Fret";
import "./Fretboard.scss";
import FretNumbers from "./FretNumbers";
import { useEffect } from "react";
import { animateStringPlayed } from "../../../Helpers/FretboardHelper";
import StringVisual from "./StringVisual";
import { useState } from "react";
import { getFretsWithNotes } from "../../../Helpers/InstrumentHelper";
import { soundEngine } from "../../../Helpers/SoundEngine";

function Fretboard() {
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const stringCount = useSelector((store) => store.fretboard.stringCount);
  const fretCount = useSelector((store) => store.fretboard.fretCount);
  const selectedNotes = useSelector((store) => store.musicTheory.selectedNotes);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const markNotes = useSelector((store) => store.musicTheory.markNotes);
  const tuning = useSelector((store) => store.fretboard.tuning);
  const [fretsWithNotes, setFretsWithNotes] = useState([]);
  const [stringAnimations, setStringAnimations] = useState(
    new Array(stringCount).fill(null).map(() => ({
      animating: false,
      timeout: null,
    }))
  );

  useEffect(() => {
    setFretsWithNotes(
      getFretsWithNotes(tuning, selectedNotes, allNotes, markNotes)
    );
  }, [tuning, selectedNotes, allNotes, markNotes]);

  useEffect(() => {
    let fretboard = document.getElementById("DefaultFretboard");
    function handleNoteClicked(e) {
      let note = e.target;
      if (note.parentNode.classList.contains("note")) note = note.parentNode;
      if (note.classList.contains("note")) {
        let octave = note.getAttribute("data-octave");
        let noteName = note.innerText;
        let fret = note.parentNode;
        let fretNumber = fret.getAttribute("data-fret");
        let fretNotes = Array.from(fret.children).filter((note) =>
          note.classList.contains("note")
        );
        let noteIndex = fretNotes.indexOf(note);
        let noteToPlay = noteName + octave;
        let stringNumber = stringCount - fretNotes.indexOf(note);

        soundEngine.playNote(noteToPlay, stringNumber);

        animateStringPlayed(
          noteIndex,
          fretboardWidth,
          fretNumber,
          fretWidths,
          fretCount,
          stringAnimations,
          setStringAnimations
        );
      }
    }
    fretboard.addEventListener("click", handleNoteClicked);
    return () => {
      fretboard.removeEventListener("click", handleNoteClicked);
    };
  }, [
    fretboardWidth,
    fretWidths,
    fretCount,
    stringAnimations,
    setStringAnimations,
    allNotes,
    stringCount,
  ]);

  return (
    <div
      id="DefaultFretboard"
      className={`${fretboardTheme} ${coloredNotes ? "coloredNotes" : ""}`}
      style={{ width: fretboardWidth }}
    >
      <div className="frets">
        <div className="stringVisuals">
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
