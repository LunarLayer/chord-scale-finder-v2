import { useSelector } from "react-redux";

import "./Fretboard.scss";

import String from "../String/String";
import Loader from "../Loader/Loader";
import { useEffect } from "react";

function Fretboard() {
  console.log("fretboard");
  const { strings, notesGap, fretboardWidth, fretCount, isLoading } =
    useSelector((store) => store.fretboard);

  const pointerScroll = (elem) => {
    let isDrag = false;

    const toggleDrag = () => {
      isDrag = !isDrag;
      console.log(isDrag);
    };
    const drag = (ev) => isDrag && (elem.scrollLeft -= ev.movementX);

    elem.addEventListener("pointerdown", toggleDrag);
    addEventListener("pointerup", toggleDrag);
    addEventListener("pointermove", drag);
  };

  useEffect(() => {
    console.log("fretboard - useEffect()");
    // const fretboardElement = document.getElementById("fretboard");
    // if (fretboardElement) {
    //   pointerScroll(fretboardElement);
    // }
  }, []);

  if (isLoading) return <Loader />;
  if (fretCount === 0) return null;

  return (
    <div id="fretboard" style={{ gap: notesGap, width: fretboardWidth }}>
      {strings.map((string) => {
        return (
          <String
            key={`string-${string.stringNumber}`}
            stringNumber={string.stringNumber}
            notes={string.notes}
          />
        );
      })}
    </div>
  );
}

export default Fretboard;
