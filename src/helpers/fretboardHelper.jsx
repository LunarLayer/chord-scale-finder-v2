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
  scrollToNearestFret,
  setIsScrolling
) {
  let startX;
  let scrollPosition;
  let isScrolling = false;
  let x;
  let distanceX;
  let containersToScroll = [];

  let fretboard = document.getElementById("Fretboard");
  let strings = document.getElementById("Strings");
  let fretVisuals = document.getElementById("FretVisuals");

  fretboard.addEventListener("mousedown", mouseIsDown);
  fretboard.addEventListener("touchstart", touchStart);

  function mouseIsDown(e) {
    containersToScroll = [];
    if (fretboard.classList.contains("nutIsFixed")) {
      containersToScroll.push(strings);
      containersToScroll.push(fretVisuals);
    } else {
      containersToScroll.push(fretboard);
    }

    let fretboardIsScrollable = fretboard.clientWidth !== fretboard.scrollWidth;
    if (fretboardIsScrollable) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      startX = e.pageX - fretboard.offsetLeft;
      scrollPosition = containersToScroll[0].scrollLeft;
    }
  }
  function touchStart(e) {
    containersToScroll = [];
    if (fretboard.classList.contains("nutIsFixed")) {
      containersToScroll.push(strings);
      containersToScroll.push(fretVisuals);
    } else {
      containersToScroll.push(fretboard);
    }

    let fretboardIsScrollable = fretboard.clientWidth !== fretboard.scrollWidth;
    if (fretboardIsScrollable) {
      document.addEventListener("touchmove", touchMove);
      document.addEventListener("touchend", touchEnd);
      startX = e.touches[0].pageX - fretboard.offsetLeft;
      scrollPosition = containersToScroll[0].scrollLeft;
    }
  }
  function mouseMove(e) {
    e.preventDefault();
    x = e.pageX - fretboard.offsetLeft;
    distanceX = x - startX;
    let scrollDistance = Math.abs(distanceX);
    // To avoid scrolling in case a user clicks a note and accidentally moves the mouse a bit
    if (scrollDistance > 10) {
      setIsScrolling(true);
      isScrolling = true;
    }

    if (isScrolling) {
      // Scroll the container(s)
      for (let i = 0; i < containersToScroll.length; i++) {
        containersToScroll[i].scrollLeft = scrollPosition - distanceX;
      }
    }
  }
  function touchMove(e) {
    e.preventDefault();
    x = e.touches[0].pageX - fretboard.offsetLeft;
    distanceX = x - startX;
    let scrollDistance = Math.abs(distanceX);
    // To avoid scrolling in case a user clicks a note and moves the mouse a bit
    if (scrollDistance > 10) {
      setIsScrolling(true);
      isScrolling = true;
    }

    if (isScrolling) {
      // Scroll the container(s)
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
          scrollToNearestFret({
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
          scrollToNearestFret({
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
