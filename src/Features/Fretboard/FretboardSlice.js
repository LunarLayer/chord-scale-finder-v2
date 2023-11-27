import { createSlice, current } from "@reduxjs/toolkit";
import { getWindowWidth } from "../../Helpers/WindowHelper";
import { setWindowWidth } from "../UI/UISlice";
import { loginUser, setInstrumentDetails } from "../User/UserSlice";
import { soundEngine } from "../../Helpers/SoundEngine";
import { Note } from "tonal";

const initialState = {
  fretboardIsReady: false,
  fretboardStyle: "default", // default / minimal
  fretboardTheme: "black", // black / blue / red etc.
  scrollPosition: undefined,
  nutIsFixed: false,
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
      if (state.nutIsFixed) {
        document.getElementById("Fretboard").scrollLeft = 0;
      } else {
        document.getElementById("Strings").scrollLeft = 0;
        document.getElementById("FretVisuals").scrollLeft = 0;
      }
      state.fretboardWidth = getFretboardWidth(
        state.fretWidths,
        state.visibleFretsRange,
        state.nutIsFixed
      );
      let newScrollPosition = getNewScrollPosition(
        state.nutIsFixed,
        state.fretWidths,
        state.visibleFretsRange
      );
      let containersToScroll = getContainersToScroll(state.nutIsFixed);
      for (let container of containersToScroll) {
        animateScroll(container, container.scrollLeft, newScrollPosition);
      }
    },
    scrollFretboard(state) {
      let containersToScroll = getContainersToScroll(state.nutIsFixed);
      state.preferredFretCount = state.fretCount;
      state.visibleFretsRange = getVisibleFretsRange(
        state.visibleFretsRange,
        state.fretCount,
        state.preferredFretCount,
        state.nutIsFixed,
        state.fretWidths,
        containersToScroll[0]
      );
      console.log(state.visibleFretsRange);
      state.fretboardWidth = getFretboardWidth(
        state.fretWidths,
        state.visibleFretsRange,
        state.nutIsFixed
      );
      let newScrollPosition = getNewScrollPosition(
        state.nutIsFixed,
        state.fretWidths,
        state.visibleFretsRange
      );
      for (let container of containersToScroll) {
        animateScroll(container, container.scrollLeft, newScrollPosition);
      }
    },
    clearAllNotes(state, action) {
      for (let string of state.strings) {
        for (let fret of string.frets) {
          fret.note.selected = false;
          fret.note.highlighted = false;
        }
      }
    },
    toggleHighlightNote(state, action) {
      const note = action.payload;
      for (let string of state.strings) {
        for (let fret of string.frets) {
          if (fret.note.pc.toLowerCase() === note) {
            fret.note.highlighted = !fret.note.highlighted;
          }
        }
      }
    },
    highlightAllNotes(state) {
      for (let string of state.strings) {
        for (let fret of string.frets) {
          fret.note.highlighted = true;
        }
      }
    },
    removeHighlightAllNotes(state) {
      for (let string of state.strings) {
        for (let fret of string.frets) {
          fret.note.highlighted = false;
        }
      }
    },
    selectNoteOnString(state, action) {
      const { note, stringIndex, markNotes } = action.payload;
      let fretIndex = state.strings[stringIndex].frets.findIndex(
        (fret) => fret.note.pc === note.pc && fret.note.oct === note.oct
      );
      state.strings[stringIndex].frets[fretIndex].note.selected = true;
    },
    deselectNoteOnString(state, action) {
      const { note, stringIndex, markNotes } = action.payload;
      let fretIndex = state.strings[stringIndex].frets.findIndex(
        (fret) => fret.note.pc === note.pc && fret.note.oct === note.oct
      );
      state.strings[stringIndex].frets[fretIndex].note.selected = false;
    },
    setPreferredFretCount(state, action) {
      state.preferredFretCount = action.payload;
      console.log(action.payload);
      updateFretboard(state);
    },
    refreshFretboard(state) {
      updateFretboard(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWindowWidth, (state, action) => {
        let newWindowWidth = action.payload;
        updateFretboard(state, newWindowWidth);
      })
      .addCase(loginUser, (state, action) => {
        let windowWidth = getWindowWidth();
        const { type, soundFile, style, theme, tuning } =
          action.payload.settings.instrument;
        if (type === "Fretboard") {
          soundEngine.loadSoundFile(soundFile);
          state.fretboardStyle = style;
          state.fretboardTheme = theme;
          state.tuning = tuning;
          updateFretboard(state, windowWidth);
        }
      })
      .addCase(setInstrumentDetails, (state, action) => {
        let windowWidth = getWindowWidth();
        const { instrument, instrumentVariant, theme } = action.payload;
        if (instrument === "fretboard") {
          state.fretboardVariant = instrumentVariant;
          state.fretboardTheme = theme;
          updateFretboard(state, windowWidth);
        }
      });
  },
});

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

