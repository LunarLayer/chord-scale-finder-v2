import "./ChordIdentifier.scss";

import Collapsible from "./Collapsible";
import Chord from "../Chord/Chord";
import { getChords } from "../../Helpers/Chords/ChordFunctions";
import {
  PreviousArrow,
  Locked,
  Unlocked,
  NextArrow,
} from "../../../public/svgs/SvgIcons";
import { useState } from "react";

function ChordIdentifier({ selectedNotes, context }) {
  let chords = getChords(selectedNotes, context);
  const [chordLocked, setChordLocked] = useState(false);
  const [lockIcon, setLockIcon] = useState(Unlocked);

  return (
    <div id="ChordIdentifier">
      <Collapsible
        identifier="chord"
        title="Chord"
        settingsModal="identifyChordFilters"
      >
        <div className="filters">Filters</div>
        <div className="chordMatch">
          <div className="chordMatchMenu">
            <div className="previousChord">
              Cm6
              <PreviousArrow />
            </div>
            <div className="lockIcon">{lockIcon}</div>
          </div>
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
    </div>
  );
}

export default ChordIdentifier;
