import { Chord } from "tonal";

function ChordInversions({ invertedChords }) {
  return (
    <div>
      {invertedChords?.length > 0 &&
        invertedChords.map((chord, index) => {
          return (
            <p key={chord.symbol + index}>
              {index + 1}: {chord.symbol} (
              {chord.notes.map((note, index) => {
                if (index === 0) return <span key={note + index}>{note}</span>;
                return <span key={note + index}>, {note}</span>;
              })}
              )
            </p>
          );
        })}
    </div>
  );
}

export default ChordInversions;
