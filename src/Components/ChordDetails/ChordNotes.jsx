function ChordNotes({ notes }) {
  return (
    <div className="chordNotes">
      {notes.map((index, note) => {
        if (index !== notes.length) {
          return (
            <p key={note + index}>
              {note}
              <span>, </span>
            </p>
          );
        } else {
          return <p key={note + index}>{note}</p>;
        }
      })}
    </div>
  );
}

export default ChordNotes;
