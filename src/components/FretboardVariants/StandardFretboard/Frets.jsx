import Note from "../../Note/Note";

function Frets({ fretsWithNotes, fretWidths, notesWidth }) {
  function RenderFretMarker(fret) {
    switch (fret) {
      case 3:
      case 5:
      case 7:
      case 9:
      case 15:
      case 17:
      case 19:
      case 21:
        return (
          <div
            className="fretMarker"
            style={{
              width: notesWidth - 10,
              height: notesWidth - 10,
            }}
          />
        );
      case 12:
      case 24:
        return (
          <>
            <div
              className="fretMarker"
              style={{
                width: notesWidth - 10,
                height: notesWidth - 10,
                top: 25 + "%",
                transform: `translateY(${-50}%)`,
              }}
            />
            <div
              className="fretMarker"
              style={{
                width: notesWidth - 10,
                height: notesWidth - 10,
                bottom: 25 + "%",
                transform: `translateY(${+50}%)`,
              }}
            />
          </>
        );
      default:
        return null;
    }
  }

  return fretsWithNotes.map((fretWithNotes, index) => {
    return (
      <div
        className={`fret fret${index}`}
        key={`fret${index}`}
        style={{ minWidth: fretWidths[index] }} // hardcode in fretboardSlice
      >
        {RenderFretMarker(index)}
        {fretWithNotes.map((note, index) => {
          return (
            <Note
              key={`note-${index}-fret-${index}`}
              note={note.note}
              hasAccidental={note.hasAccidental}
              octave={note.octave}
              selected={note.selected}
              highlighted={note.highlighted}
            />
          );
        })}
      </div>
    );
  });
}

export default Frets;
