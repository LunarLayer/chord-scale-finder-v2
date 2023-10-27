import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteSelected } from "../../../Features/MusicTheory/MusicTheorySlice";

import { memo } from "react";
import { useState } from "react";

const MinimalNote = memo(function Note({
  note,
  hasAccidental,
  octave,
  stringNumber,
  isSelected,
  highlighted,
  notesWidth,
}) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(isSelected);
  const accidental = useSelector((store) => store.musicTheory.accidental);

  function handleNoteClicked() {
    let clickedNote = {
      note,
      octave,
      hasAccidental,
      selected: !selected,
      highlighted,
      stringNumber,
    };
    dispatch(toggleNoteSelected(clickedNote));
    setSelected(!selected);
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
        highlighted ? "highlighted" : ""
      }`}
      data-note={`${note}${hasAccidental ? accidental : ""}`}
      data-octave={octave}
      onClick={() => handleNoteClicked()}
    >
      {note}
      {hasAccidental ? accidental : null}
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
