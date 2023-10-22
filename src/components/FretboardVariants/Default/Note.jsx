import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { memo } from "react";
import { useState } from "react";
import { toggleNoteSelected } from "../../../Features/MusicTheory/MusicTheorySlice";

const DefaultNote = memo(function Note({
  note,
  hasAccidental,
  octave,
  highlighted,
  notesWidth,
}) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const accidentalType = useSelector(
    (store) => store.musicTheory.accidentalType
  );

  function handleNoteClicked() {
    console.log("click");
    let clickedNote = { note, hasAccidental, octave, selected, highlighted };
    dispatch(toggleNoteSelected(clickedNote));
    setSelected(!selected);
  }

  return (
    <button
      style={{ height: notesWidth * 1.5 }}
      className={`note ${selected ? "selected" : ""} ${
        highlighted ? "highlighted" : ""
      }`}
      data-note={`${note}${hasAccidental ? accidentalType : ""}`}
      data-octave={octave}
      onMouseDown={() => handleNoteClicked()}
    >
      <span
        style={{
          minWidth: notesWidth,
          maxWidth: notesWidth,
          minHeight: notesWidth,
          maxHeight: notesWidth,
        }}
      >
        {note}
        {hasAccidental ? accidentalType : null}
      </span>
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
