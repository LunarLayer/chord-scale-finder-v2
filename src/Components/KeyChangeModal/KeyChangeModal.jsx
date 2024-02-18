import { useDispatch, useSelector } from "react-redux";
import "./KeyChangeModal.scss";
import { Key, Note } from "tonal";
import {
  highlightNotes,
  setAccidental,
  setKey,
} from "../../Features/MusicTheory/MusicTheorySlice";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { toggleMenu } from "../../Features/UI/UISlice";
// import SharpsFlatsDisplay from "./SharpsFlatsDisplay";

function KeyChangeModal({ showing }) {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  const accidental = useSelector((store) => store.musicTheory.accidental);
  const [highlightNotesInKey, setHighlightNotesInKey] = useState(false);
  let keyNote = Note.get(key.tonic).letter;

  useEffect(() => {
    if (highlightNotesInKey) {
      if (key.type === "major") {
        dispatch(highlightNotes(Key.majorKey(key.tonic).scale));
      } else {
        dispatch(highlightNotes(Key.minorKey(key.tonic).natural.scale));
      }
    } else {
      dispatch(highlightNotes());
    }
  }, [highlightNotesInKey, dispatch, key]);

  function handleSetKey(note, accidental) {
    if (key.type === "major") {
      dispatch(setKey(Key.majorKey(note + accidental)));
    } else {
      dispatch(setKey(Key.minorKey(note + accidental)));
    }
    dispatch(setAccidental(accidental));
    if (highlightNotesInKey && key.type === "major") {
      dispatch(highlightNotes(Key.majorKey(note + accidental).scale));
    } else if (highlightNotesInKey && key.type === "minor") {
      dispatch(highlightNotes(Key.minorKey(note + accidental).natural.scale));
    }
  }

  function handleSelectScale(scale) {
    if (scale === "major") {
      dispatch(setKey(Key.majorKey(key.tonic)));
      if (highlightNotesInKey) {
        dispatch(highlightNotes(Key.majorKey(key.tonic).scale));
      }
    } else {
      dispatch(setKey(Key.minorKey(key.tonic)));
      if (highlightNotesInKey) {
        dispatch(highlightNotes(Key.minorKey(key.tonic).natural.scale));
      }
    }
  }

  return (
    <Modal
      id="KeyChangeModal"
      title="Key change"
      showing={showing}
      onClose={() => dispatch(toggleMenu("keyChange"))}
    >
      <div className="note-selection">
        <p>Choose a key</p>
        <div className="naturals">
          <button
            className={keyNote === "C" ? "active" : ""}
            onClick={() => handleSetKey("C", accidental)}
          >
            C
          </button>
          <button
            className={keyNote === "D" ? "active" : ""}
            onClick={() => handleSetKey("D", accidental)}
          >
            D
          </button>
          <button
            className={keyNote === "E" ? "active" : ""}
            onClick={() => handleSetKey("E", accidental)}
          >
            E
          </button>
          <button
            className={keyNote === "F" ? "active" : ""}
            onClick={() => handleSetKey("F", accidental)}
          >
            F
          </button>
          <button
            className={keyNote === "G" ? "active" : ""}
            onClick={() => handleSetKey("G", accidental)}
          >
            G
          </button>
          <button
            className={keyNote === "A" ? "active" : ""}
            onClick={() => handleSetKey("A", accidental)}
          >
            A
          </button>
          <button
            className={keyNote === "B" ? "active" : ""}
            onClick={() => handleSetKey("B", accidental)}
          >
            B
          </button>
        </div>
        <p>Sharp or flat?</p>
        <div className="accidentals">
          <button
            className={accidental === "b" ? "active" : ""}
            onClick={() => handleSetKey(keyNote, "b")}
          >
            {keyNote + "♭"}
          </button>
          <button
            className={accidental === "" ? "active" : ""}
            onClick={() => handleSetKey(keyNote, "")}
          >
            {keyNote}
          </button>
          <button
            className={accidental === "#" ? "active" : ""}
            onClick={() => handleSetKey(keyNote, "#")}
          >
            {keyNote + "♯"}
          </button>
        </div>
        <p>Major or Minor?</p>
        <div className="majorMinor">
          <button
            className={key.type === "major" ? "active" : ""}
            onClick={() => handleSelectScale("major")}
          >
            {key.tonic} Major
          </button>
          <button
            className={key.type === "minor" ? "active" : ""}
            onClick={() => handleSelectScale("minor")}
          >
            {key.tonic} Minor
          </button>
        </div>
      </div>
      <div className="highlightScaleOption">
        <button onClick={() => setHighlightNotesInKey(!highlightNotesInKey)}>
          {highlightNotesInKey ? "☑" : "☐"} Highlight notes in key
        </button>
      </div>
      {/* <SharpsFlatsDisplay selected={key.tonic + key.type} /> */}
    </Modal>
  );
}

export default KeyChangeModal;
