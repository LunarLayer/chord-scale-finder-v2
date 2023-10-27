import { useState } from "react";
import "./InstrumentSettings.scss";
import Tab from "./Tab";
import InstrumentTabContent from "./InstrumentTabContent";
import ThemeTabContent from "./ThemeTabContent";
import TuningTabContent from "./TuningTabContent";
import { useDispatch } from "react-redux";
import { setInstrumentDetails } from "../../Features/User/UserSlice";
import { setCurrentViewSection1 } from "../../Features/UI/UISlice";

function InstrumentSettings() {
  const [selectedInstrument, setSelectedInstrument] = useState("Bass");
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("instrument");
  // const loginSuccess = useSelector((store) => store.user.loginSuccess);

  function handleTabSelected(selectedTab) {
    setActiveTab(selectedTab);
  }

  function handleInstrumentSelected(instrumentDetails) {
    // const { instrument, instrumentVariant, theme, tuning } = instrumentDetails;
    // setSelectedInstrument(selectedInstrument);

    dispatch(setInstrumentDetails(instrumentDetails));
    dispatch(setCurrentViewSection1("fretboard"));
    // setCurrentViewSection1("fretboard");
  }

  return (
    <div id="InstrumentSettings">
      <div className="tabNavigation">
        <Tab
          title="Instrument"
          activeTab={activeTab}
          handleTabSelected={handleTabSelected}
        />
        <Tab
          title="Theme"
          activeTab={activeTab}
          handleTabSelected={handleTabSelected}
        />
        <Tab
          title="Other"
          activeTab={activeTab}
          handleTabSelected={handleTabSelected}
        />
      </div>
      <div className="tabContent">
        {activeTab === "instrument" ? (
          <InstrumentTabContent
            selectedInstrument={selectedInstrument}
            handleInstrumentSelected={handleInstrumentSelected}
          />
        ) : null}
        {activeTab === "theme" ? <ThemeTabContent /> : null}
        {activeTab === "other" ? <TuningTabContent /> : null}
      </div>
    </div>
  );
}

export default InstrumentSettings;
