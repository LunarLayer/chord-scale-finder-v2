import { createSlice } from "@reduxjs/toolkit";
// import { getWindowWidth } from "../../Helpers/WindowHelper";
import { selectAllNotes } from "../MusicTheory/MusicTheorySlice";

// If no user is logged in: AppLayout: updateFretboard("onlyNotes");

const initialState = {
  fretboardIsLoading: true,
  theme: undefined,
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
  tuning: undefined,
};

const FretboardSlice = createSlice({
  name: "fretboard",
  initialState,
  reducers: {
    logNotes(state, action) {
      console.log("logging Notes");
      let notes = getAllNotes();
      console.log(notes);
    },
    initializeFretboard(state, action) {
      // let theme = "onlyNotes";
      // const allNotes = selectAllNotes(store.getState());
      // console.log(allNotes);
      // let windowWidth = getWindowWidth();
      // let notesGap = getNotesGap(windowWidth);
      // let notesMinWidth = getNotesMinWidth(windowWidth);
      // let notesMaxWidth = getNotesMaxWidth(windowWidth);
      // let fretboardPadding = getFretboardPadding(windowWidth);
      // let fretCap = getFretCap(
      //   windowWidth,
      //   fretboardPadding,
      //   notesGap,
      //   notesMinWidth,
      //   theme
      // );
      // let fretCount = getFretCount(
      //   windowWidth,
      //   fretboardPadding,
      //   notesGap,
      //   notesMaxWidth,
      //   fretCap
      // );
      // let notesWidth = getNotesWidth(
      //   windowWidth,
      //   theme,
      //   fretboardPadding,
      //   notesGap,
      //   fretCount,
      //   notesMaxWidth
      // );
      // let fretboardWidth = getFretboardWidth(fretCount, notesWidth, notesGap);
      // // prettier-ignore
      // let tuning = [
      //   { note: "G", octave: 2, hasAccidental: false },
      //   { note: "D", octave: 2, hasAccidental: false },
      //   { note: "A", octave: 1, hasAccidental: false },
      //   { note: "E", octave: 1, hasAccidental: false },
      // ];
      // let fretsWithNotes = getFretsWithNotes(tuning);
    },
    initializeFretboardTheme_OnlyNotes(state, action) {},
  },
});

const getAllNotes = (state) => {
  console.log("case");
  const allNotesValue = selectAllNotes(state);
  console.log(allNotesValue);
  return allNotesValue;
};

function initializeStateFor_OnlyNotesTheme(state) {
  console.log("running");

  return {
    ...state,
    notesGap,
    notesMinWidth,
    notesMaxWidth,
    fretboardPadding,
    fretCap,
    fretCount,
    notesWidth,
    fretboardWidth,
  };
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
  theme,
  fretboardPadding,
  notesGap,
  notesMinWidth
) {
  let fretCap;
  if (theme === "onlyNotes") {
    fretCap =
      Math.floor(
        (windowWidth - fretboardPadding * 2 + notesGap) /
          (notesMinWidth + notesGap)
      ) - 1; // why -1
    if (fretCap > 25) fretCap = 25;
  }
  return fretCap;
}

function getFretCount(
  windowWidth,
  preferredFretCount,
  fretCap,
  fretboardPadding,
  notesGap,
  notesMaxWidth
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
  theme,
  fretboardPadding,
  notesGap,
  fretCount,
  notesMaxWidth
) {
  let newNotesWidth = 0;
  if (theme === "default") {
    newNotesWidth = 25;
  }
  if (theme === "onlyNotes") {
    let availableSpaceForNotes =
      windowWidth - fretboardPadding * 2 - notesGap * (fretCount - 1); // -1 because almost always 1 less gap than notes
    newNotesWidth = Math.floor(availableSpaceForNotes / fretCount);
    if (newNotesWidth > notesMaxWidth) newNotesWidth = notesMaxWidth;
  }
  return newNotesWidth;
}

function getFretboardWidth(theme, fretCount, notesWidth, notesGap) {
  let fretboardWidth;
  if (theme === "onlyNotes")
    fretboardWidth = fretCount * notesWidth + (fretCount - 1) * notesGap + 2; // Account for subpixel rendering
  if (theme === "default") fretboardWidth = "implement this"; // Account for subpixel rendering
  return fretboardWidth;
}

function getFretsWithNotes(tuning) {}

function getFretWidths(windowWidth) {
  if (windowWidth <= 600) {
    return [
      25, 48.597, 47.272, 46.022, 44.843, 43.729, 42.678, 41.685, 40.749,
      39.865, 39.031, 38.243, 37.5, 36.798, 36.136, 35.511, 34.921, 34.364,
      33.839, 33.343, 32.875, 32.433, 32.015, 31.622, 31.25,
    ];
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return [
      25, 48.597, 47.272, 46.022, 44.843, 43.729, 42.678, 41.685, 40.749,
      39.865, 39.031, 38.243, 37.5, 36.798, 36.136, 35.511, 34.921, 34.364,
      33.839, 33.343, 32.875, 32.433, 32.015, 31.622, 31.25,
    ];
  } else if (windowWidth > 900) {
    return [
      25, 48.597, 47.272, 46.022, 44.843, 43.729, 42.678, 41.685, 40.749,
      39.865, 39.031, 38.243, 37.5, 36.798, 36.136, 35.511, 34.921, 34.364,
      33.839, 33.343, 32.875, 32.433, 32.015, 31.622, 31.25,
    ];
  }
}

export const { logNotes } = FretboardSlice.actions;

export default FretboardSlice.reducer;

// function getInitialState(theme) {
//   console.log("fretboardSlice getInitialState()");
//   let windowWidth = getWindowWidth();
//   let notesGap = getNotesGap(windowWidth);
//   let notesMinWidth = getNotesMinWidth(windowWidth);
//   let notesMaxWidth = getNotesMaxWidth(windowWidth);
//   let fretboardPadding = getFretboardPadding(windowWidth);
//   let fretCap = getFretCap(
//     windowWidth,
//     fretboardPadding,
//     notesGap,
//     notesMinWidth,
//     theme
//   );
//   let fretCount = getFretCount(
//     windowWidth,
//     fretboardPadding,
//     notesGap,
//     notesMaxWidth,
//     fretCap
//   );
//   let notesWidth = getNotesWidth(
//     windowWidth,
//     theme,
//     fretboardPadding,
//     notesGap,
//     fretCount,
//     notesMaxWidth
//   );
//   let fretboardWidth = getFretboardWidth(fretCount, notesWidth, notesGap);
//   let tuning = [
//     {
//       note: "G",
//       octave: 2,
//       hasAccidental: false,
//     },
//     {
//       note: "D",
//       octave: 2,
//       hasAccidental: false,
//     },
//     {
//       note: "A",
//       octave: 1,
//       hasAccidental: false,
//     },
//     {
//       note: "E",
//       octave: 1,
//       hasAccidental: false,
//     },
//   ];
//   let fretsWithNotes = getFretsWithNotes(tuning);
//   return {
//     fretboardIsLoading: true,
//     theme: "onlyNotes",
//     notesGap: undefined,
//     notesMinWidth: undefined,
//     notesMaxWidth: undefined,
//     fretboardPadding: undefined,
//     fretCap: undefined,
//     fretCount: undefined,
//     notesWidth: undefined,
//     fretboardWidth: undefined,
//     fretsWithNotes: undefined,
//     fretWidths: undefined,
//     preferredFretCount: undefined,
//   };
// }
