import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { soundEngine } from "../../Helpers/SoundEngine";
import { Howler } from "howler";

import "./SoundController.scss";

import {
  SpeakerLow,
  SpeakerMedium,
  SpeakerFull,
  SpeakerMuted,
  SpeakerWarning,
} from "../../../public/icons/SpeakerIcons";

import Spinner from "../Loader/Spinner";

function SoundController({ loadingSoundProgress }) {
  const volumeSlider = useRef(null);
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

  function handleToggleVolumeSlider() {
    if (!soundIsLoading) {
      if (volumeSliderTimeout) clearTimeout(volumeSliderTimeout);

      setExpanded(!expanded);

      const autoCloseVolumeControl = setTimeout(() => {
        setExpanded(false);
      }, 2000);
      setVolumeSliderTimeout(autoCloseVolumeControl);
    }
  }

  function handleVolumeChanged() {
    if (!soundIsLoading) {
      if (volumeSliderTimeout) clearTimeout(volumeSliderTimeout);

      let newVolume = parseInt(volumeSlider.current.value);
      setVolume(newVolume);
      if (newVolume === 0) setSpeakerIcon(SpeakerMuted);
      if (newVolume > 0 && newVolume <= 3) setSpeakerIcon(SpeakerLow);
      if (newVolume > 3 && newVolume <= 7) setSpeakerIcon(SpeakerMedium);
      if (newVolume > 7 && newVolume <= 10) setSpeakerIcon(SpeakerFull);
      let newVolumeAsDecimal = newVolume / 10;
      Howler.volume(newVolumeAsDecimal);

      const autoCloseVolumeControl = setTimeout(() => {
        setExpanded(false);
      }, 2000);
      setVolumeSliderTimeout(autoCloseVolumeControl);
    }
  }

  return (
    <div
      id="SoundController"
      className={`${expanded ? "expanded" : ""} ${
        soundIsLoading ? "loadingSound" : ""
      }`}
    >
      <button onClick={() => handleToggleVolumeSlider()}>
        {soundIsLoading ? <Spinner /> : null}
        {speakerIcon}
      </button>
      <input
        className="volumeSlider"
        ref={volumeSlider}
        type="range"
        orient="vertical"
        value={volume}
        min="0"
        max="10"
        onChange={handleVolumeChanged}
      />
    </div>
  );
}

export default SoundController;
