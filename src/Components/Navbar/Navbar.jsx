import "./Navbar.scss";

import VolumeMixer from "../VolumeMixer/VolumeMixer";

function Navbar() {
  return (
    <nav id="Navbar">
      <div className="flex-wrapper">
        <div className="userSettings">
          <button>Login</button>
          <button>Projects</button>
        </div>
        <VolumeMixer />
        <button>⚙️</button>
      </div>
    </nav>
  );
}

export default Navbar;
