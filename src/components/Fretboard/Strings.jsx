import { useMemo } from "react";
import { getNotesForString } from "../../Helpers/FretboardHelper";
import String from "./String";

function Strings({ tuning, nutIsFixed, allNotes, fretWidths, width }) {
  return (
    <div
      id="Strings"
      style={{
        height: "145px",
        left: nutIsFixed ? fretWidths[0] + "px" : "auto",
        right: nutIsFixed ? "unset" : "auto",
        overflow: nutIsFixed ? "hidden" : "visible",
        maxWidth: nutIsFixed ? width : "100%",
      }}
    >
      {tuning.map((rootNote, index) => {
        let stringNumber = tuning.length - index;
        let notesForString = getNotesForString(allNotes, stringNumber);
        if (nutIsFixed) notesForString = notesForString.slice(1);

        return (
          <String
            key={`string${stringNumber}`}
            notes={notesForString}
            stringNumber={stringNumber}
          />
        );
      })}
    </div>
  );
}

export default Strings;
