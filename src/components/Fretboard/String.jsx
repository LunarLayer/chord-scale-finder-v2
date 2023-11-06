import { memo } from "react";
import Note from "../Note/Note";
import { useSelector } from "react-redux";

const String = memo(function String({ notes, stringNumber }) {
  const notesLabelWidth = useSelector(
    (store) => store.fretboard.notesLabelWidth
  );
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);

  return (
    <div className="string" data-stringnumber={stringNumber}>
      {notes.map((note, index) => {
        let selected = note.selected;
        if (
          note.onlySelectedOnStrings.length > 0 &&
          !note.onlySelectedOnStrings.includes(stringNumber)
        ) {
          selected = false;
        }
        return (
          <Note
            key={`note${note.name}string${stringNumber}`}
            pitchClass={note.pc}
            octave={note.oct}
            noteWidth={fretWidths[index]}
            labelWidth={notesLabelWidth}
            selected={selected}
            highlighted={note.highlighted}
          />
        );
      })}
    </div>
  );
});

export default String;
