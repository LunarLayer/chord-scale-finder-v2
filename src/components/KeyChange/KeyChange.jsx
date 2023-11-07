import { useDispatch, useSelector } from "react-redux";
import "./KeyChange.scss";
import { Key, Note } from "tonal";
import { useState } from "react";
import { setKey } from "../../Features/MusicTheory/MusicTheorySlice";

function KeyChange() {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.musicTheory.key);
  const [scalesModalShowing, setScalesModalShowing] = useState(false);
  let keyNote = Note.get(key.tonic).letter;

  function handleSetKey(note, accidental) {
    if (key.type === "major") {
      dispatch(setKey(Key.majorKey(note + accidental)));
    } else {
      dispatch(setKey(Key.minorKey(note + accidental)));
    }
  }

  function handleSelectScale(scale) {
    if (scale === "major") {
      dispatch(setKey(Key.majorKey(key.tonic)));
    } else {
      dispatch(setKey(Key.minorKey(key.tonic)));
    }
  }

  function handleToggleDropdown(id) {
    let collapsible = document.getElementById(id);
    if (collapsible.style.maxHeight) {
      collapsible.style.maxHeight = null;
    } else {
      collapsible.style.maxHeight = collapsible.scrollHeight + "px";
    }
  }

  function handleToggleScalesModal() {
    console.log("handling");
    setScalesModalShowing(!scalesModalShowing);
  }

  return (
    <div id="KeyChange">
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
      </div>
      <div className="scaleSelection">
        <button onClick={() => handleSelectScale("major")}>Major</button>
        <button onClick={() => handleToggleScalesModal()}>Scales</button>
        <button onClick={() => handleSelectScale("minor")}>Minor</button>
        <div className={`scalesModal ${scalesModalShowing ? "showing" : ""}`}>
          <input
            className="dynamicSearch"
            type="text"
            placeholder="Search..."
          />
          <button
            className="closeModalButton"
            onClick={() => handleToggleScalesModal()}
          >
            X
          </button>
          <div className="scales">
            <div className="dropdown">
              <button onClick={() => handleToggleDropdown("majorMinorScales")}>
                Major / Minor scales
              </button>
              <div id="majorMinorScales" className="dropdown-content">
                <button>Ionian (Major)</button>
                <button>Dorian</button>
                <button>Phrygian</button>
                <button>Lydian</button>
                <button>Mixolydian</button>
                <button>Aeolian (Minor)</button>
                <button>Locrian</button>
              </div>
            </div>
            <div className="dropdown">
              <button
                onClick={() => handleToggleDropdown("harmonicMinorScales")}
              >
                Harmonic Minor scales
              </button>
              <div id="harmonicMinorScales" className="dropdown-content">
                <button>Harmonic minor</button>
                <button>Locrian #6</button>
                <button>Ionian #5</button>
                <button>Dorian #4</button>
                <button>Phrygian dominant scale</button>
                <button>Lydian #2</button>
                <button>Super Locrian bb7</button>
              </div>
            </div>
            <div className="dropdown">
              <button
                onClick={() => handleToggleDropdown("melodicMinorScales")}
              >
                Melodic Minor scales
              </button>
              <div id="melodicMinorScales" className="dropdown-content">
                <button>Melodic minor</button>
                <button>Dorian b2</button>
                <button>Lydian Aug</button>
                <button>Lydian Dom</button>
                <button>Aeolian Dom</button>
                <button>Half diminished</button>
                <button>Super Locrian</button>
              </div>
            </div>
            <div className="dropdown">
              <button
                onClick={() => handleToggleDropdown("hungarianMinorScales")}
              >
                Hungarian Minor scales
              </button>
              <div id="hungarianMinorScales" className="dropdown-content">
                <button>Hungarian minor</button>
                <button>Oriental Scale</button>
                <button>Ionian Augmented #2</button>
                <button>Locrian bb3 bb7</button>
                <button>Double Harmonic Scale</button>
                <button>Lydian #6 #2</button>
                <button>Altered Natural 5 bb7</button>
              </div>
            </div>
            <div className="dropdown">
              <button
                onClick={() => handleToggleDropdown("majorPentatonicScales")}
              >
                Major Pentatonic scales
              </button>
              <div id="majorPentatonicScales" className="dropdown-content">
                <button>Major Pentatonic</button>
                <button>Egyptian Suspended</button>
                <button>Man Gong(慢宮調)</button>
                <button>Ritsusen(律旋)</button>
                <button>Minor Pentatonic</button>
              </div>
            </div>
            <div className="dropdown">
              <button onClick={() => handleToggleDropdown("otherScales")}>
                Other scales
              </button>
              <div id="otherScales" className="dropdown-content">
                <button>Blues Scale</button>
                <button>Bebop Dominant Scale</button>
              </div>
            </div>
            <div className="dropdown">
              <button onClick={() => handleToggleDropdown("yourScales")}>
                Your scales
              </button>
              <div id="yourScales" className="dropdown-content">
                <button>+ Create your own scale</button>
              </div>
            </div>
            {/* <section>
           
            
     
            <section>
              <h4>Other Scales</h4>
              <button>Blues Scale</button>
              <button>Bebop Dominant Scale</button>
            </section> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyChange;
