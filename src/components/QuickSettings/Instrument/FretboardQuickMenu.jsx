import { useDispatch, useSelector } from "react-redux";
import "./FretboardQuickMenu.scss";
import "../../KeyChange/Keys.scss";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../Button/Button";
import {
  setMarkNotes,
  setLabelNotes,
  setFretPosition,
  setHighlightedNotes,
} from "../../../Features/MusicTheory/MusicTheorySlice";
import {
  setActiveTabForQuickMenu,
  toggleQuickMenu,
} from "../../../Features/UI/UISlice";
import Keys from "../../KeyChange/Keys";

function FretboardQuickMenu() {
  const dispatch = useDispatch();
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const markNotes = useSelector((store) => store.musicTheory.markNotes);
  const labelNotes = useSelector((store) => store.musicTheory.labelNotes);
  const fretPosition = useSelector((store) => store.musicTheory.fretPosition);
  const highlightedNotes = useSelector(
    (store) => store.musicTheory.highlightedNotes
  );
  const instrumentQuickMenu = useSelector(
    (store) => store.ui.quickMenus.instrumentQuickMenu
  );
  const activeTab = useSelector(
    (store) => store.ui.quickMenus.instrumentQuickMenu.activeTab
  );
  const [selectedSetting, setSelectedSetting] = useState("none");

  function handleSetActiveTab(tabName) {
    dispatch(
      setActiveTabForQuickMenu({
        quickMenu: "instrumentQuickMenu",
        tab: tabName,
      })
    );
  }

  function handleToggleQuickMenu(name) {
    dispatch(toggleQuickMenu(name));
  }

  function handleNoteClicked(note, accidental) {
    console.log("noteClicked");
  }

  return (
    <div
      id="FretboardQuickMenu"
      className={`${instrumentQuickMenu.showing ? "active" : ""}`}
    >
      <div className="settings">
        <div className="setting dropdown markNotes">
          <p>Mark notes</p>
          <button>Single</button>
          <div className="dropdown-content">
            <button>Single</button>
            <button>IdenticalIdentical</button>
            <button>All</button>
          </div>
        </div>
        <div className="setting dropdown labelNotes">
          <p>Label notes</p>
          <button>Note</button>
          <div className="dropdown-content">
            <button>Note</button>
            <button>Interval</button>
            <button>Degree</button>
            <button>DoReMi</button>
          </div>
        </div>
        <div className="setting dropdown fretPositions">
          <p>Position</p>
          <button>All</button>
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
          <button>None</button>
          <div className="dropdown-content highlight">
            <Keys noteSize={25} handleNoteClicked={handleNoteClicked} />
          </div>
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
        onClick={() => handleToggleQuickMenu("instrumentQuickMenu")}
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
