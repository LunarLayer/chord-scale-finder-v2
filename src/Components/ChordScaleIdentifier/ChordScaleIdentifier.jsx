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
import { getChords } from "../../Helpers/ChordHelper";

/* Chord identification: 
The root note is determined to be the lowest note picked♥
User selected notes will be converted to intervals. 
Intervals will be matched against a collection of chords, based on their intervals.

- - - Chord section
- Chord(s?)
If the user-selected intervals(notes) match all intervals of a chord 
in a collection of chords 
(both by interval numbers and total amount of notes/intervals)
That chord is displayed.
In case a complete match is not found, there are still chords in the collection 
that might match all its intervals, 
despite not having the same amount of notes as the user-selected chord.
For example. If the user selected the intervals 
containing the same intervals as a Maj7: [0, 7, 11], 
it will be determined as a Maj7.
Though, in case a the intervals also match a Maj9: [0, 4, 7, 11, 14], 
both the Maj7 and the Maj9 will be displayed.
Futhermore (sigh), Since the Maj7 chord does not contain interval 4, 
it will get (no3) added to it's name/chord symbol -> Maj7(no3).
Then, if chords have accumulated similar qualitites, such as 'Min' and 'Min7', 
the 'Min' will then be removed from the chord quality, as it is implicitly a part of
a Min7 chord.
Then (kill me) Let's say we found the following chord qualities: '(add11)', '6', 'sus2'.
Put together with the root note, that will be C(add11)6sus2. Since this is the incorrect
order of chord qualities, and the correct chord symbol be C6sus2(add11), 
the chord qualities need to be sorted. Once chord qualities are sorted, 
the resulting chord is then displayed to the user.


- Inversions

- Context

- Intervals (not sure to include)

- Possible chords (No need to keep if i sometimes need to display more than one chord 
  in the chord section anyways?)

  -

Tests MIGHT be written.

- - - Scales section

*/

function ChordScaleIdentifier() {
  const [activeSettings, setActiveSettings] = useState(["chord"]);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);

  let selectedNotes = getSelectedNotes(allNotes);
  let chords = getChords(selectedNotes); // should provide more than one in case there are several chords it could be.
  // use testing to ensure accuracy
  console.log("chords:");
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
              <>
                {chords.map((chord, index) => {
                  return (
                    <ChordDetails key={chord.symbol + index} chord={chord} />
                  );
                })}
              </>
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
