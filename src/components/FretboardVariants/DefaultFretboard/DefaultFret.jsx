import PropTypes from "prop-types";

import DefaultNote from "./DefaultNote";
import { memo } from "react";

import { RenderFretVisuals } from "../../../Helpers/FretboardHelper";

const DefaultFret = memo(function Fret({
  notes,
  fretNumber,
  notesWidth,
  notesGap,
  fretWidth,
}) {
  return (
    <div
      className={`fret fret${fretNumber}`}
      style={{ minWidth: fretWidth, gap: notesGap }}
    >
      {RenderFretVisuals(fretNumber, notesWidth)}
      {notes.map((note, index) => {
        return (
          <DefaultNote
            key={`note-${index}-fret-${fretNumber}`}
            note={note.note}
            hasAccidental={note.hasAccidental}
            octave={note.octave}
            isSelected={note.selected}
            isHighlighted={note.highlighted}
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
