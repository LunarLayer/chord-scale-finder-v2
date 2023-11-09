import "./FretboardTheme.scss";

function FretboardTheme({ style, theme, tuning, fretWidths, fretboardWidth }) {
  let themeWidth = fretWidths.reduce((sum, value) => {
    return sum + value;
  });
  return (
    <div
      id="FretboardTheme"
      className={`${style} ${theme}`}
      style={{ width: themeWidth }}
    >
      <div className="stringVisuals">
        {tuning.map((rootNote, index) => {
          let stringNumber = tuning.length - index;
          return (
            <div className="stringVisual" key={`stringVisual${stringNumber}`}>
              <span className="staticPart" />
              <span className="vibratingPart" />
            </div>
          );
        })}
      </div>
      <div className="fretVisuals">
        {fretWidths.map((fretWidth, index) => {
          return (
            <div
              className="fretVisual"
              style={{ minWidth: fretWidth }}
              key={`fretVisual${index}`}
            >
              <span className="fretband" />
              {[3, 5, 7, 9, 15, 17, 19, 21].includes(index) ? (
                <span className="fretMarker" />
              ) : null}
              {[12, 24].includes(index) ? (
                <>
                  <span className="fretMarker" />
                  <span className="fretMarker" />
                </>
              ) : null}
              {[24].includes(index) ? <span className="fretband" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FretboardTheme;
