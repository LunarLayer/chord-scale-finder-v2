import "./Navbar.scss";

import SoundController from "../SoundController/SoundController";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshFretboard,
  setNutIsFixed,
} from "../../Features/Fretboard/FretboardSlice";

function Navbar() {
  const dispatch = useDispatch();
  const nutIsFixed = useSelector((store) => store.fretboard.nutIsFixed);

  function handleToggleNutIsFixed() {
    dispatch(setNutIsFixed(!nutIsFixed));
    dispatch(refreshFretboard());
  }

  return (
    <nav id="Navbar">
      <div className="flex-wrapper">
        <div className="userSettings">
          <button>Login</button>
          <button>Projects</button>
        </div>
        <button
          className={nutIsFixed ? "nutFixedButton active" : "nutFixedButton"}
          onClick={() => handleToggleNutIsFixed()}
        >
          {nutIsFixed ? "Fixed nut" : "No fixed nut"}
        </button>
        <SoundController />
      </div>
    </nav>
  );
}

export default Navbar;
