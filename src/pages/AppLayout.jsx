import PropTypes from "prop-types";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setWindowWidth } from "../Features/UI/UISlice";

import debounce from "lodash/debounce";
import { getWindowWidth } from "../Helpers/WindowHelper";

import "./AppLayout.scss";

import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Navbar";
import ProjectSettings from "../components/ProjectSettings/ProjectSettings";
import Toolbar from "../components/Toolbar/Toolbar";
import InstrumentSettings from "../components/InstrumentSettings/InstrumentSettings";
import KeyChange from "../components/KeyChange/KeyChange";
import Fretboard from "../components/Fretboard/Fretboard";
import Piano from "../components/Piano/Piano";
import ChordAndScaleIdentifier from "../components/ChordAndScaleIdentifier/ChordAndScaleIdentifier";
import ChordProgressionBuilder from "../components/ChordProgressionBuilder/ChordProgressionBuilder";
import { userLoggedIn } from "../Features/User/UserSlice";
import { logNotes } from "../Features/Fretboard/FretboardSlice";

function AppLayout() {
  console.log("appLayout");
  const dispatch = useDispatch();
  const currentViewDisplay1 = useSelector(
    (store) => store.ui.currentViewDisplay1
  );
  const currentViewDisplay2 = useSelector(
    (store) => store.ui.currentViewDisplay2
  );
  const fretboardIsLoading = useSelector(
    (store) => store.fretboard.fretboardIsLoading
  );
  const loginSuccess = useSelector((store) => store.user.loginSuccess);
  // const theme = useSelector((store) => store.instrument.theme);

  useEffect(() => {
    if (loginSuccess) {
      let user = {};
      dispatch(userLoggedIn(user));
    } else {
      dispatch(logNotes());
    }
  }, [dispatch, loginSuccess]);

  useEffect(() => {
    function handleResize() {
      dispatch(setWindowWidth(getWindowWidth()));
    }
    window.addEventListener("resize", debounce(handleResize, 50));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 50));
    };
  }, [dispatch]);

  function Display1({ view }) {
    if (view === "fretboard") return <Fretboard />;
    if (view === "piano") return <Piano />;
    if (view === "instrumentSettings") return <InstrumentSettings />;
    if (view === "keyChange") return <KeyChange />;
  }
  function Display2({ view }) {
    if (view === "ChordAndScaleIdentifier") return <ChordAndScaleIdentifier />;
    if (view === "ChordProgressionBuilder") return <ChordProgressionBuilder />;
  }

  if (fretboardIsLoading) return <Loader />;

  return (
    <div className="appLayout">
      <Navbar>
        <ProjectSettings />
      </Navbar>
      <Toolbar />
      <Display1 view={currentViewDisplay1} />
      <Display2 view={currentViewDisplay2} />
      {/* <StandardFretboard /> */}
      {/* <Fretboard /> */}
      {/* <Fretboard2 /> */}
    </div>
  );
}

export default AppLayout;

AppLayout.propTypes = {
  view: PropTypes.string,
};
