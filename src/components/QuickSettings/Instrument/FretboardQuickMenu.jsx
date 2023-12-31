import { useDispatch, useSelector } from "react-redux";
import "./FretboardQuickMenu.scss";
import "../../KeyChangeOld/Keys.scss";
import { useEffect } from "react";
import {
  setMarkNotes,
  setLabelNotes,
  deselectNotes,
} from "../../../Features/MusicTheory/MusicTheorySlice";
import { toggleMenu } from "../../../Features/UI/UISlice";
import Keys from "../../KeyChangeOld/Keys";
import {
  toggleHighlightNote,
  setNutIsFixed,
} from "../../../Features/Fretboard/FretboardSlice";

function FretboardQuickMenu() {
  const dispatch = useDispatch();
  const markNotes = useSelector((store) => store.musicTheory.markNotes);
  const labelNotes = useSelector((store) => store.musicTheory.labelNotes);
  const fretPosition = useSelector((store) => store.musicTheory.fretPosition);
  const highlightNotes = useSelector(
    (store) => store.musicTheory.highlightNotes
  );
  const instrumentQuickMenu = useSelector(
    (store) => store.ui.instrumentQuickMenu
  );
  const nutIsFixed = useSelector((store) => store.fretboard.nutIsFixed);

  useEffect(() => {
    // add the margin/padding as well to get the correct height
    let collapsible = document.getElementById("FretboardQuickMenu");
    if (collapsible.style.maxHeight) {
      collapsible.style.maxHeight = null;
    } else {
      collapsible.style.maxHeight = collapsible.scrollHeight + "px";
    }
  }, [instrumentQuickMenu]);

  function handleToggleNutIsFixed() {
    dispatch(setNutIsFixed(!nutIsFixed));
  }

  function handleToggleMenu(name) {
    dispatch(toggleMenu(name));
  }

  function handleHighlightNoteClicked(note, accidental) {
    dispatch(toggleHighlightNote(note + accidental));
  }

  return (
    <div
      id="FretboardQuickMenu"
      className={`${instrumentQuickMenu.showing ? "active" : ""}`}
    >
      <div className="settings">
        <div className="setting dropdown markNotes">
          <p>Mark notes</p>
          <button>{markNotes}</button>
          <div className="dropdown-content">
            <button onClick={() => dispatch(setMarkNotes("single"))}>
              Single
            </button>
            <button onClick={() => dispatch(setMarkNotes("none"))}>None</button>
            <button onClick={() => dispatch(setMarkNotes("all"))}>All</button>
            <button onClick={() => dispatch(setMarkNotes("identical"))}>
              Identical
            </button>
          </div>
        </div>
        <div className="setting dropdown labelNotes">
          <p>Label notes</p>
          <button>{labelNotes}</button>
          <div className="dropdown-content">
            <button onClick={() => dispatch(setLabelNotes("note"))}>
              Note
            </button>
            <button onClick={() => dispatch(setLabelNotes("interval"))}>
              Interval
            </button>
            <button onClick={() => dispatch(setLabelNotes("degree"))}>
              Degree
            </button>
            <button onClick={() => dispatch(setLabelNotes("doReMi"))}>
              DoReMi
            </button>
          </div>
        </div>
        <div className="setting dropdown fretPositions">
          <p>Position</p>
          <button>{fretPosition}</button>
          <div className="dropdown-content">
            <button>All</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
          </div>
        </div>
        <div className="setting dropdown highlight">
          <p>Highlight</p>
          {/* This button will be either None or All depending what was last used. */}
          <button>{highlightNotes}</button>
          <div className="dropdown-content highlight">
            <Keys
              noteSize={25}
              handleNoteClicked={handleHighlightNoteClicked}
            />
            <button>All</button>
            <button>None</button>
            <button onClick={() => dispatch}>Scale</button>
          </div>
        </div>
        <div className="setting dropdown clear">
          <p>Clear</p>
          <button>All</button>
          <div className="dropdown-content clear">
            <button onClick={() => dispatch(deselectNotes("all"))}>All</button>
            <button onClick={() => dispatch(deselectNotes("marked"))}>
              Marked
            </button>
            <button onClick={() => dispatch(deselectNotes("highlighted"))}>
              Highlighted
            </button>
          </div>
        </div>
        <div className="setting dropdown fixNut">
          <p>Fixed nut</p>
          <button
            className={nutIsFixed ? "nutFixedButton active" : "nutFixedButton"}
            onClick={() => handleToggleNutIsFixed()}
          >
            {nutIsFixed ? "Fixed" : "Normal"}
          </button>
        </div>
        {/* <div className="setting labelNotes">

          <p>Label notes</p>
          <select>
            <option>Note</option>
            <option>Interval</option>
            <option>Degree</option>
          </select>
        </div>
        <div className="setting fretPositions">
          <p>Position</p>
          <select>
            <option>All</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="setting highlight">
          <p>Highlight</p>
          <select className="dropdown">
            <option>All</option>
            <option>None</option>
            <option>None</option>
            <option>None</option>
          </select>
        </div> */}
      </div>

      <button
        className="toggleQuickMenuButton"
        onClick={() => handleToggleMenu("instrumentQuickMenu")}
      >
        🎹
      </button>
    </div>
  );
}

export default FretboardQuickMenu;

