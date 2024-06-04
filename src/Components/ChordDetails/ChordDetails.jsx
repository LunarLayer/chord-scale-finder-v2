import "./ChordDetails.scss";
import ChordNotes from "./ChordNotes";
import Intervals from "../Intervals/Intervals";
import { v4 as uuidv4 } from "uuid";

// TODO:
// - Highlight intervals/notes when hovered.
// - Highlight (all) chord notes when chord is hovered.

function ChordDetails({ chord, showNotes, showIntervals, intervalSettings }) {
  // console.log("received:");
  // console.log(chord);
  return (
    <div className={`chordDetails ${chord.isExactMatch ? "exactMatch" : ""}`}>
      <p className="chordSymbol">
        {chord.root + chord.quality}
        <span>{chord.extension}</span>
        {/* {chord.additionalQuality && (
          <span className="suspension">
            (addyQual{chord.additionalQuality})
          </span>
        )} */}
        {chord.suspension && (
          <span className="suspension">sussy({chord.suspension})</span>
        )}

        {chord.alteration && (
          <span className="alteration">({chord.alteration})</span>
        )}
      </p>
      <div className="chordNotes">
        (
        {chord.notes.map((note, index) => {
          if (index !== chord.notes.length - 1) {
            return (
              <p key={uuidv4()}>
                {note}
                <span>,&nbsp;</span>
              </p>
            );
          } else {
            return <p key={uuidv4()}>{note}</p>;
          }
        })}
        )
      </div>

      <Intervals intervals={chord.intervals} />
    </div>
  );
}

export default ChordDetails;
