import { createSlice, current } from "@reduxjs/toolkit";
import { setWindowWidth } from "../ui/uiSlice";

import { getWindowWidth } from "../../helpers/windowHelper";

console.log("fretboardSlice");

function getInitialState() {
  let windowWidth = getWindowWidth();
  let notesGap = getNotesGap(windowWidth);
  let notesMinWidth = getNotesMinWidth(windowWidth);
  let notesMaxWidth = getNotesMaxWidth(windowWidth);
  let fretboardPadding = getFretboardPadding(windowWidth);
  let fretCap = getFretCap(
    windowWidth,
    fretboardPadding,
    notesGap,
    notesMinWidth
  );
  let fretCount = getFretCount(
    windowWidth,
    fretboardPadding,
    notesGap,
    notesMaxWidth,
    fretCap
  ); // consider renaming to visibleFrets
  let notesWidth = getNotesWidth(
    windowWidth,
    fretboardPadding,
    notesGap,
    fretCount,
    notesMaxWidth
  );
  let fretboardWidth = getFretboardWidth(fretCount, notesWidth, notesGap);

  return {
    fretboardIsLoading: false,
    preferredFretCount: null,
    notesGap,
    notesMinWidth,
    notesMaxWidth,
    fretboardPadding,
    fretCap,
    fretCount, // consider renaming to visibleFrets
    notesWidth,
    fretboardWidth,
    strings: [
      {
        stringNumber: 4,
        rootNote: "G",
        notes: [
          { note: "G", fret: 0, selected: false, highlight: false },
          { note: "G#", fret: 1, selected: false, highlight: false },
          { note: "A", fret: 2, selected: false, highlight: false },
          { note: "A#", fret: 3, selected: false, highlight: false },
          { note: "B", fret: 4, selected: false, highlight: false },
          { note: "C", fret: 5, selected: false, highlight: false },
          { note: "C#", fret: 6, selected: false, highlight: false },
          { note: "D", fret: 7, selected: false, highlight: false },
          { note: "D#", fret: 8, selected: false, highlight: false },
          { note: "E", fret: 9, selected: false, highlight: false },
          { note: "F", fret: 10, selected: false, highlight: false },
          { note: "F#", fret: 11, selected: false, highlight: false },
          { note: "G", fret: 12, selected: false, highlight: false },
          { note: "G#", fret: 13, selected: false, highlight: false },
          { note: "A", fret: 14, selected: false, highlight: false },
          { note: "A#", fret: 15, selected: false, highlight: false },
          { note: "B", fret: 16, selected: false, highlight: false },
          { note: "C", fret: 17, selected: false, highlight: false },
          { note: "C#", fret: 18, selected: false, highlight: false },
          { note: "D", fret: 19, selected: false, highlight: false },
          { note: "D#", fret: 20, selected: false, highlight: false },
          { note: "E", fret: 21, selected: false, highlight: false },
          { note: "F", fret: 22, selected: false, highlight: false },
          { note: "F#", fret: 23, selected: false, highlight: false },
          { note: "G", fret: 25, selected: false, highlight: false },
        ],
      },
      {
        stringNumber: 3,
        rootNote: "D",
        notes: [
          { note: "D", fret: 0, selected: false, highlight: false },
          { note: "D#", fret: 1, selected: false, highlight: false },
          { note: "E", fret: 2, selected: false, highlight: false },
          { note: "F", fret: 3, selected: false, highlight: false },
          { note: "F#", fret: 4, selected: false, highlight: false },
          { note: "G", fret: 5, selected: false, highlight: false },
          { note: "G#", fret: 6, selected: false, highlight: false },
          { note: "A", fret: 7, selected: false, highlight: false },
          { note: "A#", fret: 8, selected: false, highlight: false },
          { note: "B", fret: 9, selected: false, highlight: false },
          { note: "C", fret: 10, selected: false, highlight: false },
          { note: "C#", fret: 11, selected: false, highlight: false },
          { note: "D", fret: 12, selected: false, highlight: false },
          { note: "D#", fret: 13, selected: false, highlight: false },
          { note: "E", fret: 14, selected: false, highlight: false },
          { note: "F", fret: 15, selected: false, highlight: false },
          { note: "F#", fret: 16, selected: false, highlight: false },
          { note: "G", fret: 17, selected: false, highlight: false },
          { note: "G#", fret: 18, selected: false, highlight: false },
          { note: "A", fret: 19, selected: false, highlight: false },
          { note: "A#", fret: 20, selected: false, highlight: false },
          { note: "B", fret: 21, selected: false, highlight: false },
          { note: "C", fret: 22, selected: false, highlight: false },
          { note: "C#", fret: 23, selected: false, highlight: false },
          { note: "D", fret: 24, selected: false, highlight: false },
        ],
      },
      {
        stringNumber: 2,
        rootNote: "A",
        notes: [
          { note: "A", fret: 0, selected: false, highlight: false },
          { note: "A#", fret: 1, selected: false, highlight: false },
          { note: "B", fret: 2, selected: false, highlight: false },
          { note: "C", fret: 3, selected: false, highlight: false },
          { note: "C#", fret: 4, selected: false, highlight: false },
          { note: "D", fret: 5, selected: false, highlight: false },
          { note: "D#", fret: 6, selected: false, highlight: false },
          { note: "E", fret: 7, selected: false, highlight: false },
          { note: "F", fret: 8, selected: false, highlight: false },
          { note: "F#", fret: 9, selected: false, highlight: false },
          { note: "G", fret: 10, selected: false, highlight: false },
          { note: "G#", fret: 11, selected: false, highlight: false },
          { note: "A", fret: 12, selected: false, highlight: false },
          { note: "A#", fret: 13, selected: false, highlight: false },
          { note: "B", fret: 14, selected: false, highlight: false },
          { note: "C", fret: 15, selected: false, highlight: false },
          { note: "C#", fret: 16, selected: false, highlight: false },
          { note: "D", fret: 17, selected: false, highlight: false },
          { note: "D#", fret: 18, selected: false, highlight: false },
          { note: "E", fret: 19, selected: false, highlight: false },
          { note: "F", fret: 20, selected: false, highlight: false },
          { note: "F#", fret: 21, selected: false, highlight: false },
          { note: "G", fret: 22, selected: false, highlight: false },
          { note: "G#", fret: 23, selected: false, highlight: false },
          { note: "A", fret: 24, selected: false, highlight: false },
        ],
      },
      {
        stringNumber: 1,
        rootNote: "E",
        notes: [
          { note: "E", fret: 0, selected: false, highlight: false },
          { note: "F", fret: 1, selected: false, highlight: false },
          { note: "F#", fret: 2, selected: false, highlight: false },
          { note: "G", fret: 3, selected: false, highlight: false },
          { note: "G#", fret: 4, selected: false, highlight: false },
          { note: "A", fret: 5, selected: false, highlight: false },
          { note: "A#", fret: 6, selected: false, highlight: false },
          { note: "B", fret: 7, selected: false, highlight: false },
          { note: "C", fret: 8, selected: false, highlight: false },
          { note: "C#", fret: 9, selected: false, highlight: false },
          { note: "D", fret: 10, selected: false, highlight: false },
          { note: "D#", fret: 11, selected: false, highlight: false },
          { note: "E", fret: 12, selected: false, highlight: false },
          { note: "F", fret: 13, selected: false, highlight: false },
          { note: "F#", fret: 14, selected: false, highlight: false },
          { note: "G", fret: 15, selected: false, highlight: false },
          { note: "G#", fret: 16, selected: false, highlight: false },
          { note: "A", fret: 17, selected: false, highlight: false },
          { note: "A#", fret: 18, selected: false, highlight: false },
          { note: "B", fret: 19, selected: false, highlight: false },
          { note: "C", fret: 20, selected: false, highlight: false },
          { note: "C#", fret: 21, selected: false, highlight: false },
          { note: "D", fret: 22, selected: false, highlight: false },
          { note: "D#", fret: 23, selected: false, highlight: false },
          { note: "E", fret: 24, selected: false, highlight: false },
        ],
      },
    ],
  };
}

