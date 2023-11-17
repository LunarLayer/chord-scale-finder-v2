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
  fretWidthsGrowthFactor: undefined,
  tuning: undefined,
  coloredNotes: undefined,
};

const FretboardSlice = createSlice({
  name: "fretboard",
  initialState,
  reducers: {
    setNutIsFixed(state, action) {
      state.fretboardIsReady = false;
      state.nutIsFixed = action.payload;
      resetScrollPositions(action.payload, state.fretWidths);
      updateFretboard(state);
    },
    scrollToNearestFret(state, action) {
      const { containerId, scrollPos } = action.payload;
      const container = document.getElementById(containerId);
      let newFretboardWidth,
        fretWidths,
        startIndex,
        endIndex,
        fretCount,
        newScrollPos;
      let scrolledToEnd =
        container.scrollLeft + container.clientWidth === container.scrollWidth;

      fretCount = state.fretCount - 1;
      if (state.nutIsFixed) {
        fretWidths = state.fretWidths.slice(1);
        newFretboardWidth = state.fretWidths[0];
      } else {
        newFretboardWidth = 0;
        fretWidths = state.fretWidths;
      }

      // Determine startIndex & endIndex
      if (scrollPos === 0) {
        startIndex = 0;
        endIndex = state.nutIsFixed ? fretCount : fretCount + 1;
      }
      if (scrollPos > 0 && !scrolledToEnd) {
        startIndex = getClosestFretnumber(scrollPos, fretWidths);
        if (startIndex === 0) {
          endIndex = state.nutIsFixed
            ? startIndex + fretCount
            : startIndex + fretCount + 1;
        } else {
          endIndex = startIndex + fretCount;
        }
      }
      if (scrolledToEnd) {
        startIndex = state.nutIsFixed
          ? state.fretWidths.length - fretCount - 1
          : state.fretWidths.length - fretCount;
        endIndex = state.fretWidths.length;
      }

      newFretboardWidth += fretWidths
        .slice(startIndex, endIndex)
        .reduce((sum, current) => sum + current);

      if (startIndex === 0) {
        newScrollPos = 0;
      } else {
        newScrollPos = fretWidths
          .slice(0, startIndex)
          .reduce((sum, current) => sum + current);
      }

      animateSnap(container, container.scrollLeft, newScrollPos, 250);
      state.fretboardWidth = newFretboardWidth + 1; // +1 to account for subpixel-rendering
      state.preferredFretCount = state.fretCount;
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

function resetScrollPositions(nutIsFixed, fretWidths) {
  let fretboard = document.getElementById("Fretboard");
  let strings = document.getElementById("Strings");
  let fretVisuals = document.getElementById("FretVisuals");

  if (nutIsFixed) {
    console.log("nutIsNowFixed");
    if (strings.scrollLeft > fretWidths[0]) {
      // none
    }
  } else {
    // console.log("nutNotFixed");
    // strings.scrollLeft -= fretWidths[0];
    // fretVisuals.scrollLeft -= fretWidths[0];
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

function animateSnap(container, start, target, duration) {
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
  state.fretboardWidth = getFretboardWidth(
    state.fretboardStyle,
    state.fretWidths,
    state.fretCount,
    state.nutIsFixed,
    state.fretboardIsReady,
    state.preferredFretCount
  );
  state.fretboardIsReady = true;
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

function updateDefaultFretboard(state, newWindowWidth) {
  let windowWidth = newWindowWidth || getWindowWidth();
  if (newWindowWidth) {
    state.notesMinWidth = getNotesMinWidth("default", windowWidth);
    state.notesMaxWidth = getNotesMaxWidth("default", windowWidth);
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
  state.notesLabelWidth = getNotesLabelWidth_DefaultFretboard(state.fretWidths);
  state.fretCap = getFretCap_DefaultFretboard(
    windowWidth,
    state.fretboardPadding,
    state.fretWidths
  );
  state.fretCount = getFretCount_DefaultFretboard(
    state.preferredFretCount,
    state.fretCap
  );
  state.fretboardWidth = getFretboardWidth_DefaultFretboard(
    state.fretWidths,
    state.fretCount
  );
  state.fretboardIsReady = true;
}

function updateMinimalFretboard(state, newWindowWidth) {
  let windowWidth = newWindowWidth || getWindowWidth();
  if (newWindowWidth) {
    state.notesGap = getNotesGap("minimal", windowWidth);
    state.notesMinWidth = getNotesMinWidth("minimal", windowWidth);
    state.notesMaxWidth = getNotesMaxWidth("minimal", windowWidth);
    state.fretboardPadding = getFretboardPadding(windowWidth);
  }
  state.fretCap = getFretCap_MinimalFretboard(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.notesMinWidth
  );
  state.fretCount = getFretCount_MinimalFretboard(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.notesMaxWidth,
    state.fretCap,
    state.preferredFretCount
  );
  state.notesLabelWidth = getNotesLabelWidth_MinimalFretboard(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.fretCount,
    state.notesMaxWidth
  );
  state.fretboardWidth = getFretboardWidth_MinimalFretboard(
    state.fretCount,
    state.notesLabelWidth,
    state.notesGap
  );
  state.fretboardIsReady = true;
}

function getNotesLabelWidth(fretboardStyle, fretWidths) {
  if (fretboardStyle === "default") return fretWidths[0] - 4;
  if (fretboardStyle === "minimal") return null;
}

function getNotesWidth_MinimalFretboard(
  windowWidth,
  fretboardPadding,
  notesGap,
  fretCount,
  notesMaxWidth
) {
  let notesWidth = 0;
  let fretboardWidth = windowWidth - fretboardPadding * 2;
  let widthOfAllGaps = notesGap * (fretCount - 1);
  let availableSpaceForNotes = fretboardWidth - widthOfAllGaps; // -1 because almost always 1 less gap than notes
  notesWidth = Math.floor(availableSpaceForNotes / fretCount);
  if (notesWidth > notesMaxWidth) notesWidth = notesMaxWidth;
  return notesWidth;
}

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

function getFretCap_MinimalFretboard(
  windowWidth,
  fretboardPadding,
  notesGap,
  notesMinWidth
) {
  let fretboardWidth = windowWidth - fretboardPadding * 2;
  let fretCap =
    Math.floor((fretboardWidth + notesGap) / (notesMinWidth + notesGap)) - 1; // why -1
  if (fretCap > 25) fretCap = 25;
  return fretCap;
}

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

function getFretCount_MinimalFretboard(
  windowWidth,
  fretboardPadding,
  notesGap,
  notesMaxWidth,
  fretCap,
  preferredFretCount
) {}

function getMinimalNotesWidth(
  windowWidth,
  fretboardPadding,
  notesGap,
  fretCount,
  notesMaxWidth
) {
  let fretboardWidth = windowWidth - fretboardPadding * 2;
  let widthOfAllGaps = notesGap * (fretCount - 1);
  let availableSpaceForNotes = fretboardWidth - widthOfAllGaps; // -1 because almost always 1 less gap than notes
  let newNotesWidth = Math.floor(availableSpaceForNotes / fretCount);
  if (newNotesWidth > notesMaxWidth) newNotesWidth = notesMaxWidth;
  return newNotesWidth;
}

function getFretboardWidth(
  fretboardStyle,
  fretWidths,
  fretCount,
  nutIsFixed,
  fretboardIsReady,
  preferredFretCount
) {
  let newFretboardWidth = 0;
  if (fretboardIsReady && preferredFretCount) {
    let scrollPos, startIndex, endIndex;

    if (nutIsFixed) {
      scrollPos = document.getElementById("Strings").scrollLeft;
      startIndex = getClosestFretnumber(scrollPos, fretWidths.slice(1));
      startIndex += 1;
      endIndex = startIndex + fretCount - 1;
      newFretboardWidth += fretWidths[0];
    } else {
      scrollPos = document.getElementById("Fretboard").scrollLeft;
      startIndex = getClosestFretnumber(scrollPos, fretWidths);
      endIndex = startIndex + fretCount;
      if (scrollPos > 0) endIndex -= 1;
    }

    while (endIndex > fretWidths.length) {
      startIndex -= 1;
      endIndex -= 1;
    }

    newFretboardWidth += fretWidths
      .slice(startIndex, endIndex)
      .reduce((sum, current) => sum + current);

    return newFretboardWidth + 1; // +1 for subpixel-rendering
  } else {
    if (fretboardStyle === "default") {
      newFretboardWidth = 0;
      for (let i = 0; i < fretCount; i++) {
        newFretboardWidth += fretWidths[i];
      }
      return newFretboardWidth + 1;
    }
  }
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
  scrollToNearestFret,
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
