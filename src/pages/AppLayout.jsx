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
import DefaultFretboard from "../components/FretboardVariants/DefaultFretboard/DefaultFretboard";
import MinimalFretboard from "../components/FretboardVariants/MinimalFretboard/MinimalFretboard";
import Piano from "../components/Piano/Piano";
import ChordAndScaleIdentifier from "../components/ChordAndScaleIdentifier/ChordAndScaleIdentifier";
import ChordProgressionBuilder from "../components/ChordProgressionBuilder/ChordProgressionBuilder";
import { userLoggedIn } from "../Features/User/UserSlice";
import { initializeFretboard } from "../Features/Fretboard/FretboardSlice";

function AppLayout() {
  console.log("appLayout");
  const dispatch = useDispatch();
  const currentViewDisplay1 = useSelector(
    (store) => store.ui.currentViewDisplay1
  );
  const currentViewDisplay2 = useSelector(
    (store) => store.ui.currentViewDisplay2
  );
  const fretboardIsReady = useSelector(
    (store) => store.fretboard.fretboardIsReady
  );
  const fretboardVariant = useSelector(
    (store) => store.fretboard.fretboardVariant
  );

  const loginSuccess = useSelector((store) => store.user.loginSuccess);

  useEffect(() => {
    if (loginSuccess) {
      let user = {};
      dispatch(userLoggedIn(user));
    } else {
      dispatch(initializeFretboard());
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

  function Display1({ view }) {
    if (view === "fretboard" && fretboardVariant === "default")
      return <DefaultFretboard />;
    if (view === "fretboard" && fretboardVariant === "minimal")
      return <MinimalFretboard />;
    if (view === "piano") return <Piano />;
    if (view === "instrumentSettings") return <InstrumentSettings />;
    if (view === "keyChange") return <KeyChange />;
  }
  function Display2({ view }) {
    if (view === "ChordAndScaleIdentifier") return <ChordAndScaleIdentifier />;
    if (view === "ChordProgressionBuilder") return <ChordProgressionBuilder />;
  }

  if (fretboardIsReady) {
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
  } else {
    return <Loader />;
  }
}

export default AppLayout;

AppLayout.propTypes = {
  view: PropTypes.string,
};
