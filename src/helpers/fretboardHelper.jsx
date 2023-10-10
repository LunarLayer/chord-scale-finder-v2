// import { setFretboardIsScrolling } from "../Features/Instruments/InstrumentsSlice";

export function RenderFretMarker(fretNumber, notesWidth) {
  switch (fretNumber) {
    case 3:
    case 5:
    case 7:
    case 9:
    case 15:
    case 17:
    case 19:
    case 21:
      return (
        <div className="fretMarkings">
          <div className="fretLine" />
          <div
            className="fretDot"
            style={{
              width: notesWidth - 10,
              height: notesWidth - 10,
            }}
          />
        </div>
      );
    case 12:
    case 24:
      return (
        <div className="fretMarkings">
          <div className="fretLine" />
          <div
            className="fretDot"
            style={{
              width: notesWidth - 10,
              height: notesWidth - 10,
              top: 25 + "%",
              transform: `translateY(${-50}%)`,
            }}
          />
          <div
            className="fretDot"
            style={{
              width: notesWidth - 10,
              height: notesWidth - 10,
              bottom: 25 + "%",
              transform: `translateY(${+50}%)`,
            }}
          />
        </div>
      );
    default:
      return (
        <div className="fretMarkings">
          <div className="fretLine" />
        </div>
      );
  }
}

export function fillFretArraysWithNoteArrays(allNotes, strings) {
  let res = [];
  let stringsWithNotes = [];
  let fretNotes = [];

  for (let string of strings) {
    stringsWithNotes.push(getNotesForString(allNotes, string));
  }

  for (let i = 0; i < 25; i++) {
    for (let stringWithNotes of stringsWithNotes) {
      fretNotes.push(stringWithNotes[i]);
    }
    res.push(fretNotes);
    fretNotes = [];
  }

  return res;
}

export function getNotesForFret(fretNumber, allNotes, strings) {
  let notesForFret = [];
  for (let string of strings) {
    let rootNoteIndex = allNotes.findIndex(
      (note) =>
        note.note === string.root &&
        note.octave === string.octave &&
        note.hasAccidental === string.hasAccidental
    );
    notesForFret.push(allNotes[rootNoteIndex + fretNumber]);
  }
  return notesForFret;
}

export function initFretboardScroll(dispatch, notesWidth, fretsGap) {
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
  const snapPointsWidth = notesWidth + fretsGap;
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
