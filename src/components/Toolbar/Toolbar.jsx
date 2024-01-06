import PropTypes from "prop-types";

import "./Toolbar.scss";

import Button from "../Button/Button";
import FretCountSlider from "../fretCountSlider/fretCountSlider";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentViewSection1 } from "../../Features/UI/UISlice";
import { useState } from "react";
import { toggleMenuShowing } from "../../Helpers/AnimationHelper";

function Toolbar() {
  const dispatch = useDispatch();
  const currentViewSection1 = useSelector(
    (store) => store.ui.currentViewSection1
  );
  const key = useSelector((store) => store.musicTheory.key);

  function handleChangeView(view) {
    if (currentViewSection1 === view) {
      dispatch(setCurrentViewSection1("fretboard"));
    } else {
      dispatch(setCurrentViewSection1(view));
    }
  }

  function handleToggleMenu(menuId, buttonClassName) {
    let buttonElem = document.querySelector(buttonClassName);
    buttonElem.classList.toggle("active");

    let menuElem = document.getElementById(menuId);
    toggleMenuShowing(menuElem);
  }

  return (
    <div id="toolbar">
      <div className="Tonality wrapper">
        <h4>Key</h4>
        <div className="content">
          <Button
            className="keyChangeButton"
            onClick={() =>
              handleToggleMenu("KeyChangeMenu", ".keyChangeButton")
            }
          >
            {key.tonic} {key.type}
          </Button>
        </div>
      </div>

      <div className="instrument wrapper">
        <h4>Settings</h4>
        <div className="content">
          <Button
            className="settingsMenuButton"
            onClick={() =>
              handleToggleMenu("SettingsMenu", ".settingsMenuButton")
            }
          >
            🛠️
          </Button>
        </div>
      </div>

      <div className="menus wrapper">
        <h4>Quick menus</h4>
        <div className="content">
          <Button
            className="fretboardMenuButton"
            onClick={() =>
              handleToggleMenu("FretboardMenu", ".fretboardMenuButton")
            }
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
