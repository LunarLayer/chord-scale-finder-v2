import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userName: undefined,
    instrument: undefined,
    instrumentVariant: undefined,
    theme: undefined,
    coloredNotes: undefined,
    tuning: undefined,
    key: undefined,
    // projects: [],
  },
  reducers: {
    loginUser(state, action) {
      const user = action.payload;
      state.userName = user.userName;
      state.instrument = user.instrument;
      state.instrumentVariant = user.instrumentVariant;
      state.theme = user.theme;
      state.key = user.key;
      state.tuning = user.tuning;
      state.projects = user.projects;
    },
    setInstrumentDetails: {
      prepare(instrument, instrumentVariant, theme, tuning) {
        return {
          payload: { instrument, instrumentVariant, theme, tuning },
        };
      },

      reducer(state, action) {
        const { instrument, instrumentVariant, theme, tuning } = action.payload;
        state.instrument = instrument;
        state.instrumentVariant = instrumentVariant;
        state.theme = theme;
        state.tuning = tuning;
      },
    },
  },
});

export const { loginUser, setInstrumentDetails } = UserSlice.actions;

export default UserSlice.reducer;

// function updateState(state, newWindowWidth) {
//   state.isLoading = true;
//   // if (state.fretboardVariant === "standardFretboard") {
//   //   state.fretsWidth = getFretsWidth();
//   // }
//   const windowWidth = newWindowWidth || getWindowWidth();

//   if (newWindowWidth) {
//     state.notesGap = getnotesGap(windowWidth);
//     state.notesMinWidth = getnotesMinWidth(windowWidth);
//     state.notesMaxWidth = getnotesMaxWidth(windowWidth);
//     state.fretboardPadding = getFretboardPadding(windowWidth);
//     state.fretsAndNotesCap = getfretsAndNotesCap(
//       windowWidth,
//       state.fretboardPadding,
//       state.notesGap,
//       state.notesMinWidth,
//       state.fretboardVariant
//     );
//   }

//   state.visibleFrets = getvisibleFrets(
//     windowWidth,
//     state.fretboardPadding,
//     state.notesGap,
//     state.notesMaxWidth,
//     state.fretsAndNotesCap,
//     state.preferredvisibleFrets
//   );
//   // Not necessary when preferredvisibleFrets & visibleFrets < optimalvisibleFrets.
//   // however, getnotesWidth is a quick calculation so we let it slideeeee
//   state.notesWidth = getnotesWidth(
//     windowWidth,
//     state.fretboardVariant,
//     state.fretboardPadding,
//     state.notesGap,
//     state.visibleFrets,
//     state.notesMaxWidth
//   );
//   state.fretboardWidth = getFretboardWidth(
//     state.visibleFrets,
//     state.notesWidth,
//     state.notesGap
//   );

//   state.isLoading = false;
// }
