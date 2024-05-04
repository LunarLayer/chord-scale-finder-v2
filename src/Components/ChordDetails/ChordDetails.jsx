import "./ChordDetails.scss";
import ChordNotes from "./ChordNotes";
import Intervals from "../Intervals/Intervals";

function ChordDetails({ chord, showNotes, showIntervals, intervalSettings }) {
  if (chord.symbol && chord.notes && chord.intervals) {
    return (
      <div className="chordDetails">
        <p className="chordSymbol">{chord.symbol}</p>
        <div className="chordNotes">
          (
          {chord.notes.map((note, index) => {
            if (index !== chord.notes.length - 1) {
              return (
                <p key={note + index + chord.symbol}>
                  {note}
                  <span>,&nbsp;</span>
                </p>
              );
            } else {
              return <p key={note + index}>{note}</p>;
            }
          })}
          )
        </div>

        <Intervals intervals={chord.intervals} />
      </div>
    );
  } else {
    return null;
  }
}

export default ChordDetails;
