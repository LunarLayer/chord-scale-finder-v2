import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import "./String.scss";

import Note from "../Note/Note";
import { memo } from "react";

const String = memo(function String({ stringNumber, notes }) {
  const notesGap = useSelector((store) => store.fretboard.notesGap);

  return (
    <div className="string" style={{ gap: notesGap }}>
      {notes.map((note, index) => {
        return (
          <Note
            key={`note-${index}-string-${stringNumber}`}
            note={note.note}
            stringNumber={stringNumber}
            fret={note.fret}
            selected={note.selected}
          ></Note>
        );
      })}
    </div>
  );
});

export default String;

String.propTypes = {
  stringNumber: PropTypes.number,
  notes: PropTypes.array,
};
