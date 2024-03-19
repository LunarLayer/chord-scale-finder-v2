import "./ChordIntervals.scss";

function ChordIntervals({ intervals }) {
  console.log("recived intervals: " + intervals);
  return (
    <div id="ChordIntervals">
      <div className="flex-row-1">
        {intervals?.map((intervalObj, index) => {
          if (index < 12)
            return (
              <button
                key={"interval_" + index}
                className={intervalObj.active ? "active" : ""}
              >
                {intervalObj.interval}
              </button>
            );
        })}
      </div>
      <div className="flex-row-2">
        {intervals?.map((intervalObj, index) => {
          if (index > 12)
            return (
              <button
                key={"interval_" + index}
                className={intervalObj.active ? "active" : ""}
              >
                {intervalObj.interval}
              </button>
            );
        })}
      </div>
    </div>
  );
}

export default ChordIntervals;
