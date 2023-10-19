import { useDispatch, useSelector } from "react-redux";
import Fret from "./Fret";
import "./Fretboard.scss";
import FretNumbers from "./FretNumbers";
import { useEffect } from "react";
import { animateStringPlayed } from "../../../Helpers/FretboardHelper";
import StringVisual from "./StringVisual";
import { toggleNoteSelected } from "../../../Features/MusicTheory/MusicTheorySlice";

function Fretboard() {
  // const dispatch = useDispatch();
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretsWithNotes = useSelector((store) => store.fretboard.fretsWithNotes);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const notesGap = useSelector((store) => store.fretboard.notesGap);
  const tuning = useSelector((store) => store.fretboard.tuning);
  const fretCount = useSelector((store) => store.fretboard.fretCount);
  // const selectedNotes = useSelector((store) => store.musicTheory.selectedNotes);

  useEffect(() => {
    let fretboard = document.getElementById("DefaultFretboard");
    function handleNoteClicked(e) {
      if (e.target.classList.contains("note")) {
        let note = e.target;
        let fret = note.parentNode;
        let fretNumber = fret.getAttribute("data-fret");
        let fretNotes = Array.from(fret.children).filter((note) =>
          note.classList.contains("note")
        );
        let noteIndex = fretNotes.indexOf(note);
        let stringCount = fretNotes.length;
        // let octave = note.getAttribute("data-octave");
        // dispatchEvent(toggleNoteSelected(note))
        animateStringPlayed(
          note,
          noteIndex,
          fretboardWidth,
          fretWidths,
          fretCount,
          stringCount,
          fretNumber
        );
      }
    }
    fretboard.addEventListener("click", handleNoteClicked);
    return () => {
      fretboard.removeEventListener("click", handleNoteClicked);
    };
  }, [fretboardWidth, fretWidths, fretCount]);

  return (
    <div
      id="DefaultFretboard"
      className={`${fretboardTheme} ${coloredNotes ? "coloredNotes" : ""}`}
      style={{
        width: fretboardWidth,
      }}
    >
      <div className="stringVisuals" style={{ gap: notesGap }}>
        {/* These stringVisuals' thickness should be calculated based on octave of the rootNote */}
        {tuning.map((tuning, index) => {
          return (
            <StringVisual
              key={`stringVisual${index}`}
              stringNumber={index + 1}
              stringHeight={notesWidth}
            />
          );
        })}
      </div>
      <div className="frets">
        {fretsWithNotes.map((notesArr, index) => {
          return (
            <Fret
              key={`fret${index}`}
              notes={notesArr}
              fretNumber={index}
              notesWidth={notesWidth}
              notesGap={notesGap}
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
