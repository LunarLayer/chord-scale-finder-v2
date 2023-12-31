import { useEffect } from "react";
import "./ChordScaleIdentifier.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Chord } from "tonal";

function ChordScaleIdentifier() {
  const [chordNotes, setChordNotes] = useState([]);
  const [chord, setChord] = useState("");

  const allNotes = useSelector((store) => store.musicTheory.allNotes);

  useEffect(() => {
    let chordNotes = [];
    for (let i = 0; i < allNotes.length; i++) {
      if (allNotes[i].selectedOnStrings.length > 0)
        if (!chordNotes.includes(allNotes[i].pc))
          chordNotes.push(allNotes[i].pc);
    }
    setChordNotes(chordNotes);
  }, [allNotes]);

  useEffect(() => {
    let chord = Chord.detect(chordNotes);
    // for (let chordz of chords) {
    //   console.log(chordz);
    // }
    // console.log("detected: " + chord);
    setChord(chord);
  }, [chordNotes]);
  return (
    <div id="ChordScaleIdentifier">
      <div className="chordsSection">
        <p>Chord notes: </p>
        <div className="chordNotes">
          {chordNotes.map((chordNote, index) => {
            return <p key={chordNote + index}>{chordNote}</p>;
          })}
        </div>
        <p>Chord: {chord}</p>
        <p>Extended chords: {Chord.extended(chord)}</p>
        <p>Reduced chords: {Chord.reduced(chord)}</p>
        <p>Chord scales: {Chord.chordScales(chord)}</p>
      </div>
    </div>
  );
}

export default ChordScaleIdentifier;
