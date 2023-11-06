// console.log("uiSlice");

import { createSlice } from "@reduxjs/toolkit";

import { getWindowWidth } from "../../Helpers/WindowHelper";
import { loginUser } from "../User/UserSlice";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    windowWidth: getWindowWidth(),
    currentViewSection1: "fretboard", // - instrumentSettings - keyChange
    currentViewSection2: "chordAndScaleIdentifier", // - chordProgressionBuilder
    quickMenus: {
      instrumentQuickMenu: { showing: true },
      soundPlayerQuickMenu: { showing: true },
    },
  },
  reducers: {
    setActiveTabForQuickMenu(state, action) {
      const { quickMenu, tab } = action.payload;
      state.quickMenus[quickMenu].activeTab = tab;
    },
    toggleQuickMenu(state, action) {
      let menu = action.payload;
      state.quickMenus[menu].showing = !state.quickMenus[menu].showing;
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
      state.quickMenus = user.settings.quickMenus;
    });
  },
});

export const selectWindowWidth = (state) => state.ui.windowWidth;

export const {
  toggleQuickMenu,
  setActiveTabForQuickMenu,
  setCurrentViewSection1,
  setCurrentViewSection2,
  setWindowWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
