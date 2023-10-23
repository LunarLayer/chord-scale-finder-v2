import { addKeyframeStringVibration } from "../animations/keyframes";

export function animateStringPlayed(
  noteIndex,
  fretboardWidth,
  fretNumber,
  fretWidths,
  fretCount,
  stringAnimations,
  setStringAnimations
) {
  let vibrationLength = getVibrationLength(
    fretCount,
    fretNumber,
    fretWidths,
    fretboardWidth
  );
  addKeyframeStringVibration(vibrationLength, fretboardWidth);

  let stringVisual = document.getElementsByClassName("stringVisual")[noteIndex];
  let staticPart = stringVisual.querySelector(".staticPart");
  let vibratingPart = stringVisual.querySelector(".vibratingPart");

  if (stringAnimations[noteIndex].timeout)
    clearTimeout(stringAnimations[noteIndex].timeout);

  vibratingPart.classList.remove("animate");
  void vibratingPart.offsetWidth; // Trigger reflow (stop animation)

  staticPart.style.width = `calc(100% - ${vibrationLength}px)`;
  vibratingPart.style.width = `${vibrationLength}px`;
  vibratingPart.classList.add("animate");

  const updatedStringAnimations = [...stringAnimations];
  updatedStringAnimations[noteIndex].animating = true;
  setStringAnimations(updatedStringAnimations);

  stringAnimations[noteIndex].timeout = setTimeout(() => {
    staticPart.style.width = `100%`;
    vibratingPart.style.width = 0;
    const resetAnimationState = [...stringAnimations];
    resetAnimationState[noteIndex].animating = false;
    setStringAnimations(resetAnimationState);
  }, 3000);
}

function getVibrationLength(fretCount, fretNumber, fretWidths, fretboardWidth) {
  let vibrationStartPos = 0;
  for (let i = 0; i < fretCount; i++) {
    if (i <= fretNumber) vibrationStartPos += fretWidths[i];
  }
  return fretboardWidth - vibrationStartPos;
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

// export function initFretboardScroll(dispatch, notesWidth, fretsGap) {
//   // const pointerScroll = (elem) => {
//   //   let isDrag = false;

//   //   const toggleDrag = () => {
//   //     isDrag = !isDrag;
//   //     console.log(isDrag);
//   //   };
//   //   const drag = (ev) => isDrag && (elem.scrollLeft -= ev.movementX);

//   //   elem.addEventListener("pointerdown", toggleDrag);
//   //   addEventListener("pointerup", toggleDrag);
//   //   addEventListener("pointermove", drag);
//   // };

//   let fretboard = document.getElementById("fretboard");
//   console.log(fretboard);
//   let scrollPositions = { current: 0, cursor: 0 };
//   const snapPointsWidth = notesWidth + fretsGap;
//   // strings.scrollLeft = 0; // reset scroll position to 0

//   const mouseDownHandler = function (e) {
//     scrollPositions = {
//       currentPosition: fretboard.scrollLeft,
//       cursor: e.clientX,
//     };
//     fretboard.addEventListener("mousemove", mouseMoveHandler);
//     fretboard.addEventListener("mouseup", endScrolling);
//     fretboard.addEventListener("mouseleave", endScrolling);
//   };

//   const mouseMoveHandler = function (e) {
//     const scrollAmount = e.clientX - scrollPositions.cursor;
//     if (Math.abs(scrollAmount) > 5) {
//       dispatch(setFretboardIsScrolling(true));
//       const newScrollLeft = scrollPositions.currentPosition - scrollAmount;
//       requestAnimationFrame(() => {
//         fretboard.scrollLeft = newScrollLeft;
//       });
//     }
//   };

//   function snapToNearestNote() {
//     const dividend = fretboard.scrollLeft / snapPointsWidth;
//     const snapPosition = Math.round(dividend) * snapPointsWidth;

//     animateScroll(fretboard.scrollLeft, snapPosition, 150); // Adjust duration as needed

//     function animateScroll(start, target, duration) {
//       const startTime = performance.now();
//       function easeOut(t) {
//         return 1 - Math.pow(1 - t, 3); // Cubic ease-out
//       }
//       function step(timestamp) {
//         const elapsedTime = timestamp - startTime;
//         const progress = Math.min(elapsedTime / duration, 1);
//         fretboard.scrollLeft = start + (target - start) * easeOut(progress);
//         if (progress < 1) {
//           requestAnimationFrame(step);
//         }
//       }
//       requestAnimationFrame(step);
//     }
//   }

//   function handleTouchEnd() {
//     let oldScrollX, newScrollX;

//     const interval = setInterval(() => {
//       newScrollX = fretboard.scrollLeft;

//       if (oldScrollX === newScrollX) {
//         snapToNearestNote();
//         clearInterval(interval);
//       } else {
//         oldScrollX = newScrollX;
//       }
//     }, 25);
//   }

//   function endScrolling() {
//     snapToNearestNote();
//     fretboard.removeEventListener("mousemove", mouseMoveHandler);
//     fretboard.removeEventListener("mouseup", endScrolling);
//     fretboard.removeEventListener("mouseleave", endScrolling);
//     setTimeout(() => {
//       dispatch(setFretboardIsScrolling(false));
//     }, 20);
//   }

//   fretboard.addEventListener("mousedown", mouseDownHandler);
//   fretboard.addEventListener("touchend", handleTouchEnd);
// }
