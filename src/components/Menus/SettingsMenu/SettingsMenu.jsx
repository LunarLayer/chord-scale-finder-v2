import { useEffect } from "react";
import { toggleMenuShowing } from "../../../Helpers/AnimationHelper";
import "./SettingsMenu.scss";
import { useSelector } from "react-redux";

function SettingsMenu() {
  const settingsMenu = useSelector((store) => store.ui.settingsMenu);

  // useEffect(() => {
  //   toggleMenuShowing(document.getElementById("SettingsMenu"));
  // }, [settingsMenu]);

  return (
    <div id="SettingsMenu">
      <div className="content">Settings Menu</div>
    </div>
  );
}

export default SettingsMenu;
