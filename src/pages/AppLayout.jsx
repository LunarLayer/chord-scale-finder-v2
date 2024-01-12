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
// import InstrumentSettings from "../components/InstrumentSettings/InstrumentSettings";
import Fretboard from "../components/Fretboard/Fretboard";
// import Piano from "../components/Piano/Piano";
// import ChordAndScaleIdentifier from "../components/ChordAndScaleIdentifier/ChordAndScaleIdentifier";
// import ChordProgressionBuilder from "../components/ChordProgressionBuilder/ChordProgressionBuilder";
import { loginUser } from "../Features/User/UserSlice";
import { getGuestUser } from "../Helpers/LoginHelper";

import ChordScaleIdentifier from "../components/ChordScaleIdentifier/ChordScaleIdentifier";
import KeyChangeMenu from "../components/KeyChangeMenu/KeyChangeMenu";
import SettingsMenu from "../components/SettingsMenu/SettingsMenu";
import InstrumentMenu from "../components/InstrumentMenu/InstrumentMenu";

function AppLayout() {
  const dispatch = useDispatch();

  const currentViewSection1 = useSelector(
    (store) => store.ui.currentViewSection1
  );
  // const currentViewSection2 = useSelector(
  //   (store) => store.ui.currentViewSection2
  // );
  const fretboardIsReady = useSelector(
    (store) => store.fretboard.fretboardIsReady
  );

  const loginSuccess = useSelector((store) => store.user.loginSuccess);
  const menus = useSelector((store) => store.ui.menus);

  // Login
  useEffect(() => {
    if (loginSuccess) {
      let user = {};
      dispatch(loginUser(user));
    } else {
      let guest = getGuestUser();
      dispatch(loginUser(guest));
    }
  }, [dispatch, loginSuccess]);

  // Window resize
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
    if (view === "keyChange") return <KeyChange />;
  }
  function Section2({ view }) {
    if (view === "chordAndScaleIdentifier") return <ChordAndScaleIdentifier />;
    // if (view === "ChordProgressionBuilder") return <ChordProgressionBuilder />;
  }

  if (fretboardIsReady) {
    return (
      <div className="appLayout">
        <Navbar />
        <Toolbar />
        <KeyChangeMenu showing={menus.keyChange.showing} />
        <SettingsMenu showing={menus.settings.showing} />
        <InstrumentMenu showing={menus.instrument.showing} />
        <Section1 view={currentViewSection1} />
        {/* <Section2 view={currentViewSection2} />
         */}
        <ChordScaleIdentifier />
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
