import { addKeyframeStringVibration } from "../animations/keyframes";

let stringAnimations = [
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
  { isAnimating: null, timeout: null },
];

export function animateStringPlayed(
  stringIndex,
  fretboardWidth,
  fretNumber,
  fretWidths
) {
  let vibrationLength = fretboardWidth;
  for (let i = 0; i <= fretNumber; i++) {
    vibrationLength -= fretWidths[i];
  }
  vibrationLength += 20;

  addKeyframeStringVibration(vibrationLength, fretboardWidth);

  let stringVisual =
    document.getElementsByClassName("stringVisual")[stringIndex];
  let staticPart = stringVisual.querySelector(".staticPart");
  let vibratingPart = stringVisual.querySelector(".vibratingPart");

  if (stringAnimations[stringIndex].timeout)
    clearTimeout(stringAnimations[stringIndex].timeout);

  vibratingPart.classList.remove("animate");
  void vibratingPart.offsetWidth; // Trigger reflow (stop animation so a new can start)

  staticPart.style.width = `calc(100% - ${vibrationLength}px)`;
  vibratingPart.style.width = `${vibrationLength}px`;
  vibratingPart.classList.add("animate");

  const updatedStringAnimations = [...stringAnimations];
  updatedStringAnimations[stringIndex].isAnimating = true;
  stringAnimations = updatedStringAnimations;

  stringAnimations[stringIndex].timeout = setTimeout(() => {
    const resetStringAnimationState = [...stringAnimations];
    resetStringAnimationState[stringIndex].isAnimating = false;
    stringAnimations = resetStringAnimationState;
    vibratingPart.classList.remove("animate");
  }, 3000);
}

export function initFretboardScroll(
  dispatch,
  snapContainerToScrollPos,
  nutIsFixed,
  setIsScrolling
) {
  let startX;
  let scrollPosition;
  let isScrolling = false;
  let x;
  let distanceX;
  const fretboard = document.getElementById("Fretboard");

  fretboard.addEventListener("mousedown", mouseIsDown);
  fretboard.addEventListener("touchstart", touchStart);

  let containersToScroll = [];
  if (nutIsFixed) {
    let strings = document.getElementById("Strings");
    let fretVisuals = document.getElementById("FretVisuals");
    containersToScroll.push(strings);
    containersToScroll.push(fretVisuals);
  } else {
    containersToScroll.push(fretboard);
  }

  function mouseIsDown(e) {
    if (fretboard.clientWidth !== fretboard.scrollWidth) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      startX = e.pageX - fretboard.offsetLeft;
      scrollPosition = containersToScroll[0].scrollLeft;
    } else {
      // not scrollable, all frets are showing
    }
  }
  function touchStart(e) {
    if (fretboard.clientWidth !== fretboard.scrollWidth) {
      document.addEventListener("touchmove", touchMove);
      document.addEventListener("touchend", touchEnd);
      startX = e.touches[0].pageX - fretboard.offsetLeft;
      scrollPosition = containersToScroll[0].scrollLeft;
    } else {
      // not scrollable, all frets are showing
    }
  }
  function mouseMove(e) {
    e.preventDefault();
    x = e.pageX - fretboard.offsetLeft;
    distanceX = x - startX;

    // if cursor moves more than 25px
    if (Math.abs(distanceX) > 10) {
      setIsScrolling(true);
      isScrolling = true;
    }

    if (isScrolling) {
      for (let i = 0; i < containersToScroll.length; i++) {
        containersToScroll[i].scrollLeft = scrollPosition - distanceX;
      }
    }
  }
  function touchMove(e) {
    e.preventDefault();
    x = e.touches[0].pageX - fretboard.offsetLeft;
    distanceX = x - startX;

    // if cursor moves more than 25px
    if (Math.abs(distanceX) > 10) {
      setIsScrolling(true);
      isScrolling = true;
    }

    if (isScrolling) {
      for (let i = 0; i < containersToScroll.length; i++) {
        containersToScroll[i].scrollLeft = scrollPosition - distanceX;
      }
    }
  }

  function mouseUp() {
    if (isScrolling) {
      let scrollPos = containersToScroll[0].scrollLeft;
      for (let i = 0; i < containersToScroll.length; i++) {
        dispatch(
          snapContainerToScrollPos({
            containerId: containersToScroll[i].id,
            scrollPos,
          })
        );
      }
      isScrolling = false;
    }
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("mousemove", mouseMove);
  }
  function touchEnd() {
    if (isScrolling) {
      let scrollPos = containersToScroll[0].scrollLeft;
      for (let i = 0; i < containersToScroll.length; i++) {
        dispatch(
          snapContainerToScrollPos({
            containerId: containersToScroll[i].id,
            scrollPos,
          })
        );
      }
      isScrolling = false;
    }
    document.removeEventListener("touchmove", touchMove);
    document.removeEventListener("touchend", touchEnd);
  }
}

export function getStringVisualsWidth(fretWidths, nutIsFixed) {
  let totalWidth = 0;
  // if (nutIsFixed) {
  for (let i = 0; i < fretWidths.length; i++) {
    totalWidth += fretWidths[i];
  }
  // } else {
  //   for (let i = 0; i < fretWidths.length; i++) {
  //     totalWidth += fretWidths[i];
  //   }
  // }
  return totalWidth;
}

export function getNotesForFretboard(allNotes, tuning) {
  let notesForFretboard = [];
  let notesForString = [];
  for (let i = 0; i < tuning.length; i++) {
    let stringNumber = tuning.length - i;
    notesForString = allNotes.filter((note) =>
      note.appearsOnStrings.includes(stringNumber)
    );
    notesForFretboard.push(notesForString);
  }

  return notesForFretboard;
}

export function getNotesForString(allNotes, stringNumber) {
  let notesForString = allNotes.filter((note) =>
    note.appearsOnStrings.includes(stringNumber)
  );
  return notesForString;
}
export function getNotesForNut(allNotes) {
  // let notesForString = allNotes.filter((note) =>
  //   note.appearsOnStrings.includes(stringNumber)
  // );
  // return notesForString;
}
