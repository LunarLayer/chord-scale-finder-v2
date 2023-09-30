import { createSlice, current } from "@reduxjs/toolkit";
import { setWindowWidth } from "../ui/uiSlice";

import { getWindowWidth } from "../../helpers/windowHelper";

const initialState = {
  isLoading: true,
  fretboardWidth: null,
  fretboardPadding: null,
  notesWidth: null,
  notesMinWidth: null,
  notesMaxWidth: null,
  notesGap: null,
  fretCount: 0, // consider renaming to visibleFrets
  fretCap: 25,
  preferredFretCount: null,
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
      state.fretCount = action.payload;
      updateState(state, action.payload);
    },
    addString(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
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
      updateState(state);
    });
  },
});

function updateState(state) {
  state.isLoading = true;
  const windowWidth = getWindowWidth(); // maybe use fretboardWidth instead? (would it work in all cases?)
  const { preferredFretCount, fretCap } = state;

  updateNotesGap(state, windowWidth);
  updateNotesMinWidth(state, windowWidth);
  updateNotesMaxWidth(state, windowWidth);
  updateFretboardPadding(state, windowWidth);

  // on resize and setPreferredFretCount

  if (preferredFretCount === 0) {
    console.log(current(state));
    state.isLoading = false;
    return;
  }

  if (preferredFretCount && state.fretCount !== 0) {
    if (preferredFretCount > fretCap) {
      state.fretCount = fretCap;
    } else {
      state.fretCount = preferredFretCount;
    }
    // dont really need this in case preferrerdFrets was just changed and no resize
    updateFretCap(state, windowWidth);
    // if (preferredFretCount > state.fretCap) state.fretCount = state.fretCap;
    // keep preferredFretCount as high as possible
    updateNotesWidth(state, windowWidth);
    updateFretboardWidth(state);
  } else {
    // why can't I use setNotesWidth here? I use setNotesWidth higher up.
    updateFretCap(state, windowWidth);
    updateFretCount(state, windowWidth);
    updateNotesWidth(state, windowWidth);
    updateFretboardWidth(state);
  }

  state.isLoading = false;
  // console.log(current(state));
}

function updateNotesGap(state, windowWidth) {
  if (windowWidth <= 600) {
    state.notesGap = 2;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    state.notesGap = 4;
  } else if (windowWidth > 900) {
    state.notesGap = 6;
  }
}

function updateNotesMinWidth(state, windowWidth) {
  if (windowWidth <= 600) {
    state.notesMinWidth = 20;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    state.notesMinWidth = 25;
  } else if (windowWidth > 900) {
    state.notesMinWidth = 30;
  }
}
function updateNotesMaxWidth(state, windowWidth) {
  if (windowWidth <= 600) {
    state.notesMaxWidth = 35;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    state.notesMaxWidth = 40;
  } else if (windowWidth > 900) {
    state.notesMaxWidth = 45;
  }
}

function updateNotesWidth(state, windowWidth) {
  const { fretboardPadding, fretCount, notesMaxWidth, notesGap } = state;
  let availableSpaceForNotes =
    windowWidth - fretboardPadding * 2 - notesGap * (fretCount - 1); // -1 because almost always 1 less gap than notes
  let newNotesWidth = Math.floor(availableSpaceForNotes / fretCount);
  if (newNotesWidth > notesMaxWidth) newNotesWidth = notesMaxWidth;
  if (state.notesWidth !== newNotesWidth) state.notesWidth = newNotesWidth;
}

function updateFretboardPadding(state, windowWidth) {
  if (windowWidth <= 600) {
    state.fretboardPadding = 6;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    state.fretboardPadding = 10;
  } else if (windowWidth > 900) {
    state.fretboardPadding = 14;
  }
}

function updateFretCount(state, windowWidth) {
  const { fretboardPadding, notesGap, notesMaxWidth, fretCap } = state;
  let res = Math.floor(
    (windowWidth - fretboardPadding * 2 + notesGap) / (notesMaxWidth + notesGap)
  );
  if (res > fretCap) res = fretCap;
  state.fretCount = res;
}

function updateFretboardWidth(state) {
  const { fretCount, notesWidth, notesGap } = state;
  state.fretboardWidth =
    fretCount * notesWidth + (fretCount - 1) * notesGap + 2;
}

function updateFretCap(state, windowWidth) {
  const { fretboardPadding, notesGap, notesMinWidth } = state;
  let res =
    Math.floor(
      (windowWidth - fretboardPadding * 2 + notesGap) /
        (notesMinWidth + notesGap)
    ) - 1; // why -1
  if (res > 25) res = 25;
  state.fretCap = res;
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
