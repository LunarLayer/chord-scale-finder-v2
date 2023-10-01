import { useSelector } from "react-redux";

import "./Fretboard.scss";

import String from "../String/String";

function Fretboard() {
  console.log("fretboard");
  const { strings, notesGap, fretboardWidth, fretCount } = useSelector(
    (store) => store.fretboard
  );

  if (fretCount === 0) return null;

  return (
    <div id="fretboard" style={{ gap: notesGap, width: fretboardWidth }}>
      {strings.map((string) => {
        return (
          <String
            key={`string-${string.stringNumber}`}
            stringNumber={string.stringNumber}
            notes={string.notes}
          />
        );
      })}
    </div>
  );
}

export default Fretboard;
