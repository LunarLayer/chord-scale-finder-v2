import { useSelector } from "react-redux";
import DefaultFret from "./DefaultFret";
import "./DefaultFretboard.scss";

function DefaultFretboard() {
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretsWithNotes = useSelector((store) => store.fretboard.fretsWithNotes);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const notesGap = useSelector((store) => store.fretboard.notesGap);

  return (
    <div
      id="DefaultFretboard"
      className={`${fretboardTheme} ${coloredNotes ? "coloredNotes" : ""}`}
      style={{ width: fretboardWidth }}
    >
      {fretsWithNotes.map((notesArr, index) => {
        return (
          <DefaultFret
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
  );
}

export default DefaultFretboard;
