import { useDispatch, useSelector } from "react-redux";
import "./FretboardMenu.scss";
import { useEffect } from "react";
import {
  setMarkNotes,
  setLabelNotes,
} from "../../../Features/MusicTheory/MusicTheorySlice";
import { toggleMenu } from "../../../Features/UI/UISlice";
import { setNutIsFixed } from "../../../Features/Fretboard/FretboardSlice";

function FretboardMenu(showing) {
  const dispatch = useDispatch();
  const markNotes = useSelector((store) => store.musicTheory.markNotes);
  const labelNotes = useSelector((store) => store.musicTheory.labelNotes);
  const fretPosition = useSelector((store) => store.musicTheory.fretPosition);
  const highlightNotes = useSelector(
    (store) => store.musicTheory.highlightNotes
  );
  const nutIsFixed = useSelector((store) => store.fretboard.nutIsFixed);

  function handleToggleNutIsFixed() {
    dispatch(setNutIsFixed(!nutIsFixed));
  }

  function handleHighlightNoteClicked(note, accidental) {
    dispatch(toggleHighlightNote(note + accidental));
  }

  return (
    <div id="FretboardMenu">
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
            {/* <Keys
              noteSize={25}
              handleNoteClicked={handleHighlightNoteClicked}
            /> */}
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
        {/* <div className="setting dropdown fixNut">
          <p>Fixed nut</p>
          <button
            className={nutIsFixed ? "nutFixedButton active" : "nutFixedButton"}
            onClick={() => handleToggleNutIsFixed()}
          >
            {nutIsFixed ? "Fixed" : "Normal"}
          </button>
        </div> */}
      </div>

      <button
        className="closeButton"
        onClick={() => handleToggleMenu("fretboardMenu")}
      >
        🎹
      </button>
    </div>
  );
}

export default FretboardMenu;
