import Note from "../../Note/Note";

function Fret(notes, fretNumber) {
  return (
    <div className={`fret fret${fretNumber}`}>
      {notes.map((note) => {
        <Note />;
      })}
    </div>
  );
}

export default Fret;
