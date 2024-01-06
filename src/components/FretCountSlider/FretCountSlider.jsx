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
    console.log("slider.current.value: " + slider.current.value);
    dispatch(setPreferredFretCount(parseInt(slider.current.value)));
  }

  useEffect(() => {
    console.log("fretCount: " + fretCount);
    console.log("fretCap: " + fretCap);
  }, [fretCount, fretCap]);

  return (
    <div id="fretCount-slider">
      <h4>Frets: {fretCount == 0 ? "None" : fretCount}</h4>
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
