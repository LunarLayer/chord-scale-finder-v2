import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteSelected } from "../../Features/instrument/instrumentSlice";

import "./Note.scss";
import { memo } from "react";

const Note = memo(function Note({
  note,
  hasAccidental,
  octave,
  selected,
  highlighted,
}) {
  const accidental = useSelector((store) => store.musicTheory.accidental);
  const dispatch = useDispatch();
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);

  function handleClick() {
    dispatch(toggleNoteSelected(note, octave));
  }

  return (
    <button
      style={{
        minWidth: notesWidth,
        maxWidth: notesWidth,
        minHeight: notesWidth,
        maxHeight: notesWidth,
      }}
      className={`note ${selected === true ? "selected" : ""}`}
      data-note={`${note}${hasAccidental ? accidental : ""}`}
      onClick={handleClick}
    >
      {note}
      {hasAccidental ? accidental : null}
    </button>
  );
});

export default Note;

Note.propTypes = {
  note: PropTypes.string,
  stringNumber: PropTypes.number,
  fret: PropTypes.number,
  selected: PropTypes.bool,
};
