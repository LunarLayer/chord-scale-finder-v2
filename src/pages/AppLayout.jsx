import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setWindowWidth } from "../features/ui/uiSlice";

import debounce from "lodash/debounce";
import { getWindowWidth } from "../helpers/windowHelper";

import "./AppLayout.scss";

import Fretboard from "../components/Fretboard/Fretboard";
import FretboardSettings from "../components/FretboardSettings/FretboardSettings";
import KeyChange from "../components/KeyChange/KeyChange";
import Navbar from "../components/Navbar/Navbar";
import ProjectSettings from "../components/ProjectSettings/ProjectSettings";
import Toolbar from "../components/Toolbar/Toolbar";
import ChordAndScaleIdentifier from "../components/ChordAndScaleIdentifier/ChordAndScaleIdentifier";
import ChordProgressionBuilder from "../components/ChordProgressionBuilder/ChordProgressionBuilder";
import Loader from "../components/Loader/Loader";

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

  useEffect(() => {
    console.log("AppLayout - UseEffect");
    function handleResize() {
      dispatch(setWindowWidth(getWindowWidth()));
    }
    window.addEventListener("resize", debounce(handleResize, 50));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 50));
    };
  }, [dispatch]);

  function Display1({ view }) {
    if (fretboardIsLoading) return <Loader />;
    if (view === "fretboard") return <Fretboard />;
    if (view === "fretboardSettings") return <FretboardSettings />;
    if (view === "keyChange") return <KeyChange />;
  }
  function Display2({ view }) {
    if (view === "ChordAndScaleIdentifier") return <ChordAndScaleIdentifier />;
    if (view === "ChordProgressionBuilder") return <ChordProgressionBuilder />;
  }

  // FretboardSection
  // ChordSection

  return (
    <div className="appLayout">
      <Navbar>
        <ProjectSettings />
      </Navbar>
      <Toolbar />
      <Display1 view={currentViewDisplay1} />
      <Display2 view={currentViewDisplay2} />
    </div>
  );
}

export default AppLayout;

AppLayout.propTypes = {
  view: PropTypes.string,
};