function ScrollToNearestFret(
  scrollPos,
  containerId,
  fretCount,
  nutIsFixed,
  fretWidths
) {
  const container = document.getElementById(containerId);

  let scrollToPos = 0;
  let closestFretNumber = getClosestFretnumber(
    scrollPos,
    nutIsFixed ? fretWidths.slice(1) : fretWidths
  );

  console.log(closestFretNumber);

  const scrolledToEnd =
    container.scrollLeft + container.clientWidth === container.scrollWidth;
  if (scrolledToEnd) closestFretNumber = fretWidths.length - fretCount + 1;

  if (nutIsFixed) {
    for (let i = 1; i < closestFretNumber + 1; i++) {
      scrollToPos += fretWidths[i];
    }
  } else {
    for (let i = 0; i < closestFretNumber; i++) {
      scrollToPos += fretWidths[i];
    }
  }

  animateSnap(container, container.scrollLeft, scrollToPos, 250);
}

function resetScrollPositions(nutIsFixed, fretWidths) {
  let fretboard = document.getElementById("Fretboard");
  let strings = document.getElementById("Strings");
  let fretVisuals = document.getElementById("FretVisuals");
  let scrollPos, closestFret, startIndex, endIndex;
  let newScrollPos = 0;

  if (nutIsFixed) {
    scrollPos = fretboard.scrollLeft;
    closestFret = getClosestFretnumber(scrollPos, fretWidths);
    closestFret -= 1;
    for (let i = 1; i <= closestFret; i++) {
      newScrollPos += fretWidths[i];
    }
    fretboard.scrollLeft = 0;
    animateSnap(strings, scrollPos, newScrollPos, 250);
    animateSnap(fretVisuals, scrollPos, newScrollPos, 250);
  } else {
    scrollPos = strings.scrollLeft;
    closestFret = getClosestFretnumber(scrollPos, fretWidths);
    for (let i = 0; i <= closestFret; i++) {
      newScrollPos += fretWidths[i];
    }

    strings.scrollLeft = 0;
    fretVisuals.scrollLeft = 0;
    if (closestFret === 0) newScrollPos = 0;

    animateSnap(fretboard, scrollPos, newScrollPos, 250);
  }
}

