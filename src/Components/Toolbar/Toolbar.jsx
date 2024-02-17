import PropTypes from "prop-types";

import "./Toolbar.scss";

import FretCountSlider from "../FretCountSlider/FretCountSlider";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentViewSection1, toggleMenu } from "../../Features/UI/UISlice";

function Toolbar() {
  const dispatch = useDispatch();
  const currentViewSection1 = useSelector(
    (store) => store.ui.currentViewSection1
  );
  const key = useSelector((store) => store.musicTheory.key);
  const menus = useSelector((store) => store.ui.menus);
  const fretCount = useSelector((store) => store.fretboard.fretCount);

  function handleChangeView(view) {
    if (currentViewSection1 === view) {
      dispatch(setCurrentViewSection1("fretboard"));
    } else {
      dispatch(setCurrentViewSection1(view));
    }
  }

  return (
    <div id="toolbar">
      <div className="toolbar-item">
        <h4>Key</h4>
        <button
          className="keyChangeButton"
          onClick={() => dispatch(toggleMenu("keyChange"))}
        >
          {key.tonic} {key.type === "major" ? "Major" : "Minor"}
        </button>
      </div>

      <div className="toolbar-item">
        <h4>Instrument</h4>
        <button onClick={() => dispatch(toggleMenu("settings"))}>🛠️</button>
      </div>

      <div className="toolbar-item">
        <h4>Menus</h4>
        <button onClick={() => dispatch(toggleMenu("instrument"))}>🎸</button>
      </div>

      <div className="toolbar-item">
        <h4>Frets: {fretCount == 0 ? "None" : fretCount}</h4>
        <FretCountSlider />
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  activeView: PropTypes.string,
  setActiveView: PropTypes.func,
};

export default Toolbar;
