import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { memo } from "react";
import { getNoteLabel } from "../../Helpers/InstrumentHelper";

const KeysNote = memo(function KeysNote({ noteLabel, size, handleClick }) {
  let isSelected = true;
  return (
    <button
      style={{
        minWidth: size,
        maxWidth: size,
        minHeight: size,
        maxHeight: size,
      }}
      className={`keysNote ${isSelected ? "active" : ""}`}
      data-note={`${noteLabel}`}
      onClick={handleClick}
    >
      {noteLabel}
    </button>
  );
});

export default KeysNote;

KeysNote.propTypes = {
  note: PropTypes.string,
  hasAccidental: PropTypes.bool,
  octave: PropTypes.number,
  isSelected: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  notesWidth: PropTypes.number,
};
