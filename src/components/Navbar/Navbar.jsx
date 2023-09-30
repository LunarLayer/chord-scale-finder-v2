// import { NavLink } from "react-router-dom";

import "./Navbar.scss";

function Navbar({ children }) {
  return (
    <nav id="navbar">
      <div id="domain-links">
        <a href="https://lunarlayer.com/" target="_blank" rel="noreferrer">
          lunarlayer.com
        </a>
        /
        <a href="https://chord-scale-finder.lunarlayer.com/">
          Chord-scale-finder
        </a>
      </div>
      {children}
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
