import "./ChordIntervalButton.scss";

function ChordIntervalButton({ number, no3, no5, missing }) {
  return (
    <button
      className={`chordIntervalButton ${
        no3 ? "no3" : no5 ? "no5" : missing ? "missing" : ""
      }`}
    >
      {number}
    </button>
  );
}

export default ChordIntervalButton;
