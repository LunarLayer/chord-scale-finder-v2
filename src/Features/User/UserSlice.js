import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loginSuccess: false,
  },
  reducers: {
    userLoggedIn(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

export const { userLoggedIn } = UserSlice.actions;

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
