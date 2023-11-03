import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { memo } from "react";

const DefaultNote = memo(function Note({
  note,
  accidental,
  octave,
  isSelected,
  isHighlighted,
  notesWidth,
}) {
  return (
    <button
      style={{ height: notesWidth * 1.5 }}
      className={`note ${isSelected ? "selected" : ""} ${
        isHighlighted ? "selected" : ""
      }`}
      data-note={note + accidental}
      data-octave={octave}
    >
      <span
        style={{
          minWidth: notesWidth,
          maxWidth: notesWidth,
          minHeight: notesWidth,
          maxHeight: notesWidth,
        }}
      >
        {note + accidental}
      </span>
    </button>
  );
});

export default DefaultNote;

DefaultNote.propTypes = {
  note: PropTypes.string,
  accidental: PropTypes.string,
  octave: PropTypes.number,
  isSelected: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  notesWidth: PropTypes.number,
};
