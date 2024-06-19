import { v4 as uuidv4 } from "uuid";
import "./chordNotes.scss";

function ChordNotes({ notes }) {
  return (
    <div className="chordNotes">
      {notes.map((note, index) => {
        if (index !== notes.length - 1) {
          return <p key={uuidv4()}>{note}</p>;
        } else {
          return <p key={uuidv4()}>{note}</p>;
        }
      })}
    </div>
  );
}

export default ChordNotes;
