import { useDispatch, useSelector } from "react-redux";
import "./KeyChange.scss";
import { Key, Note } from "tonal";
import KeyChangeNote from "../NoteVariants/KeyChangeNote";
import { useState } from "react";
import { setKey } from "../../Features/MusicTheory/MusicTheorySlice";

function KeyChange() {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  let keyNote = Note.get(key.tonic).letter;

  function handleSelectNote(note) {
    if (key.type === "major") {
      dispatch(setKey(Key.majorKey(note)));
    } else {
      dispatch(setKey(Key.minorKey(note)));
    }
  }

  function handleSelectScale(scale) {
    if (scale === "major") {
      dispatch(setKey(Key.majorKey(key.tonic)));
    } else {
      dispatch(setKey(Key.minorKey(key.tonic)));
    }
  }

  return (
    <div id="KeyChange">
      <div className="note-selection">
        <div className="notes">
          <KeyChangeNote label="C" onClick={() => handleSelectNote("C")} />
          <KeyChangeNote label="D" onClick={() => handleSelectNote("D")} />
          <KeyChangeNote label="E" onClick={() => handleSelectNote("E")} />
          <KeyChangeNote label="F" onClick={() => handleSelectNote("F")} />
          <KeyChangeNote label="G" onClick={() => handleSelectNote("G")} />
          <KeyChangeNote label="A" onClick={() => handleSelectNote("A")} />
          <KeyChangeNote label="B" onClick={() => handleSelectNote("B")} />
        </div>
        <div className="accidentals">
          <KeyChangeNote
            label={keyNote + "b"}
            onClick={() => handleSelectNote(keyNote + "b")}
          />
          <KeyChangeNote
            label={keyNote}
            onClick={() => handleSelectNote(keyNote)}
          />
          <KeyChangeNote
            label={keyNote + "#"}
            onClick={() => handleSelectNote(keyNote + "#")}
          />
        </div>
      </div>
      <div className="scaleSelection">
        <button onClick={() => handleSelectScale("major")}>Major</button>
        <button onClick={() => handleSelectScale("minor")}>Minor</button>
      </div>
    </div>
  );
}

export default KeyChange;
