// import { memo } from "react";
// import Note from "../Note/Note";
// import { useSelector } from "react-redux";

// const Fret = memo(function Fret({ note, fretNumber, fretWidth }) {
//   const notesWidth = useSelector((store) => store.fretboard.notesWidth);
//   const selectedNotes = useSelector((store) => store.musicTheory.selectedNotes);
//   const markNotes = useSelector((store) => store.musicTheory.markNotes);

//   return (
//     <div
//       className="fret"
//       style={{ minWidth: fretWidth }}
//       data-fretnumber={fretNumber}
//     >
//       <Note
//         pitchClass={note.pc}
//         octave={note.oct}
//         notesWidth={notesWidth}
//         selected={note.selected}
//         highlighted={note.highlighted}
//       />
//     </div>
//   );
// });

// export default Fret;
