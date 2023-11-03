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
import Fretboard from "../components/Fretboard/Fretboard";
import Piano from "../components/Piano/Piano";
import ChordAndScaleIdentifier from "../components/ChordAndScaleIdentifier/ChordAndScaleIdentifier";
import ChordProgressionBuilder from "../components/ChordProgressionBuilder/ChordProgressionBuilder";
import { loginUser } from "../Features/User/UserSlice";
import { useState } from "react";
import FretboardQuickSettings from "../components/QuickSettings/Instrument/FretboardQuickMenu";
import PianoQuickSettings from "../components/QuickSettings/Instrument/PianoQuickMenu";
import { Key, Note } from "tonal";
import NewKeyChange from "../components/KeyChange/KeyChange";

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

  let note = Note.get("Cb2");
  console.log(note);

  useEffect(() => {
    if (loginSuccess) {
      let user = {};
      dispatch(loginUser(user));
    } else {
      dispatch(
        loginUser({
          username: "Guest",
          settings: {
            uiTheme: "default",
            key: Key.majorKey("C"),
            instrument: {
              type: "guitar",
              soundFile: "jazzBass.mp3",
              style: "default",
              theme: "default",
              coloredNotes: false,
              tuning: [
                Note.get("G2"),
                Note.get("D2"),
                Note.get("A1"),
                Note.get("E1"),
              ],
            },
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
    if (view === "fretboard") return <Fretboard />;
    if (view === "piano") return <Piano />;
    if (view === "instrumentSettings") return <InstrumentSettings />;
    if (view === "keyChange") return <NewKeyChange />;
  }
  function Section2({ view }) {
    if (view === "ChordAndScaleIdentifier") return <ChordAndScaleIdentifier />;
    if (view === "ChordProgressionBuilder") return <ChordProgressionBuilder />;
  }

  if (fretboardIsReady) {
    return (
      <div className="appLayout">
        <Navbar />
        <Toolbar />
        {currentViewSection1 === "fretboard" ? (
          <FretboardQuickSettings />
        ) : currentViewSection1 === "piano" ? (
          <PianoQuickSettings />
        ) : null}
        {/* <Section1 view="keyChange" /> */}
        <Section1 view={currentViewSection1} />
        {/* <AudioQuickSettings />
        <TheoryQuickSettings /> */}
        <Section2 view={currentViewSection2} />
        <p>markNotes</p>
        <p>All: Select all notes that have the same letter</p>
        <p>Identical: Select the note with the octave</p>
        <p>
          Single: Select the note with the octave, add a selectedOnStringsArr to
          it
        </p>
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
