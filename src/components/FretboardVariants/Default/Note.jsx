import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { memo } from "react";

const DefaultNote = memo(function Note({
  note,
  hasAccidental,
  octave,
  isSelected,
  isHighlighted,
  notesWidth,
}) {
  const accidentalType = useSelector(
    (store) => store.musicTheory.accidentalType
  );

  function handleNoteClicked() {
    toggleNoteSelected;
  }

  return (
    <button
      style={{
        minWidth: notesWidth,
        minHeight: notesWidth,
      }}
      className={`note ${isSelected ? "selected" : ""} ${
        isHighlighted ? "highlighted" : ""
      }`}
      data-note={`${note}${hasAccidental ? accidentalType : ""}`}
      data-octave={octave}
      onClick={() => handleNoteClicked}
    >
      {note}
      {hasAccidental ? accidentalType : null}
    </button>
  );
});

export default DefaultNote;

DefaultNote.propTypes = {
  note: PropTypes.string,
  hasAccidental: PropTypes.bool,
  octave: PropTypes.number,
  isSelected: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  notesWidth: PropTypes.number,
};
