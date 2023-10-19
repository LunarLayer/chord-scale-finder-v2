function InstrumentTabContent({
  selectedInstrument,
  handleInstrumentSelected,
}) {
  return (
    <div id="InstrumentTabContent">
      <div className="instrumentSelection">
        <h3>Instrument:</h3>
        <button
          className={`instrument ${
            selectedInstrument === "Bass" ? "selected" : ""
          }`}
          onClick={() =>
            handleInstrumentSelected({
              instrument: "fretboard",
              instrumentVariant: "default",
              theme: "black",
              tuning: [
                { note: "G", octave: 2, hasAccidental: false },
                { note: "D", octave: 2, hasAccidental: false },
                { note: "A", octave: 1, hasAccidental: false },
                { note: "E", octave: 1, hasAccidental: false },
              ],
            })
          }
        >
          Default | 4-string | EADG
        </button>
        <button
          className={`instrument ${
            selectedInstrument === "Bass" ? "selected" : ""
          }`}
          onClick={() =>
            handleInstrumentSelected({
              instrument: "fretboard",
              instrumentVariant: "default",
              theme: "black",
              tuning: [
                { note: "C", octave: 3, hasAccidental: false },
                { note: "G", octave: 2, hasAccidental: false },
                { note: "D", octave: 2, hasAccidental: false },
                { note: "A", octave: 1, hasAccidental: false },
                { note: "E", octave: 1, hasAccidental: false },
                { note: "B", octave: 0, hasAccidental: false },
              ],
            })
          }
        >
          Default | 6-string | BEADGC
        </button>
        <button
          className={`instrument ${
            selectedInstrument === "Guitar" ? "selected" : ""
          }`}
          onClick={() =>
            handleInstrumentSelected({
              instrument: "fretboard",
              instrumentVariant: "minimal",
              theme: "black",
              tuning: [
                { note: "G", octave: 2, hasAccidental: false },
                { note: "D", octave: 2, hasAccidental: false },
                { note: "A", octave: 1, hasAccidental: false },
                { note: "E", octave: 1, hasAccidental: false },
              ],
            })
          }
        >
          Minimal | 4-string | EADG
        </button>
        <button
          className={`instrument ${
            selectedInstrument === "Guitar" ? "selected" : ""
          }`}
          onClick={() =>
            handleInstrumentSelected({
              instrument: "fretboard",
              instrumentVariant: "minimal",
              theme: "black",
              tuning: [
                { note: "C", octave: 3, hasAccidental: false },
                { note: "G", octave: 2, hasAccidental: false },
                { note: "D", octave: 2, hasAccidental: false },
                { note: "A", octave: 1, hasAccidental: false },
                { note: "E", octave: 1, hasAccidental: false },
                { note: "B", octave: 0, hasAccidental: false },
              ],
            })
          }
        >
          Minimal | 6-string | BEADGC
        </button>
        <button
          className={`instrument ${
            selectedInstrument === "Guitar" ? "selected" : ""
          }`}
          onClick={() => handleInstrumentSelected("piano")}
        >
          Piano | Release date: soon
        </button>
      </div>
    </div>
  );
}

export default InstrumentTabContent;
