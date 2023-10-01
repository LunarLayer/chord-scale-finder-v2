import { createSlice } from "@reduxjs/toolkit";

import { getWindowWidth } from "../../helpers/windowHelper";

console.log("uiSlice");

const initialState = {
  windowWidth: getWindowWidth(),
  currentViewDisplay1: "fretboard", // - fretboardSettings - keyChange
  currentViewDisplay2: "chordAndScaleIdentifier", // - chordProgressionBuilder
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
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

export const {
  setCurrentViewDisplay1,
  setCurrentViewDisplay2,
  setWindowWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
