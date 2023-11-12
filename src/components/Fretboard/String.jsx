import { memo } from "react";
import Note from "../Note/Note";
import { useSelector } from "react-redux";

const String = memo(function String({ notes, stringNumber }) {
  const nutIsFixed = useSelector((store) => store.fretboard.nutIsFixed);
  const notesLabelWidth = useSelector(
    (store) => store.fretboard.notesLabelWidth
  );
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);

  return (
    <div className="string" data-stringnumber={stringNumber}>
      {notes.map((note, i) => {
        let selected = note.selectedOnStrings.includes(stringNumber);
        let noteWidth = nutIsFixed ? fretWidths[i + 1] : fretWidths[i];
        return (
          <Note
            key={`note${note.name}string${stringNumber}`}
            pitchClass={note.pc}
            octave={note.oct}
            noteWidth={noteWidth}
            labelWidth={notesLabelWidth}
            selected={selected}
            // selected={selected}
            highlighted={note.highlighted}
          />
        );
      })}
    </div>
  );
});

export default String;
