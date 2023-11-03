import { memo } from "react";
import "./Note.scss";
import { useState } from "react";

const Note = memo(function Note({ pitchClass, octave, notesWidth, selected }) {
  let noteWidth = notesWidth > 25 ? 25 : notesWidth;

  return (
    <button
      className={`note ${selected ? "selected" : ""}`}
      data-octave={octave}
    >
      <span
        style={{
          minWidth: noteWidth,
          maxWidth: noteWidth,
          minHeight: noteWidth,
          maxHeight: noteWidth,
        }}
      >
        {pitchClass}
      </span>
    </button>
  );
});

export default Note;
