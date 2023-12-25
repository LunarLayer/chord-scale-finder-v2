import { createSlice } from "@reduxjs/toolkit";
import { soundEngine } from "../../Helpers/SoundEngine";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    username: undefined,
    key: undefined,
    tonality: undefined,
    accidental: undefined,
    allNotes: undefined,
    instrument: undefined,
    nutIsFixed: undefined,
    soundFile: undefined,
    instrumentStyle: undefined,
    instrumentTheme: undefined,
    coloredNotes: undefined,
    tuning: undefined,
    instrumentQuickMenu: undefined,
    soundPlayerQuickMenu: undefined,
    keyChangeMenu: undefined,
    projects: undefined,
    markNotes: undefined,
    labelNotes: undefined,
    fretPosition: undefined,
    highlightNotes: undefined,
  },
  reducers: {
    loginUser(state, action) {
      console.log("loginUser reducer");
      const user = action.payload;
      state.username = user.username;
      state.key = user.key;
      state.tonality = user.tonality;
      state.accidental = user.accidental;
      state.allNotes = user.allNotes;
      state.instrument = user.instrument;
      state.nutIsFixed = user.nutIsFixed;
      state.soundFile = user.soundFile;
      state.instrumentStyle = user.instrumentStyle;
      state.instrumentTheme = user.instrumentTheme;
      state.coloredNotes = user.coloredNotes;
      state.tuning = user.tuning;
      state.instrumentQuickMenu = user.instrumentQuickMenu;
      state.soundPlayerQuickMenu = user.soundPlayerQuickMenu;
      state.keyChangeMenu = user.keyChangeMenu;
      state.projects = user.projects;
      state.markNotes = user.markNotes;
      state.labelNotes = user.labelNotes;
      state.fretPosition = user.fretPosition;
      state.highlightNotes = user.highlightNotes;
    },
    // setInstrumentSound(state, action) {
    //   state.instrumentSound = action.payload;
    //   soundEngine.setInstrumentSound(action.payload);
    // },
    // setInstrumentDetails(state, action) {
    //   let instrumentDetails = action.payload;
    //   state.instrument = instrumentDetails.instrument;
    //   // state.instrumentSound = instrumentDetails.instrumentSound;
    //   state.instrumentVariant = instrumentDetails.instrumentVariant;
    //   state.instrumentTheme = instrumentDetails.instrumentTheme;
    //   state.tuning = instrumentDetails.tuning;
    // },
  },
});

export const { loginUser } = UserSlice.actions;

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
