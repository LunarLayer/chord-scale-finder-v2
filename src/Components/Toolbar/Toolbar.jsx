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

  function handleChangeView(view) {
    if (currentViewSection1 === view) {
      dispatch(setCurrentViewSection1("fretboard"));
    } else {
      dispatch(setCurrentViewSection1(view));
    }
  }

  return (
    <div id="toolbar">
      <div className="Tonality wrapper">
        <h4>Key</h4>
        <div className="content">
          <button
            className="keyChangeButton"
            onClick={() => dispatch(toggleMenu("keyChange"))}
          >
            {key.tonic} {key.type === "major" ? "Major" : "Minor"}
          </button>
        </div>
      </div>

      <div className="instrument wrapper">
        <h4>Instrument</h4>
        <div className="content">
          <button onClick={() => dispatch(toggleMenu("settings"))}>🛠️</button>
        </div>
      </div>

      <div className="menus wrapper">
        <h4>Menus</h4>
        <div className="content">
          <button onClick={() => dispatch(toggleMenu("instrument"))}>🎸</button>
        </div>
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
