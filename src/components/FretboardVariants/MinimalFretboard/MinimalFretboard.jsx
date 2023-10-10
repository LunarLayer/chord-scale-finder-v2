import { useSelector } from "react-redux";
import MinimalFret from "./MinimalFret";
import "./MinimalFretboard.scss";

function MinimalFretboard() {
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretsWithNotes = useSelector((store) => store.fretboard.fretsWithNotes);
  const notesGap = useSelector((store) => store.fretboard.notesGap);

  return (
    <div
      id="MinimalFretboard"
      className={`${fretboardTheme} ${coloredNotes ? "coloredNotes" : ""}`}
      style={{ width: fretboardWidth, gap: notesGap }}
    >
      {fretsWithNotes.map((notesArr, index) => {
        return (
          <MinimalFret
            key={`fret${index}`}
            notes={notesArr}
            fretNumber={index}
            notesGap={notesGap}
          />
        );
      })}
    </div>
  );
}

export default MinimalFretboard;