// <div className="tabNavigation">
//         <div className="tabs">
//           <button
//             className={`tab ${
//               instrumentQuickMenu.activeTab === "markNotes" ? "active" : ""
//             }`}
//             onClick={() => handleSetActiveTab("markNotes")}
//           >
//             Mark: {markNotes}
//           </button>
//           <button
//             className={`tab ${
//               instrumentQuickMenu.activeTab === "labelNotes" ? "active" : ""
//             }`}
//             onClick={() => handleSetActiveTab("labelNotes")}
//           >
//             Label: {labelNotes}
//           </button>
//           <button
//             className={`tab ${
//               instrumentQuickMenu.activeTab === "fretPosition" ? "active" : ""
//             }`}
//             onClick={() => handleSetActiveTab("fretPosition")}
//           >
//             Position: {fretPosition}
//           </button>
//           <button
//             className={`tab ${
//               instrumentQuickMenu.activeTab === "highlightedNotes"
//                 ? "active"
//                 : ""
//             }`}
//             onClick={() => handleSetActiveTab("highlightedNotes")}
//           >
//             Highlight: {highlightedNotes}
//           </button>
//         </div>
//         <div className="tabContent">
//           {activeTab === "markNotes" ? (
//             <>
//               <button
//                 className={`${markNotes === "single" ? "active" : ""}`}
//                 onClick={() => dispatch(setMarkNotes("Single"))}
//               >
//                 Single
//               </button>
//               <button
//                 className={`${markNotes === "identical" ? "active" : ""}`}
//                 onClick={() => dispatch(setMarkNotes("Identical"))}
//               >
//                 Identical
//               </button>
//               <button
//                 className={`${markNotes === "all" ? "active" : ""}`}
//                 onClick={() => dispatch(setMarkNotes("All"))}
//               >
//                 All
//               </button>
//               <button
//                 className={`${markNotes === "none" ? "active" : ""}`}
//                 onClick={() => dispatch(setMarkNotes("None"))}
//               >
//                 None
//               </button>
//             </>
//           ) : null}
//           {activeTab === "labelNotes" ? (
//             <>
//               <button
//                 className={`${labelNotes === "notes" ? "active" : ""}`}
//                 onClick={() => dispatch(setLabelNotes("Notes"))}
//               >
//                 Notes
//               </button>
//               <button
//                 className={`${labelNotes === "Degrees" ? "active" : ""}`}
//                 onClick={() => dispatch(setLabelNotes("Degrees"))}
//               >
//                 Degrees
//               </button>
//               <button
//                 className={`${labelNotes === "Intervals" ? "active" : ""}`}
//                 onClick={() => dispatch(setLabelNotes("Intervals"))}
//               >
//                 Intervals
//               </button>
//               <button
//                 className={`${labelNotes === "Octaves" ? "active" : ""}`}
//                 onClick={() => dispatch(setLabelNotes("Octaves"))}
//               >
//                 Octaves
//               </button>
//               <button
//                 className={`${labelNotes === "DoReMi" ? "active" : ""}`}
//                 onClick={() => dispatch(setLabelNotes("DoReMi"))}
//               >
//                 DoReMi
//               </button>
//             </>
//           ) : null}
//           {activeTab === "fretPosition" ? (
//             <>
//               <button
//                 className={`${fretPosition === "all" ? "active" : ""}`}
//                 onClick={() => dispatch(setFretPosition("All"))}
//               >
//                 All
//               </button>
//               <button
//                 className={`${fretPosition === "1" ? "active" : ""}`}
//                 onClick={() => dispatch(setFretPosition("1"))}
//               >
//                 1
//               </button>
//               <button
//                 className={`${fretPosition === "2" ? "active" : ""}`}
//                 onClick={() => dispatch(setFretPosition("2"))}
//               >
//                 2
//               </button>
//               <button
//                 className={`${fretPosition === "3" ? "active" : ""}`}
//                 onClick={() => dispatch(setFretPosition("3"))}
//               >
//                 3
//               </button>
//               <button
//                 className={`${fretPosition === "4" ? "active" : ""}`}
//                 onClick={() => dispatch(setFretPosition("4"))}
//               >
//                 4
//               </button>
//               <button
//                 className={`${fretPosition === "5" ? "active" : ""}`}
//                 onClick={() => dispatch(setFretPosition("5"))}
//               >
//                 5
//               </button>
//             </>
//           ) : null}
//           {activeTab === "highlightedNotes" ? (
//             <>
//               <button
//                 className={`${highlightedNotes === "all" ? "active" : ""}`}
//                 onClick={() => dispatch(setHighlightedNotes("All"))}
//               >
//                 All
//               </button>
//               <button
//                 className={`${highlightedNotes === "chord" ? "active" : ""}`}
//                 onClick={() => dispatch(setHighlightedNotes("Chord"))}
//               >
//                 Chord
//               </button>
//               <button
//                 className={`${highlightedNotes === "root" ? "active" : ""}`}
//                 onClick={() => dispatch(setHighlightedNotes("Root"))}
//               >
//                 Root
//               </button>
//               <button
//                 className={`${highlightedNotes === "triad" ? "active" : ""}`}
//                 onClick={() => dispatch(setHighlightedNotes("Triad"))}
//               >
//                 Triad
//               </button>
//               <button
//                 className={`${highlightedNotes === "arpeggio" ? "active" : ""}`}
//                 onClick={() => dispatch(setHighlightedNotes("Arpeggio"))}
//               >
//                 Arpeggio
//               </button>
//             </>
//           ) : null}
//         </div>
//       </div>
