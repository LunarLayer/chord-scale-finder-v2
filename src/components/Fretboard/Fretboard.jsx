import { useDispatch, useSelector } from "react-redux";
import FretboardTheme from "./FretboardTheme";
import "./Fretboard.scss";
import String from "./String";
import { soundEngine } from "../../Helpers/SoundEngine";
import { animateStringPlayed } from "../../Helpers/FretboardHelper";
import { Note } from "tonal";
import { toggleNoteSelected } from "../../Features/MusicTheory/MusicTheorySlice";

function Fretboard() {
  const dispatch = useDispatch();
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const markNotesSetting = useSelector(
    (store) => store.musicTheory.markNotesSetting
  );
  const tuning = useSelector((store) => store.fretboard.tuning);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretboardStyle = useSelector((store) => store.fretboard.fretboardStyle);
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);

  function handleMouseDown(e) {
    // Todo: optionally add notes while mouse is held down and hovered over notes
    let noteElem = e.target;
    if (noteElem.parentNode.classList.contains("note"))
      noteElem = noteElem.parentNode;
    let string = noteElem.parentNode;
    let octave = noteElem.getAttribute("data-octave");
    let notePitchClass = noteElem.getAttribute("data-pitchclass");
    let stringNumber = parseInt(string.getAttribute("data-stringnumber"));
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

  return (
    <div
      id="Fretboard"
      style={{ width: fretboardWidth, height: 145 }}
      onMouseDown={handleMouseDown}
    >
      <FretboardTheme
        style={fretboardStyle}
        theme={fretboardTheme}
        tuning={tuning}
        fretWidths={fretWidths}
        fretboardWidth={fretboardWidth}
      />
      <div className="strings">
        {tuning.map((rootNote, index) => {
          let stringNumber = tuning.length - index;
          let notesForString = allNotes.filter((note) =>
            note.appearsOnStrings.includes(stringNumber)
          );
          return (
            <String
              key={`string${stringNumber}`}
              notes={notesForString}
              stringNumber={stringNumber}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Fretboard;
