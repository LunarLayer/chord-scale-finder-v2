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
  focused,
  stringNumber,
}) {
  const labelNotes = useSelector((store) => store.musicTheory.labelNotes);
  const key = useSelector((store) => store.musicTheory.key);
  const accidental = useSelector((store) => store.musicTheory.accidental);
  let label = getNoteLabel(pitchClass, labelNotes, key, accidental);

  return (
    <button
      className={`note ${selected ? "selected" : ""} ${
        highlighted ? "highlighted" : ""
      } ${focused ? "focused" : ""}`}
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
