import PropTypes from "prop-types";

import "./Toolbar.scss";

import Button from "../Button/Button";
import FretCountSlider from "../FretCountSlider/FretCountSlider";

function Toolbar({ activeView, setActiveView }) {
  function handleClick(clicked) {
    if (activeView === clicked) {
      setActiveView("fretboard");
    } else {
      setActiveView(clicked);
    }
  }

  function handleClearNotes() {}

  return (
    <div id="toolbar">
      <div>
        <h4>Key</h4>
        <Button
          className={`${activeView === "keyChange" ? "active" : ""}`}
          onClick={() => handleClick("keyChange")}
        >
          C Major
        </Button>
      </div>

      <div>
        <h4>Fretboard</h4>
        <Button
          className={`${activeView === "fretboardSettings" ? "active" : ""}`}
          onClick={() => handleClick("fretboardSettings")}
        >
          Settings
        </Button>
      </div>

      <div>
        <h4>Notes</h4>
        <Button className="notes-clear" onClick={handleClearNotes}>
          Clear
        </Button>
      </div>

      <FretCountSlider activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}

Toolbar.propTypes = {
  activeView: PropTypes.string,
  setActiveView: PropTypes.func,
};

export default Toolbar;
