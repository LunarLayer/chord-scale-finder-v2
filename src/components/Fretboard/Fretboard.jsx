import { useSelector } from "react-redux";
import Fret from "./Fret";

function Fretboard() {
  // const theme = useSelector((store) => store.instrument.theme);

  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);

  return (
    <div id="fretboard" style={{ width: fretboardWidth }}>
      fretboard
    </div>
  );
}

export default Fretboard;

// a fret needs:
// tuning, fretNumber, notes
// to derive its notes
