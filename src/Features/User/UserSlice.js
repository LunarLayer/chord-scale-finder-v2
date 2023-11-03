import { createSlice } from "@reduxjs/toolkit";
import { soundEngine } from "../../Helpers/SoundEngine";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    username: undefined,
    settings: {
      uiTheme: undefined,
      key: undefined,
      tonality: undefined,
      accidental: undefined,
      instrument: undefined,
      instrumentSound: undefined,
      instrumentVariant: undefined,
      instrumentTheme: undefined,
      coloredNotes: undefined,
      tuning: undefined,
      markNotes: undefined,
      labelNotes: undefined,
      fretPosition: undefined,
      highlightedNotes: undefined,
      quickMenus: {
        instrumentQuickMenu: { showing: true, activeTab: "markNotes" },
        soundPlayerQuickMenu: { showing: true, activeTab: "unusedForNow" },
      },
    },
    projects: [
      {
        title: "dance with the devil in Am",
        projectSettings: {
          key: undefined,
          tonality: undefined,
          accidental: undefined,
          instrument: undefined,
          instrumentSound: undefined,
          instrumentVariant: undefined,
          theme: undefined,
          coloredNotes: undefined,
          tuning: undefined,
          quickMenus: {
            instrumentQuickMenu: { showing: true, activeTab: "markNotes" },
            soundPlayerQuickMenu: { showing: false, activeTab: "strum" },
          },
        },
      },
    ],

    // projects: [],
    // The user will have a general preference for what instrument to use,
    // quickSettings etc.
    // The user will also have projects that contain preferences for the project.
    // These could vary from a users general preference.
  },
  reducers: {
    loginUser(state, action) {
      const user = action.payload;
      state.settings.uiTheme = user.settings.uiTheme;
      state.settings.instrument = user.settings.instrument;
      state.settings.instrumentSound = user.settings.instrumentSound;
      state.settings.instrumentVariant = user.settings.instrumentVariant;
      state.settings.instrumentTheme = user.settings.instrumentTheme;
      state.settings.key = user.settings.key;
      state.settings.tuning = user.settings.tuning;
      state.settings.markNotes = user.settings.markNotes;
      state.settings.labelNotes = user.settings.labelNotes;
      state.settings.fretPosition = user.settings.fretPosition;
      state.settings.highlightedNotes = user.settings.highlightedNotes;
      state.settings.quickMenus = user.settings.quickMenus;
      state.projects = user.projects;
    },
    setInstrumentSound(state, action) {
      state.instrumentSound = action.payload;
      soundEngine.setInstrumentSound(action.payload);
    },
    setInstrumentDetails(state, action) {
      let instrumentDetails = action.payload;
      state.instrument = instrumentDetails.instrument;
      // state.instrumentSound = instrumentDetails.instrumentSound;
      state.instrumentVariant = instrumentDetails.instrumentVariant;
      state.instrumentTheme = instrumentDetails.instrumentTheme;
      state.tuning = instrumentDetails.tuning;
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
