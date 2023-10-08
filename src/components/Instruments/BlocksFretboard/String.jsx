function String(string, notes, fretsGap) {
  return (
    <div key={string.stringNumber} style={{ gap: fretsGap }} className="string">
      {notes.map((note, index) => {
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
}

export default String;
