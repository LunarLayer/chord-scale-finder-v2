import { useSelector } from "react-redux";
import Fret from "./Fret";
import "./Fretboard.scss";
import FretNumbers from "./FretNumbers";
import { getFretsWithNotes } from "../../../Helpers/InstrumentHelper";
import { useEffect } from "react";
import { useState } from "react";

function Fretboard() {
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const notesGap = useSelector((store) => store.fretboard.notesGap);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const stringCount = useSelector((store) => store.fretboard.stringCount);
  const selectedNotes = useSelector((store) => store.musicTheory.selectedNotes);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const markNotes = useSelector((store) => store.musicTheory.markNotes);
  const tuning = useSelector((store) => store.fretboard.tuning);
  const [fretsWithNotes, setFretsWithNotes] = useState([]);

  useEffect(() => {
    setFretsWithNotes(
      getFretsWithNotes(tuning, selectedNotes, allNotes, markNotes)
    );
  }, [tuning, selectedNotes, allNotes, markNotes]);

  useEffect(() => {
    let fretboard = document.getElementById("MinimalFretboard");
    function handleNoteClicked(e) {
      let note = e.target;
      if (note.parentNode.classList.contains("note")) note = note.parentNode;
      if (note.classList.contains("note")) {
        let octave = note.getAttribute("data-octave");
        let noteName = note.innerText;
        let fret = note.parentNode;
        let fretNotes = Array.from(fret.children).filter((note) =>
          note.classList.contains("note")
        );
        let noteToPlay = noteName + octave;
        let stringNumber = stringCount - fretNotes.indexOf(note);

        // soundEngine.playNote(noteToPlay, stringNumber);
      }
    }
    fretboard.addEventListener("click", handleNoteClicked);
    return () => {
      fretboard.removeEventListener("click", handleNoteClicked);
    };
  }, [allNotes, stringCount]);

  return (
    <div
      id="MinimalFretboard"
      className={`${fretboardTheme} ${coloredNotes ? "coloredNotes" : ""}`}
      style={{ width: fretboardWidth }}
    >
      <div className="frets" style={{ gap: notesGap }}>
        {fretsWithNotes.map((notesArr, index) => {
          return (
            <Fret
              key={`fret${index}`}
              notes={notesArr}
              fretNumber={index}
              notesGap={notesGap}
              notesWidth={notesWidth}
            />
          );
        })}
      </div>
      <FretNumbers
        frets={fretsWithNotes}
        notesWidth={notesWidth}
        gap={notesGap}
      />
    </div>
  );
}

export default Fretboard;
