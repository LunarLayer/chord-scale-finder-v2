import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
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

function AppLayout() {
  console.log("appLayout");
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("fretboard");

  dispatch(setWindowWidth(getWindowWidth()));

  useEffect(() => {
    function handleResize() {
      dispatch(setWindowWidth(getWindowWidth()));
    }
    window.addEventListener("resize", debounce(handleResize, 30));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 30));
    };
  }, [dispatch]);

  function RenderView({ view }) {
    if (view === "fretboard") return <Fretboard />;
    if (view === "fretboardSettings") return <FretboardSettings />;
    if (view === "keyChange") return <KeyChange />;
  }

  return (
    <div className="appLayout">
      <Navbar>
        <ProjectSettings />
      </Navbar>
      <Toolbar activeView={activeView} setActiveView={setActiveView} />
      <RenderView view={activeView} />
    </div>
  );
}

export default AppLayout;

AppLayout.propTypes = {
  view: PropTypes.string,
};
