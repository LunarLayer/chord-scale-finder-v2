import { useDispatch, useSelector } from "react-redux";

import "./KeyChange.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import {
  setKey,
  toggleAccidentalType,
  toggleTonalityType,
} from "../../Features/MusicTheory/MusicTheorySlice";
import getNoteSizeForKeyChange from "../../Helpers/ToolbarHelper";
import Keys from "./Keys";
import SharpsFlatsDisplay from "./SharpsFlatsDisplay";

function KeyChange() {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  const tonalityType = useSelector((store) => store.musicTheory.tonalityType);
  const accidentalType = useSelector(
    (store) => store.musicTheory.accidentalType
  );
  const windowWidth = useSelector((store) => store.ui.windowWidth);
  let selected = key.note + key.accidental + tonalityType;

  function handleToggleAccidentalType() {
    dispatch(toggleAccidentalType());
  }

  function handleToggleTonalityType() {
    dispatch(toggleTonalityType());
  }

  function handleNoteClicked(note, accidental) {
    console.log("handleNoteClicked: " + note + " " + accidental);
    dispatch(setKey(note, accidental));
  }

  let noteSize = getNoteSizeForKeyChange();

  console.log("key: ");
  console.log(key);

  return (
    <div id="KeyChange">
      <div className="flex-wrapper">
        <Keys noteSize={noteSize} handleNoteClicked={handleNoteClicked} />
        <div className="settings">
          <ToggleSwitch
            option1="major"
            option2="minor"
            currentlySelected={tonalityType}
            onToggle={() => handleToggleTonalityType()}
          />
          <ToggleSwitch
            option1="b"
            option2="#"
            currentlySelected={accidentalType}
            onToggle={() => handleToggleAccidentalType()}
          />
        </div>
      </div>
      <SharpsFlatsDisplay selected={selected} />
    </div>
  );
}

export default KeyChange;
