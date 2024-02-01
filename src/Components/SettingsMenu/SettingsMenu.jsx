import { useEffect } from "react";
import "./SettingsMenu.scss";
import { useSelector } from "react-redux";
import {
  animateCollapseMenu,
  animateExpandMenu,
} from "../../Helpers/AnimationHelper";

function SettingsMenu({ showing }) {
  const menus = useSelector((store) => store.ui.menus);

  useEffect(() => {
    let settingsMenu = document.getElementById("SettingsMenu");
    if (showing) {
      animateExpandMenu(settingsMenu);
    } else {
      animateCollapseMenu(settingsMenu);
    }
  }, [showing]);

  return (
    <div id="SettingsMenu">
      <div className="content">Settings Menu</div>
    </div>
  );
}

export default SettingsMenu;