function getClosestFretnumber(scrollPos, fretWidths) {
  let sum = 0;

  for (let i = 0; i < fretWidths.length; i++) {
    let nextSum = sum + fretWidths[i];

    // Check if scrollPos is in the current fret range
    if (scrollPos >= sum && scrollPos < nextSum) {
      let distanceToLeftFret = scrollPos - sum;
      let distanceToRightFret = nextSum - scrollPos;

      // Return the index of the closest fret
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

function updateFretboard(state, newWindowWidth) {
  console.log("updateFretboard");
  let windowWidth = newWindowWidth || getWindowWidth();
  if (newWindowWidth) {
    state.notesMinWidth = getNotesMinWidth(state.fretboardStyle, windowWidth);
    state.notesMaxWidth = getNotesMaxWidth(state.fretboardStyle, windowWidth);
    state.fretboardPadding = getFretboardPadding(windowWidth);
    state.fretWidthsGrowthFactor = getFretWidthsGrowthFactor(windowWidth);
    state.fretWidths = getFretWidths(
      windowWidth,
      state.fretboardPadding,
      state.notesMinWidth,
      state.notesMaxWidth,
      state.fretWidthsGrowthFactor
    );
  }
  state.notesLabelWidth = getNotesLabelWidth(
    state.fretboardStyle,
    state.fretWidths
  );
  state.fretCap = getFretCap(
    windowWidth,
    state.fretboardStyle,
    state.fretboardPadding,
    state.fretWidths
  );
  state.fretCount = getFretCount(
    state.fretboardStyle,
    state.preferredFretCount,
    state.fretCap
  );
  state.visibleFretsRange = getVisibleFretsRange(
    state.visibleFretsRange,
    state.fretCount,
    state.preferredFretCount
  );
  state.scrollPosition = getNewScrollPosition(
    state.nutIsFixed,
    state.fretWidths,
    state.visibleFretsRange
  );
  state.fretboardWidth = getFretboardWidth(
    state.fretWidths,
    state.visibleFretsRange,
    state.nutIsFixed
  );
  state.fretboardIsReady = true;
}

function getNewScrollPosition(nutIsFixed, fretWidths, visibleFretsRange) {
  let scrollPosition = 0;
  if (nutIsFixed) {
    for (let i = 1; i < visibleFretsRange.start; i++) {
      scrollPosition += fretWidths[i];
    }
  } else {
    for (let i = 0; i < visibleFretsRange.start; i++) {
      scrollPosition += fretWidths[i];
    }
  }
  return scrollPosition;
}

function getVisibleFretsRange(
  visibleFretsRange,
  fretCount,
  preferredFretCount,
  nutIsFixed,
  fretWidths,
  scrolledContainer
) {
  if (!preferredFretCount) return { start: 0, end: fretCount };

  let scrollPosition = scrolledContainer.scrollLeft;
  console.log("scrollPosition: " + scrollPosition);
  let startIndex = getClosestFretnumber(
    scrollPosition,
    nutIsFixed ? fretWidths.slice(1) : fretWidths
  );
  let endIndex = startIndex + fretCount;
  let scrolledToEnd =
    scrolledContainer.scrollLeft + scrolledContainer.clientWidth ===
    scrolledContainer.scrollWidth;
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
  } else {
    containersToScroll.push(document.getElementById("Fretboard"));
  }
  return containersToScroll;
}

function setVisibleFretsRange(start, end) {}

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

function getNotesLabelWidth(fretboardStyle, fretWidths) {
  if (fretboardStyle === "default") return fretWidths[0] - 4;
  if (fretboardStyle === "minimal") return null;
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

function getNotesMinWidth(style, windowWidth) {
  if (style === "default") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 22;
    } else if (windowWidth > 900) {
      return 24;
    }
  }
  if (style === "minimal") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 25;
    } else if (windowWidth > 900) {
      return 30;
    }
  }
}
function getNotesMaxWidth(style, windowWidth) {
  if (style === "default") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 25;
    } else if (windowWidth > 900) {
      return 28;
    }
  }
  if (style === "minimal") {
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

function getFretCap(windowWidth, fretboardStyle, fretboardPadding, fretWidths) {
  if (fretboardStyle === "default") {
    let fretboardWidth = windowWidth - fretboardPadding * 2;
    let fretCap = 0;
    let fretWidthsSum = 0;
    for (let fretWidth of fretWidths) {
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

function getFretCount(fretboardStyle, preferredFretCount, fretCap) {
  if (fretboardStyle === "default") {
    if (preferredFretCount) {
      return Math.min(preferredFretCount, fretCap);
    } else {
      return fretCap;
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

function getFretboardWidth(fretWidths, visibleFretsRange, nutIsFixed) {
  let fretboardWidth = 0;
  for (let i = visibleFretsRange.start; i < visibleFretsRange.end; i++) {
    fretboardWidth += fretWidths[i];
  }
  if (nutIsFixed && visibleFretsRange.start !== 0)
    fretboardWidth += fretWidths[0];
  return fretboardWidth + 1; // +1 to account for subpixel rendering
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

function getFretWidths(
  windowWidth,
  fretboardPadding,
  notesMinWidth,
  notesMaxWidth,
  fretWidthsGrowthFactor
) {
  let fretboardWidth = windowWidth - fretboardPadding * 2;
  let spaceForIncrements = fretboardWidth * fretWidthsGrowthFactor;
  let spaceForFrets = fretboardWidth - spaceForIncrements;
  let notesLabelWidth = (spaceForFrets - 100) / 25;

  if (notesLabelWidth < notesMinWidth || notesLabelWidth > notesMaxWidth) {
    notesLabelWidth =
      notesLabelWidth < notesMinWidth ? notesMinWidth : notesMaxWidth;
    spaceForFrets = (notesLabelWidth + 4) * 25;
    let newFretboardWidth = spaceForFrets / (1 - fretWidthsGrowthFactor);
    spaceForIncrements = newFretboardWidth * fretWidthsGrowthFactor;
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
  clearAllNotes,
  toggleHighlightNote,
  highlightAllNotes,
  removeHighlightAllNotes,
  selectNoteOnString,
  deselectNoteOnString,
  setPreferredFretCount,
} = FretboardSlice.actions;

export default FretboardSlice.reducer;
