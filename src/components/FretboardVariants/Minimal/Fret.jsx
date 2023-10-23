import PropTypes from "prop-types";

import { memo } from "react";
import MinimalNote from "./Note";

const MinimalFret = memo(function Fret({
  notes,
  fretNumber,
  notesGap,
  notesWidth,
}) {
  return (
    <div className={`fret`} style={{ gap: notesGap }}>
      {notes.map((note, index) => {
        return (
          <MinimalNote
            key={`note-${index}-fret-${fretNumber}`}
            note={note.note}
            hasAccidental={note.hasAccidental}
            octave={note.octave}
            stringNumber={notes.length - index}
            isSelected={note.selected}
            highlighted={note.highlighted}
            notesWidth={notesWidth}
          />
        );
      })}
    </div>
  );
});

export default MinimalFret;

MinimalFret.propTypes = {
  fretboardVariant: PropTypes.string,
  fretNumber: PropTypes.number,
  fretWidths: PropTypes.array,
  notes: PropTypes.array,
  notesGap: PropTypes.number,
  notesWidth: PropTypes.number,
  fretWidth: PropTypes.number,
};
