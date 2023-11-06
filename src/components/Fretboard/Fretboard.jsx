import { useDispatch, useSelector } from "react-redux";
import FretboardTheme from "./FretboardTheme";
import "./Fretboard.scss";
import String from "./String";
import { soundEngine } from "../../Helpers/SoundEngine";
import { animateStringPlayed } from "../../Helpers/FretboardHelper";
import {
  selectNoteOnString,
  deselectNoteOnString,
} from "../../Features/Fretboard/FretboardSlice";

function Fretboard() {
  const dispatch = useDispatch();
  const markNotes = useSelector((store) => store.musicTheory.markNotes);
  const strings = useSelector((store) => store.fretboard.strings);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretboardStyle = useSelector((store) => store.fretboard.fretboardStyle);
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);

  function handleMouseDown(e) {
    // Todo: optionally add notes while mouse is held down and hovered over notes
    let noteElem = e.target;
    if (noteElem.parentNode.classList.contains("note"))
      noteElem = noteElem.parentNode;
    let octave = noteElem.getAttribute("data-octave");
    let noteName = noteElem.getAttribute("data-notename");
    let fret = noteElem.parentNode;
    let fretNumber = fret.getAttribute("data-fretnumber");
    let stringNumber = fret.parentNode.getAttribute("data-stringnumber");
    let stringIndex = strings.findIndex(
      (string) => string.stringNumber === parseInt(stringNumber)
    );
    let note = strings[stringIndex].frets[fretNumber].note;
    let selected = note.selected;

    // clean up all this
    if (markNotes !== "None") {
      if (markNotes === "Single") {
        for (let fret of strings[stringIndex].frets) {
          if (fret.note.name === note.name) {
            if (fret.note.selected) {
              dispatch(deselectNoteOnString({ note, stringIndex }));
            } else {
              dispatch(selectNoteOnString({ note, stringIndex }));
            }
          }
        }
      }
      if (markNotes === "Identical") {
        for (let string of strings) {
          for (let fret of string.frets) {
            if (fret.note.name === note.name) {
              stringIndex = strings.length - string.stringNumber;
              if (selected) {
                dispatch(deselectNoteOnString({ note, stringIndex }));
              } else {
                dispatch(selectNoteOnString({ note, stringIndex }));
              }
            }
          }
        }
      }
      if (markNotes === "All") {
        for (let string of strings) {
          for (let fret of string.frets) {
            if (fret.note.pc === note.pc) {
              stringIndex = strings.length - string.stringNumber;
              note = fret.note;
              if (selected) {
                dispatch(deselectNoteOnString({ note, stringIndex }));
              } else {
                dispatch(selectNoteOnString({ note, stringIndex }));
              }
            }
          }
        }
      }
    }
    soundEngine.playNote(noteName + octave, stringNumber);
    animateStringPlayed(stringIndex, fretboardWidth, fretNumber, fretWidths);
  }

  return (
    <div
      id="Fretboard"
      style={{ width: fretboardWidth, height: 175 }}
      onMouseDown={handleMouseDown}
    >
      <FretboardTheme
        style={fretboardStyle}
        theme={fretboardTheme}
        strings={strings}
        fretWidths={fretWidths}
        fretboardWidth={fretboardWidth}
      />
      <div className="strings">
        {strings.map((string) => (
          <String
            key={`string${string.stringNumber}`}
            frets={string.frets}
            fretWidths={fretWidths}
            stringNumber={string.stringNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default Fretboard;
