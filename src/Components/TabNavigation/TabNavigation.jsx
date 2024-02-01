import Tab from "./Tab";

function TabNavigation({ tabs, activeTab, children }) {
  return (
    <div className="tabNavigation">
      {tabs.map((tab, index) => {
        <Tab key={`${tab.title}`} title={tab.title} activeTab={activeTab} />;
      })}
    </div>
  );
}

export default TabNavigation;
