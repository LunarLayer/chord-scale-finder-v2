import { useSelector } from "react-redux";

import "./BlocksFretboard.scss";

import Note from "../../Note/Note";

import { getNotesForString } from "../../../helpers/fretboardHelper";

function BlocksFretboard() {
  console.log("BlocksFretboard()");
  const { strings, fretsGap, fretboardWidth, fretCount } = useSelector(
    (store) => store.fretboard
  );
  const allNotes = useSelector((store) => store.musicTheory.notes);

  if (fretCount === 0) return null;
  return (
    <div id="blocks-fretboard" style={{ gap: fretsGap, width: fretboardWidth }}>
      {strings.map((string) => {
        let notesForString = getNotesForString(allNotes, string);
        return (
          <div
            key={string.stringNumber}
            style={{ gap: fretsGap }}
            className="string"
          >
            {notesForString.map((note, index) => {
              <Note
                key={`note-${index}-string-${string.stringNumber}`}
                note={note.note}
                hasAccidental={note.hasAccidental}
                octave={note.octave}
                selected={note.selected}
                highlighted={note.highlighted}
              />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default BlocksFretboard;
