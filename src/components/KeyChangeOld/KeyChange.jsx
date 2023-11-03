import { useDispatch, useSelector } from "react-redux";

import "./KeyChange.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { setKey } from "../../Features/MusicTheory/MusicTheorySlice";
import getNoteSizeForKeyChange from "../../Helpers/ToolbarHelper";
import Keys from "./Keys";
import SharpsFlatsDisplay from "./SharpsFlatsDisplay";
import { Key, Note } from "tonal";
import { useState } from "react";

function KeyChange() {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  let keyAccidental = Note.get(key.tonic).acc;
  const [accidental, setAccidental] = useState(
    keyAccidental === "" ? "#" : keyAccidental
  );

  console.log("key: " + key);
  let noteSize = getNoteSizeForKeyChange();

  function handleToggleAccidental() {
    if (accidental === "#") {
      setAccidental("b");
    } else {
      setAccidental("#");
    }
  }

  function handleToggleTonality() {
    if (key.type === "major") {
      let newKey = Key.minorKey(key.tonic);
      dispatch(setKey(newKey));
    } else {
      let newKey = Key.majorKey(key.tonic);
      dispatch(setKey(newKey));
    }
  }

  function handleNoteClicked(note, accidental) {
    if (key.type === "major") {
      let newKey = Key.majorKey(note + accidental);
      dispatch(setKey(newKey));
    } else {
      let newKey = Key.minorKey(note + accidental);
      dispatch(setKey(newKey));
    }
  }

  return (
    <div id="KeyChange">
      <div className="flex-wrapper">
        <Keys
          noteSize={noteSize}
          handleNoteClicked={handleNoteClicked}
          accidental={accidental}
        />
        <div className="settings">
          <ToggleSwitch
            option1="major"
            option2="minor"
            selected={key.type}
            onToggle={() => handleToggleTonality()}
          />
          <ToggleSwitch
            option1="b"
            option2="#"
            selected={accidental}
            onToggle={() => handleToggleAccidental()}
          />
        </div>
      </div>
      <SharpsFlatsDisplay selected={key.tonic + key.type} />
    </div>
  );
}

export default KeyChange;
