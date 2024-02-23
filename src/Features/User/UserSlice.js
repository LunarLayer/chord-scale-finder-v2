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
    instrumentView: undefined,
    nutIsFixed: undefined,
    soundFile: undefined,
    instrumentStyle: undefined,
    instrumentTheme: undefined,
    coloredNotes: undefined,
    tuning: undefined,
    keyChangeMenu: undefined,
    settingsMenu: undefined,
    fretboardMenu: undefined,
    soundPlayerMenu: undefined,
    projects: undefined,
    markNotes: undefined,
    labelNotes: undefined,
    fretPosition: undefined,
    highlightNotes: undefined,
  },
  reducers: {
    loginUser(state, action) {
      console.log("loginUser()");
      const user = action.payload;
      state.username = user.username;
      state.key = user.key;
      state.tonality = user.tonality;
      state.accidental = user.accidental;
      state.allNotes = user.allNotes;
      state.instrumentView = user.instrumentView;
      state.nutIsFixed = user.nutIsFixed;
      state.soundFile = user.soundFile;
      state.instrumentStyle = user.instrumentStyle;
      state.instrumentTheme = user.instrumentTheme;
      state.coloredNotes = user.coloredNotes;
      state.tuning = user.tuning;
      state.keyChangeMenu = user.keyChangeMenu;
      state.settingsMenu = user.settingsMenu;
      state.fretboardMenu = user.fretboardMenu;
      state.soundPlayerMenu = user.soundPlayerMenu;
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
