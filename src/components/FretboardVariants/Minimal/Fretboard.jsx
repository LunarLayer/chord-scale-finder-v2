import { useSelector } from "react-redux";
import Fret from "./Fret";
import "./Fretboard.scss";
import FretNumbers from "./FretNumbers";

function Fretboard() {
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretsWithNotes = useSelector((store) => store.fretboard.fretsWithNotes);
  const notesGap = useSelector((store) => store.fretboard.notesGap);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  console.log(fretboardWidth);
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
