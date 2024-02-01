import { useDispatch, useSelector } from "react-redux";
import "./KeyChangeMenu.scss";
import { Key, Note } from "tonal";
import {
  highlightNotesInKey,
  selectNotesInKey,
  setAccidental,
  setKey,
} from "../../Features/MusicTheory/MusicTheorySlice";
import { useEffect } from "react";
import {
  animateCollapseMenu,
  animateExpandMenu,
} from "../../Helpers/AnimationHelper";
// import SharpsFlatsDisplay from "./SharpsFlatsDisplay";

function KeyChangeMenu({ showing }) {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  const accidental = useSelector((store) => store.musicTheory.accidental);
  let keyNote = Note.get(key.tonic).letter;

  useEffect(() => {
    let keyChangeMenu = document.getElementById("KeyChangeMenu");
    if (showing) {
      animateExpandMenu(keyChangeMenu);
    } else {
      animateCollapseMenu(keyChangeMenu);
    }
  }, [showing]);

  function handleSetKey(note, accidental) {
    if (key.type === "major") {
      dispatch(setKey(Key.majorKey(note + accidental)));
    } else {
      dispatch(setKey(Key.minorKey(note + accidental)));
    }
    dispatch(setAccidental(accidental));
    dispatch(highlightNotesInKey());
  }

  function handleSelectScale(scale) {
    if (scale === "major") {
      dispatch(setKey(Key.majorKey(key.tonic)));
    } else {
      dispatch(setKey(Key.minorKey(key.tonic)));
    }
    dispatch(highlightNotesInKey());
  }

  return (
    <div id="KeyChangeMenu" className={showing ? "showing" : ""}>
      <div className="content">
        <div className="note-selection">
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
          <div className="majorMinor">
            <button
              className={key.type === "major" ? "active" : ""}
              onClick={() => handleSelectScale("major")}
            >
              Major
            </button>
            <button
              className={key.type === "minor" ? "active" : ""}
              onClick={() => handleSelectScale("minor")}
            >
              Minor
            </button>
          </div>
        </div>
      </div>
      {/* <SharpsFlatsDisplay selected={key.tonic + key.type} /> */}
    </div>
  );
}

export default KeyChangeMenu;
