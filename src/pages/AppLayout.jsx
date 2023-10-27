import PropTypes from "prop-types";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setWindowWidth } from "../Features/UI/UISlice";

import debounce from "lodash/debounce";
import { getWindowWidth } from "../Helpers/WindowHelper";

import "./AppLayout.scss";

import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Navbar";
import Toolbar from "../components/Toolbar/Toolbar";
import InstrumentSettings from "../components/InstrumentSettings/InstrumentSettings";
import KeyChange from "../components/KeyChange/KeyChange";
import DefaultFretboard from "../components/FretboardVariants/Default/Fretboard";
import MinimalFretboard from "../components/FretboardVariants/Minimal/Fretboard";
import Piano from "../components/Piano/Piano";
import ChordAndScaleIdentifier from "../components/ChordAndScaleIdentifier/ChordAndScaleIdentifier";
import ChordProgressionBuilder from "../components/ChordProgressionBuilder/ChordProgressionBuilder";
import { loginUser } from "../Features/User/UserSlice";
import { soundEngine } from "../Helpers/SoundEngine";
import { useState } from "react";
import FretboardQuickSettings from "../components/QuickSettings/Instrument/FretboardQuickMenu";
import PianoQuickSettings from "../components/QuickSettings/Instrument/PianoQuickMenu";

function AppLayout() {
  const dispatch = useDispatch();
  const [soundIsReady, setSoundIsReady] = useState(false);
  const currentViewSection1 = useSelector(
    (store) => store.ui.currentViewSection1
  );
  const currentViewSection2 = useSelector(
    (store) => store.ui.currentViewSection2
  );
  const fretboardIsReady = useSelector(
    (store) => store.fretboard.fretboardIsReady
  );
  const fretboardVariant = useSelector(
    (store) => store.fretboard.fretboardVariant
  );
  const loginSuccess = useSelector((store) => store.user.loginSuccess);

  useEffect(() => {
    const checkSoundIsReady = setInterval(() => {
      if (soundEngine.state() === "loaded") {
        setSoundIsReady(true);
        clearInterval(checkSoundIsReady);
      }
    }, 10);
    return () => {
      clearInterval(checkSoundIsReady);
    };
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      let user = {};
      dispatch(loginUser(user));
    } else {
      dispatch(
        loginUser({
          username: "Guest",
          settings: {
            key: { note: "C", accidental: "" },
            tonality: "major",
            accidental: "#",
            instrument: "fretboard",
            instrumentSound: "jazzbass",
            instrumentVariant: "default",
            instrumentTheme: "black",
            coloredNotes: false,
            tuning: [
              { note: "G", octave: 2, hasAccidental: false },
              { note: "D", octave: 2, hasAccidental: false },
              { note: "A", octave: 1, hasAccidental: false },
              { note: "E", octave: 1, hasAccidental: false },
            ],
            markNotes: "Single",
            labelNotes: "Note",
            fretPosition: "All",
            highlightedNotes: "None",
            quickMenus: {
              instrument: { showing: true, activeTab: "markNotes" },
              soundPlayer: { showing: true, activeTab: "markNotes" },
            },
          },
        })
      );
    }
  }, [dispatch, loginSuccess]);

  useEffect(() => {
    function handleResize() {
      dispatch(setWindowWidth(getWindowWidth()));
    }
    window.addEventListener("resize", debounce(handleResize, 20));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 20));
    };
  }, [dispatch]);

  function Section1({ view }) {
    if (view === "fretboard" && fretboardVariant === "default")
      return <DefaultFretboard />;
    if (view === "fretboard" && fretboardVariant === "minimal")
      return <MinimalFretboard />;
    if (view === "piano") return <Piano />;
    if (view === "instrumentSettings") return <InstrumentSettings />;
    if (view === "keyChange") return <KeyChange />;
  }
  function Section2({ view }) {
    if (view === "ChordAndScaleIdentifier") return <ChordAndScaleIdentifier />;
    if (view === "ChordProgressionBuilder") return <ChordProgressionBuilder />;
  }

  if (fretboardIsReady && soundIsReady) {
    return (
      <div className="appLayout">
        <Navbar />
        <Toolbar />
        {currentViewSection1 === "fretboard" ? (
          <FretboardQuickSettings />
        ) : currentViewSection1 === "piano" ? (
          <PianoQuickSettings />
        ) : null}
        <Section1 view={currentViewSection1} />
        {/* <AudioQuickSettings />
        <TheoryQuickSettings /> */}
        <Section2 view={currentViewSection2} />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default AppLayout;

AppLayout.propTypes = {
  view: PropTypes.string,
};
