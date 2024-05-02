import "./ChordScaleIdentifier.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  getIntervalsArray,
  getInvertedChords,
  getSelectedNotes,
} from "../../Helpers/MusicTheoryHelper";

import Collapsible from "./Collapsible";
import ChordIntervals from "./ChordIntervals";
import ChordInversions from "./ChordInversions";
import ChordDetails from "../ChordDetails/ChordDetails";
import { getChord } from "../../Helpers/ChordHelper";

function ChordScaleIdentifier() {
  const [activeSettings, setActiveSettings] = useState(["chord"]);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  let chord,
    chordInversions,
    chordIntervals,
    scalesContainingChord,
    possibleChords;

  let selectedNotes = getSelectedNotes(allNotes);
  console.log(selectedNotes);

  chord = getChord(selectedNotes);
  console.log(chord);

  if (activeSettings.includes("chord")) {
    // chord = identifyChordFrom(selectedNotes);
  }

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
    console.log(activeSettings);
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
            <Collapsible title="Chord" modal="identifyChordFilters">
              <ChordDetails chord={chord} />
            </Collapsible>

            <Collapsible title="Inversions">
              <ChordInversions invertedChords={chordInversions} />
            </Collapsible>

            <Collapsible title="Context">
              <p>Select context (could be a bass note)</p>
            </Collapsible>

            <Collapsible title="Intervals">
              <ChordIntervals intervals={chordIntervals} />
            </Collapsible>

            <Collapsible title="Possible chords">
              <ChordDetails chord={chord} />
            </Collapsible>

            <Collapsible title={`Scales containing ${chord?.symbol}`}>
              <ChordDetails chord={chord} />
            </Collapsible>
          </>
        )}
      </div>
    </div>
  );
}

export default ChordScaleIdentifier;
