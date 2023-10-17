import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { memo } from "react";

const KeysNote = memo(function KeysNote({
  note,
  hasAccidental,
  size,
  handleClick,
}) {
  const accidentalType = useSelector(
    (store) => store.musicTheory.accidentalType
  );

  return (
    <button
      style={{
        minWidth: size,
        maxWidth: size,
        minHeight: size,
        maxHeight: size,
      }}
      className="keysNote"
      data-note={`${note}${hasAccidental ? accidentalType : ""}`}
      onClick={handleClick}
    >
      {note}
      {hasAccidental ? accidentalType : null}
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
