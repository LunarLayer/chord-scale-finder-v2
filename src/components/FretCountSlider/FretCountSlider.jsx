import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentViewDisplay1 } from "../../Features/UI/UISlice";

function FretCountSlider() {
  const slider = React.createRef();
  const dispatch = useDispatch();
  const fretCount = useSelector((store) => store.fretboard.fretCount);
  const fretCap = useSelector((store) => store.fretboard.fretCap);

  function handleSliderChanged() {
    // dispatch(setPreferredFretCount(parseInt(slider.current.value)));
    dispatch(setCurrentViewDisplay1("fretboard"));
  }

  return (
    <div id="fretCount-slider">
      <h4>
        Frets: {fretCount == 0 ? "None" : fretCount - 1} ({fretCap - 1})
      </h4>
      <input
        ref={slider}
        type="range"
        value={fretCount}
        min="0"
        max={fretCap}
        onChange={handleSliderChanged}
      />
    </div>
  );
}

export default FretCountSlider;

FretCountSlider.propTypes = {
  activeView: PropTypes.string,
  setActiveView: PropTypes.func,
};
