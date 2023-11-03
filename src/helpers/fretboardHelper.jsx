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
    // staticPart.style.width = `100%`;
    // vibratingPart.style.width = 0;
    const resetStringAnimationState = [...stringAnimations];
    resetStringAnimationState[stringIndex].isAnimating = false;
    stringAnimations = resetStringAnimationState;
    vibratingPart.classList.remove("animate");
  }, 3000);
}

// export function animateStringPlayedOld(
//   stringIndex,
//   fretboardWidth,
//   fretIndex,
//   fretWidths,
//   fretCount,
//   stringAnimations,
//   setStringAnimations
// ) {
//   let vibrationLength = getVibrationLength(
//     fretCount,
//     fretIndex,
//     fretWidths,
//     fretboardWidth
//   );
//   console.log(stringIndex);
//   addKeyframeStringVibration(vibrationLength, fretboardWidth);
//   console.log(vibrationLength);
//   console.log(fretboardWidth);

//   let stringVisual =
//     document.getElementsByClassName("stringVisual")[stringIndex];
//   let staticPart = stringVisual.querySelector(".staticPart");
//   let vibratingPart = stringVisual.querySelector(".vibratingPart");

//   if (stringAnimations[stringIndex].timeout)
//     clearTimeout(stringAnimations[stringIndex].timeout);

//   vibratingPart.classList.remove("animate");
//   void vibratingPart.offsetWidth; // Trigger reflow (stop animation so a new can start)

//   staticPart.style.width = `calc(100% - ${vibrationLength}px)`;
//   vibratingPart.style.width = `${vibrationLength}px`;
//   vibratingPart.classList.add("animate");

//   const updatedStringAnimations = [...stringAnimations];
//   updatedStringAnimations[stringIndex].animating = true;
//   setStringAnimations(updatedStringAnimations);

//   stringAnimations[stringIndex].timeout = setTimeout(() => {
//     staticPart.style.width = `100%`;
//     vibratingPart.style.width = 0;
//     const resetAnimationState = [...stringAnimations];
//     resetAnimationState[stringIndex].animating = false;
//     setStringAnimations(resetAnimationState);
//   }, 3000);
// }

// function getVibrationLength(fretCount, fretIndex, fretWidths, fretboardWidth) {
//   let vibrationStartPos = 0;
//   for (let i = 0; i < fretCount; i++) {
//     if (i <= fretIndex) vibrationStartPos += fretWidths[i];
//   }
//   return fretboardWidth - vibrationStartPos;
// }
