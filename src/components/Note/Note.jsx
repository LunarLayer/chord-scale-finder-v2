import { memo } from "react";
import "./Note.scss";
import { useSelector } from "react-redux";
import { getNoteLabel } from "../../Helpers/InstrumentHelper";

const Note = memo(function Note({
  pitchClass,
  octave,
  noteWidth,
  labelWidth,
  selected,
  highlighted,
  stringNumber,
}) {
  const labelNotes = useSelector((store) => store.musicTheory.labelNotes);
  const key = useSelector((store) => store.musicTheory.key);
  let label = getNoteLabel(pitchClass, labelNotes, key.scale, key.intervals);

  return (
    <button
      className={`note ${selected ? "selected" : ""} ${
        highlighted ? "highlighted" : ""
      }`}
      data-pitchclass={pitchClass}
      data-octave={octave}
      data-stringnumber={stringNumber}
      style={{
        minWidth: noteWidth,
        maxWidth: noteWidth,
      }}
    >
      <span
        style={{
          minWidth: labelWidth,
          maxWidth: labelWidth,
          minHeight: labelWidth,
          maxHeight: labelWidth,
        }}
      >
        {label}
      </span>
    </button>
  );
});

export default Note;
