import { createSlice, current } from "@reduxjs/toolkit";
import { getWindowWidth } from "../../Helpers/WindowHelper";
import { setWindowWidth } from "../UI/UISlice";
import { loginUser } from "../User/UserSlice";
import { soundEngine } from "../../Helpers/SoundEngine";
import { Note } from "tonal";

const initialState = {
  fretboardIsReady: false,
  fretboardStyle: undefined, // default / minimal
  fretboardTheme: undefined, // black / blue / red etc.
  scrollPosition: undefined,
  nutIsFixed: undefined,
  notesGap: undefined,
  notesLabelWidth: undefined,
  notesMinWidth: undefined,
  notesMaxWidth: undefined,
  fretboardPadding: undefined,
  fretCount: undefined,
  preferredFretCount: undefined,
  fretCap: undefined,
  fretboardWidth: undefined,
  fretWidths: undefined,
  visibleFretsRange: undefined,
  fretWidthsGrowthFactor: undefined,
  tuning: undefined,
  coloredNotes: undefined,
};

const FretboardSlice = createSlice({
  name: "fretboard",
  initialState,
  reducers: {
    setNutIsFixed(state, action) {
      state.nutIsFixed = action.payload;
      state.fretboardWidth = getFretboardWidth(state);
      snapScrollToNearestFret(state);
    },
    scrollFretboard(state) {
      state.preferredFretCount = state.fretCount;
      state.visibleFretsRange = getVisibleFretsRange(state, "scrollFretboard");
      state.fretboardWidth = getFretboardWidth(state);
      snapScrollToNearestFret(state);
    },
    setPreferredFretCount(state, action) {
      state.preferredFretCount = action.payload;
      state.fretCount = getFretCount(state);
      state.visibleFretsRange = getVisibleFretsRange(
        state,
        "setPreferredFretCount"
      );
      state.fretboardWidth = getFretboardWidth(state);
      snapScrollToNearestFret(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWindowWidth, (state) => {
        var windowWidth = getWindowWidth();
        state.notesMinWidth = getNotesMinWidth(state, windowWidth);
        state.notesMaxWidth = getNotesMaxWidth(state, windowWidth);
        state.fretboardPadding = getFretboardPadding(windowWidth);
        state.fretWidthsGrowthFactor = getFretWidthsGrowthFactor(windowWidth);
        state.fretWidths = getFretWidths(state, windowWidth);
        state.fretCap = getFretCap(state, windowWidth);
        state.notesLabelWidth = getNotesLabelWidth(state);
        state.fretCount = getFretCount(state);
        state.visibleFretsRange = getVisibleFretsRange(state, "setWindowWidth");
        state.fretboardWidth = getFretboardWidth(state);
        snapScrollToNearestFret(state);
      })
      .addCase(loginUser, (state, action) => {
        const user = action.payload;
        if (user.instrument === "Fretboard") {
          soundEngine.loadSoundFile(user.soundFile);
          state.fretboardStyle = user.instrumentStyle;
          state.fretboardTheme = user.instrumentTheme;
          state.tuning = user.tuning;
          state.nutIsFixed = user.nutIsFixed;

          var windowWidth = getWindowWidth();
          state.notesMinWidth = getNotesMinWidth(state, windowWidth);
          state.notesMaxWidth = getNotesMaxWidth(state, windowWidth);
          state.fretboardPadding = getFretboardPadding(windowWidth);
          state.fretWidthsGrowthFactor = getFretWidthsGrowthFactor(windowWidth);
          state.fretWidths = getFretWidths(state, windowWidth);
          state.fretCap = getFretCap(state, windowWidth);
          state.notesLabelWidth = getNotesLabelWidth(state);
          state.fretCount = getFretCount(state);
          state.visibleFretsRange = getVisibleFretsRange(state, "loginUser");
          state.fretboardWidth = getFretboardWidth(state);
          state.fretboardIsReady = true;
        }
      });
    // .addCase(setInstrumentDetails, (state, action) => {
    //   let windowWidth = getWindowWidth();
    //   const { instrument, instrumentVariant, theme } = action.payload;
    //   if (instrument === "fretboard") {
    //     state.fretboardVariant = instrumentVariant;
    //     state.fretboardTheme = theme;
    //     updateFretboard(state, windowWidth);
    //   }
    // });
  },
});

function getVisibleFrets(state) {
  let visibleFretsArr = [];
  if (!state.visibleFrets || state.fretCount === 25) {
    for (let i = 1; i <= 25; i++) {
      visibleFretsArr.push(i);
    }
    if (state.nutIsFixed) visibleFretsArr.push(0);

    return visibleFretsArr;
  }
}

function getVisibleFretsRange(state, trigger) {
  let start, end;
  let container = state.nutIsFixed
    ? document.getElementById("Strings")
    : document.getElementById("Fretboard");

  if (trigger === "scrollFretboard") {
    let cantScrollFurther =
      container.scrollLeft + container.clientWidth === container.scrollWidth;
    if (cantScrollFurther) {
      return { start: 24 - state.fretCount + 2, end: 24 };
    }
    if (state.nutIsFixed) {
      start = getClosestFretnumber(state, container.scrollLeft);
      end = start + state.fretCount - 2;
    } else {
      start = getClosestFretnumber(state, container.scrollLeft);
      end = start + state.fretCount - 1;
      if (start > 0) end -= 1;
    }
    while (end > 24) {
      start -= 1;
      end -= 1;
    }
  }

  if (trigger === "setPreferredFretCount") {
    if (state.nutIsFixed) {
      start = getClosestFretnumber(state, container.scrollLeft);
      end = start + state.fretCount - 2;
    } else {
      start = getClosestFretnumber(state, container.scrollLeft);
      end = start + state.fretCount - 1;
      if (start > 0) end -= 1;
    }
    while (end > 24) {
      start -= 1;
      end -= 1;
    }
    // if fretCount is 24, the nut should show as well
    if (end === 24 && start === 1) start = 0;
  }

  if (trigger === "setNutIsFixed") {
    if (state.nutIsFixed) {
      start = getClosestFretnumber(state, container.scrollLeft);
      end = start + state.fretCount - 2;
    } else {
      start = getClosestFretnumber(state, container.scrollLeft);
      end = start + state.fretCount - 1;
      if (start > 0) end -= 1;
    }
  }

  if (trigger === "setWindowWidth") {
    if (state.preferredFretCount) {
      start = state.visibleFretsRange.start;
      if (start === 0) {
        end = start + state.fretCount - 1;
      } else {
        end = start + state.fretCount - 2;
      }
    } else {
      if (state.nutIsFixed) {
        return { start: 1, end: state.fretCount - 1 };
      } else {
        return { start: 0, end: state.fretCount - 1 };
      }
    }
  }

  if (trigger === "loginUser") {
    if (state.nutIsFixed) {
      return { start: 1, end: state.fretCount - 1 };
    } else {
      return { start: 0, end: state.fretCount - 1 };
    }
  }

  return { start, end };
}

function setVisibleFretsRange(state, start, end) {
  state.visibleFretsRange = { start, end };
}

function getFretboardScrollPosition(nutIsFixed, fretWidths, visibleFretsRange) {
  let scrollPos = 0;

  if (nutIsFixed) {
    for (let i = 1; i < visibleFretsRange.start + 1; i++) {
      scrollPos += fretWidths[i];
    }
  } else {
    for (let i = 0; i < visibleFretsRange.start; i++) {
      scrollPos += fretWidths[i];
    }
  }

  return scrollPos;
}

function snapScrollToNearestFret(state) {
  // reset previously scrollable container(s)
  let containersToScroll = getContainersToScroll(state.nutIsFixed);
  if (containersToScroll[0] === null) return;

  if (state.nutIsFixed) {
    document.getElementById("Fretboard").scrollLeft = 0;
  } else {
    document.getElementById("Strings").scrollLeft = 0;
    document.getElementById("FretVisuals").scrollLeft = 0;
    document.getElementById("StringVisuals").scrollLeft = 0;
  }

  let newScrollPosition = 0;
  for (let i = 0; i < state.visibleFretsRange.start; i++) {
    newScrollPosition += state.fretWidths[i];
  }

  if (state.nutIsFixed) {
    newScrollPosition -= state.fretWidths[0];
  }

  for (let container of containersToScroll) {
    animateScroll(container, container.scrollLeft, newScrollPosition);
  }
}

function getClosestFretnumber(state, scrollPosition) {
  let sum = 0;
  let fretWidths = state.nutIsFixed
    ? state.fretWidths.slice(1)
    : state.fretWidths;

  for (let i = 0; i < fretWidths.length; i++) {
    let nextSum = sum + fretWidths[i];

    // Check if scrollPosition is in the current fret range
    if (scrollPosition >= sum && scrollPosition < nextSum) {
      let distanceToLeftFret = scrollPosition - sum;
      let distanceToRightFret = nextSum - scrollPosition;

      // Return the index of the closest fret
      if (state.nutIsFixed) i += 1;
      return distanceToLeftFret < distanceToRightFret ? i : i + 1;
    } else {
      sum += fretWidths[i];
    }
  }

  // When scrollPos is at the last fret
  return fretWidths.length - 1;
}

function animateScroll(container, start, target) {
  let duration = 250;
  const startTime = performance.now();
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3); // Cubic ease-out
  }
  function step(timestamp) {
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    container.scrollLeft = start + (target - start) * easeOut(progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

function updateFretboard(state, trigger) {
  var windowWidth = getWindowWidth();
  state.notesMinWidth = getNotesMinWidth(state, windowWidth);
  state.notesMaxWidth = getNotesMaxWidth(state, windowWidth);
  state.fretboardPadding = getFretboardPadding(windowWidth);
  state.fretWidthsGrowthFactor = getFretWidthsGrowthFactor(windowWidth);
  state.fretWidths = getFretWidths(state, windowWidth);
  state.fretCap = getFretCap(state, windowWidth);
  state.notesLabelWidth = getNotesLabelWidth(state);
  state.fretCount = getFretCount(state);

  state.visibleFretsRange = getVisibleFretsRange(state);

  state.fretboardWidth = getFretboardWidth(state);
  // snapScrollToNearestFret(state);

  state.fretboardIsReady = true;
}

function getScrollPosition(state) {
  let scrollPosition = 0;

  // let fretWidths = state.nutIsFixed
  //   ? state.fretWidths.slice(1)
  //   : state.fretWidths;

  if (state.nutIsFixed) {
    for (let i = 1; i < state.visibleFretsRange.start; i++) {
      scrollPosition += state.fretWidths[i];
    }
  } else {
    for (let i = 0; i < state.visibleFretsRange.start; i++) {
      scrollPosition += state.fretWidths[i];
    }
  }
  return scrollPosition;
}

function getUpdatedVisibleFretsRange(nutIsFixed, fretWidths, fretCount) {
  let container;
  if (nutIsFixed) {
    container = document.getElementById("Strings");
  } else {
    container = document.getElementById("Fretboard");
  }
  // Set on load, or on resizing the window

  // get range based on scrollPosition, triggered by scrolling
  let scrollPosition = container.scrollLeft;
  let startIndex = getClosestFretnumber(
    scrollPosition,
    nutIsFixed ? fretWidths.slice(1) : fretWidths
  );
  let endIndex = startIndex + fretCount;
  let scrolledToEnd =
    container.scrollLeft + container.clientWidth === container.scrollWidth;
  if (scrolledToEnd) {
    startIndex = fretWidths.length - fretCount + 1;
    endIndex = fretWidths.length;
  } else if (startIndex > 0) {
    endIndex -= 1;
  }
  if (startIndex > 0 && !scrolledToEnd && nutIsFixed) {
    startIndex += 1;
    endIndex += 1;
  }
  return { start: startIndex, end: endIndex };
}

function getContainersToScroll(nutIsFixed) {
  let containersToScroll = [];
  if (nutIsFixed) {
    containersToScroll.push(document.getElementById("Strings"));
    containersToScroll.push(document.getElementById("FretVisuals"));
    containersToScroll.push(document.getElementById("StringVisuals"));
  } else {
    containersToScroll.push(document.getElementById("Fretboard"));
  }
  return containersToScroll;
}

function getStrings(tuning) {
  /* [
      {
        stringNumber: 1, 
        frets: [
                  {
                    fretNumber: 0, 
                    note: {acc, letter, pc, etc...}
                  },
                ]
      }
    ]
  */
  let strings = [];
  let string;
  let fret;
  let note;
  // add string objects to the strings array
  for (let i = 0; i < tuning.length; i++) {
    let stringNumber = tuning.length - i;
    string = { stringNumber, frets: [] };
    note = tuning[i];
    for (let fretNumber = 0; fretNumber <= 24; fretNumber++) {
      let midi = note.midi + fretNumber;
      let fretNote = Note.get(Note.fromMidiSharps(midi));
      fret = {
        fretNumber,
        note: {
          ...fretNote,
          stringNumber,
          selected: false,
          highlighted: false,
        },
        // making a noteObject that's not similar to the original Note.get() object,
        // might cause problems further down the road
        // when working with Tonal.js and your modified note objects
        // if everything breaks, you'll know why.
      };
      string.frets.push(fret);
    }
    strings.push(string);
  }

  return strings;
}

function getNotesLabelWidth(state) {
  if (state.fretboardStyle === "default") return state.fretWidths[0] - 4;
  if (state.fretboardStyle === "minimal") return null;
}

// function getNotesWidth_MinimalFretboard(
//   windowWidth,
//   fretboardPadding,
//   notesGap,
//   fretCount,
//   notesMaxWidth
// ) {
//   let notesWidth = 0;
//   let fretboardWidth = windowWidth - fretboardPadding * 2;
//   let widthOfAllGaps = notesGap * (fretCount - 1);
//   let availableSpaceForNotes = fretboardWidth - widthOfAllGaps; // -1 because almost always 1 less gap than notes
//   notesWidth = Math.floor(availableSpaceForNotes / fretCount);
//   if (notesWidth > notesMaxWidth) notesWidth = notesMaxWidth;
//   return notesWidth;
// }

function getFretWidthsGrowthFactor(windowWidth) {
  if (windowWidth <= 600) {
    return 0.3;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 0.33;
  } else if (windowWidth > 900) {
    return 0.35;
  }
}

function getNotesGap(fretboardVariant, windowWidth) {
  if (fretboardVariant === "default") {
    if (windowWidth <= 600) {
      return 10;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 15;
    } else if (windowWidth > 900) {
      return 20;
    }
  }
  if (fretboardVariant === "minimal") {
    if (windowWidth <= 600) {
      return 4;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 5;
    } else if (windowWidth > 900) {
      return 6;
    }
  }
}

function getNotesMinWidth(state, windowWidth) {
  if (state.fretboardStyle === "default") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 22;
    } else if (windowWidth > 900) {
      return 24;
    }
  }
  if (state.fretboardStyle === "minimal") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 25;
    } else if (windowWidth > 900) {
      return 30;
    }
  }
}
function getNotesMaxWidth(state, windowWidth) {
  if (state.fretboardStyle === "default") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 25;
    } else if (windowWidth > 900) {
      return 28;
    }
  }
  if (state.fretboardStyle === "minimal") {
    if (windowWidth <= 600) {
      return 35;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 40;
    } else if (windowWidth > 900) {
      return 45;
    }
  }
}

