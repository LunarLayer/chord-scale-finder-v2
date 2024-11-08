import "./ChordScaleIdentifier.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  getIntervalsArray,
  getInvertedChords,
  getSelectedNotes,
} from "../../Helpers/MusicTheoryHelper";

import ChordIdentifier from "./ChordIdentifier";

function ChordScaleIdentifier() {
  // console.log("ChordScaleIdentifier() refresh");
  const [activeSettings, setActiveSettings] = useState(["chord"]);

  const [possibleChordsLocked, setPossibleChordsLocked] = useState(false);

  const allNotes = useSelector((store) => store.musicTheory.allNotes);

  let context = "todo";
  let selectedNotes = getSelectedNotes(allNotes);

  function toggleSetting(setting) {
    // console.log(activeSettings);
    if (activeSettings.includes(setting)) {
      let newActiveSettings = activeSettings.filter((item) => item !== setting);
      setActiveSettings(newActiveSettings);
    } else {
      setActiveSettings([...activeSettings, setting]);
    }
  }

  return (
    <div id="ChordScaleIdentifier">
      <div className="settingsBar">
        <button onClick={() => toggleSetting("chord")}>
          {activeSettings.includes("chord") ? "☑" : "☐"} Chord
        </button>
        <button onClick={() => toggleSetting("scale")}>
          {activeSettings.includes("scale") ? "☑" : "☐"} Scale
        </button>
        {/* <button onClick={() => toggleSetting("sound")}>
          {activeSettings.includes("sound") ? "☑" : "☐"} Sound
        </button> */}
      </div>

      <div className="content">
        {activeSettings.includes("chord") && (
          <ChordIdentifier selectedNotes={selectedNotes} context={context} />
        )}
        {activeSettings.includes("scale") && (
          <>
            <p>Scales</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ChordScaleIdentifier;
