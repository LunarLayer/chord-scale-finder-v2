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
        // overflow: nutIsFixed ? "visible" : "hidden",
        maxWidth: nutIsFixed ? width : "auto",
      }}
    >
      {tuning.map((rootNote, index) => {
        let stringNumber = tuning.length - index;

        // Consider memoizing "notesForString";
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
