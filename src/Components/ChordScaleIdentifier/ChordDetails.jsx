function ChordDetails({ chord }) {
  let chordName = chord?.symbol ? chord.symbol : "";
  let chordNotes = chord?.notes ? chord.notes : [];
  let chordAliases = chord?.aliases ? chord.aliases : [];

  return (
    <div id="ChordDetails">
      {chord?.empty === false && (
        <div className="flex-wrapper">
          <p>
            {chordName} (
            {chordNotes.map((note, index) => {
              if (index === 0) return <span key={note + index}>{note}</span>;
              return <span key={note + index}>, {note}</span>;
            })}
            )
          </p>
          <p>
            Aliases:
            {chordAliases.map((alias, index) => {
              if (index === 0) return <span key={alias + index}> {alias}</span>;
              return <span key={alias + index}>, {alias}</span>;
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default ChordDetails;
