import "./Navbar.scss";

import SoundController from "../SoundController/SoundController";
import { useDispatch, useSelector } from "react-redux";
import { setNutIsFixed } from "../../Features/Fretboard/FretboardSlice";

function Navbar() {
  return (
    <nav id="Navbar">
      <div className="flex-wrapper">
        <div className="userSettings">
          <button>Login</button>
          <button>Projects</button>
        </div>
        <SoundController />
      </div>
    </nav>
  );
}

export default Navbar;
