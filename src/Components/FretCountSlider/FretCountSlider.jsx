import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// import { setCurrentViewSection1 } from "../../Features/UI/UISlice";
import { setPreferredFretCount } from "../../Features/Fretboard/FretboardSlice";
import { useEffect } from "react";

function FretCountSlider() {
  const slider = React.createRef();
  const dispatch = useDispatch();
  const fretCount = useSelector((store) => store.fretboard.fretCount);
  const fretCap = useSelector((store) => store.fretboard.fretCap);
  function handleSliderChanged() {
    dispatch(setPreferredFretCount(parseInt(slider.current.value)));
  }

  return (
    <input
      id="fretCount-slider"
      ref={slider}
      type="range"
      value={fretCount}
      min="0"
      max={fretCap}
      onChange={handleSliderChanged}
    />
  );
}

export default FretCountSlider;

FretCountSlider.propTypes = {
  activeView: PropTypes.string,
  setActiveView: PropTypes.func,
};