function getFretboardPadding(windowWidth) {
  if (windowWidth <= 600) {
    return 5;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 10;
  } else if (windowWidth > 900) {
    return 15;
  }
}

function getFretCap(state, windowWidth) {
  if (state.fretboardStyle === "default") {
    let fretboardWidth = windowWidth - state.fretboardPadding * 2;
    let fretCap = 0;
    let fretWidthsSum = 0;
    for (let fretWidth of state.fretWidths) {
      fretWidthsSum += fretWidth;
      if (fretWidthsSum < fretboardWidth + 0.001) {
        fretCap++;
      } else {
        break;
      }
    }
    if (fretCap > 25) fretCap = 25;
    return fretCap;
  }
}

// function getFretCap_MinimalFretboard(
//   windowWidth,
//   fretboardPadding,
//   notesGap,
//   notesMinWidth
// ) {
//   let fretboardWidth = windowWidth - fretboardPadding * 2;
//   let fretCap =
//     Math.floor((fretboardWidth + notesGap) / (notesMinWidth + notesGap)) - 1; // why -1
//   if (fretCap > 25) fretCap = 25;
//   return fretCap;
// }

function getFretCount(state) {
  if (state.fretboardStyle === "default") {
    if (state.preferredFretCount) {
      return Math.min(state.preferredFretCount, state.fretCap);
    } else {
      return state.fretCap;
    }
  }
  // if (fretboardStyle === "minimal") {
  //   if (preferredFretCount === 0 || preferredFretCount > 0) {
  //     return Math.min(preferredFretCount, fretCap);
  //   } else {
  //     let fretCount = Math.floor(
  //       (windowWidth - fretboardPadding * 2 + notesGap) /
  //         (notesMaxWidth + notesGap)
  //     );
  //     return Math.min(fretCount, fretCap);
  //   }
  // }
}

