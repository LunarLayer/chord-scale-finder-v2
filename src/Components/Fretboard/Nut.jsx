import { useSelector } from "react-redux";
import Note from "../Note/Note";

function Nut({ tuning, allNotes, nutIsFixed }) {
  const notesLabelWidth = useSelector(
    (store) => store.fretboard.notesLabelWidth
  );
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  return (
    // <div className={`nut ${nutIsFixed ? "fixed" : ""}`} style={{ height: 145 }}>
    <div className={`nut ${nutIsFixed ? "fixed" : ""}`}>
      {tuning.map((rootNote, i) => {
        let stringNumber = tuning.length - i;
        let note = allNotes.filter(
          (allNote) =>
            allNote.name === rootNote.name &&
            allNote.appearsOnStrings.includes(stringNumber)
        )[0];
        let noteWidth = fretWidths[0];
        let selected = note.selectedOnStrings.includes(stringNumber);
        return (
          <Note
            key={`note${note.name}string${stringNumber}`}
            pitchClass={note.pc}
            octave={note.oct}
            noteWidth={noteWidth}
            labelWidth={notesLabelWidth}
            selected={selected}
            highlighted={note.highlighted}
            stringNumber={stringNumber}
          />
        );
      })}
    </div>
  );
}

export default Nut;
