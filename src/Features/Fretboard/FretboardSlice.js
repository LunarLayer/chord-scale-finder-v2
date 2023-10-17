import { createSlice } from "@reduxjs/toolkit";
import { getWindowWidth } from "../../Helpers/WindowHelper";
import { getFretsWithNotes } from "../../Helpers/InstrumentHelper";
import { setCurrentViewSection1, setWindowWidth } from "../UI/UISlice";

const initialState = {
  fretboardIsReady: undefined,
  fretboardVariant: "default", // minimal
  fretboardTheme: "black", // blue, red, etc.
  coloredNotes: false,
  notesGap: undefined,
  notesMinWidth: undefined,
  notesMaxWidth: undefined,
  fretboardPadding: undefined,
  fretCap: undefined,
  fretCount: undefined,
  notesWidth: undefined,
  fretboardWidth: undefined,
  fretsWithNotes: undefined,
  fretWidths: undefined,
  fretWidthsGrowthFactor: undefined,
  preferredFretCount: undefined,
  tuning: [
    { note: "G", octave: 2, hasAccidental: false },
    { note: "D", octave: 2, hasAccidental: false },
    { note: "A", octave: 1, hasAccidental: false },
    { note: "E", octave: 1, hasAccidental: false },
  ],
};

const FretboardSlice = createSlice({
  name: "fretboard",
  initialState,
  reducers: {
    initializeFretboard(state) {
      let windowWidth = getWindowWidth();
      state.fretsWithNotes = getFretsWithNotes(state.tuning);
      // updateDefaultFretboard(state, windowWidth);
      updateDefaultFretboard(state, windowWidth);
    },
    setPreferredFretCount(state, action) {
      state.preferredFretCount = action.payload;
      updateFretboard(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWindowWidth, (state, action) => {
        let newWindowWidth = action.payload;
        updateFretboard(state, newWindowWidth);
      })
      .addCase(setCurrentViewSection1, (state, action) => {
        // console.log(".addCase(setCurrentViewSection1");
        // console.log(action.payload);
        // let newWindowWidth = action.payload;
        // updateFretboard(state, newWindowWidth);
      });
  },
});

function updateFretboard(state, newWindowWidth) {
  if (newWindowWidth) {
    if (state.fretboardVariant === "default")
      updateDefaultFretboard(state, newWindowWidth);
    if (state.fretboardVariant === "minimal")
      updateMinimalFretboard(state, newWindowWidth);
  } else {
    if (state.fretboardVariant === "default") updateDefaultFretboard(state);
    if (state.fretboardVariant === "minimal") updateMinimalFretboard(state);
  }
}

function updateDefaultFretboard(state, newWindowWidth) {
  let windowWidth = newWindowWidth || getWindowWidth();
  if (newWindowWidth) {
    state.notesGap = getNotesGap(state.fretboardVariant, windowWidth);
    state.notesMinWidth = getNotesMinWidth(
      state.fretboardVariant,
      newWindowWidth
    );
    state.notesMaxWidth = getNotesMaxWidth(
      state.fretboardVariant,
      newWindowWidth
    );
    state.fretboardPadding = getFretboardPadding(newWindowWidth);
    state.fretWidthsGrowthFactor = getFretsWidthGrowthFactor(windowWidth);
    state.fretWidths = getFretWidths(
      windowWidth,
      state.fretboardPadding,
      state.notesMinWidth,
      state.notesMaxWidth,
      state.fretWidthsGrowthFactor
    );
    state.notesWidth = getDefaultNotesWidth(state.fretWidths);
    // state.notesWidth = state.fretWidths[state.fretWidths.length - 1];
  }
  state.fretCap = getDefaultFretCap(
    windowWidth,
    state.fretboardPadding,
    state.fretWidths
  );
  state.fretCount = getDefaultFretCount(
    state.preferredFretCount,
    state.fretCap
  );
  state.fretboardWidth = getDefaultFretboardWidth(
    state.fretWidths,
    state.fretCount
  );
  state.fretsWithNotes = getFretsWithNotes(state.tuning);
  state.fretboardIsReady = true;
}

function updateMinimalFretboard(state, newWindowWidth) {
  let windowWidth = newWindowWidth || getWindowWidth();
  if (newWindowWidth) {
    state.notesGap = getNotesGap(state.fretboardVariant, newWindowWidth);
    state.notesMinWidth = getNotesMinWidth(
      state.fretboardVariant,
      newWindowWidth
    );
    state.notesMaxWidth = getNotesMaxWidth(
      state.fretboardVariant,
      newWindowWidth
    );
    state.fretboardPadding = getFretboardPadding(newWindowWidth);
  }
  state.fretCap = getMinimalFretCap(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.notesMinWidth
  );
  state.fretCount = getMinimalFretCount(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.notesMaxWidth,
    state.fretCap,
    state.preferredFretCount
  );
  state.notesWidth = getMinimalNotesWidth(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.fretCount,
    state.notesMaxWidth
  );
  state.fretboardWidth = getMinimalFretboardWidth(
    state.fretCount,
    state.notesWidth,
    state.notesGap
  );
  state.fretboardIsReady = true;
}

function getFretsWidthGrowthFactor(windowWidth) {
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

function getNotesMinWidth(fretboardVariant, windowWidth) {
  if (fretboardVariant === "default") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 22;
    } else if (windowWidth > 900) {
      return 24;
    }
  }
  if (fretboardVariant === "minimal") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 25;
    } else if (windowWidth > 900) {
      return 30;
    }
  }
}
function getNotesMaxWidth(fretboardVariant, windowWidth) {
  if (fretboardVariant === "default") {
    if (windowWidth <= 600) {
      return 20;
    } else if (windowWidth > 600 && windowWidth <= 900) {
      return 25;
    } else if (windowWidth > 900) {
      return 28;
    }
  }
  if (fretboardVariant === "minimal") {
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

function getDefaultFretCap(windowWidth, fretboardPadding, fretWidths) {
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

function getMinimalFretCap(
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

function getDefaultFretCount(preferredFretCount, fretCap) {
  if (preferredFretCount === 0 || preferredFretCount > 0) {
    return Math.min(preferredFretCount, fretCap);
  } else {
    return fretCap;
  }
}

function getMinimalFretCount(
  windowWidth,
  fretboardPadding,
  notesGap,
  notesMaxWidth,
  fretCap,
  preferredFretCount
) {
  if (preferredFretCount === 0 || preferredFretCount > 0) {
    return Math.min(preferredFretCount, fretCap);
  } else {
    let fretCount = Math.floor(
      (windowWidth - fretboardPadding * 2 + notesGap) /
        (notesMaxWidth + notesGap)
    );
    return Math.min(fretCount, fretCap);
  }
}

function getDefaultNotesWidth(fretWidths) {
  return fretWidths[0] - 4;
}

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

function getDefaultFretboardWidth(fretWidths, fretCount) {
  let newFretboardWidth = 0;
  for (let i = 0; i < fretCount; i++) {
    newFretboardWidth += fretWidths[i];
  }
  return newFretboardWidth;
}

function getMinimalFretboardWidth(fretCount, notesWidth, notesGap) {
  let minimalFretboardWidth =
    fretCount * notesWidth + (fretCount - 1) * notesGap + 2; // Account for subpixel rendering
  return minimalFretboardWidth;
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
  let notesWidth = (spaceForFrets - 100) / 25;

  if (notesWidth < notesMinWidth || notesWidth > notesMaxWidth) {
    notesWidth = notesWidth < notesMinWidth ? notesMinWidth : notesMaxWidth;
    spaceForFrets = (notesWidth + 4) * 25;
    let newFretboardWidth = spaceForFrets / (1 - fretWidthsGrowthFactor);
    spaceForIncrements = newFretboardWidth * fretWidthsGrowthFactor;
  }

  // return values;
  let fretWidths = [];
  let incPart = spaceForIncrements / 276;
  notesWidth += 4;

  fretWidths.push(notesWidth);

  for (let i = 23; i > 0; i--) {
    fretWidths.push(notesWidth + i * incPart);
  }
  fretWidths.push(notesWidth);

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

export const { initializeFretboard, setPreferredFretCount } =
  FretboardSlice.actions;

export default FretboardSlice.reducer;
