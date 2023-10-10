import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteSelected } from "../../../Features/MusicTheory/MusicTheorySlice";

import { memo } from "react";
import { useState } from "react";

const DefaultNote = memo(function Note({
  note,
  hasAccidental,
  octave,
  isSelected,
  isHighlighted,
  notesWidth,
}) {
  const [selected, setSelected] = useState(isSelected);
  const dispatch = useDispatch();
  const accidentalType = useSelector(
    (store) => store.musicTheory.accidentalType
  );

  function handleClick() {
    console.log("click!");
    setSelected(!selected);
    dispatch(toggleNoteSelected(note, hasAccidental, octave, !selected));
  }

  return (
    <button
      style={{
        minWidth: notesWidth,
        maxWidth: notesWidth,
        minHeight: notesWidth,
        maxHeight: notesWidth,
      }}
      className={`note ${selected ? "selected" : ""} ${
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

export default DefaultNote;

DefaultNote.propTypes = {
  note: PropTypes.string,
  hasAccidental: PropTypes.bool,
  octave: PropTypes.number,
  isSelected: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  notesWidth: PropTypes.number,
};
