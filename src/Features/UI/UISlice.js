// console.log("uiSlice");

import { createSlice } from "@reduxjs/toolkit";

import { getWindowWidth } from "../../Helpers/WindowHelper";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    windowWidth: getWindowWidth(),
    currentViewSection1: "fretboard", // - instrumentSettings - keyChange
    currentViewSection2: "chordAndScaleIdentifier", // - chordProgressionBuilder
  },
  reducers: {
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
});

export const selectWindowWidth = (state) => state.ui.windowWidth;

export const {
  setCurrentViewSection1,
  setCurrentViewSection2,
  setWindowWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
