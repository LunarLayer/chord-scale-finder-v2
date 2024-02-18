import "./Navbar.scss";

import VolumeMixer from "../VolumeMixer/VolumeMixer";

function Navbar() {
  return (
    <nav id="Navbar">
      <div className="flex-wrapper">
        <div className="userSettings">
          <button className="loginBtn">Login</button>
          <button className="projectsBtn">Projects</button>
        </div>
        <div className="wrapper">
          <VolumeMixer />
          {/* <button>⚙️</button> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
