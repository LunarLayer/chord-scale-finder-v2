import PropTypes from "prop-types";

import "./Toolbar.scss";

import Button from "../Button/Button";
import FretCountSlider from "../fretCountSlider/fretCountSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentViewSection1,
  toggleQuickMenu,
} from "../../Features/UI/UISlice";

function Toolbar() {
  const dispatch = useDispatch();
  const currentViewSection1 = useSelector(
    (store) => store.ui.currentViewSection1
  );
  const key = useSelector((store) => store.musicTheory.key);
  const tonality = useSelector((store) => store.musicTheory.tonality);
  const instrumentQuickMenu = useSelector(
    (store) => store.ui.quickMenus.instrumentQuickMenu
  );
  function handleChangeView(view) {
    if (currentViewSection1 === view) {
      dispatch(setCurrentViewSection1("fretboard"));
    } else {
      dispatch(setCurrentViewSection1(view));
    }
  }

  function handleToggleQuickMenu(name) {
    dispatch(toggleQuickMenu(name));
  }

  function handleClearNotes() {}

  return (
    <div id="toolbar">
      <div className="Tonality wrapper">
        <h4>Tonality</h4>
        <div className="content">
          <Button
            className={`${currentViewSection1 === "keyChange" ? "active" : ""}`}
            onClick={() => handleChangeView("keyChange")}
          >
            {key.note + key.accidental} {tonality}
          </Button>
        </div>
      </div>

      <div className="instrument wrapper">
        <h4>Instrument</h4>
        <div className="content">
          <Button
            className={`${
              currentViewSection1 === "instrumentSettings" ? "active" : ""
            }`}
            onClick={() => handleChangeView("instrumentSettings")}
          >
            🛠️
          </Button>
        </div>
      </div>

      <div className="menus wrapper">
        <h4>Quick menus</h4>
        <div className="content">
          <Button
            className={`${
              instrumentQuickMenu.showing === true ? "active" : ""
            }`}
            onClick={() => handleToggleQuickMenu("instrumentQuickMenu")}
          >
            🎹
          </Button>
          {/* <Button
            className={`${soundPlayerQuickSettings.showing ? "active" : ""}`}
            onClick={() => handleToggleQuickSetting("soundPlayerQuickSettings")}
          >
            🎵
          </Button>
          <Button
            className={`${theoryQuickSettings.showing ? "active" : ""}`}
            onClick={() => handleToggleQuickSetting("theoryQuickSettings")}
          >
            🔊
          </Button> */}
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
