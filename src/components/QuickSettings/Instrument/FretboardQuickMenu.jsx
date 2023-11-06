import { useDispatch, useSelector } from "react-redux";
import "./FretboardQuickMenu.scss";
import "../../KeyChangeOld/Keys.scss";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../Button/Button";
import {
  setMarkNotesSetting,
  setLabelNotesSetting,
  setFretPositionSetting,
  setHighlightNotesSetting,
} from "../../../Features/MusicTheory/MusicTheorySlice";
import {
  setActiveTabForQuickMenu,
  toggleQuickMenu,
} from "../../../Features/UI/UISlice";
import Keys from "../../KeyChangeOld/Keys";
import { note } from "tonal";
import {
  clearAllNotes,
  toggleHighlightNote,
  highlightAllNotes,
  removeHighlightAllNotes,
} from "../../../Features/Fretboard/FretboardSlice";

function FretboardQuickMenu() {
  const dispatch = useDispatch();
  const fretboardWidth = useSelector((store) => store.fretboard.fretboardWidth);
  const accidental = useSelector((store) => store.user.settings.accidental);
  const markNotesSetting = useSelector(
    (store) => store.musicTheory.markNotesSetting
  );
  const labelNotesSetting = useSelector(
    (store) => store.musicTheory.labelNotesSetting
  );
  const fretPositionSetting = useSelector(
    (store) => store.musicTheory.fretPositionSetting
  );
  const highlightNotesSetting = useSelector(
    (store) => store.musicTheory.highlightNotesSetting
  );
  const instrumentQuickMenu = useSelector(
    (store) => store.ui.quickMenus.instrumentQuickMenu
  );

  useEffect(() => {
    // add the margin/padding as well to get the correct height
    let collapsible = document.getElementById("FretboardQuickMenu");
    if (collapsible.style.maxHeight) {
      collapsible.style.maxHeight = null;
    } else {
      collapsible.style.maxHeight = collapsible.scrollHeight + "px";
    }
  }, [instrumentQuickMenu]);

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

  function handleHighlightNoteClicked(note, accidental) {
    console.log("handleHighlightNoteClicked");

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
          <button>{markNotesSetting}</button>
          <div className="dropdown-content">
            <button onClick={() => dispatch(setMarkNotesSetting("Single"))}>
              Single
            </button>
            <button onClick={() => dispatch(setMarkNotesSetting("None"))}>
              None
            </button>
            <button onClick={() => dispatch(setMarkNotesSetting("All"))}>
              All
            </button>
            <button onClick={() => dispatch(setMarkNotesSetting("Identical"))}>
              Identical
            </button>
          </div>
        </div>
        <div className="setting dropdown labelNotes">
          <p>Label notes</p>
          <button>{labelNotesSetting}</button>
          <div className="dropdown-content">
            <button>Note</button>
            <button onClick={() => dispatch(setLabelNotesSetting("Interval"))}>
              Interval
            </button>
            <button onClick={() => dispatch(setLabelNotesSetting("Degree"))}>
              Degree
            </button>
            <button onClick={() => dispatch(setLabelNotesSetting("DoReMi"))}>
              DoReMi
            </button>
          </div>
        </div>
        <div className="setting dropdown fretPositions">
          <p>Position</p>
          <button>{fretPositionSetting}</button>
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
          <button>{highlightNotesSetting}</button>
          <div className="dropdown-content highlight">
            <Keys
              noteSize={25}
              handleNoteClicked={handleHighlightNoteClicked}
              accidental={accidental}
            />
          </div>
        </div>
        <div className="setting dropdown clear">
          <p>Clear</p>
          <button>All</button>
          <div className="dropdown-content clear">
            <button onClick={() => dispatch(clearAllNotes())}>All</button>
            <button onClick={() => dispatch(clearAllNotes())}>Marked</button>
            <button onClick={() => dispatch(clearAllNotes())}>
              Highlighted
            </button>
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
