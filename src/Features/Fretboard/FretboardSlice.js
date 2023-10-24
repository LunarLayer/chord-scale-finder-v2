import { createSlice } from "@reduxjs/toolkit";
import { getWindowWidth } from "../../Helpers/WindowHelper";
import { setWindowWidth } from "../UI/UISlice";
import { loginUser, setInstrumentDetails } from "../User/UserSlice";

const initialState = {
  fretboardIsReady: false,
  fretboardSoundIsReady: false,
  fretboardVariant: undefined, // minimal / default
  fretboardTheme: undefined, // black / blue / red etc.
  coloredNotes: false,
  notesGap: undefined,
  notesMinWidth: undefined,
  notesMaxWidth: undefined,
  fretboardPadding: undefined,
  fretCap: undefined,
  fretCount: undefined,
  notesWidth: undefined,
  fretboardWidth: undefined,
  fretWidths: undefined,
  fretWidthsGrowthFactor: undefined,
  preferredFretCount: undefined,
  tuning: undefined,
  stringCount: undefined,
};

const FretboardSlice = createSlice({
  name: "fretboard",
  initialState,
  reducers: {
    setFretboardSoundIsReady(state, action) {
      state.fretboardSoundIsReady = action.payload;
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
      .addCase(loginUser, (state, action) => {
        let windowWidth = getWindowWidth();
        const user = action.payload;
        if (user.instrument === "fretboard") {
          state.fretboardVariant = user.instrumentVariant;
          state.theme = user.theme;
          state.tuning = user.tuning;
          updateFretboard(state, windowWidth);
        }
      })
      .addCase(setInstrumentDetails, (state, action) => {
        let windowWidth = getWindowWidth();
        const { instrument, instrumentVariant, theme, tuning } = action.payload;
        if (instrument === "fretboard") {
          state.fretboardVariant = instrumentVariant;
          state.fretboardTheme = theme;
          state.tuning = tuning;
          // state.fretsWithNotes = getFretsWithNotes(tuning);
          updateFretboard(state, windowWidth);
        }
      });
  },
});

// function getTuning(rootNotes) {}

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
    state.notesGap = getNotesGap("default", windowWidth);
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
  state.stringCount = state.tuning.length;
  state.notesWidth = getNotesWidth_DefaultFretboard(state.fretWidths);
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
  state.notesWidth = getNotesWidth_MinimalFretboard(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.fretCount,
    state.notesMaxWidth
  );
  state.fretboardWidth = getFretboardWidth_MinimalFretboard(
    state.fretCount,
    state.notesWidth,
    state.notesGap
  );
  state.fretboardIsReady = true;
}

function getNotesWidth_DefaultFretboard(fretWidths) {
  return fretWidths[0] - 4;
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

function getFretCap_DefaultFretboard(
  windowWidth,
  fretboardPadding,
  fretWidths
) {
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

function getFretCount_DefaultFretboard(preferredFretCount, fretCap) {
  if (preferredFretCount === 0 || preferredFretCount > 0) {
    return Math.min(preferredFretCount, fretCap);
  } else {
    return fretCap;
  }
}

function getFretCount_MinimalFretboard(
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

function getFretboardWidth_DefaultFretboard(fretWidths, fretCount) {
  let newFretboardWidth = 0;
  for (let i = 0; i < fretCount; i++) {
    newFretboardWidth += fretWidths[i];
  }
  return newFretboardWidth;
}

function getFretboardWidth_MinimalFretboard(fretCount, notesWidth, notesGap) {
  if (fretCount === 0) return 0;
  let fretboardWidth = fretCount * notesWidth + (fretCount - 1) * notesGap + 2; // Account for subpixel rendering
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

export const {
  initializeFretboard,
  setFretboardSoundIsReady,
  setPreferredFretCount,
} = FretboardSlice.actions;

export default FretboardSlice.reducer;
