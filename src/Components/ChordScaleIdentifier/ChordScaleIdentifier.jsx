import "./ChordScaleIdentifier.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  getIntervalsArray,
  getInvertedChords,
  getSelectedNotes,
} from "../../Helpers/MusicTheoryHelper";

import { PadlockLocked, PadlockUnlocked } from "../../../public/svgs/SvgIcons";

import Collapsible from "./Collapsible";
import Chord from "../Chord/Chord";
import { getChords } from "../../Helpers/Chords/ChordFunctions";

function ChordScaleIdentifier() {
  // console.log("ChordScaleIdentifier() refresh");
  const [activeSettings, setActiveSettings] = useState(["chord"]);
  const [chordLocked, setChordLocked] = useState(false);
  const [chordLockIcon, setChordLockIcon] = useState(PadlockUnlocked);
  const [possibleChordsLocked, setPossibleChordsLocked] = useState(false);

  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const identifySettings = useSelector(
    (store) => store.user.globalSettings.chordScaleIdentifier.identify
  );
  // let chords = [];
  let context;
  let selectedNotes = getSelectedNotes(allNotes);

  let chords = getChords(selectedNotes, context);
  console.log(chords);

  // let detectedChords = Chord.detect(["D", "A", "C", "F"]);
  // console.log(detectedChords);
  // let testChord = Chord.get(detectedChords[0]);
  // console.log(testChord);

  // chord = getChord(selectedNotes);
  // scale = getScale(selectedNotes);

  // function toggleSettingsMenu() {
  //   console.log("toggline settings menu");
  // }

  // console.log(scale);

  // if (chord.empty === false) {
  //   invertedChords = getInvertedChords(chord);
  //   chordIntervals = getIntervalsArray(chord.intervals);
  // }

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
          <>
            <Collapsible
              identifier="chord"
              title="Chord"
              settingsModal="identifyChordFilters"
            >
              <div className="filters">Filters</div>
              <div className="chordMatch">
                <div className="chordMatchMenu">{chordLockIcon}</div>
                <Chord chord={chords[0]} />
              </div>
              <div className="intervalsOverview">IntervalsOverview</div>
            </Collapsible>

            <Collapsible
              identifier="possibleChords"
              title="Possible chords"
              settingsModal="identifyChordFilters"
            >
              {chords.map((chord, index) => {
                return <Chord key={chord.symbol + index} chord={chord} />;
              })}
            </Collapsible>
          </>
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
