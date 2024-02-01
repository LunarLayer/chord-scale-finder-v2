function Tab({ title, activeTab, handleTabSelected }) {
  return (
    <button
      className={`tab ${activeTab === title.toLowerCase() ? "selected" : ""}`}
      onClick={() => handleTabSelected(title.toLowerCase())}
    >
      {title}
    </button>
  );
}

export default Tab;
