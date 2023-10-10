import PropTypes from "prop-types";

import { memo } from "react";
import MinimalNote from "./MinimalNote";

const MinimalFret = memo(function Fret({ notes, fretNumber, notesGap }) {
  return (
    <div className={`fret fret${fretNumber}`} style={{ gap: notesGap }}>
      {notes.map((note, index) => {
        return (
          <MinimalNote
            key={`note-${index}-fret-${fretNumber}`}
            note={note.note}
            hasAccidental={note.hasAccidental}
            octave={note.octave}
            isSelected={note.selected}
            isHighlighted={note.highlighted}
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
