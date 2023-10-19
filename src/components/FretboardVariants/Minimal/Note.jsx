import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteSelected } from "../../../Features/MusicTheory/MusicTheorySlice";

import { memo } from "react";
import { useState } from "react";

const MinimalNote = memo(function Note({
  note,
  hasAccidental,
  octave,
  isSelected,
  isHighlighted,
  notesWidth,
  handleClick,
}) {
  const accidentalType = useSelector(
    (store) => store.musicTheory.accidentalType
  );

  return (
    <button
      style={{
        minWidth: notesWidth,
        maxWidth: notesWidth,
        minHeight: notesWidth,
        maxHeight: notesWidth,
      }}
      className={`note ${isSelected ? "selected" : ""} ${
        isHighlighted ? "highlighted" : ""
      }`}
      data-note={`${note}${hasAccidental ? accidentalType : ""}`}
      onClick={handleClick}
    >
      {note}
      {hasAccidental ? accidentalType : null}
    </button>
  );
});

export default MinimalNote;

MinimalNote.propTypes = {
  note: PropTypes.string,
  hasAccidental: PropTypes.bool,
  octave: PropTypes.number,
  isSelected: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  notesWidth: PropTypes.number,
};
