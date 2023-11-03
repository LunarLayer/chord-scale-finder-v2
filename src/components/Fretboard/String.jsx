import { memo } from "react";
import Fret from "./Fret";

const String = memo(function String({ frets, fretWidths, stringNumber }) {
  return (
    <div className="string" data-stringnumber={stringNumber}>
      {frets.map((fret, index) => {
        return (
          <Fret
            key={`fret${fret.fretNumber}`}
            note={fret.note}
            fretNumber={fret.fretNumber}
            fretWidth={fretWidths[index]}
          />
        );
      })}
    </div>
  );
});

export default String;
