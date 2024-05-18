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
import { getChords } from "../../Helpers/Chords/ChordFunctions";

function ChordScaleIdentifier() {
  const [activeSettings, setActiveSettings] = useState(["chord"]);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const identifySettings = useSelector(
    (store) => store.user.globalSettings.chordScaleIdentifier.identify
  );

  let context;
  let selectedNotes = getSelectedNotes(allNotes);
  let chords = getChords(
    selectedNotes,
    context,
    identifySettings.onlyShowExactMatches,
    identifySettings.allowedToOmitNotes,
    identifySettings.allowAbstractChords
  ); // should provide more than one in case there are several chords it could be.
  // use testing to ensure accuracy
  console.log(chords);

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
            <Collapsible title="Chord" settingsModal="identifyChordFilters">
              {chords.map((chord, index) => {
                return (
                  <ChordDetails key={chord.symbol + index} chord={chord} />
                );
              })}
            </Collapsible>

            {/* <Collapsible title="Inversions">
              <ChordInversions invertedChords={chordInversions} />
            </Collapsible> */}
            {/* 
            <Collapsible title="Context">
              <p>Select context (could be a bass note)</p>
            </Collapsible> */}

            {/* <Collapsible title="Intervals">
              <ChordIntervals intervals={chordIntervals} />
            </Collapsible> */}

            {/* <Collapsible title={`Scales containing ${chords?.symbol}`}>
              <ChordDetails chord={chords} />
            </Collapsible> */}
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
