import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { memo } from "react";

const KeysNote = memo(function KeysNote({
  note,
  hasAccidental,
  size,
  isSelected,
  handleClick,
}) {
  const accidental = useSelector((store) => store.musicTheory.accidental);

  return (
    <button
      style={{
        minWidth: size,
        maxWidth: size,
        minHeight: size,
        maxHeight: size,
      }}
      className={`keysNote ${isSelected ? "active" : ""}`}
      data-note={`${note}${hasAccidental ? accidental : ""}`}
      onClick={handleClick}
    >
      {note}
      {hasAccidental ? accidental : null}
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
