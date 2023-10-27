// import { NavLink } from "react-router-dom";

import "./Navbar.scss";

function Navbar() {
  return (
    <nav id="navbar">
      <div className="flex-wrapper">
        <button>Projects</button>
        {/* <div className="quickSettings">
           <button>🛠️</button>
          <button>🎹</button>
          <button>🎵</button>
          <button>🔊</button> 
        </div>*/}
        <button>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;

// <ul>
//   <li>

//   </li>
//   <li>
//     <NavLink to="login">Login</NavLink>
//   </li>
//   <li>
//     <NavLink to="countries">Countries</NavLink>
//   </li>
// </ul>