const initialState = getInitialState();

const fretboardSlice = createSlice({
  name: "fretboard",
  initialState,
  reducers: {
    setNotesGap(state, action) {
      state.notesGap = action.payload;
    },
    setNotesWidth(state, action) {
      state.notesWidth = action.payload;
    },
    setNotesMinWidth(state, action) {
      state.notesMinWidth = action.payload;
    },
    setNotesMaxWidth(state, action) {
      state.notesMaxWidth = action.payload;
    },
    setFretboardIsScrolling(state, action) {
      state.isScrolling = action.payload;
    },
    setFretCount(state, action) {
      state.fretCount = action.payload;
    },
    setFretCap(state, action) {
      state.fretCap = action.payload;
    },
    setPreferredFretCount(state, action) {
      state.preferredFretCount = action.payload;
      updateState(state);
    },
    addString(state, action) {
      state.balance += action.payload;
      state.fretboardIsLoading = false;
    },
    removeString(state, action) {
      state.balance -= action.payload;
    },
    tuneString: {
      prepare(stringNumber, newRootNote) {
        return {
          payload: { stringNumber, newRootNote },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    toggleNoteSelected: {
      prepare(stringNumber, fret) {
        return {
          payload: { stringNumber, fret },
        };
      },

      reducer(state, action) {
        const { stringNumber, fret } = action.payload;
        const updatedStrings = state.strings.map((string) => {
          if (string.stringNumber === stringNumber) {
            const updatedNotes = string.notes.map((note) => {
              if (note.fret === fret) {
                return { ...note, selected: !note.selected }; // Toggle the 'selected' property
              }
              return note;
            });
            return { ...string, notes: updatedNotes };
          }
          return string;
        });
        return { ...state, strings: updatedStrings };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setWindowWidth, (state) => {
      let newWindowWidth = getWindowWidth();
      updateState(state, newWindowWidth);
    });
  },
});

function updateState(state, newWindowWidth) {
  state.fretboardIsLoading = true;

  const windowWidth = newWindowWidth || getWindowWidth();

  if (newWindowWidth) {
    state.notesGap = getNotesGap(windowWidth);
    state.notesMinWidth = getNotesMinWidth(windowWidth);
    state.notesMaxWidth = getNotesMaxWidth(windowWidth);
    state.fretboardPadding = getFretboardPadding(windowWidth);
    state.fretCap = getFretCap(
      windowWidth,
      state.fretboardPadding,
      state.notesGap,
      state.notesMinWidth
    );
  }

  state.fretCount = getFretCount(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.notesMaxWidth,
    state.fretCap,
    state.preferredFretCount
  );
  // Not necessary when preferredFretCount & fretCount < optimalFretCount.
  // however, getNotesWidth is a quick calculation so we let it slideeeee
  state.notesWidth = getNotesWidth(
    windowWidth,
    state.fretboardPadding,
    state.notesGap,
    state.fretCount,
    state.notesMaxWidth
  );
  state.fretboardWidth = getFretboardWidth(
    state.fretCount,
    state.notesWidth,
    state.notesGap
  );

  state.fretboardIsLoading = false;
}

function getNotesGap(windowWidth) {
  if (windowWidth <= 600) {
    return 3;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 4;
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
    return 6;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 10;
  } else if (windowWidth > 900) {
    return 14;
  }
}

function getFretCap(windowWidth, fretboardPadding, notesGap, notesMinWidth) {
  let fretCap =
    Math.floor(
      (windowWidth - fretboardPadding * 2 + notesGap) /
        (notesMinWidth + notesGap)
    ) - 1; // why -1
  if (fretCap > 25) fretCap = 25;
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
  fretboardPadding,
  notesGap,
  fretCount,
  notesMaxWidth
) {
  let availableSpaceForNotes =
    windowWidth - fretboardPadding * 2 - notesGap * (fretCount - 1); // -1 because almost always 1 less gap than notes
  let newNotesWidth = Math.floor(availableSpaceForNotes / fretCount);
  if (newNotesWidth > notesMaxWidth) newNotesWidth = notesMaxWidth;
  return newNotesWidth;
}

function getFretboardWidth(fretCount, notesWidth, notesGap) {
  let fretboardWidth = fretCount * notesWidth + (fretCount - 1) * notesGap + 2;
  return fretboardWidth;
}

export const {
  setNotesGap,
  setNotesWidth,
  setNotesMinWidth,
  setNotesMaxWidth,
  setFretboardIsScrolling,
  setFretCount,
  setFretCap,
  setPreferredFretCount,
  addString,
  removeString,
  tuneString,
  toggleNoteSelected,
} = fretboardSlice.actions;

export default fretboardSlice.reducer;
