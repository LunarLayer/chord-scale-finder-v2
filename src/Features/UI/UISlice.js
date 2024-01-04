import { createSlice } from "@reduxjs/toolkit";

import { getWindowWidth } from "../../Helpers/WindowHelper";
import { loginUser } from "../User/UserSlice";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    windowWidth: getWindowWidth(),
    currentViewSection1: "fretboard", // - instrumentSettings
    currentViewSection2: "chordAndScaleIdentifier", // - chordProgressionBuilder
    soundPlayerQuickMenu: undefined,
  },
  reducers: {
    setActiveTabForQuickMenu(state, action) {
      const { quickMenu, tab } = action.payload;
      state.quickMenus[quickMenu].activeTab = tab;
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
      // set viewSections (after probably renaming them)
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
