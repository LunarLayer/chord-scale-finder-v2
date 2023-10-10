import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: "C",
  accidentalType: "#", // "b"
  selectedNotes: [],
};

const MusicTheorySlice = createSlice({
  name: "musicTheory",
  initialState,
  reducers: {
    toggleNoteSelected: {
      prepare(note, hasAccidental, octave, selected) {
        return {
          payload: { note, hasAccidental, octave, selected },
        };
      },

      reducer(state, action) {
        const { note, hasAccidental, octave, selected } = action.payload;
        // let note = {
        //   note,
        //   hasAccidental,
        //   octave,
        //   selected,
        // };
      },
    },
  },
});

export const selectAllNotes = (state) => state.musicTheory.allNotes;
export const { toggleNoteSelected } = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
