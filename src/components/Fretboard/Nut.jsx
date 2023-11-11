import { useSelector } from "react-redux";
import Note from "../Note/Note";

function Nut({ tuning, nutIsFixed }) {
  const notesLabelWidth = useSelector(
    (store) => store.fretboard.notesLabelWidth
  );
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);

  return (
    // <div className={`nut ${nutIsFixed ? "fixed" : ""}`} style={{ height: 145 }}>
    <div className={`nut ${nutIsFixed ? "fixed" : ""}`}>
      {tuning.map((rootNote, i) => (
        <Note
          key={`note${rootNote.name}string${i}`}
          pitchClass={rootNote.pc}
          octave={rootNote.oct}
          noteWidth={fretWidths[0]}
          labelWidth={notesLabelWidth}
          selected={true}
          // selected={selected}
          highlighted={rootNote.highlighted}
        />
      ))}
    </div>
  );
}

export default Nut;
