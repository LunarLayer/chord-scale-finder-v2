import "./ChordDetails.scss";
import ChordNotes from "./ChordNotes";
import Intervals from "../Intervals/Intervals";

function ChordDetails({
  symbol,
  notes,
  intervals,
  showNotes,
  showIntervals,
  intervalSettings,
}) {
  if (symbol && notes && intervals) {
    return (
      <div className="chordDetails">
        <p className="chordSymbol">{symbol}</p>
        <div className="chordNotes">
          (
          {notes.map((note, index) => {
            if (index !== notes.length - 1) {
              return (
                <p key={note + index + symbol}>
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

        <Intervals intervals={intervals} />
      </div>
    );
  } else {
    return null;
  }
}

export default ChordDetails;
