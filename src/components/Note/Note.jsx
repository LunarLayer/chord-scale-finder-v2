import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { toggleNoteSelected } from "../../features/fretboard/fretboardSlice";

import "./Note.scss";
import { memo } from "react";

const Note = memo(function Note({ note, stringNumber, fret, selected }) {
  // const dispatch = useDispatch();
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);

  function handleClick() {
    // dispatch(toggleNoteSelected(stringNumber, fret));
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
      data-note={note}
      onClick={handleClick}
    >
      {note}
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
