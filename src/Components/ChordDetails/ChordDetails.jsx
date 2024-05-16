import "./ChordDetails.scss";
import ChordNotes from "./ChordNotes";
import Intervals from "../Intervals/Intervals";

// TODO:
// - Highlight intervals/notes when hovered.
// - Highlight (all) chord notes when chord is hovered.

function ChordDetails({ chord, showNotes, showIntervals, intervalSettings }) {
  // console.log(chord);
  if (chord.symbol && chord.notes && chord.intervals) {
    // console.log("yes");
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
    // console.log("no");
    return null;
  }
}

export default ChordDetails;
