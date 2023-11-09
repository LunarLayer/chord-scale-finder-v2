import store from "../Store";
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

export function initFretboardScroll(strings, dispatch, snapToScrollPos) {
  console.log("initFretboardScroll");
  let startX;
  let scrollPos;
  let isDown;
  let x;
  let distanceX;
  let mouseLeft;

  strings.addEventListener("mousedown", (e) => mouseIsDown(e));
  strings.addEventListener("mouseup", (e) => mouseUp(e));
  strings.addEventListener("mouseleave", (e) => mouseLeave(e));
  strings.addEventListener("mousemove", (e) => mouseMove(e));
  strings.addEventListener("touchstart", (e) => touchStart(e));
  strings.addEventListener("touchmove", (e) => touchMove(e));
  strings.addEventListener("touchend", (e) => touchEnd(e));

  function mouseIsDown(e) {
    isDown = true;
    mouseLeft = false;
    startX = e.pageX - strings.offsetLeft;
    scrollPos = strings.scrollLeft;
  }
  function mouseUp(e) {
    if (!mouseLeft) {
      scrollPos = strings.scrollLeft;
      dispatch(snapToScrollPos(scrollPos));
      isDown = false;
    }
  }
  function mouseLeave(e) {
    mouseLeft = true;
    scrollPos = strings.scrollLeft;
    dispatch(snapToScrollPos(scrollPos));
    isDown = false;
  }
  function mouseMove(e) {
    if (isDown) {
      e.preventDefault();
      x = e.pageX - strings.offsetLeft;
      distanceX = x - startX;
      strings.scrollLeft = scrollPos - distanceX;
    }
  }

  function touchStart(e) {
    isDown = true;
    startX = e.touches[0].pageX - strings.offsetLeft;
    scrollPos = strings.scrollLeft;
  }
  function touchMove(e) {
    if (isDown) {
      e.preventDefault();
      x = e.touches[0].pageX - strings.offsetLeft;
      distanceX = x - startX;
      strings.scrollLeft = scrollPos - distanceX;
    }
  }
  function touchEnd(e) {
    scrollPos = strings.scrollLeft;
    dispatch(snapToScrollPos(scrollPos));
    isDown = false;
  }

  // function snapToFret(strings, scrollPos, fretWidths, fretCount) {
  //   let fretWidthsSum = 0;
  //   for (let i = 0; i < fretWidths.length; i++) {
  //     if (
  //       scrollPos > fretWidthsSum &&
  //       scrollPos < fretWidthsSum + fretWidths[i]
  //     ) {
  //       let distanceToLeftFret = scrollPos - fretWidthsSum;
  //       let distanceToRightFret = fretWidthsSum + fretWidths[i] - scrollPos;
  //       if (distanceToLeftFret < distanceToRightFret) {
  //         // dispatch(updateFretboardWidth());
  //         animateSnap(strings, strings.scrollLeft, fretWidthsSum, 150);
  //       } else {
  //         animateSnap(
  //           strings,
  //           strings.scrollLeft,
  //           fretWidthsSum + fretWidths[i],
  //           150
  //         );
  //       }
  //       break;
  //     } else {
  //       fretWidthsSum += fretWidths[i];
  //     }
  //   }
  // }

  // function animateSnap(strings, start, target, duration) {
  //   const startTime = performance.now();
  //   function easeOut(t) {
  //     return 1 - Math.pow(1 - t, 3); // Cubic ease-out
  //   }
  //   function step(timestamp) {
  //     const elapsedTime = timestamp - startTime;
  //     const progress = Math.min(elapsedTime / duration, 1);
  //     strings.scrollLeft = start + (target - start) * easeOut(progress);
  //     if (progress < 1) {
  //       requestAnimationFrame(step);
  //     }
  //   }
  //   requestAnimationFrame(step);
  // }
}
