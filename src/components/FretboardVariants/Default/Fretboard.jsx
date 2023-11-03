import { useDispatch, useSelector } from "react-redux";
import Fret from "./Fret";
import "./Fretboard.scss";
import FretNumbers from "./FretNumbers";
import { useEffect } from "react";
import { animateStringPlayed } from "../../../Helpers/FretboardHelper";
import StringVisual from "./StringVisual";
import { useState } from "react";
import { getFretsWithNotes } from "../../../Helpers/InstrumentHelper";
import { soundEngine } from "../../../Helpers/SoundEngine";
import { toggleNoteSelected } from "../../../Features/MusicTheory/MusicTheorySlice";
import { Note } from "tonal";

function Fretboard() {
  const dispatch = useDispatch();
  const { fretboardTheme, fretboardWidth, fretWidths, notesWidth, fretCount } =
    useSelector((store) => store.fretboard);
  const selectedNotes = useSelector((store) => store.musicTheory.selectedNotes);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const markNotes = useSelector((store) => store.musicTheory.markNotes);
  const tuning = useSelector((store) => store.musicTheory.tuning);
  const coloredNotes = useSelector((store) => store.user.coloredNotes);
  let stringCount = tuning.length;
  const [fretsWithNotes, setFretsWithNotes] = useState([]);
  const [stringAnimations, setStringAnimations] = useState(
    new Array(stringCount).fill(null).map(() => ({
      isAnimating: false,
      hasTimeout: null,
    }))
  );

  useEffect(() => {
    setFretsWithNotes(getFretsWithNotes(tuning, allNotes));
  }, [tuning, allNotes]);

  useEffect(() => {
    let fretboard = document.getElementById("DefaultFretboard");
    function handleNoteClicked(e) {
      let noteElem = e.target;
      if (noteElem.parentNode.classList.contains("note"))
        noteElem = noteElem.parentNode;
      if (noteElem.classList.contains("note")) {
        console.log(noteElem);
        let octave = noteElem.getAttribute("data-octave");
        let noteName = noteElem.innerText + octave;
        let fret = noteElem.parentNode;
        let fretNumber = fret.getAttribute("data-fret");
        let fretNotes = Array.from(fret.children).filter((note) =>
          note.classList.contains("note")
        );
        let stringIndex = fretNotes.indexOf(noteElem);

        soundEngine.playNote(noteName, stringIndex);
        dispatch(toggleNoteSelected({ noteName, stringIndex }));
        animateStringPlayed(
          stringIndex,
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
    dispatch,
    fretboardWidth,
    fretWidths,
    fretCount,
    stringAnimations,
    setStringAnimations,
    stringCount,
    allNotes,
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
        {fretsWithNotes.map((fretNotes, index) => {
          return (
            <Fret
              key={`fret${index}`}
              fretNotes={fretNotes}
              fretNumber={index}
              notesWidth={notesWidth}
              fretWidth={fretWidths?.[index]}
              markNotes={markNotes}
            />
          );
        })}
      </div>
      <FretNumbers frets={fretsWithNotes} fretWidths={fretWidths} />
    </div>
  );
}

export default Fretboard;
