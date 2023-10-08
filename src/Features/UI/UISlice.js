// console.log("uiSlice");

import { createSlice } from "@reduxjs/toolkit";

import { getWindowWidth } from "../../Helpers/WindowHelper";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    windowWidth: getWindowWidth(),
    currentViewDisplay1: "fretboard", // - fretboardSettings - keyChange
    currentViewDisplay2: "chordAndScaleIdentifier", // - chordProgressionBuilder
  },
  reducers: {
    setCurrentViewDisplay1(state, action) {
      state.currentViewDisplay1 = action.payload;
    },
    setCurrentViewDisplay2(state, action) {
      state.currentViewDisplay2 = action.payload;
    },
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
  },
});

export const selectWindowWidth = (state) => state.ui.windowWidth;

export const {
  setCurrentViewDisplay1,
  setCurrentViewDisplay2,
  setWindowWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
