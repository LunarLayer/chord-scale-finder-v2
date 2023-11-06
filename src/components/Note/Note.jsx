import { memo } from "react";
import "./Note.scss";
import { useSelector } from "react-redux";
import { getNoteLabel } from "../../Helpers/InstrumentHelper";

const Note = memo(function Note({
  pitchClass,
  octave,
  notesWidth,
  selected,
  highlighted,
}) {
  const labelNotes = useSelector((store) => store.musicTheory.labelNotes);
  const key = useSelector((store) => store.musicTheory.key);
  let noteWidth = notesWidth > 25 ? 25 : notesWidth;
  let label = getNoteLabel(pitchClass, labelNotes, key.scale, key.intervals);

  return (
    <button
      className={`note ${selected ? "selected" : ""} ${
        highlighted ? "highlighted" : ""
      }`}
      data-notename={pitchClass}
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
        {label}
      </span>
    </button>
  );
});

export default Note;
