import PropTypes from "prop-types";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setWindowWidth } from "../Features/UI/UISlice";

import debounce from "lodash/debounce";
import { getWindowWidth } from "../Helpers/WindowHelper";

import "./AppLayout.scss";

import Loader from "../Components/Loader/Loader";
import Navbar from "../Components/Navbar/Navbar";
import Toolbar from "../Components/Toolbar/Toolbar";
import Fretboard from "../Components/Fretboard/Fretboard";

import { loginUser } from "../Features/User/UserSlice";
import { getGuestUser } from "../Helpers/LoginHelper";

import KeyChangeModal from "../Components/Modals/KeyChangeModal/KeyChangeModal";
import TabMenu from "../Components/TabMenu/TabMenu";
import ChordScaleIdentifier from "../Components/ChordScaleIdentifier/ChordScaleIdentifier";
import ChordScaleDictionary from "../Components/Dictionary/ChordScaleDictionary";
import ChordProgressionMaker from "../Components/ChordProgressionMaker/ChordProgressionMaker";
import { Chord, ChordType, Tonal } from "tonal";
import InstrumentMenu from "../Components/InstrumentMenu/InstrumentMenu";
import Modals from "../Components/Modals/ModalsManager";
import ModalsManager from "../Components/Modals/ModalsManager";

function AppLayout() {
  const dispatch = useDispatch();

  const fretboardIsReady = useSelector(
    (store) => store.fretboard.fretboardIsReady
  );

  const instrumentView = useSelector((store) => store.ui.instrumentView);
  const menus = useSelector((store) => store.ui.menus);

  const tabs = [
    // usecallback / usememo / whatever its called
    { tabTitle: "Identify", tabContent: <ChordScaleIdentifier /> },
    { tabTitle: "Dictionary", tabContent: <ChordScaleDictionary /> },
    { tabTitle: "Progression", tabContent: <ChordProgressionMaker /> },
  ];
  // Handle user login - no user logged in, then login a guest user
  useEffect(() => {
    let guest = getGuestUser();
    dispatch(loginUser(guest));
  }, [dispatch]);

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

  if (fretboardIsReady) {
    return (
      <div className="appLayout">
        <Navbar />
        <Toolbar />
        <ModalsManager />
        <InstrumentMenu showing={true} />

        {/* {menus.keyChange.showing ? <KeyChangeModal /> : null} */}
        {/* {menus.keyChange.showing ? <KeyChangeModal /> : null} */}

        {instrumentView.activeInstrument === "fretboard" ? <Fretboard /> : null}
        {/* {instrumentView.activeInstrument === "piano" ? <Piano /> : null} */}

        <TabMenu tabs={tabs} />
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

{
  /* 
          <ChordProgressionMaker /> */
}
