import { setFretboardIsScrolling } from "../features/fretboard/fretboardSlice";

export function initFretboardScroll(dispatch, notesWidth, notesGap) {
  // const pointerScroll = (elem) => {
  //   let isDrag = false;

  //   const toggleDrag = () => {
  //     isDrag = !isDrag;
  //     console.log(isDrag);
  //   };
  //   const drag = (ev) => isDrag && (elem.scrollLeft -= ev.movementX);

  //   elem.addEventListener("pointerdown", toggleDrag);
  //   addEventListener("pointerup", toggleDrag);
  //   addEventListener("pointermove", drag);
  // };

  let fretboard = document.getElementById("fretboard");
  console.log(fretboard);
  let scrollPositions = { current: 0, cursor: 0 };
  const snapPointsWidth = notesWidth + notesGap;
  // strings.scrollLeft = 0; // reset scroll position to 0

  const mouseDownHandler = function (e) {
    scrollPositions = {
      currentPosition: fretboard.scrollLeft,
      cursor: e.clientX,
    };
    fretboard.addEventListener("mousemove", mouseMoveHandler);
    fretboard.addEventListener("mouseup", endScrolling);
    fretboard.addEventListener("mouseleave", endScrolling);
  };

  const mouseMoveHandler = function (e) {
    const scrollAmount = e.clientX - scrollPositions.cursor;
    if (Math.abs(scrollAmount) > 5) {
      dispatch(setFretboardIsScrolling(true));
      const newScrollLeft = scrollPositions.currentPosition - scrollAmount;
      requestAnimationFrame(() => {
        fretboard.scrollLeft = newScrollLeft;
      });
    }
  };

  function snapToNearestNote() {
    const dividend = fretboard.scrollLeft / snapPointsWidth;
    const snapPosition = Math.round(dividend) * snapPointsWidth;

    animateScroll(fretboard.scrollLeft, snapPosition, 150); // Adjust duration as needed

    function animateScroll(start, target, duration) {
      const startTime = performance.now();
      function easeOut(t) {
        return 1 - Math.pow(1 - t, 3); // Cubic ease-out
      }
      function step(timestamp) {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        fretboard.scrollLeft = start + (target - start) * easeOut(progress);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }
  }

  function handleTouchEnd() {
    let oldScrollX, newScrollX;

    const interval = setInterval(() => {
      newScrollX = fretboard.scrollLeft;

      if (oldScrollX === newScrollX) {
        snapToNearestNote();
        clearInterval(interval);
      } else {
        oldScrollX = newScrollX;
      }
    }, 25);
  }

  function endScrolling() {
    snapToNearestNote();
    fretboard.removeEventListener("mousemove", mouseMoveHandler);
    fretboard.removeEventListener("mouseup", endScrolling);
    fretboard.removeEventListener("mouseleave", endScrolling);
    setTimeout(() => {
      dispatch(setFretboardIsScrolling(false));
    }, 20);
  }

  fretboard.addEventListener("mousedown", mouseDownHandler);
  fretboard.addEventListener("touchend", handleTouchEnd);
}
