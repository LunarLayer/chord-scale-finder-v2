import PropTypes from "prop-types";

import "./Toolbar.scss";

import Button from "../Button/Button";
import FretCountSlider from "../fretCountSlider/fretCountSlider";
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
          <Button
            className="keyChangeButton"
            active={menus.keyChange.showing}
            onClick={() => dispatch(toggleMenu("keyChange"))}
          >
            {key.tonic} {key.type === "major" ? "Major" : "Minor"}
          </Button>
        </div>
      </div>

      <div className="instrument wrapper">
        <h4>Settings</h4>
        <div className="content">
          <Button
            active={menus.settings.showing}
            onClick={() => dispatch(toggleMenu("settings"))}
          >
            🛠️
          </Button>
        </div>
      </div>

      <div className="menus wrapper">
        <h4>Quick menus</h4>
        <div className="content">
          <Button
            active={menus.instrument.showing}
            onClick={() => dispatch(toggleMenu("instrument"))}
          >
            🎵
          </Button>
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
