import { useDispatch, useSelector } from "react-redux";
import "./KeyChangeMenu.scss";
import { Key, Note } from "tonal";
import {
  selectNotesInKey,
  setKey,
} from "../../../Features/MusicTheory/MusicTheorySlice";
// import SharpsFlatsDisplay from "./SharpsFlatsDisplay";
import { useEffect } from "react";
import { toggleMenuShowing } from "../../../Helpers/AnimationHelper";

function KeyChangeMenu({ showing }) {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  let keyNote = Note.get(key.tonic).letter;

  function handleSetKey(note, accidental) {
    if (key.type === "major") {
      dispatch(setKey(Key.majorKey(note + accidental)));
    } else {
      dispatch(setKey(Key.minorKey(note + accidental)));
    }
    dispatch(selectNotesInKey());
  }

  function handleSelectScale(scale) {
    if (scale === "major") {
      dispatch(setKey(Key.majorKey(key.tonic)));
    } else {
      dispatch(setKey(Key.minorKey(key.tonic)));
    }
    dispatch(selectNotesInKey());
  }

  return (
    <div id="KeyChangeMenu">
      <div className="content">
        <div className="note-selection">
          <div className="notes">
            <button onClick={() => handleSetKey("C", "")}>C</button>
            <button onClick={() => handleSetKey("D", "")}>D</button>
            <button onClick={() => handleSetKey("E", "")}>E</button>
            <button onClick={() => handleSetKey("F", "")}>F</button>
            <button onClick={() => handleSetKey("G", "")}>G</button>
            <button onClick={() => handleSetKey("A", "")}>A</button>
            <button onClick={() => handleSetKey("B", "")}>B</button>
          </div>
          <div className="accidentals">
            <button onClick={() => handleSetKey(keyNote, "b")}>
              {keyNote + "b"}
            </button>
            <button onClick={() => handleSetKey(keyNote, "")}>{keyNote}</button>
            <button onClick={() => handleSetKey(keyNote, "#")}>
              {keyNote + "#"}
            </button>
          </div>
          <div className="scaleSelection">
            <button onClick={() => handleSelectScale("major")}>Major</button>
            <button onClick={() => handleSelectScale("minor")}>Minor</button>
          </div>
        </div>
        {/* <SharpsFlatsDisplay selected={key.tonic + key.type} /> */}
      </div>
    </div>
  );
}

export default KeyChangeMenu;
