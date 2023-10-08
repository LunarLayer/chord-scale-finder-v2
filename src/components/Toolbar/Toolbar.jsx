import PropTypes from "prop-types";

import "./Toolbar.scss";

import Button from "../Button/Button";
import FretCountSlider from "../fretCountSlider/fretCountSlider";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentViewDisplay1 } from "../../Features/UI/UISlice";

function Toolbar() {
  const dispatch = useDispatch();
  const currentViewDisplay1 = useSelector(
    (store) => store.ui.currentViewDisplay1
  );
  function handleChangeView(view) {
    if (currentViewDisplay1 === view) {
      dispatch(setCurrentViewDisplay1("fretboard"));
    } else {
      dispatch(setCurrentViewDisplay1(view));
    }
  }

  function handleClearNotes() {}

  return (
    <div id="toolbar">
      <div>
        <h4>Key</h4>
        <Button
          className={`${currentViewDisplay1 === "keyChange" ? "active" : ""}`}
          onClick={() => handleChangeView("keyChange")}
        >
          C Major
        </Button>
      </div>

      <div>
        <h4>Fretboard</h4>
        <Button
          className={`${
            currentViewDisplay1 === "fretboardSettings" ? "active" : ""
          }`}
          onClick={() => handleChangeView("fretboardSettings")}
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
