import { useSelector } from "react-redux";
import DefaultFret from "./DefaultFret";
import "./DefaultFretboard.scss";

function DefaultFretboard() {
  const fretboardTheme = useSelector((store) => store.fretboard.fretboardTheme);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretsWithNotes = useSelector((store) => store.fretboard.fretsWithNotes);
  const coloredNotes = useSelector((store) => store.fretboard.coloredNotes);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const notesGap = useSelector((store) => store.fretboard.notesGap);
  const tuning = useSelector((store) => store.fretboard.tuning);
  console.log(notesGap);

  return (
    <div
      id="DefaultFretboard"
      className={`${fretboardTheme} ${coloredNotes ? "coloredNotes" : ""}`}
      style={{
        width: fretboardWidth,
      }}
    >
      <div className="frets">
        <div className="stringVisuals" style={{ gap: notesGap }}>
          {/* These stringVisuals' thickness should be calculated based on octave of the rootNote */}
          {tuning.map((rootNote, index) => {
            return (
              <span
                className="stringVisual"
                key={`stringVisual${index}`}
                style={{
                  height: notesWidth,
                }}
              />
            );
          })}
        </div>
        {fretsWithNotes.map((notesArr, index) => {
          return (
            <DefaultFret
              key={`fret${index}`}
              notes={notesArr}
              fretNumber={index}
              notesWidth={notesWidth}
              notesGap={notesGap}
              fretWidth={fretWidths?.[index]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DefaultFretboard;
