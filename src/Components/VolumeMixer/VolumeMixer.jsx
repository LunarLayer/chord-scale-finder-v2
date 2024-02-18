import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { soundEngine } from "../../Helpers/SoundEngine";
import { Howler } from "howler";

import "./VolumeMixer.scss";

import {
  SpeakerLow,
  SpeakerMedium,
  SpeakerFull,
  SpeakerMuted,
  SpeakerWarning,
} from "../../../public/svgs/SvgIcons";
import Spinner from "../Loader/Spinner";

function VolumeMixer() {
  const slider = useRef(null);
  const [soundIsLoading, setSoundIsLoading] = useState(true);
  const [speakerIcon, setSpeakerIcon] = useState(SpeakerWarning);
  const [expanded, setExpanded] = useState(false);
  const [volumeSliderTimeout, setVolumeSliderTimeout] = useState(null);
  const [volume, setVolume] = useState(8);
  const soundFile = useSelector((store) => store.user.soundFile);

  useEffect(() => {
    const checkSoundIsReady = setInterval(() => {
      if (soundEngine.state() === "loaded") {
        setSoundIsLoading(false);
        clearInterval(checkSoundIsReady);
        setSpeakerIcon(SpeakerMedium);
      }
    }, 50);
    return () => {
      clearInterval(checkSoundIsReady);
    };
  }, [soundFile]);

  // Close the volumeMixer when clicking outside it
  useEffect(() => {
    function handleClickOutsideVolumeSlider(e) {
      if (!e.target.closest("#VolumeMixer")) {
        setExpanded(false);
      }
    }

    document.addEventListener("click", handleClickOutsideVolumeSlider);
    return () => {
      document.removeEventListener("click", handleClickOutsideVolumeSlider);
    };
  }, []);

  function handleToggleVolumeSlider() {
    if (!soundIsLoading) {
      if (volumeSliderTimeout) clearTimeout(volumeSliderTimeout);

      const autoCloseVolumeControl = setTimeout(() => {
        setExpanded(false);
      }, 3000);
      setVolumeSliderTimeout(autoCloseVolumeControl);
      setExpanded(!expanded);
    }
  }

  function handleVolumeChanged() {
    if (!soundIsLoading) {
      if (volumeSliderTimeout) clearTimeout(volumeSliderTimeout);

      let newVolume = parseInt(slider.current.value);
      setVolume(newVolume);
      if (newVolume === 0) setSpeakerIcon(SpeakerMuted);
      if (newVolume > 0 && newVolume <= 3) setSpeakerIcon(SpeakerLow);
      if (newVolume > 3 && newVolume <= 7) setSpeakerIcon(SpeakerMedium);
      if (newVolume > 7 && newVolume <= 10) setSpeakerIcon(SpeakerFull);
      let decimalVolume = newVolume / 10;
      Howler.volume(decimalVolume);

      const autoCloseVolumeControl = setTimeout(() => {
        setExpanded(false);
      }, 3000);
      setVolumeSliderTimeout(autoCloseVolumeControl);
    }
  }

  return (
    <div
      id="VolumeMixer"
      className={`${expanded ? "expanded" : ""} ${
        soundIsLoading ? "loadingSound" : ""
      }`}
    >
      <button
        className="volumeButton"
        onClick={() => handleToggleVolumeSlider()}
      >
        {soundIsLoading ? <Spinner /> : null}
        {speakerIcon}
      </button>
      <div className="volumeSlider">
        <input
          className="slider"
          ref={slider}
          type="range"
          orient="vertical"
          value={volume}
          min="0"
          max="10"
          onChange={handleVolumeChanged}
        />
      </div>
    </div>
  );
}

export default VolumeMixer;
