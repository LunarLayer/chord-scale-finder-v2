import { createSlice } from "@reduxjs/toolkit";
import { getWindowWidth } from "../../Helpers/WindowHelper";
import { getFretsWithNotes } from "../../Helpers/InstrumentHelper";
import { setWindowWidth } from "../UI/UISlice";

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
      updateDefaultFretboard(state, windowWidth);
    },
    setPreferredFretCount(state, action) {
      state.preferredFretCount = action.payload;
      updateFretboard(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setWindowWidth, (state, action) => {
      console.log("resize");
      let newWindowWidth = action.payload;
      updateFretboard(state, newWindowWidth);
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
    state.notesGap = 25;
    state.notesMinWidth = getNotesMinWidth(newWindowWidth);
    state.notesMaxWidth = getNotesMaxWidth(newWindowWidth);
    state.fretboardPadding = getFretboardPadding(newWindowWidth);
    state.fretWidths = getFretWidths(windowWidth, state.fretboardPadding);
  }
  state.fretCap = getFretCap(
    windowWidth,
    state.fretboardVariant,
    state.fretboardPadding,
    state.notesGap,
    state.notesMinWidth
  );
  state.fretCount = getFretCount(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.notesMaxWidth,
    state.fretCap,
    state.preferredFretCount
  );
  state.notesWidth = getNotesWidth(
    windowWidth,
    state.fretboardVariant,
    state.fretboardPadding,
    state.notesGap,
    state.fretCount,
    state.notesMaxWidth
  );
  state.fretboardWidth = getFretboardWidth(
    state.fretboardVariant,
    state.fretCount,
    state.notesWidth,
    state.notesGap
  );
  state.fretsWithNotes = getFretsWithNotes(state.tuning);
  state.fretboardIsReady = true;
}

function updateMinimalFretboard(state, newWindowWidth) {
  let windowWidth = newWindowWidth || getWindowWidth();
  if (newWindowWidth) {
    state.notesGap = getNotesGap(newWindowWidth);
    state.notesMinWidth = getNotesMinWidth(newWindowWidth);
    state.notesMaxWidth = getNotesMaxWidth(newWindowWidth);
    state.fretboardPadding = getFretboardPadding(newWindowWidth);
  }
  state.fretCap = getFretCap(
    windowWidth,
    state.fretboardVariant,
    state.fretboardPadding,
    state.notesGap,
    state.notesMinWidth
  );
  state.fretCount = getFretCount(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.notesMaxWidth,
    state.fretCap,
    state.preferredFretCount
  );
  state.notesWidth = getNotesWidth(
    windowWidth,
    state.fretboardVariant,
    state.fretboardPadding,
    state.notesGap,
    state.fretCount,
    state.notesMaxWidth
  );
  state.fretboardWidth = getFretboardWidth(
    state.fretboardVariant,
    state.fretCount,
    state.notesWidth,
    state.notesGap
  );
  state.fretboardIsReady = true;
}

function getNotesGap(windowWidth) {
  if (windowWidth <= 600) {
    return 4;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 5;
  } else if (windowWidth > 900) {
    return 6;
  }
}

function getNotesMinWidth(windowWidth) {
  if (windowWidth <= 600) {
    return 20;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 25;
  } else if (windowWidth > 900) {
    return 30;
  }
}
function getNotesMaxWidth(windowWidth) {
  if (windowWidth <= 600) {
    return 35;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 40;
  } else if (windowWidth > 900) {
    return 45;
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

function getFretCap(
  windowWidth,
  fretboardVariant,
  fretboardPadding,
  notesGap,
  notesMinWidth
) {
  let fretCap;
  let fretboardWidth = windowWidth - fretboardPadding * 2;
  if (fretboardVariant === "minimal") {
    fretCap =
      Math.floor((fretboardWidth + notesGap) / (notesMinWidth + notesGap)) - 1; // why -1
    if (fretCap > 25) fretCap = 25;
  }
  if (fretboardVariant === "default") {
    fretCap = Math.floor(fretboardWidth / (notesMinWidth + notesGap)) - 1; // why -1
    if (fretCap > 25) fretCap = 25;
  }
  return fretCap;
}

function getFretCount(
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

function getNotesWidth(
  windowWidth,
  fretboardVariant,
  fretboardPadding,
  notesGap,
  fretCount,
  notesMaxWidth
) {
  let newNotesWidth = 0;
  let fretboardWidth = windowWidth - fretboardPadding * 2;
  if (fretboardVariant === "default") {
    newNotesWidth = 25;
  }
  if (fretboardVariant === "minimal") {
    let widthOfAllGaps = notesGap * (fretCount - 1);
    let availableSpaceForNotes = fretboardWidth - widthOfAllGaps; // -1 because almost always 1 less gap than notes
    newNotesWidth = Math.floor(availableSpaceForNotes / fretCount);
    if (newNotesWidth > notesMaxWidth) newNotesWidth = notesMaxWidth;
  }
  return newNotesWidth;
}

function getFretboardWidth(fretboardVariant, fretCount, notesWidth, notesGap) {
  let fretboardWidth;
  if (fretboardVariant === "minimal")
    fretboardWidth = fretCount * notesWidth + (fretCount - 1) * notesGap + 2; // Account for subpixel rendering
  if (fretboardVariant === "default") fretboardWidth = "implement this"; // Account for subpixel rendering
  return fretboardWidth;
}
// prettier-ignore
function getFretWidths(windowWidth, fretboardPadding) {
  const equalTemperamentConstant = 17.817;
  let fretboardWidth = windowWidth - fretboardPadding * 2;
  let nutMinSize = 25; // 30 // 35

  let spaceForFrets = fretboardWidth - nutMinSize;
  let fret24ToBridge = spaceForFrets / 4;
  let scaleLength = spaceForFrets + fret24ToBridge;
  
  let fretWidths = [];
  
  for (let i = 0; i < 24; i++) {
    // console.log("scaleLength: " + scaleLength)
    let fretWidth = scaleLength / equalTemperamentConstant;
    scaleLength = scaleLength - fretWidth;
    fretWidths.push(fretWidth)
  }

  console.log("fretWidths.count: " + fretWidths.length)
  
  console.log("fretWidths: " + fretWidths)
  // spaceForFrets - (12th Root of 2) + remove size from fretboard to bridge = fretWidths[]
  
  const twelfthRootOf2 = Math.pow(2, 1/12);
  console.log(twelfthRootOf2);
  
  

  return fretWidths;










  // NoteMaxWidths: 35 - 40 - 45
  // NoteMinWidths: 20 - 25 - 30
  // return [
  //   25, 55.556, 108.025, 157.579, 204.38, 248.581, 290.327, 329.753, 366.989,
  //   402.156, 435.37, 466.738, 496.364, 524.344, 550.769, 575.726, 599.297,
  //   621.558, 642.583, 662.439, 681.193, 698.904, 715.632, 731.43, 746.351,
  // ];
  // return [
  //   25, 55.556, 52.469, 49.554, 46.801, 44.201, 41.746, 39.426, 37.236, 33.167,
  //   33.214, 31.368, 29.626, 28.375, 25.425, 24.957, 23.571, 22.261, 19.025,
  //   19.856, 18.754, 17.711, 16.728, 15.798,
  // ];
  // if (windowWidth <= 600) {
  //   return [
  //     25, 48.597, 47.272, 46.022, 44.843, 43.729, 42.678, 41.685, 40.749,
  //     39.865, 39.031, 38.243, 37.5, 36.798, 36.136, 35.511, 34.921, 34.364,
  //     33.839, 33.343, 32.875, 32.433, 32.015, 31.622, 31.25,
  //   ];
  // } else if (windowWidth > 600 && windowWidth <= 900) {
  //   return [
  //     25, 48.597, 47.272, 46.022, 44.843, 43.729, 42.678, 41.685, 40.749,
  //     39.865, 39.031, 38.243, 37.5, 36.798, 36.136, 35.511, 34.921, 34.364,
  //     33.839, 33.343, 32.875, 32.433, 32.015, 31.622, 31.25,
  //   ];
  // } else if (windowWidth > 900) {
  //   return [
  //     25, 48.597, 47.272, 46.022, 44.843, 43.729, 42.678, 41.685, 40.749,
  //     39.865, 39.031, 38.243, 37.5, 36.798, 36.136, 35.511, 34.921, 34.364,
  //     33.839, 33.343, 32.875, 32.433, 32.015, 31.622, 31.25,
  //   ];
  // }
}

export const { initializeFretboard, setPreferredFretCount } =
  FretboardSlice.actions;

export default FretboardSlice.reducer;
