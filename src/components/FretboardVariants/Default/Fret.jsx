import PropTypes from "prop-types";

import DefaultNote from "./Note";
import { memo } from "react";

import FretDotsVisual from "./FretDotsVisual";

const DefaultFret = memo(function Fret({
  fretNotes,
  fretNumber,
  notesWidth,
  fretWidth,
  markNotes,
}) {
  return (
    <div
      className={`fret`}
      data-fret={fretNumber}
      style={{ minWidth: fretWidth }}
    >
      <FretDotsVisual fretNumber={fretNumber} notesWidth={notesWidth} />
      {fretNotes.map((note, index) => {
        let stringNumber = fretNotes.length - index;
        let selected = note.selected;
        if (
          markNotes === "Single" &&
          !note.selectedOnStrings?.includes(stringNumber)
        ) {
          selected = false;
        }

        return (
          <DefaultNote
            key={`note-${index}-fret-${fretNumber}`}
            note={note.letter}
            accidental={note.acc}
            octave={note.oct}
            stringNumber={stringNumber}
            isSelected={selected}
            isHighlighted={false}
            notesWidth={notesWidth}
          />
        );
      })}
    </div>
  );
});

export default DefaultFret;

DefaultFret.propTypes = {
  fretNotes: PropTypes.array,
  fretNumber: PropTypes.number,
  notesWidth: PropTypes.number,
  fretWidth: PropTypes.number,
};
