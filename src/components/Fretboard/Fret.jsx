function Fret() {
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
}

export default Fret;
