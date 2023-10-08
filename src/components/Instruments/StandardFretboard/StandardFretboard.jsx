import { useSelector } from "react-redux";

import "./StandardFretboard.scss";
import {
  getFretsWithNotes,
} from "../../../helpers/fretboardHelper";
import Note from "../../Note/Note";

import Fret from "./Fret";

function StandardFretboard() {
  const allNotes = useSelector((store) => store.musicTheory.notes);
  const strings = useSelector((store) => store.fretboard.strings);
  const fretCount = useSelector((store) => store.fretboard.fretCount);
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const fretWidths = useSelector((store) => store.fretboard.fretWidths);
  const notesWidth = useSelector((store) => store.fretboard.notesWidth);
  const frets = getFretsWithNotes(allNotes, strings); // optimize?

  // Memo this badboy
  const StringVisuals = () => {
    return (
      <div className="stringVisuals">
        {strings.map((string, index) => {
          return (
            <div
              className={`stringVisual`}
              key={`stringVisual${index}`}
              style={{
                height: index + 1,
                transform: `translateY(${index + 50}%)`, // fix
              }}
            ></div>
          );
        })}
      </div>
    );
  };

  if (fretCount === 0) return null;
  return (
    <div id="standardFretboard" style={{ width: fretboardWidth }}>
      <FretboardVisuals /> 
      {frets.map(notes, index) {
        return <Fret notes={notes} />
      }
    </div>
  );
}

export default StandardFretboard;

// let notesForFrets = [];
// for (let i = 0; i < 25; i++) {
//   let notesArray = getNotesForFret(i, notes, strings);
//   notesForFrets.push(notesArray);
// }

// return (
//   <div id="standard-fretboard">
//     {notesForFrets.map((notesForFret, index) => {
//       return (
//         <div className={`fret fret${index}`} key={`fret${index}`}>
//           {strings.map((string, index) => {
//             return (
//               <Note
//                 key={`note-${index}-string-${string.stringNumber}`}
//                 note={notesForFret[index].note}
//                 hasAccidental={notesForFret[index].hasAccidental}
//                 octave={notesForFret[index].octave}
//                 selected={notesForFret[index].selected}
//                 highlighted={notesForFret[index].highlighted}
//               />
//             );
//           })}
//         </div>
//       );
//     })}
//   </div>
// );

// function Fretboard() {
//   console.log("fretboard");
//   const { strings, fretsGap, fretboardWidth, fretCount } = useSelector(
//     (store) => store.fretboard
//   );
//   const notes = useSelector((store) => store.musicTheory.notes);

//   if (fretCount === 0) return null;

//   return (
//     <div id="fretboard" style={{ gap: fretsGap, width: fretboardWidth }}>
//       {strings.map((string) => {
//         return (
//           <String
//             key={`string-${string.stringNumber}`}
//             root={string.root}
//             octave={string.octave}
//             hasAccidental={string.hasAccidental}
//             stringNumber={string.stringNumber}
//             notes={notes}
//           />
//         );
//       })}
//     </div>
//   );
// }
