import PropTypes from "prop-types";

import "./Toolbar.scss";

import Button from "../Button/Button";
import FretCountSlider from "../fretCountSlider/fretCountSlider";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentViewSection1 } from "../../Features/UI/UISlice";

function Toolbar() {
  const dispatch = useDispatch();
  const currentViewSection1 = useSelector(
    (store) => store.ui.currentViewSection1
  );
  const key = useSelector((store) => store.musicTheory.key);
  const tonalityType = useSelector((store) => store.musicTheory.tonalityType);

  function handleChangeView(view) {
    if (currentViewSection1 === view) {
      dispatch(setCurrentViewSection1("fretboard"));
    } else {
      dispatch(setCurrentViewSection1(view));
    }
  }

  function handleClearNotes() {}

  return (
    <div id="toolbar">
      <div>
        <h4>Key</h4>
        <Button
          className={`${currentViewSection1 === "keyChange" ? "active" : ""}`}
          onClick={() => handleChangeView("keyChange")}
        >
          {key.note + key.accidental} {tonalityType}
        </Button>
      </div>

      <div>
        <h4>Instrument</h4>
        <Button
          className={`${
            currentViewSection1 === "fretboardSettings" ? "active" : ""
          }`}
          onClick={() => handleChangeView("instrumentSettings")}
        >
          Settings
        </Button>
      </div>

      <div>
        <h4>Notes</h4>
        <Button className="notes-clear" onClick={handleClearNotes}>
          Clear
        </Button>
      </div>

      <FretCountSlider />
    </div>
  );
}

Toolbar.propTypes = {
  activeView: PropTypes.string,
  setActiveView: PropTypes.func,
};

export default Toolbar;
