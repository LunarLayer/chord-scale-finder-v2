import { useDispatch, useSelector } from "react-redux";

import "./KeyChange.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import {
  setKey,
  toggleAccidental,
  toggleTonality,
} from "../../Features/MusicTheory/MusicTheorySlice";
import getNoteSizeForKeyChange from "../../Helpers/ToolbarHelper";
import Keys from "./Keys";
import SharpsFlatsDisplay from "./SharpsFlatsDisplay";

function KeyChange() {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  const tonality = useSelector((store) => store.musicTheory.tonality);
  const accidental = useSelector((store) => store.musicTheory.accidental);
  let selected = key.note + key.accidental + tonality;
  console.log(selected);

  function handleToggleAccidental() {
    dispatch(toggleAccidental());
  }

  function handleToggleTonality() {
    dispatch(toggleTonality());
  }

  function handleNoteClicked(note, accidental) {
    dispatch(setKey({ note, accidental }));
  }

  let noteSize = getNoteSizeForKeyChange();

  return (
    <div id="KeyChange">
      <div className="flex-wrapper">
        <Keys
          noteSize={noteSize}
          handleNoteClicked={handleNoteClicked}
          selected={key}
        />
        <div className="settings">
          <ToggleSwitch
            option1="major"
            option2="minor"
            currentlySelected={tonality}
            onToggle={() => handleToggleTonality()}
          />
          <ToggleSwitch
            option1="b"
            option2="#"
            currentlySelected={accidental}
            onToggle={() => handleToggleAccidental()}
          />
        </div>
      </div>
      <SharpsFlatsDisplay selected={selected} />
    </div>
  );
}

export default KeyChange;
