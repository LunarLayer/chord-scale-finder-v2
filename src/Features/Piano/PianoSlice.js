import { createSlice } from "@reduxjs/toolkit";

const PianoSlice = createSlice({
  name: "piano",
  initialState: {
    piano: false,
  },
  reducers: {
    doIt(state, action) {
      return null;
    },
  },
});

export const { doIt } = PianoSlice.actions;

export default PianoSlice.reducer;
