import { getStringVisualsWidth } from "../../Helpers/FretboardHelper";
import "./FretboardTheme.scss";

function FretboardTheme({
  style,
  theme,
  tuning,
  fretWidths,
  fretboardWidth,
  nutIsFixed,
  width,
}) {
  let stringVisualsWidth = getStringVisualsWidth(fretWidths, nutIsFixed);

  return (
    <>
      <div id="StringVisuals" style={{ width: stringVisualsWidth }}>
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
      {nutIsFixed ? (
        <div className="nutVisual" style={{ minWidth: fretWidths[0] + "px" }} />
      ) : null}
      <div
        id="FretVisuals"
        className={`${nutIsFixed ? "nutIsFixed" : ""}`}
        style={{
          left: nutIsFixed ? fretWidths[0] + "px" : "auto",
          right: nutIsFixed ? 0 : "auto",
        }}
      >
        {fretWidths.map((fretWidth, index) => {
          if (index === 0 && nutIsFixed) return null;
          return (
            <div
              className={
                !nutIsFixed && index === 0
                  ? "fretVisual nutVisual"
                  : "fretVisual"
              }
              style={{
                minWidth: fretWidth,
                maxWidth: nutIsFixed ? width : "auto",
              }}
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
    </>
  );
}

export default FretboardTheme;
