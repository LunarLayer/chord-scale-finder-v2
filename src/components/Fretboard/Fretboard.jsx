import { useDispatch, useSelector } from "react-redux";
import FretboardTheme from "./FretboardTheme";
import "./Fretboard.scss";
import String from "./String";
import { soundEngine } from "../../Helpers/SoundEngine";
import { animateStringPlayed } from "../../Helpers/FretboardHelper";
import { Note } from "tonal";
import { toggleNoteSelectedOnString } from "../../Features/Fretboard/FretboardSlice";

function Fretboard() {
  const dispatch = useDispatch();
  const strings = useSelector((store) => store.fretboard.strings);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretboardStyle = useSelector((store) => store.fretboard.fretboardStyle);
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  // const markNotes = useSelector((store) => store.musicTheory.markNotes);

  function handleMouseDown(e) {
    // Todo: optionally add notes while mouse is held down and hovered over notes
    let noteElem = e.target;
    if (noteElem.parentNode.classList.contains("note"))
      noteElem = noteElem.parentNode;
    console.log(noteElem);
    let octave = noteElem.getAttribute("data-octave");
    let noteName = noteElem.innerText;
    let fret = noteElem.parentNode;
    let fretNumber = fret.getAttribute("data-fretnumber");
    let stringNumber = fret.parentNode.getAttribute("data-stringnumber");
    let stringIndex = strings.findIndex(
      (string) => string.stringNumber === parseInt(stringNumber)
    );
    let note = strings[stringIndex].frets[fretNumber].note;

    // A Note object cannot be mutated, work around this.

    dispatch(toggleNoteSelectedOnString({ note, stringIndex }));
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
