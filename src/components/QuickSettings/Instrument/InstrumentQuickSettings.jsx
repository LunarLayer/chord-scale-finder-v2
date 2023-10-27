// import { useSelector } from "react-redux";
// import "./InstrumentQuickSettings.scss";
// import { useEffect } from "react";
// import { useState } from "react";
// import Button from "../../Button/Button";

// function InstrumentQuickSettings() {
//   const instrumentSettings = useSelector(
//     (store) => store.musicTheory.quickSettings.instrument
//   );
//   const instrument = useSelector((store) => store.user.instrument);

//   const [activeTab, setActiveTab] = useState("mark");

//   function handleSetActiveTab(tabName) {
//     setActiveTab(tabName);
//   }

//   useEffect(() => {
//     let collapsible = document.getElementById("InstrumentQuickSettings");
//     if (collapsible.style.maxHeight) {
//       collapsible.style.maxHeight = null;
//     } else {
//       collapsible.style.maxHeight = collapsible.scrollHeight + "px";
//     }
//   }, [instrumentSettings]);

//   return (
//     <div
//       id="InstrumentQuickSettings"
//       className={`${instrumentSettings.showing ? "active" : ""}`}
//     >
//       <div className="tabNavigation">
//         <div className="tabs">
//           <Button onClick={() => handleSetActiveTab("markNotes")}>
//             Mark: {instrumentSettings.markNotes}
//           </Button>
//           <Button onClick={() => handleSetActiveTab("notesLabel")}>
//             Label: {instrumentSettings.noteLabel}
//           </Button>
//           <Button onClick={() => handleSetActiveTab("position")}>
//             Position: {instrumentSettings.position}
//           </Button>
//           <Button onClick={() => handleSetActiveTab("highlight")}>
//             Highlight: {instrumentSettings.highlight}
//           </Button>
//         </div>
//         <div className="tabContent">
//           {activeTab === "markNotes" ? (
//             <>
//               <Button>Single</Button>
//               {instrument === "fretboard" ? <Button>Identical</Button> : null}
//               <Button>All</Button>
//             </>
//           ) : null}
//           {activeTab === "mark" ? (
//             <>
//               <Button>Single</Button>
//               {instrument === "fretboard" ? <Button>Identical</Button> : null}
//               <Button>All</Button>
//             </>
//           ) : null}
//         </div>
//       </div>
//       {/*
//         Need:
//         Tab names
//         activeTab
//         tabContent for each tab
//         <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}>
//           <div className="tabs">
//             <Tab title="Mark: "/>
//             <Tab/>
//             <Tab/>
//           </div>
//           <div className="tabContent">
//             <TabContent>

//             </TabContent>
//           </div>
//         </TabNavigation>

//       */}
//     </div>
//   );
// }

// export default InstrumentQuickSettings;
