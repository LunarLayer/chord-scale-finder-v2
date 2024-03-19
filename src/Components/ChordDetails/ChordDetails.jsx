import "./ChordDetails.scss";

function ChordDetails({ chord, showNotes, showAliases, showIntervals }) {
  let chordName, chordNotes, chordAliases, chordIntervals;
  chordName = chord.return(
    <div className="chordDetails">
      <div className="chordName"></div>
      {showNotes && <div className="chordNotes"></div>}
    </div>
  );
}

export default ChordDetails;
