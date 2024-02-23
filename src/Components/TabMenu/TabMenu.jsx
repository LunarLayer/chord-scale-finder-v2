import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./TabMenu.scss";

function TabMenu({ tabs }) {
  const tabMenuSettings = useSelector((store) => store.ui.tabMenuSettings);
  const [activeTab, setActiveTab] = useState(tabMenuSettings.activeTab);

  return (
    <div id="TabMenu">
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={"tab_" + tab.tabTitle}
            className={`tab ${activeTab === tab.tabTitle ? "active" : ""}`}
            onClick={() => setActiveTab(tab.tabTitle)}
          >
            {tab.tabTitle}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => {
          if (activeTab === tab.tabTitle) {
            return tab.tabContent;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default TabMenu;
