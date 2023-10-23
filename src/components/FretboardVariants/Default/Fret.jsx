import PropTypes from "prop-types";

import DefaultNote from "./Note";
import { memo } from "react";

import FretDotsVisual from "./FretDotsVisual";

const DefaultFret = memo(function Fret({
  notes,
  fretNumber,
  notesWidth,
  fretWidth,
}) {
  return (
    <div
      className={`fret`}
      data-fret={fretNumber}
      style={{ minWidth: fretWidth }}
    >
      <FretDotsVisual fretNumber={fretNumber} notesWidth={notesWidth} />
      {notes.map((note, index) => {
        return (
          <DefaultNote
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

export default DefaultFret;

DefaultFret.propTypes = {
  fretboardVariant: PropTypes.string,
  fretNumber: PropTypes.number,
  fretWidths: PropTypes.array,
  notes: PropTypes.array,
  notesGap: PropTypes.number,
  notesWidth: PropTypes.number,
  fretWidth: PropTypes.number,
};