// function getFretCount_MinimalFretboard(
//   windowWidth,
//   fretboardPadding,
//   notesGap,
//   notesMaxWidth,
//   fretCap,
//   preferredFretCount
// ) {}

// function getMinimalNotesWidth(
//   windowWidth,
//   fretboardPadding,
//   notesGap,
//   fretCount,
//   notesMaxWidth
// ) {
//   let fretboardWidth = windowWidth - fretboardPadding * 2;
//   let widthOfAllGaps = notesGap * (fretCount - 1);
//   let availableSpaceForNotes = fretboardWidth - widthOfAllGaps; // -1 because almost always 1 less gap than notes
//   let newNotesWidth = Math.floor(availableSpaceForNotes / fretCount);
//   if (newNotesWidth > notesMaxWidth) newNotesWidth = notesMaxWidth;
//   return newNotesWidth;
// }

function getFretboardWidth(state) {
  let fretboardWidth = 0;
  for (
    let i = state.visibleFretsRange.start;
    i <= state.visibleFretsRange.end;
    i++
  ) {
    fretboardWidth += state.fretWidths[i];
  }

  if (state.nutIsFixed && state.visibleFretsRange.start !== 0) {
    // add the width of the fixed nut
    fretboardWidth += state.fretWidths[0];
  }

  return fretboardWidth; // +1 to account for subpixel rendering
}

