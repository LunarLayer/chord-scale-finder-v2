import { useSelector } from "react-redux";
import "./ChordIdentifier.scss";
import { useEffect } from "react";
import { Chord } from "tonal";

function ChordIdentifier() {
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  let chord = Chord.detect(["C", "D", "G"]);

  // useEffect(() => {

  // })
  return <div id="ChordIdentifier">chord: {chord}</div>;
}

export default ChordIdentifier;

// const [chordNotes, setChordNotes] = useState([]);
//   const [chord, setChord] = useState("");

//   const allNotes = useSelector((store) => store.musicTheory.allNotes);

//   useEffect(() => {
//     let chordNotes = [];
//     for (let i = 0; i < allNotes.length; i++) {
//       if (allNotes[i].selectedOnStrings.length > 0)
//         if (!chordNotes.includes(allNotes[i].pc))
//           chordNotes.push(allNotes[i].pc);
//     }
//     setChordNotes(chordNotes);
//   }, [allNotes]);

//   useEffect(() => {
//     let chord = Chord.detect(chordNotes);
//     // for (let chordz of chords) {
//     //   console.log(chordz);
//     // }
//     // console.log("detected: " + chord);
//     setChord(chord);
//   }, [chordNotes]);
