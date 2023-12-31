import { createSlice } from "@reduxjs/toolkit";

import { getWindowWidth } from "../../Helpers/WindowHelper";
import { loginUser } from "../User/UserSlice";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    windowWidth: getWindowWidth(),
    currentViewSection1: "fretboard", // - instrumentSettings
    currentViewSection2: "chordAndScaleIdentifier", // - chordProgressionBuilder
    instrumentQuickMenu: undefined,
    soundPlayerQuickMenu: undefined,
    keyChangeMenu: undefined,
  },
  reducers: {
    setActiveTabForQuickMenu(state, action) {
      const { quickMenu, tab } = action.payload;
      state.quickMenus[quickMenu].activeTab = tab;
    },
    toggleMenu(state, action) {
      let menu = action.payload;
      switch (menu) {
        case "instrumentQuickMenu":
          state.instrumentQuickMenu.showing =
            !state.instrumentQuickMenu.showing;
          break;
        case "keyChange":
          state.keyChangeMenu.showing = !state.keyChangeMenu.showing;
          break;
        default:
          break;
      }

      // state.menu.showing = !state.menu.showing;
    },
    setCurrentViewSection1(state, action) {
      state.currentViewSection1 = action.payload;
    },
    setCurrentViewSection2(state, action) {
      state.currentViewSection2 = action.payload;
    },
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser, (state, action) => {
      const user = action.payload;
      state.instrumentQuickMenu = user.instrumentQuickMenu;
      state.soundPlayerQuickMenu = user.soundPlayerQuickMenu;
      state.keyChangeMenu = user.keyChangeMenu;
    });
  },
});

export const selectWindowWidth = (state) => state.ui.windowWidth;

export const {
  toggleMenu,
  setActiveTabForQuickMenu,
  setCurrentViewSection1,
  setCurrentViewSection2,
  setWindowWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