function getFretboardWidth_MinimalFretboard(
  fretCount,
  notesLabelWidth,
  notesGap
) {
  if (fretCount === 0) return 0;
  let fretboardWidth =
    fretCount * notesLabelWidth + (fretCount - 1) * notesGap + 2; // Account for subpixel rendering
  return fretboardWidth;
}

function getFretWidths(state, windowWidth) {
  let fretboardWidth = windowWidth - state.fretboardPadding * 2;
  let spaceForIncrements = fretboardWidth * state.fretWidthsGrowthFactor;
  let spaceForFrets = fretboardWidth - spaceForIncrements;
  let notesLabelWidth = (spaceForFrets - 100) / 25;

  if (
    notesLabelWidth < state.notesMinWidth ||
    notesLabelWidth > state.notesMaxWidth
  ) {
    notesLabelWidth =
      notesLabelWidth < state.notesMinWidth
        ? state.notesMinWidth
        : state.notesMaxWidth;
    spaceForFrets = (notesLabelWidth + 4) * 25;
    let newFretboardWidth = spaceForFrets / (1 - state.fretWidthsGrowthFactor);
    spaceForIncrements = newFretboardWidth * state.fretWidthsGrowthFactor;
  }

  let fretWidths = [];
  let incPart = spaceForIncrements / 276;
  notesLabelWidth += 4;

  fretWidths.push(notesLabelWidth);

  for (let i = 23; i > 0; i--) {
    fretWidths.push(notesLabelWidth + i * incPart);
  }
  fretWidths.push(notesLabelWidth);

  return fretWidths;

  // Old code using an exponential growth matching that of an actual fretboard
  // let equalTemperamentConstant = 17.817;
  // equalTemperamentConstant = 80;
  // let nutWidth = notesMinWidth;

  // let fretWidths = [nutWidth];
  // // Calculate stringLength based on window size
  // let fretboardWidth = windowWidth - fretboardPadding * 2;
  // let spaceForFrets = fretboardWidth - nutWidth; // notesMinWidth is the very first fret, it will be placed in fretWidths by default
  // let fret24ToBridge = spaceForFrets / 4;
  // let stringLength = spaceForFrets + fret24ToBridge;

  // // Calculate stringLength based on notesMinWidth
  // let minFret23ToBridge = notesMinWidth * equalTemperamentConstant;
  // let minStringLength = (minFret23ToBridge - notesMinWidth) * 4;

  // // Calculate stringLength based on notesMaxWidth
  // let maxFret23ToBridge = notesMaxWidth * equalTemperamentConstant;
  // let maxStringLength = (maxFret23ToBridge - notesMaxWidth) * 4;

  // // let newValue = 1.2 * notesMinWidth;

  // if (stringLength < minStringLength) stringLength = minStringLength;
  // if (stringLength > maxStringLength) stringLength = maxStringLength;

  // for (let i = 1; i <= 24; i++) {
  //   let fretWidth = stringLength / equalTemperamentConstant; // Maybe rounding is needed
  //   stringLength -= fretWidth;
  //   fretWidths.push(fretWidth);
  // }

  // return fretWidths;
}

export const {
  refreshFretboard,
  initializeFretboard,
  setNutIsFixed,
  scrollFretboard,
  setFretboardSoundIsReady,
  setFretboardWidth,
  setPreferredFretCount,
} = FretboardSlice.actions;

export default FretboardSlice.reducer;
